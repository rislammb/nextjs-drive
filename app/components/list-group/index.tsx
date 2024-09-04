"use client";

import FileList from "@/app/components/file-list";
import FolderList from "../folder-list";
import { File, Folder } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { shareFile } from "@/app/lib/actions/file-actions";
import { useFormState } from "react-dom";
import Button from "../common/button";

interface ListGroupProps {
  files: File[];
  folders: Folder[];
}

export default function ListGroup({ files, folders }: ListGroupProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFileId, setSelectedFileId] = useState<object | null>(null);
  const initialState = { message: "", isSent: false };

  const toggleModal = (file?: object) => {
    if (showModal) {
      setSelectedFileId(null);
    } else {
      if (file) setSelectedFileId(file);
    }
    setShowModal(!showModal);
  };

  const shareFileWithId = shareFile.bind(null, selectedFileId || {});
  const [state, dispatch] = useFormState(shareFileWithId, initialState);

  useEffect(() => {
    if (state?.isSent) toggleModal();
  }, [state?.isSent]);

  return (
    <div className="flex flex-wrap gap-4">
      <FileList files={files} toggleModal={toggleModal} />
      <FolderList folders={folders} toggleModal={toggleModal} />

      {showModal && (
        <dialog
          id="share_modal"
          className={`modal ${showModal ? "modal-open" : ""}`}
        >
          <div className="modal-box w-auto bg-gray-800">
            <button
              onClick={() => toggleModal()}
              className="btn btn-sm btn-circle btn-ghost absolute hover:opacity-70 right-2 top-2"
            >
              ✕
            </button>

            <form
              action={dispatch}
              className="flex flex-col items-center mt-4 gap-4"
            >
              <h3 className="font-bold text-lg">Share!</h3>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="input bg-gray-600"
                  placeholder="something@email.com"
                />
                <p className="text-warning text-xs">{state?.message}</p>
              </div>
              <Button title="Share" type="submit" />
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
