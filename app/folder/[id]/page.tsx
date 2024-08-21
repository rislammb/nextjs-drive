import ListGroup from "@/app/components/list-group";
import UploadGroup from "@/app/components/upload-group";
import { getDbData } from "@/app/lib/firestore";

export default async function Folder({ params }: { params: { id: string } }) {
  const { files, folders } = await getDbData(params.id);

  return (
    <>
      <UploadGroup />
      <ListGroup files={files} folders={folders} />
    </>
  );
}
