import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { sanitizeDirPath } from "./sanitizeDirPath";
import { checkFileSize } from "./checkFileSize";
import { analyzeProject } from "./dir-structure";
import { processPath } from "./dir-content/processPath";

export async function processDirectory(dirPath: string): Promise<string> {
    // Get the system's temporary directory
    const tempDir = os.tmpdir();

    // Generate the output file path
    const sanitizedDirName = sanitizeDirPath(path.basename(dirPath));
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputFilePath = path.join(
        tempDir,
        `directory_service_${sanitizedDirName}-${timestamp}.txt`
    );

    // Create a writable stream to use as the writer
    const writableStream = fs.createWriteStream(outputFilePath, { flags: "w" });

    // Use the writer to write the output to the file
    const writer = (content: string) => writableStream.write(content);

    // Call the processPath function with options
    await processPath(dirPath, {
        extensions: vscode.workspace.getConfiguration("yutools").get("constants.fileExtensions") as string[],
        includeHidden: false,
        ignoreGitignore: true,
        ignorePatterns: vscode.workspace.getConfiguration("yutools").get("constants.excludedFolders") as string[],
        writer: writer,
        outputAsXml: false,
    });

    // Close the stream when done
    writableStream.end();

    // Wait for the 'finish' event to ensure the file is fully written
    await new Promise((resolve, reject) => {
        writableStream.on('finish', resolve);
        writableStream.on('error', reject);
    });

    // Check file size
    const contextWindowSize = 32 * 1024; // 32K
    const bufferSize = 4 * 1024; // 4K
    const isFileSizeValid = await checkFileSize(outputFilePath, contextWindowSize, bufferSize);

    if (!isFileSizeValid) {
        // File size is too large, rewrite the file with analyzeProject result
        const result = await analyzeProject(dirPath);

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

        // Write the result to the file
        fs.writeFileSync(outputFilePath, result, "utf-8");
    }

    // Return the output file path
    return outputFilePath;
}

// // Example usage
// const dirPath = "input folder"; // Replace with the actual directory path
// processDirectory(dirPath)
//     .then(outputFilePath => {
//         console.log(`Output file created at: ${outputFilePath}`);
//     })
//     .catch(error => {
//         console.error("Error processing directory:", error);
//     });
