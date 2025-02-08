# Description

Simple RAG system for CodeSage.

Current Status: error for pinecone.

# How to use

First create a file called .env to store important values such as api keys for OpenAI and Pinecone.
Then run `npm run rag` from where the `package.json` file exists.

## Create .env file

Rename `env.sample` to `.env` and then provide corresponding values.

```bash
PINECONE_API_KEY=
PINECONE_INDEX_NAME=
PINECONE_NAMESPACE=

OPENAI_API_KEY=
OPENAI_MAX_RETRIES=3
OPENAI_MAX_CONCURRENCY=5
OPENAI_TIMEOUT=30000

EMBEDDING_MODEL_NAME=text-embedding-3-small

WEAVIATE_API_KEY=
RAG_FOLDER_PATH=C:\hapus\upwork\rag-systems\rag\rag\pipeline

CHUNK_MAX_TOKENS=100

QUERY_TOP_K=5

TEXT_SPLITTER_CHUNK_SIZE=1000
TEXT_SPLITTER_CHUNK_OVERLAP=200

```

## Run on terminal
`npm run rag`

# Documentation

## Langchain

https://js.langchain.com/docs/integrations/retrievers/self_query/pinecone/
https://js.langchain.com/docs/integrations/text_embedding/openai/

## Pinecone

https://app.pinecone.io/
https://docs.pinecone.io/guides/get-started/overview

await pinecone.createIndex({
  name: process.env.PINECONE_INDEX_NAME,
  dimension: 1536, // Match your embedding dimension
  metric: 'cosine'
});

## Weaviate

### v2
https://weaviate.io/developers/weaviate/client-libraries/typescript/typescript-v2

### v3
https://weaviate.io/developers/weaviate/client-libraries/typescript/typescript-v3
