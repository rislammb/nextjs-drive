import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { env } from "@/env";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "next-drive-daa10.firebaseapp.com",
  projectId: "next-drive-daa10",
  storageBucket: "next-drive-daa10.appspot.com",
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: "G-2N531H88TF",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
