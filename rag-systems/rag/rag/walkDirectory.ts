import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively walks a directory and returns a list of files with relative paths.
 * @param dir The directory to walk.
 * @param baseDir The base directory to calculate relative paths from.
 * @returns An array of file paths relative to the base directory.
 */
export function walkDirectory(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];

  // Read the contents of the directory
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      // If it's a directory, recursively walk it
      results = results.concat(walkDirectory(fullPath, baseDir));
    } else {
      // If it's a file, add its relative path to the results
      const relativePath = path.relative(baseDir, fullPath);
      results.push(relativePath);
    }
  }

  return results;
}
