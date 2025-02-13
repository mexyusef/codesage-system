export interface RagSettings {
  OPENAI_API_KEY: string;
  EMBEDDING_MODEL_NAME: string;
  OPENAI_MAX_RETRIES: number;
  OPENAI_MAX_CONCURRENCY: number;
  OPENAI_TIMEOUT: number;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_NAME: string;
  PINECONE_NAMESPACE: string;
  RAG_FOLDER_PATH: string;
  CHUNK_MAX_TOKENS: number;
  QUERY_TOP_K: number;
  TEXT_SPLITTER_CHUNK_SIZE: number;
  TEXT_SPLITTER_CHUNK_OVERLAP: number;
}

export const defaultRagSettings: RagSettings = {
  OPENAI_API_KEY: "sk-",
  OPENAI_MAX_RETRIES: 3,
  OPENAI_MAX_CONCURRENCY: 5,
  OPENAI_TIMEOUT: 30000,
  EMBEDDING_MODEL_NAME: "text-embedding-3-small",
  PINECONE_API_KEY: "pcsk_...",
  PINECONE_INDEX_NAME: "singaparna",
  PINECONE_NAMESPACE: "default",
  RAG_FOLDER_PATH: "C:\\hapus\\upwork\\codesage\\src\\core\\webview",
  CHUNK_MAX_TOKENS: 100,
  QUERY_TOP_K: 5,
  TEXT_SPLITTER_CHUNK_SIZE: 1000,
  TEXT_SPLITTER_CHUNK_OVERLAP: 200,
};

// // Internal state for RAG settings
// export let currentRagSettings: RagSettings = { ...defaultRagSettings };
