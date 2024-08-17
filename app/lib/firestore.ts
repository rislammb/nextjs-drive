import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { type File } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "@/server/auth";

const files = collection(db, "files");

interface AddFileProps {
  fileLink: string;
  fileName: string;
  fileType: string;
  userEmail: string;
}

export async function addFile({
  fileLink,
  fileName,
  fileType,
  userEmail,
}: AddFileProps): Promise<void> {
  try {
    await addDoc(files, { fileLink, fileName, fileType, userEmail });
  } catch (error) {
    console.log("Err ", error);
  }
}

export async function getFiles(): Promise<File[]> {
  noStore();

  const session = await getServerAuthSession();
  const userEmail = session?.user?.email;

  const result = await getDocs(
    userEmail
      ? query(files, where("userEmail", "==", userEmail))
      : query(files, where("userEmail", "==", "undefined"))
  );

  return result.docs.map((doc) => ({
    fileLink: doc.data().fileLink as string,
    fileName: doc.data().fileName as string,
    fileType: doc.data().fileType as string,
    userEmail: doc.data().userEmail as string,
    id: doc.id,
  }));
}
