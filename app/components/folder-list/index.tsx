import { Folder } from "@/app/lib/definitions";
import Link from "next/link";
import { FiFolder } from "react-icons/fi";

interface FolderListProps {
  folders: Folder[];
}

export default function FolderList({ folders }: FolderListProps) {
  return (
    folders.length > 0 &&
    folders.map((folder: Folder) => (
      <Link
        key={folder.id}
        href={`/folder/${folder.id}`}
        className="flex h-[160px] w-[140px] cursor-pointer flex-col items-center justify-between gap-4 rounded-lg bg-slate-600 p-2 transition hover:bg-slate-700"
      >
        <FiFolder size={90} />
        <p className="text-center text-xs">{folder.folderName}</p>
      </Link>
    ))
  );
}
