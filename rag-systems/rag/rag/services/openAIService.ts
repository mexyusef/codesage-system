import { OpenAIEmbeddings } from "@langchain/openai";

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  modelName: process.env.EMBEDDING_MODEL_NAME || "text-embedding-3-small",
  maxRetries: parseInt(process.env.OPENAI_MAX_RETRIES || "3", 10),
  maxConcurrency: parseInt(process.env.OPENAI_MAX_CONCURRENCY || "5", 10),
  timeout: parseInt(process.env.OPENAI_TIMEOUT || "30000", 10),
});