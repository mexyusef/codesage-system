import { queryRagSystem } from "./rag/utils/queryRagSystem";
import { reinitializeRagSystem, retrievalChain } from "./reinitializeRagSystem";

export async function handleRagRequest(query: string): Promise<any> {
  try {
    if (!retrievalChain) {
      throw new Error("RAG system not initialized. Call reinitializeRagSystem first.");
    }

    if (!query?.trim()) {
      throw new Error("Query cannot be empty");
    }

    console.log("Executing RAG query:", query);
    const response = await queryRagSystem(retrievalChain, query);

    return response;
  } catch (error) {
    console.error("Error processing RAG request:", error);
    throw error;
  }
}

export async function handleRagRequestWithInitialize(folderPath: string, query: string): Promise<any> {
  try {
    if (!query?.trim()) {
      throw new Error("Query cannot be empty");
    }

    if (!retrievalChain) {
      console.log(`[handleRagRequestWithInitialize] retrievalChain not initialized...initializing...`);
      await reinitializeRagSystem(folderPath);
    }

    console.log("Executing RAG query:", query);
    const response = await queryRagSystem(retrievalChain, query);

    return response;
  } catch (error) {
    console.error("Error processing RAG request:", error);
    throw error;
  }
}