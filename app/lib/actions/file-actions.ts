"use server";

import { z } from "zod";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { revalidatePath } from "next/cache";

import { storage } from "@/firebaseConfig";
import { addFile } from "@/app/lib/firestore";
import { truncateMiddleOfLongFileName } from "../utils";
import { getServerAuthSession } from "@/server/auth";

const FormSchema = z.object({
  file: z.instanceof(File),
});

export async function fileUpload(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { file } = validatedFields.data;
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  try {
    const session = await getServerAuthSession();
    const userEmail = session?.user?.email;

    if (userEmail) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const process = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("process => ", process);
        },
        (error) => {
          throw error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadUrl) => {
              await addFile({
                fileLink: downloadUrl,
                fileName: truncateMiddleOfLongFileName(file.name),
                fileType: file.type,
                userEmail,
              });
            })
            .catch((error) => {
              throw error;
            });
        }
      );
    }
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
}
