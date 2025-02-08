# Description

Simple RAG system for CodeSage.

Current Status: error for pinecone.

# How to use

## Create .env file
```bash
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX_NAME=...
OPENAI_API_KEY=sk-...
WEAVIATE_API_KEY=
RAG_FOLDER_PATH=
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