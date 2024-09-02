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

export async function uploadFile(
  parentId: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = FileSchema.safeParse({
    file: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to upload file!",
    };
  }

  const { file } = validatedFields.data;
  if (file.size < 1 || file.name === "undefined") {
    return {
      message: "Missing Fields. Failed to upload file!",
    };
  }

  const storageRef = ref(storage, `files/${file.name}`);

  try {
    const session = await getServerAuthSession();
    const userEmail = session?.user?.email;

    console.log("file type => ", file);

    if (userEmail) {
      await uploadBytesResumable(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      const payload = {
        fileLink: downloadUrl,
        fileName: truncateMiddleOfLongFileName(file.name),
        fileType: file.type,
        userEmail,
        parentId,
      };

      await addFile(payload);
    } else {
      return {
        message: "User not found: Faild to upload file!",
      };
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to upload file!",
    };
  }

  revalidatePath(parentId ? "/folder/[id]" : "/");
}

const FolderSchema = z.object({
  folderName: z
    .string()
    .min(3, "Forder name must be at least three characters long!"),
});

export async function uploadFolder(
  parentId: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = FolderSchema.safeParse({
    folderName: formData.get("folderName"),
  });

  if (!validatedFields.success) {
    return {
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
        files: [],
        userEmail,
        parentId,
      };

      await addFolder(payload);
    } else {
      return {
        message: "User not found: Faild to create folder!",
      };
    }
  } catch (error) {
    return {
      message: "Database Error: Faild to create folder!",
    };
  }

  revalidatePath(parentId ? "/folder/[id]" : "/");
}
