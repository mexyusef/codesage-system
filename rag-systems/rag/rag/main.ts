import { ChatOpenAI } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs-extra";
import path from "path";
import "dotenv/config";
import { walkDirectory } from "./walkDirectory.js";
import loadEnv from "./loadEnv.js";

loadEnv();

// ********** INITIALIZATION **********
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
  separators: ["\n\n", "\n", " ", ""],
});

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "text-embedding-3-small",
  maxRetries: 3,
  maxConcurrency: 5,
  timeout: 30000 // 30 seconds
});

// Validate Pinecone configuration
if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable');
}
if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing PINECONE_INDEX_NAME environment variable');
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

// ********** QUERY FUNCTION WITH DEBUGGING **********
async function queryRagSystem(chain: any, query: string) {
  if (!query?.trim()) {
    throw new Error('Query cannot be empty');
  }

  // Debug query input
  console.log("=== DEBUG: Query Input ===");
  console.log("Query text:", query);
  console.log("Query length:", query.length);
  console.log("Query type:", typeof query);

  const results = await chain.invoke({
    input: query, // The retrieval chain expects "input" key
    // query: query,
    // context: "Retrieved context from the vector store",
  });
  return results;
}

async function main() {
  try {
    const folderPath = process.env.RAG_FOLDER_PATH || "./rag";

    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder does not exist: ${folderPath}`);
    }

    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in: ${folderPath}`);
    }

    console.log(`Found ${files.length} files in: ${folderPath}`);

    // ********** DOCUMENT PROCESSING WITH DEBUGGING **********
    const rawDocs = (await Promise.all(
      files.map(async (file: string) => {

        // Skip .env files and other non-text files
        if (file.endsWith('.env') || file.endsWith('.json') || file.endsWith('.yaml')) {
          console.warn(`Skipping non-text file: ${file}`);
          return null;
        }

        try {
          const content = await fs.readFile(path.join(folderPath, file), "utf-8");
          if (!content.trim()) {
            console.warn(`Skipping empty file: ${file}`);
            return null;
          }
          return {
            pageContent: content,
            metadata: { source: file }
          };
        } catch (error) {
          console.error(`Error reading ${file}:`, error);
          return null;
        }
      })
    )).filter((doc): doc is NonNullable<typeof doc> => doc !== null);

    // Debug raw documents
    console.log("=== DEBUG: Raw Documents ===");
    console.log("Total raw documents:", rawDocs.length);
    console.log("First document sample:", {
      content: rawDocs[0]?.pageContent?.slice(0, 100),
      metadata: rawDocs[0]?.metadata
    });

    // ********** DOCUMENT SPLITTING WITH VALIDATION **********
    const docs = (await textSplitter.splitDocuments(rawDocs))
      .filter(doc => {
        if (!doc.pageContent?.trim()) {
          console.warn("Found empty document chunk:", doc.metadata);
          return false;
        }
        return true;
      });

    if (docs.length === 0) {
      throw new Error("No valid document chunks remaining after processing");
    }

    // Debug split documents
    console.log("=== DEBUG: Split Documents ===");
    console.log("Total document chunks:", docs.length);
    console.log("First chunk sample:", {
      content: docs[0]?.pageContent?.slice(0, 100),
      metadata: docs[0]?.metadata
    });

    // ********** PINECONE INDEXING WITH DEBUGGING **********
    let pineconeStore: PineconeStore;
    try {
      pineconeStore = await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: "default"
      });
      console.log("=== DEBUG: Pinecone Indexing ===");
      console.log("Successfully indexed documents");
    } catch (error) {
      console.error("Pinecone indexing failed:", error);
      throw new Error("Failed to index documents");
    }

    // ********** CHAIN CONSTRUCTION WITH DEBUGGING **********
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", "You are an AI assistant that helps answer questions based on the provided context."],
      // ["human", "{query}"],
      ["human", "{input}"], // Use "{input}" instead of "{query}"
      ["ai", "{context}"],
    ]);

    const llm = new ChatOpenAI({
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt: promptTemplate,
    });

    const retrievalChain = await createRetrievalChain({
      retriever: pineconeStore.asRetriever({
        k: 5,
        searchType: "similarity",
      }),
      combineDocsChain,

      // inputKey: 'query', // Explicitly map the input key
      // outputKey: 'answer', // Explicitly map the output key

    });

    // ********** QUERY EXECUTION WITH DEBUGGING **********
    try {
      const testQuery = "What functions are defined in the rag/chunking folder?";
      console.log("=== DEBUG: Query Execution ===");
      console.log("Executing query:", testQuery);

      const response = await queryRagSystem(
        retrievalChain,
        testQuery
      );

      console.log("Query Result:", response);
    } catch (error) {
      console.error("=== DEBUG: Query Failure ===");
      console.error("Query failed:", error);
      throw error;
    }
  } catch (error) {
    console.error("=== DEBUG: Application Error ===");
    console.error("Application error:", error);
    process.exit(1);
  }
}

main();
