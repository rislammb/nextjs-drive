"use client";

import { useParams } from "next/navigation";
import Button from "@/app/components/common/button";
import { uploadFolder } from "@/app/lib/actions/file-actions";
import { useFormState } from "react-dom";

export default function UploadFolder() {
  const params = useParams<{ id: string }>();
  const initialState = { message: "" };

  const uploadFolderWithParent = uploadFolder.bind(null, params?.id || "");
  const [state, dispatch] = useFormState(uploadFolderWithParent, initialState);

  return (
    <form action={dispatch} className="flex gap-2">
      <div>
        <input
          name="folderName"
          type="text"
          placeholder="Folder Name..."
          className="input w-full max-w-xs bg-gray-700"
        />
        {state?.message && (
          <p className="text-xs text-red-400 mt-2">{state.message}</p>
        )}
      </div>
      <Button title="Create Folder" type="submit" btnClass="btn-info" />
    </form>
  );
}
