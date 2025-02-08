import { ChatOpenAI } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PineconeStore } from "@langchain/pinecone";

export async function createChain(pineconeStore: PineconeStore): Promise<any> {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are an AI assistant that helps answer questions based on the provided context."],
    ["human", "{input}"],
    ["ai", "{context}"],
  ]);

  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY!,
  });

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: promptTemplate,
  });

  return await createRetrievalChain({
    retriever: pineconeStore.asRetriever({ k: 5, searchType: "similarity" }),
    combineDocsChain,
  });
}