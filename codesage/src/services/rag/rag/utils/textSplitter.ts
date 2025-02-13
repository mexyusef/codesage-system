import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "./fileUtils.js";
import { getRagSettings } from "../../ragSettings.js";

// Helper function to transform generic Document<Record<string, any>> to our custom Document type
function transformDocument(doc: any): Document {
  return {
    pageContent: doc.pageContent,
    metadata: { source: doc.metadata.source || "unknown" }, // Ensure 'source' exists
  };
}

const ragSettings = getRagSettings();
console.log(`*** textSplitter *** initial embeddings values: ${JSON.stringify(ragSettings, null, 2)}`);

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: ragSettings.TEXT_SPLITTER_CHUNK_SIZE,
  chunkOverlap: ragSettings.TEXT_SPLITTER_CHUNK_OVERLAP,
  separators: ["\n\n", "\n", " ", ""],
});

export async function splitDocuments(docs: Document[]): Promise<Document[]> {
  // Retrieve the latest RAG settings dynamically
  const ragSettings = getRagSettings();
  const chunkSize = parseInt(ragSettings.TEXT_SPLITTER_CHUNK_SIZE as unknown as string, 10);
  const chunkOverlap = parseInt(ragSettings.TEXT_SPLITTER_CHUNK_OVERLAP as unknown as string, 10);
  // Dynamically update the text splitter configuration if needed
  const dynamicTextSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: ragSettings.TEXT_SPLITTER_CHUNK_SIZE,
    chunkOverlap: ragSettings.TEXT_SPLITTER_CHUNK_OVERLAP,
    separators: ["\n\n", "\n", " ", ""],
  });

  const splitDocs = await dynamicTextSplitter.splitDocuments(docs);
  return splitDocs
    .map(transformDocument) // Transform each document to match the custom type
    .filter((doc) => doc.pageContent?.trim()); // Filter out empty documents
}