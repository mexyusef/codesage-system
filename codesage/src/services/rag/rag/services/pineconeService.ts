// import { PineconeStore } from "@langchain/pinecone";
// import { Pinecone } from "@pinecone-database/pinecone";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Document } from "../utils/fileUtils.js";

// export async function initializePineconeStore(
//   docs: Document[],
//   embeddings: OpenAIEmbeddings
// ): Promise<PineconeStore> {
//   const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
//   const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

//   return await PineconeStore.fromDocuments(docs, embeddings, {
//     pineconeIndex: index,
//     namespace: process.env.PINECONE_NAMESPACE || "default",
//   });
// }

import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "../utils/fileUtils.js";
import { getRagSettings } from "../../ragSettings"; // Import the settings provider

export async function initializePineconeStore(
  docs: Document[],
  embeddings: OpenAIEmbeddings
): Promise<PineconeStore> {
  // Dynamically fetch settings using the settings provider
  const ragSettings = getRagSettings();

  // Use the dynamically fetched values from the settings
  const pineconeApiKey = ragSettings.PINECONE_API_KEY;
  const pineconeIndexName = ragSettings.PINECONE_INDEX_NAME;
  const pineconeNamespace = ragSettings.PINECONE_NAMESPACE || "default";

  if (!pineconeApiKey || !pineconeIndexName) {
    throw new Error("Missing required Pinecone settings: PINECONE_API_KEY or PINECONE_INDEX_NAME");
  }

  const pinecone = new Pinecone({ apiKey: pineconeApiKey });
  const index = pinecone.index(pineconeIndexName);

  return await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: pineconeNamespace,
  });
}