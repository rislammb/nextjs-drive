import { getDbData } from "@/app/lib/firestore";
import FileList from "@/app/components/file-list";
import FolderList from "../folder-list";

export default async function Home() {
  const { fileList, folderList } = await getDbData();

  return (
    <div className="flex flex-wrap py-4 gap-4">
      <FileList files={fileList} />
      <FolderList folders={folderList} />
    </div>
  );
}
