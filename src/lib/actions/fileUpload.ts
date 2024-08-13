"use server";

import { z } from "zod";
import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addFile } from "@/lib/firestore";

const FormSchema = z.object({
  file: z.instanceof(File),
});

export type State = {
  message?: string | null;
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

            console.log(process);
          },
          (error) => {
            console.log("alert");
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadUrl) => {
                await addFile(downloadUrl);
              })
              .catch((err) => console.log(err));
          },
        );
      } catch (error) {
        console.log("Error from error section => ", error);
      }
    }
  }
}
