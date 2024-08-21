export type File = {
  id?: string;
  fileLink: string;
  fileName: string;
  fileType: string;
  userEmail: string;
  parentId: string;
};

export type Folder = {
  id?: string;
  folderName: string;
  isFolder: boolean;
  files: object[];
  userEmail: string;
  parentId: string;
};

export type DbData = {
  files: File[];
  folders: Folder[];
};
