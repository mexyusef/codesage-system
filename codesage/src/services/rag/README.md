rag,d
chunking,d
Chunker.ts,f(t=)
TokenChunker.ts,f(t=)
SentenceChunker.ts,f(t=)
embedding,d
Embedder.ts,f(t=)
OpenAIEmbedder.ts,f(t=)
HuggingFaceEmbedder.ts,f(t=)
indexing,d
VectorDatabase.ts,f(t=)
PineconeIndexer.ts,f(t=)
WeaviateIndexer.ts,f(t=)
querying,d
QueryEngine.ts,f(t=)
pipeline,d
RagPipeline.ts,f(t=)
types.ts,f(t=)
index.ts,f(t=)

tests,d
chunking.test.ts
embedding.test.ts
indexing.test.ts
pipeline.test.ts
README.md
package.json
tsconfig.json

ukseiya
https://chat.qwenlm.ai/c/3e670308-12e1-43d6-bdea-7b2ec167b0a1
https://chat.qwenlm.ai/c/e074718b-7b3c-4360-ad3e-f2ddbae17beb

export PINECONE_API_KEY=your-pinecone-api-key
export WEAVIATE_API_KEY=your-weaviate-api-key

npm install @pinecone-database/pinecone weaviate-ts-client

npm install @pinecone-database/pinecone

```ts
import { Pinecone } from "@pinecone-database/pinecone"

const pinecone = new Pinecone({
	apiKey: "your-pinecone-api-key",
})

async function createIndex() {
	const index = await pinecone.createIndex({
		name: "my-index",
		dimension: 1536, // Dimension of your embeddings (e.g., OpenAI's text-embedding-ada-002 has 1536 dimensions)
	})
	console.log("Index created:", index)
}

createIndex()
```

npm install weaviate-ts-client

```ts
import weaviate from "weaviate-ts-client"

const client = weaviate.client({
	scheme: "https",
	host: "your-weaviate-endpoint", // e.g., "xyz.weaviate.cloud"
	apiKey: new weaviate.ApiKey("your-weaviate-api-key"),
})

async function createSchema() {
	const schema = {
		class: "YourClassName",
		vectorizer: "text2vec-openai", // Use OpenAI or another vectorizer
		properties: [
			{
				name: "content",
				dataType: ["text"],
			},
		],
	}

	await client.schema.classCreator().withClass(schema).do()
	console.log("Schema created")
}

createSchema()
```

https://docs.pinecone.io/guides/get-started/overview
https://weaviate.io/developers/weaviate/client-libraries/typescript?spm=5aebb161.75a4421f.0.0.33ba51710hqJZG

```ts
try {
	const index = await pinecone.createIndex({
		/* config */
	})
	console.log("Index created:", index)
} catch (error) {
	console.error("Error creating index:", error)
}
```
