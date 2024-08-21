import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/firebaseConfig";
import { DbData, Folder, type File } from "./definitions";
import { getServerAuthSession } from "@/server/auth";

const filesRef = collection(db, "files");

export async function addFile({
  fileLink,
  fileName,
  fileType,
  userEmail,
  parentId,
}: File): Promise<void> {
  try {
    await addDoc(filesRef, {
      fileLink,
      fileName,
      fileType,
      userEmail,
      parentId,
    });
  } catch (error) {
    throw error;
  }
}

export async function addFolder({
  folderName,
  isFolder,
  files,
  userEmail,
  parentId,
}: Folder): Promise<void> {
  try {
    await addDoc(filesRef, {
      folderName,
      isFolder,
      files,
      userEmail,
      parentId,
    });
  } catch (error) {
    throw error;
  }
}

export async function getDbData(folderId?: string): Promise<DbData> {
  noStore();

  const files: File[] = [];
  const folders: Folder[] = [];

  try {
    const session = await getServerAuthSession();
    const userEmail = session?.user?.email;

    if (userEmail) {
      const result = await getDocs(
        userEmail
          ? folderId
            ? query(
                filesRef,
                where("userEmail", "==", userEmail),
                where("parentId", "==", folderId)
              )
            : query(
                filesRef,
                where("userEmail", "==", userEmail),
                where("parentId", "==", "")
              )
          : query(filesRef, where("userEmail", "==", "undefined"))
      );

      result.docs.forEach((doc) => {
        if (doc.data().isFolder) {
          folders.push({
            folderName: doc.data().folderName,
            isFolder: doc.data().isFolder,
            files: doc.data().files,
            userEmail,
            parentId: folderId as string,
            id: doc.id,
          });
        } else {
          files.push({
            fileLink: doc.data().fileLink,
            fileName: doc.data().fileName,
            fileType: doc.data().fileType,
            userEmail,
            parentId: folderId as string,
            id: doc.id,
          });
        }
      });
    }

    return { files, folders };
  } catch (error) {
    throw error;
  }
}
