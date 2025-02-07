export async function listFiles(folderPath: string): Promise<{ content: string }[]> {
	// Implement logic to read files from the folder and return their content
	// Example: Use Node.js `fs` module to read files
	const fs = require("fs")
	const path = require("path")

	const files = fs.readdirSync(folderPath)
	return files.map((file: string) => ({
		content: fs.readFileSync(path.join(folderPath, file), "utf-8"),
	}))
}
