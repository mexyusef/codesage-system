import fs from "fs-extra";

export function validateFolderPath(folderPath: string): void {
  if (!folderPath || !fs.existsSync(folderPath)) {
    throw new Error(`Folder does not exist: ${folderPath}`);
  }
}