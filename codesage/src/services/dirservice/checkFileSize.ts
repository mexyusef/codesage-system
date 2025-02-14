import * as fs from 'fs';
import * as path from 'path';
import { window } from 'vscode'; // Import VS Code API for dialogs

// type Writer = (content: string) => void;
// interface ProcessPathOptions {
//   extensions?: string[];
//   includeHidden?: boolean;
//   ignoreGitignore?: boolean;
//   ignorePatterns?: string[];
//   writer?: Writer;
//   outputAsXml?: boolean;
//   contextWindowSize?: number; // New option for context window size
//   bufferSize?: number; // New option for buffer size
// }

const DEFAULT_CONTEXT_WINDOW_SIZE = 32 * 1024; // 32K
const DEFAULT_BUFFER_SIZE = 4 * 1024; // 4K

// const shouldContinue = await checkFileSize(inputPath, contextWindowSize, bufferSize);
// if (!shouldContinue) {
//   return; // User chose to use analyzeProject instead
// }
export async function checkFileSize(filePath: string, contextWindowSize=DEFAULT_CONTEXT_WINDOW_SIZE, bufferSize=DEFAULT_BUFFER_SIZE): Promise<boolean> {
  try {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    if (fileSize > contextWindowSize - bufferSize) {
      // File is too large, suggest using analyzeProject
      const choice = await window.showWarningMessage(
        `The file "${path.basename(filePath)}" is too large (${fileSize} bytes). Do you want to analyze the project structure instead?`,
        'Yes', 'No'
      );

      if (choice === 'Yes') {
        return false; // Use analyzeProject
      }
    }

    return true; // Continue with processPath
  } catch (error) {
    console.error(`Error checking file size: ${filePath}`, error);
    return true; // Default to processPath if there's an error
  }
}
