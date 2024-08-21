import ListGroup from "./components/list-group";
import UploadGroup from "./components/upload-group";
import { getDbData } from "./lib/firestore";

export default async function HomePage() {
  const { files, folders } = await getDbData();

  return (
    <>
      <UploadGroup />
      <ListGroup files={files} folders={folders} />
    </>
  );
}
