import { getFiles } from "@/app/lib/firestore";
import FileList from "@/app/components/file-list";
import UploadFile from "@/app/components/upload-file";

export default async function Home() {
  const files = await getFiles();

  return (
    <div>
      <UploadFile />
      <FileList files={files} />
    </div>
  );
}
