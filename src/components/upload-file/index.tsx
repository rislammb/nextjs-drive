"use client";

import Button from "@/components/common/Button";
import { type ChangeEvent, useState } from "react";

export default function UploadFile() {
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const [file, setFile] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
  };

  const uploadFile = () => {
    setIsShowInput(!isShowInput);
    console.log(file);
  };

  return (
    <div className="flex gap-2">
      <Button title="Add a File" onClick={uploadFile} btnClass="btn-primary" />
      {isShowInput && (
        <input
          type="file"
          value={file}
          onChange={handleChange}
          className="file-input w-full max-w-xs bg-gray-700"
        />
      )}
      <Button title="Create a Folder" btnClass="btn-info" />
    </div>
  );
}
