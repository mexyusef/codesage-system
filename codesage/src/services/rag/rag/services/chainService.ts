import { ChatOpenAI } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PineconeStore } from "@langchain/pinecone";
import { getRagSettings } from "../../ragSettings"; // Import the settings provider

export async function createChain(pineconeStore: PineconeStore): Promise<any> {
  const ragSettings = getRagSettings();

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are an AI assistant that helps answer questions based on the provided context."],
    ["human", "{input}"],
    ["ai", "{context}"],
  ]);

  // console.log(`chainService: OPENAI_API_KEY start`);
  const openaiApiKey = ragSettings.OPENAI_API_KEY;
  // console.log(`chainService: OPENAI_API_KEY: ${openaiApiKey}`);

  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: openaiApiKey,
  });

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: promptTemplate,
  });

  // Use the dynamically fetched QUERY_TOP_K value
  return await createRetrievalChain({
    retriever: pineconeStore.asRetriever({
      k: ragSettings.QUERY_TOP_K,
      searchType: "similarity",
    }),
    combineDocsChain,
  });
}