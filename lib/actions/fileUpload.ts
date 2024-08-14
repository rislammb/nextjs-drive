"use server";

import { z } from "zod";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addFile } from "@/lib/firestore";
import { revalidatePath } from "next/cache";
import { truncateMiddleOfLongFileName } from "../utils";

const FormSchema = z.object({
  file: z.instanceof(File),
});

export type State = {
  message?: null | string;
  errors?: {
    file?: string[];
  };
};

export async function fileUpload(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return { message: "Something went wrong!" };
  } else {
    const { file } = validatedFields.data;

    if (file.size < 1) {
      return {
        message: "Something went wrong!",
        errors: { file: ["File must not be empty!"] },
      };
    } else {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const process = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            console.log("process => ", process);
          },
          (error) => {
            return {
              message:
                typeof error === "string" ? error : "Something went wrong!",
            };
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadUrl) => {
                await addFile(
                  downloadUrl,
                  truncateMiddleOfLongFileName(file.name),
                  file.type,
                );
                revalidatePath("/");
              })
              .catch((err) => {
                return {
                  message:
                    typeof err === "string" ? err : "Something went wrong!",
                };
              });
          },
        );
      } catch (error) {
        return {
          message: typeof error === "string" ? error : "Something went wrong!",
        };
      }
    }
  }
}
