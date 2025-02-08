import { loadEnv } from "./config/envLoader.js";
import { validateFolderPath } from "./config/validateConfig.js";
import { walkDirectory, readAndFilterFiles } from "./utils/fileUtils.js";
import { splitDocuments } from "./utils/textSplitter.js";
import { initializePineconeStore } from "./services/pineconeService.js";
import { embeddings } from "./services/openAIService.js";
import { createChain } from "./services/chainService.js";
import { queryRagSystem } from "./utils/queryRagSystem.js";
import readline from "readline";

export async function main(): Promise<void> {
  try {
    // Load environment variables and validate folder path
    loadEnv();
    const folderPath = process.env.RAG_FOLDER_PATH || ".";
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

    // Create a readline interface for user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Welcome to the RAG System REPL!");
    console.log("Type 'exit' to quit.");

    // Start the REPL loop
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

        // Ask the next question
        askQuestion();
      });
    };

    // Start the first question
    askQuestion();
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

// Run the application
main();