import FileList from "@/app/components/file-list";
import FolderList from "../folder-list";
import { File, Folder } from "@/app/lib/definitions";

interface ListGroupProps {
  files: File[];
  folders: Folder[];
}

export default function ListGroup({ files, folders }: ListGroupProps) {
  return (
    <div className="flex flex-wrap py-4 gap-4">
      <FileList files={files} />
      <FolderList folders={folders} />
    </div>
  );
}
