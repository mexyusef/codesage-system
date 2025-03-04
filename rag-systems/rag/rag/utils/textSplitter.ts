import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "./fileUtils.js";

// Helper function to transform generic Document<Record<string, any>> to our custom Document type
function transformDocument(doc: any): Document {
  return {
    pageContent: doc.pageContent,
    metadata: { source: doc.metadata.source || "unknown" }, // Ensure 'source' exists
  };
}

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: parseInt(process.env.TEXT_SPLITTER_CHUNK_SIZE || "1000", 10),
  chunkOverlap: parseInt(process.env.TEXT_SPLITTER_CHUNK_OVERLAP || "200", 10),
  separators: ["\n\n", "\n", " ", ""],
});

export async function splitDocuments(docs: Document[]): Promise<Document[]> {
  const splitDocs = await textSplitter.splitDocuments(docs);
  return splitDocs
    .map(transformDocument) // Transform each document to match the custom type
    .filter((doc) => doc.pageContent?.trim()); // Filter out empty documents
}