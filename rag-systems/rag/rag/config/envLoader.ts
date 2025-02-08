import "dotenv/config";

export function loadEnv(): void {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("Missing PINECONE_API_KEY environment variable");
  }
  if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error("Missing PINECONE_INDEX_NAME environment variable");
  }
}