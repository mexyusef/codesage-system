import { Embedder } from "../embedding/Embedder.js"
import { VectorDatabase } from "../indexing/VectorDatabase.js"
import { IndexedDocument } from "../types.js"

export class QueryEngine {
	private embedder: Embedder
	private vectorDatabase: VectorDatabase

	constructor(embedder: Embedder, vectorDatabase: VectorDatabase) {
		this.embedder = embedder
		this.vectorDatabase = vectorDatabase
	}

	async query(query: string, topK: number = 5): Promise<IndexedDocument[]> {
		const [embedding] = await this.embedder.embed([query])
		return this.vectorDatabase.query(embedding.vector, topK)
	}
}
