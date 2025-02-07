// import * as fs from 'fs';
// import * as path from 'path';

// export async function listFiles(folderPath: string): Promise<{ content: string }[]> {
// 	// Read files from the folder synchronously
// 	const files = fs.readdirSync(folderPath);

// 	// Map each file to its content
// 	return files.map((file: string) => ({
// 		content: fs.readFileSync(path.join(folderPath, file), "utf-8"),
// 	}));
// }
import * as fs from 'fs';
import * as path from 'path';

export async function listFiles(folderPath: string): Promise<{ content: string }[]> {
	// Read all entries in the folder
	const entries = fs.readdirSync(folderPath);

	// Filter out directories and only process files
	return entries
		.filter((entry: string) => {
			const fullPath = path.join(folderPath, entry);
			const stats = fs.statSync(fullPath); // Get file/directory stats
			return stats.isFile(); // Only include files
		})
		.map((file: string) => ({
			content: fs.readFileSync(path.join(folderPath, file), "utf-8"),
		}));
}
// import * as fs from 'fs/promises';
// import * as path from 'path';

// export async function listFiles(folderPath: string): Promise<{ content: string }[]> {
// 	const entries = await fs.readdir(folderPath);

// 	const fileContents = await Promise.all(
// 		entries.map(async (entry: string) => {
// 			const fullPath = path.join(folderPath, entry);
// 			const stats = await fs.stat(fullPath);
// 			if (stats.isFile()) {
// 				return { content: await fs.readFile(fullPath, "utf-8") };
// 			}
// 			return null; // Skip directories
// 		})
// 	);

// 	// Filter out null values (directories)
// 	return fileContents.filter(Boolean);
// }

// export async function listFiles(folderPath: string): Promise<{ content: string }[]> {
// 	// Implement logic to read files from the folder and return their content
// 	// Example: Use Node.js `fs` module to read files
// 	const fs = require("fs")
// 	const path = require("path")

// 	const files = fs.readdirSync(folderPath)
// 	return files.map((file: string) => ({
// 		content: fs.readFileSync(path.join(folderPath, file), "utf-8"),
// 	}))
// }
