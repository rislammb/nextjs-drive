import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { type File } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

const files = collection(db, "files");

export async function addFile(
  fileLink: string,
  fileName: string,
  fileType: string,
): Promise<void> {
  try {
    await addDoc(files, { fileLink, fileName, fileType });
  } catch (error) {
    console.log("Err ", error);
  }
}

export async function getFiles(): Promise<File[]> {
  noStore();

  const result = await getDocs(query(files));
  return result.docs.map((doc) => ({
    fileLink: doc.data().fileLink as string,
    fileName: doc.data().fileName as string,
    fileType: doc.data().fileType as string,
    id: doc.id,
  }));
}
