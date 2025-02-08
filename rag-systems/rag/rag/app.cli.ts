import { loadEnv } from "./config/envLoader.js";
import { validateFolderPath } from "./config/validateConfig.js";
import { walkDirectory, readAndFilterFiles } from "./utils/fileUtils.js";
import { splitDocuments } from "./utils/textSplitter.js";
import { initializePineconeStore } from "./services/pineconeService.js";
import { embeddings } from "./services/openAIService.js";
import { createChain } from "./services/chainService.js";
import { queryRagSystem } from "./utils/queryRagSystem.js";
import readline from "readline";
import path from "path";

export async function main(): Promise<void> {
  try {
    // Load environment variables
    loadEnv();

    // Create a readline interface for user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Prompt the user for the folder path
    const defaultFolderPath = process.env.RAG_FOLDER_PATH || path.resolve(".");
    const folderPathPrompt = `Enter the folder path for RAG processing (default: ${defaultFolderPath}): `;
    const folderPath = await new Promise<string>((resolve) => {
      rl.question(folderPathPrompt, (input: string) => {
        resolve(input.trim() || defaultFolderPath);
      });
    });

    // Validate the folder path
    validateFolderPath(folderPath);

    // Process files and prepare documents
    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in: ${folderPath}`);
    }
    const rawDocs = await readAndFilterFiles(files, folderPath);
    const docs = await splitDocuments(rawDocs);

    // Initialize Pinecone store and retrieval chain
    const pineconeStore = await initializePineconeStore(docs, embeddings);
    const retrievalChain = await createChain(pineconeStore);

    console.log("Welcome to the RAG System REPL!");
    console.log("Type 'exit' to quit.");

    const askQuestion = (): void => {
      rl.question("Enter your query: ", async (query: string) => {
        if (query.trim().toLowerCase() === "exit") {
          console.log("Exiting...");
          rl.close();
          return;
        }

        try {
          const response = await queryRagSystem(retrievalChain, query);
          console.log("Query Result:", response);
        } catch (error) {
          console.error("Error processing query:", error);
        }

        askQuestion();
      });
    };

    askQuestion();

  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

main();