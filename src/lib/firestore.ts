import { db } from "@/firebaseConfig";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const files = collection(db, "files");

export async function addFile(imageLink: string) {
  try {
    await addDoc(files, { imageLink });
  } catch (error) {
    console.log("Err ", error);
  }
}

export async function getFiles() {
  const result = await getDocs(query(files));
  return result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}
