// import { OpenAIEmbeddings } from "@langchain/openai";

// export const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: process.env.OPENAI_API_KEY!,
//   modelName: process.env.EMBEDDING_MODEL_NAME || "text-embedding-3-small",
//   maxRetries: parseInt(process.env.OPENAI_MAX_RETRIES || "3", 10),
//   maxConcurrency: parseInt(process.env.OPENAI_MAX_CONCURRENCY || "5", 10),
//   timeout: parseInt(process.env.OPENAI_TIMEOUT || "30000", 10),
// });

import { OpenAIEmbeddings } from "@langchain/openai";
import { getRagSettings } from "../../ragSettings"; // Import the settings provider

// const ragSettings = getRagSettings();
// console.log(`*** openAIService *** initial embeddings values: ${JSON.stringify(ragSettings, null, 2)}`);
// export const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: ragSettings.OPENAI_API_KEY,
//   modelName: ragSettings.EMBEDDING_MODEL_NAME,
//   maxRetries: ragSettings.OPENAI_MAX_RETRIES,
//   maxConcurrency: ragSettings.OPENAI_MAX_CONCURRENCY,
//   timeout: ragSettings.OPENAI_TIMEOUT,
// });

export function getEmbeddings() {
  const ragSettings = getRagSettings();
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: ragSettings.OPENAI_API_KEY,
    modelName: ragSettings.EMBEDDING_MODEL_NAME,
    maxRetries: ragSettings.OPENAI_MAX_RETRIES,
    maxConcurrency: ragSettings.OPENAI_MAX_CONCURRENCY,
    timeout: ragSettings.OPENAI_TIMEOUT,
  });
  return embeddings;
}
