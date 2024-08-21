"use client";

import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import Button from "@/app/components/common/button";
import { State, uploadFile } from "@/app/lib/actions/file-actions";

export default function UploadFile() {
  const params = useParams<{ id: string }>();
  const initialState: State = { message: null };

  const uploadFileWithParent = uploadFile.bind(null, params?.id || "");
  const [state, dispatch] = useFormState(uploadFileWithParent, initialState);

  return (
    <form action={dispatch} className="flex gap-2">
      <div>
        <input
          name="file"
          type="file"
          className="file-input w-full max-w-xs bg-gray-700"
        />
        {state?.message && (
          <p className="text-xs text-red-400 mt-2">{state.message}</p>
        )}
      </div>
      <Button title="Upload File" type="submit" btnClass="btn-primary" />
    </form>
  );
}
