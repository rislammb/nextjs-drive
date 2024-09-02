"use client";

import { type File } from "@/app/lib/definitions";
import Image from "next/image";
import { FaRegFilePdf, FaShare } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

interface FileListProps {
  files: File[];
  toggleModal: () => void;
}

export default function FileList({ files, toggleModal }: FileListProps) {
  return (
    files.length > 0 &&
    files.map((file: File) => (
      <div
        key={file.id}
        className="relative w-[140px] rounded-lg bg-slate-600 p-2 transition hover:bg-slate-700"
      >
        <div
          className="flex cursor-pointer flex-col items-center justify-between gap-4"
          onClick={() => window.open(file.fileLink)}
        >
          {file.fileType === "image/png" ||
          file.fileType === "image/jpeg" ||
          file.fileType === "image/x-icon" ? (
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
        </div>
        <button
          onClick={toggleModal}
          className="absolute z-10 right-1 top-1 btn btn-circle btn-xs btn-info"
        >
          <FaShare />
        </button>
      </div>
    ))
  );
}
