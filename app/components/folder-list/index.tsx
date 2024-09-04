import { Folder } from "@/app/lib/definitions";
import Link from "next/link";
import { FaShare } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";

interface FolderListProps {
  folders: Folder[];
  toggleModal: (file: object) => void;
}

export default function FolderList({ folders, toggleModal }: FolderListProps) {
  return (
    folders.length > 0 &&
    folders.map((folder: Folder) => (
      <div
        key={folder.id}
        className="relative w-[140px] rounded-lg bg-slate-600 p-2 transition hover:bg-slate-700"
      >
        <Link
          href={`/folder/${folder.id}`}
          className="flex cursor-pointer flex-col items-center justify-between gap-4"
        >
          <FiFolder size={90} />
          <p className="text-center text-xs">{folder.folderName}</p>
        </Link>
        <button
          onClick={() => toggleModal(folder)}
          className="absolute z-10 right-1 top-1 btn btn-circle btn-xs btn-info"
        >
          <FaShare />
        </button>
      </div>
    ))
  );
}
