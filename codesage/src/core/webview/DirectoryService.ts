import * as fs from "fs/promises"
import * as path from "path"
import { processDirectory } from "../../services/dirservice/processDirectory"

export class DirectoryService {
	async processDirectory(directoryPath: string): Promise<string> {
		try {
			// 1. Process the directory using your library
			const tempFilePath = await processDirectory(directoryPath)

			// 2. Read the content of the generated file
			const fileContent = await fs.readFile(tempFilePath, "utf-8")

			// // 3. Clean up the temporary file (optional)
			// await fs.unlink(tempFilePath)

			return fileContent
		} catch (error) {
			console.error("Error processing directory:", error)
			return `Error processing directory: ${error.message}`
		}
	}

	// private async processDirectoryWithLibrary(directoryPath: string): Promise<string> {
	// 	// Replace this with your actual directory processing logic
	// 	// This is just a placeholder
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(`Processed directory: ${directoryPath}`)
	// 		}, 1000)
	// 	})
	// }
}