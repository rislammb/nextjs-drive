"use client";

import { useSession } from "next-auth/react";
import Button from "@/app/components/common/Button";
import Progress from "@/app/components/common/progress";
import { uploadFile, uploadFolder } from "@/app/lib/actions/file-actions";
import { useParams } from "next/navigation";

export default function UploadFile() {
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();

  const bindUploadFile = uploadFile.bind(null, params.id ?? "");
  const bindUploadFolder = uploadFolder.bind(null, params.id ?? "");

  return session?.user ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <form action={bindUploadFile} className="flex gap-2">
          <div className="flex flex-col gap-2">
            <input
              name="file"
              type="file"
              className="file-input w-full max-w-xs bg-gray-700"
            />
          </div>
          <Button title="Upload File" type="submit" btnClass="btn-primary" />
        </form>
        <form action={bindUploadFolder} className="flex gap-2">
          <input
            name="folderName"
            type="text"
            placeholder="Folder Name..."
            className="input w-full max-w-xs bg-gray-700"
          />
          <Button title="Create Folder" type="submit" btnClass="btn-info" />
        </form>
      </div>
      <Progress value={100} />
    </div>
  ) : (
    <div className="my-6">
      <h4 className="text-center">For upload files, sign up!</h4>
    </div>
  );
}
