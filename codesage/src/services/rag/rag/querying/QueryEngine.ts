// import { Embedder } from "../embedding/Embedder.js"
// import { VectorDatabase } from "../indexing/VectorDatabase.js"
// // import { IndexedDocument } from "../types.js"

// export class QueryEngine {
// 	private embedder: Embedder;
// 	private vectorDatabase: VectorDatabase;

// 	constructor(embedder: Embedder, vectorDatabase: VectorDatabase) {
// 		this.embedder = embedder;
// 		this.vectorDatabase = vectorDatabase;
// 	}

// 	async query(query: string, topK: number = parseInt(process.env.QUERY_TOP_K || "5", 10)): Promise<any> {
// 		const [embedding] = await this.embedder.embed([query]);
// 		return this.vectorDatabase.query(embedding.vector, topK);
// 	}
// }
import { Embedder } from "../embedding/Embedder.js";
import { VectorDatabase } from "../indexing/VectorDatabase.js";
import { getRagSettings } from "../../ragSettings.js"; // Import the settings provider

export class QueryEngine {
	private embedder: Embedder;
	private vectorDatabase: VectorDatabase;

	constructor(embedder: Embedder, vectorDatabase: VectorDatabase) {
		this.embedder = embedder;
		this.vectorDatabase = vectorDatabase;
	}

	/**
	 * Executes a query against the vector database.
	 * @param query The query string to process.
	 * @returns A promise resolving to the query results.
	 */
	async query(query: string): Promise<any> {
		// Dynamically fetch the topK value from the RAG settings
		const ragSettings = getRagSettings();
		const topK = ragSettings.QUERY_TOP_K;

		// Generate embeddings for the query
		const [embedding] = await this.embedder.embed([query]);

		// Query the vector database with the embedding and topK
		return this.vectorDatabase.query(embedding.vector, topK);
	}
}