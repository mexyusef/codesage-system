import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "../utils/fileUtils.js";

export async function initializePineconeStore(
  docs: Document[],
  embeddings: OpenAIEmbeddings
): Promise<PineconeStore> {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

  return await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: "default",
  });
}