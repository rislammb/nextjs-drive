"use client";

import { type File } from "@/lib/definitions";
import Image from "next/image";
import { FaRegFilePdf } from "react-icons/fa";
import { FiFileText, FiImage } from "react-icons/fi";

interface FileListProps {
  files: File[];
}

export default function FileList({ files }: FileListProps) {
  const openFile = (fileLink: string) => {
    window.open(fileLink);
  };

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {files.length > 0 &&
        files.map((file: File) => (
          <div
            key={file.id}
            className="flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-between gap-4 rounded-lg bg-slate-600 p-4 transition hover:bg-slate-700"
            onClick={() => openFile(file.fileLink)}
          >
            <p className="text-center">{file.fileName}</p>
            {file.fileType === "image/png" ? (
              <FiImage size={80} />
            ) : file.fileType === "application/pdf" ? (
              <FaRegFilePdf size={80} />
            ) : (
              <FiFileText size={80} />
            )}
            {/* <Image
              src={file.imageLink}
              alt={`Drive file-${file.id}`}
              width={240}
              height={240}
            /> */}
          </div>
        ))}
    </div>
  );
}
