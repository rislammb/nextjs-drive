import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { DbData, Folder, type File } from "./definitions";
import { getServerAuthSession } from "@/server/auth";

const files = collection(db, "files");

export async function addFile({
  fileLink,
  fileName,
  fileType,
  userEmail,
  parentId,
}: File): Promise<void> {
  try {
    await addDoc(files, { fileLink, fileName, fileType, userEmail, parentId });
  } catch (error) {
    throw error;
  }
}

export async function addFolder({
  folderName,
  isFolder,
  fileList,
  userEmail,
  parentId,
}: Folder): Promise<void> {
  try {
    await addDoc(files, {
      folderName,
      isFolder,
      fileList,
      userEmail,
      parentId,
    });
  } catch (error) {
    throw error;
  }
}

export async function getDbData(folderId?: string): Promise<DbData> {
  const fileList: File[] = [];
  const folderList: Folder[] = [];

  try {
    const session = await getServerAuthSession();
    const userEmail = session?.user?.email;

    if (userEmail) {
      const result = await getDocs(
        userEmail
          ? folderId
            ? query(
                files,
                where("userEmail", "==", userEmail),
                where("parentId", "==", folderId)
              )
            : query(
                files,
                where("userEmail", "==", userEmail),
                where("parentId", "==", "")
              )
          : query(files, where("userEmail", "==", "undefined"))
      );

      result.docs.forEach((doc) => {
        if (doc.data().isFolder) {
          folderList.push({
            folderName: doc.data().folderName,
            isFolder: doc.data().isFolder,
            fileList: doc.data().fileList,
            userEmail,
            parentId: folderId as string,
            id: doc.id,
          });
        } else {
          fileList.push({
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

    return { fileList, folderList };
  } catch (error) {
    throw error;
  }
}
