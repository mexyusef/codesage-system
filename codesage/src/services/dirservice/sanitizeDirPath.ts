export function sanitizeDirPath(dirPath: string): string {
    return dirPath.replace(/[\\/:*?"<>|]/g, "_");
}
