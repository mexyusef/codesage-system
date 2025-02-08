import fs from "fs-extra";
import path from "path";

export interface Document {
  pageContent: string;
  metadata: { source: string };
}

export function walkDirectory(folderPath: string): string[] {
  const files: string[] = [];
  const walk = (dir: string): void => {
    const dirFiles = fs.readdirSync(dir);
    for (const file of dirFiles) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  };
  walk(folderPath);
  return files;
}

export async function readAndFilterFiles(
  files: string[],
  folderPath: string
): Promise<Document[]> {
  const filteredDocs = await Promise.all(
    files.map(async (file): Promise<Document | null> => {
      if (file.endsWith(".env") || file.endsWith(".json") || file.endsWith(".yaml")) {
        console.warn(`Skipping non-text file: ${file}`);
        return null;
      }
      try {
        const content = await fs.readFile(path.join(folderPath, file), "utf-8");
        if (!content.trim()) {
          console.warn(`Skipping empty file: ${file}`);
          return null;
        }
        return { pageContent: content, metadata: { source: file } };
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return null;
      }
    })
  );
  return filteredDocs.filter((doc): doc is Document => doc !== null);
}