"use client";

import Button from "@/components/common/Button";
import Progress from "../common/progress";
// import { useState } from "react";
import { useFormState } from "react-dom";
import { fileUpload } from "@/lib/actions/fileUpload";

export default function UploadFile() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(fileUpload, initialState);
  console.log(state);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <form action={dispatch} className="flex gap-2">
          <input
            name="file"
            type="file"
            className="file-input w-full max-w-xs bg-gray-700"
          />
          <Button title="Add a File" type="submit" btnClass="btn-primary" />
        </form>
        <Button title="Create a Folder" btnClass="btn-info" />
      </div>
      <Progress value={100} />
    </div>
  );
}
