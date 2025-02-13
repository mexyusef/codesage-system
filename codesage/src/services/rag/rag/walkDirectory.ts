import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively walks a directory and returns a list of files with relative paths.
 * @param dir The directory to walk.
 * @param baseDir The base directory to calculate relative paths from.
 * @returns An array of file paths relative to the base directory.
 */
export function walkDirectory(folderPath: string): string[] {
  const files: string[] = [];
  // Resolve folderPath to an absolute path
  const resolvedFolderPath = path.resolve(folderPath);

  const walk = (dir: string): void => {
    const dirFiles = fs.readdirSync(dir);
    for (const file of dirFiles) {
      const fullPath = path.resolve(dir, file); // Resolve to absolute path
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  };

  walk(resolvedFolderPath); // Start with resolved folder path
  return files;
}