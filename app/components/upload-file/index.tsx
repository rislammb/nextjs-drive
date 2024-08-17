"use client";

import { useSession } from "next-auth/react";
import Button from "@/app/components/common/Button";
import Progress from "@/app/components/common/progress";
import { fileUpload } from "@/app/lib/actions/file-actions";

export default function UploadFile() {
  const { data: session } = useSession();

  return session?.user ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <form action={fileUpload} className="flex gap-2">
          <div className="flex flex-col gap-2">
            <input
              name="file"
              type="file"
              className="file-input w-full max-w-xs bg-gray-700"
            />
          </div>
          <Button title="Add a File" type="submit" btnClass="btn-primary" />
        </form>
        <Button title="Create a Folder" btnClass="btn-info" />
      </div>
      <Progress value={100} />
    </div>
  ) : (
    <div className="my-6">
      <h4 className="text-center">For upload files, sign up!</h4>
    </div>
  );
}
