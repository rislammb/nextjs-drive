import { getFiles } from "@/lib/firestore";
import FileList from "@/components/file-list";
import UploadFile from "@/components/upload-file";

export default async function Home() {
  const files = await getFiles();

  return (
    <div>
      <UploadFile />
      <FileList files={files} />
    </div>
  );
}
