import Image from "next/image";
import UploadFile from "../upload-file";
import { getFiles } from "@/lib/firestore";

import styles from "./index.module.scss";

export default async function Home() {
  const files = await getFiles();

  return (
    <div>
      <UploadFile />

      <div className={styles.imageContainer}>
        {files.length > 0 &&
          files.map((file) => (
            <Image
              key={file.id}
              src={file.imageLink}
              alt={`Drive file-${file.id}`}
              width={240}
              height={240}
              className={styles.image}
            />
          ))}
      </div>
    </div>
  );
}
