import FileList from "@/app/components/file-list";
import FolderList from "@/app/components/folder-list";
import { getDbData } from "@/app/lib/firestore";

export default async function Folder({ params }: { params: { id: string } }) {
  const { fileList, folderList } = await getDbData(params.id);

  return (
    <div className="flex flex-wrap py-4 gap-4">
      <FileList files={fileList} />
      <FolderList folders={folderList} />
    </div>
  );
}
