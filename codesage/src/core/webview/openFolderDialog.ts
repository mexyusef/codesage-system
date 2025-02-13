import * as vscode from "vscode";

// Refactored function to open a folder dialog and return the selected folder path
export async function openFolderDialog(): Promise<string | undefined> {
  const options: vscode.OpenDialogOptions = {
    canSelectFiles: false, // Only allow folder selection
    canSelectFolders: true,
    canSelectMany: false, // Only allow selecting one folder at a time
    title: "Select Folder for RAG Processing",
    openLabel: "Select Folder", // Label for the confirmation button
  };

  const result = await vscode.window.showOpenDialog(options);
  if (result && result.length > 0) {
    return result[0].fsPath; // Return the file system path of the selected folder
  }
  return undefined; // Return undefined if no folder was selected
}