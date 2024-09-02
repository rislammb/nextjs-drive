"use client";

import { useSession } from "next-auth/react";
import UploadFile from "../upload-file";
import UploadFolder from "../upload-folder";

export default function UploadGroup() {
  const { data: session } = useSession();

  return session?.user ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <UploadFile />
        <UploadFolder />
      </div>
      <hr className="w-full border-gray-700" />
    </div>
  ) : (
    <div className="my-6">
      <h4 className="text-center">For upload files, sign up!</h4>
    </div>
  );
}
