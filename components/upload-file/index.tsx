"use client";

import { useFormState } from "react-dom";
import Button from "@/components/common/Button";
import Progress from "@/components/common/progress";
import { fileUpload } from "@/lib/actions/fileUpload";

export default function UploadFile() {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(fileUpload, initialState);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <form action={dispatch} className="flex gap-2">
          <div className="flex flex-col gap-2">
            <input
              name="file"
              type="file"
              className="file-input w-full max-w-xs bg-gray-700"
            />
            {state?.errors?.file && (
              <p className="text-xs text-red-500">{state.errors.file}</p>
            )}
          </div>
          <Button title="Add a File" type="submit" btnClass="btn-primary" />
        </form>
        <Button title="Create a Folder" btnClass="btn-info" />
      </div>
      <Progress value={100} />
    </div>
  );
}
