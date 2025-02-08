import { loadEnv } from "./config/envLoader.js";
import { validateFolderPath } from "./config/validateConfig.js";
import { walkDirectory, readAndFilterFiles } from "./utils/fileUtils.js";
import { splitDocuments } from "./utils/textSplitter.js";
import { initializePineconeStore } from "./services/pineconeService.js";
import { embeddings } from "./services/openAIService.js";
import { createChain } from "./services/chainService.js";
import { queryRagSystem } from "./utils/queryRagSystem.js";

export async function main(): Promise<void> {
  try {
    loadEnv();
    const folderPath = process.env.RAG_FOLDER_PATH || ".";
    validateFolderPath(folderPath);

    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in: ${folderPath}`);
    }

    const rawDocs = await readAndFilterFiles(files, folderPath);
    const docs = await splitDocuments(rawDocs);

    const pineconeStore = await initializePineconeStore(docs, embeddings);
    const retrievalChain = await createChain(pineconeStore);

    const testQuery = "What functions are defined in the rag/chunking folder?";
    const response = await queryRagSystem(retrievalChain, testQuery);
    console.log("Query Result:", response);
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

// import { main } from "./app";
main();