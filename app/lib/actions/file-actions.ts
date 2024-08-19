"use server";

import { z } from "zod";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { revalidatePath } from "next/cache";

import { storage } from "@/firebaseConfig";
import { addFile, addFolder } from "@/app/lib/firestore";
import { truncateMiddleOfLongFileName } from "../utils";
import { getServerAuthSession } from "@/server/auth";

const FileSchema = z.object({
  file: z.instanceof(File),
});

export async function uploadFile(parentId: string, formData: FormData) {
  const validatedFields = FileSchema.safeParse({
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to upload file!",
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
              const payload = {
                fileLink: downloadUrl,
                fileName: truncateMiddleOfLongFileName(file.name),
                fileType: file.type,
                userEmail,
                parentId,
              };

              await addFile(payload);
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

  revalidatePath(parentId ? "/folder/[id]" : "/", "page");
}

const FolderSchema = z.object({
  folderName: z
    .string()
    .min(3, "Forder name must be at least three characters long!"),
});

export async function uploadFolder(parentId: string, formData: FormData) {
  const validatedFields = FolderSchema.safeParse({
    folderName: formData.get("folderName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create folder!",
    };
  }

  const { folderName } = validatedFields.data;

  try {
    const session = await getServerAuthSession();
    const userEmail = session?.user?.email;

    if (userEmail) {
      const payload = {
        folderName,
        isFolder: true,
        fileList: [],
        userEmail,
        parentId,
      };

      await addFolder(payload);
      revalidatePath(parentId ? "/folder/[id]" : "/", "page");
    }
  } catch (error) {
    throw error;
  }
}
