"use client";

import FileList from "@/app/components/file-list";
import FolderList from "../folder-list";
import { File, Folder } from "@/app/lib/definitions";
import { useState } from "react";

interface ListGroupProps {
  files: File[];
  folders: Folder[];
}

export default function ListGroup({ files, folders }: ListGroupProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => setShowModal(!showModal);

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
              onClick={toggleModal}
              className="btn btn-sm btn-circle btn-ghost absolute hover:opacity-70 right-2 top-2"
            >
              ✕
            </button>

            <div className="flex flex-col items-center mt-8 gap-4">
              <h3 className="font-bold text-lg">Share!</h3>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="input bg-gray-600"
                  placeholder="something@email.com"
                />
              </div>
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
