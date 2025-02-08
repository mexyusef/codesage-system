import { ChatOpenAI } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs-extra"; // Use fs-extra for file operations
import path from "path";
import "dotenv/config";
import { walkDirectory } from "./walkDirectory.js";
import loadEnv from "./loadEnv.js";

loadEnv();

console.log(`----------------------------------`);
// console.log(JSON.stringify(process.env));
console.log(`----------------------------------`);

// Initialize components
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 20 });
const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable');
}
if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing PINECONE_INDEX_NAME environment variable');
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "sk-none",
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

async function queryRagSystem2(chain: any, query: string) {
  const results = await chain.invoke({
    question: query,
    context: "Retrieved context from the vector store",
  });
  return results;
}

async function queryRagSystem(chain: any, query: string) {
  if (!query?.trim()) {
    throw new Error('Query cannot be empty');
  }

  const results = await chain.invoke({
    query: query, // <-- Use "query" instead of "question" as the input key
    context: "Retrieved context from the vector store",
  });
  return results;
}

async function main() {
  try {
    // Load and split documents
    const folderPath = process.env.RAG_FOLDER_PATH || "./rag";

    // Validate folder path
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder does not exist: ${folderPath}`);
    }

    const files = walkDirectory(folderPath);
    if (files.length === 0) {
      throw new Error(`No files found in the folder: ${folderPath}`);
    }

    console.log(`Found ${files.length} files in the folder: ${folderPath}`);

    const rawDocs = (await Promise.all(
      files.map(async (file: string) => {
        const content = await fs.readFile(path.join(folderPath, file), "utf-8");
        
        if (!content.trim()) {
          console.warn(`Skipping empty file: ${file}`);
          return null;
        }
        
        return { 
          pageContent: content,
          metadata: { source: file }
        };
      })
    )).filter((doc): doc is NonNullable<typeof doc> => doc !== null);
    
    const docs = await textSplitter.splitDocuments(rawDocs);

    console.log(`Splitting ${rawDocs.length} documents into ${docs.length} chunks...`);

    // Index documents in Pinecone
    const pineconeStore = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });
    console.log(`Indexed ${docs.length} document chunks in Pinecone.`);

    // Define a prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", "You are an AI assistant that helps answer questions based on the provided context."],
      ["human", "{question}"],
      ["ai", "{context}"],
    ]);

    // Initialize the LLM
    const llm = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY });

    // Create a chain to combine retrieved documents
    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt: promptTemplate,
    });

    // Create the retrieval chain
    const retrievalChain = await createRetrievalChain({
      retriever: pineconeStore.asRetriever(),
      combineDocsChain,
    });

    // Query the RAG system
    const response = await queryRagSystem(
      retrievalChain,
      "What functions are defined in the rag/chunking folder?"
    );
    console.log(response);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);