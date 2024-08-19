"use client";

import { type File } from "@/app/lib/definitions";
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
    files.length > 0 &&
    files.map((file: File) => (
      <div
        key={file.id}
        className="flex h-[160px] w-[140px] cursor-pointer flex-col items-center justify-between gap-4 rounded-lg bg-slate-600 p-2 transition hover:bg-slate-700"
        onClick={() => openFile(file.fileLink)}
      >
        {file.fileType === "image/png" ? (
          <Image
            src={file.fileLink}
            alt={file.fileName}
            width={160}
            height={160}
            className="w-auto h-24 rounded object-cover"
          />
        ) : file.fileType === "application/pdf" ? (
          <FaRegFilePdf size={90} />
        ) : (
          <FiFileText size={90} />
        )}
        <p className="text-center text-xs">{file.fileName}</p>
        {/* <Image
              src={file.imageLink}
              alt={`Drive file-${file.id}`}
              width={240}
              height={240}
            /> */}
      </div>
    ))
  );
}
