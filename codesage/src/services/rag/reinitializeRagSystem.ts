import { validateFolderPath } from "./rag/config/validateConfig";
import { createChain } from "./rag/services/chainService";
import { embeddings } from "./rag/services/openAIService";
import { initializePineconeStore } from "./rag/services/pineconeService";
import { readAndFilterFiles } from "./rag/utils/fileUtils";
import { splitDocuments } from "./rag/utils/textSplitter";
import { walkDirectory } from "./rag/walkDirectory";

export let retrievalChain: any;

export async function reinitializeRagSystem(folderPath: string): Promise<void> {
  try {
    console.log(`Reinitializing RAG system with folderPath = ${folderPath} => validateFolderPath`);
    validateFolderPath(folderPath);
    console.log(`[reinitializeRagSystem] #1 folderPath = ${folderPath} => walkDirectory`);
    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in: ${folderPath}`);
    }
    console.log(`[reinitializeRagSystem] #2 files.length = ${files.length} => readAndFilterFiles`);
    const rawDocs = await readAndFilterFiles(files, folderPath);
    console.log(`[reinitializeRagSystem] #3 rawDocs.length = ${rawDocs.length} => splitDocuments`);
    const docs = await splitDocuments(rawDocs);
    console.log(`[reinitializeRagSystem] #4 docs.length = ${docs.length} => initializePineconeStore`);
    const pineconeStore = await initializePineconeStore(
      docs,
      embeddings,
      // currentRagSettings.PINECONE_API_KEY,
      // currentRagSettings.PINECONE_INDEX_NAME,
      // currentRagSettings.PINECONE_NAMESPACE
    );
    console.log(`[reinitializeRagSystem] #5 pineconeStore => createChain`);
    retrievalChain = await createChain(pineconeStore);
    console.log("[reinitializeRagSystem] #6 RAG system reinitialized successfully.");
  } catch (error) {
    console.error("[reinitializeRagSystem] #7 Error reinitializing RAG system:", error);
  }
}

export async function initializeRagSystem(folderPath: string): Promise<void> {
  try {
    // loadEnv();
    validateFolderPath(folderPath);

    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in: ${folderPath}`);
    }

    const rawDocs = await readAndFilterFiles(files, folderPath);
    const docs = await splitDocuments(rawDocs);

    const pineconeStore = await initializePineconeStore(docs, embeddings);
    retrievalChain = await createChain(pineconeStore);

    console.log("RAG system initialized successfully.");
  } catch (error) {
    console.error("Error initializing RAG system:", error);
    throw error;
  }
}
