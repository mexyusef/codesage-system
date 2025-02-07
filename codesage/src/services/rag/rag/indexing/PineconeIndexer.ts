import { IndexedDocument } from "../types"
import { VectorDatabase } from "./VectorDatabase"
import { Pinecone } from "@pinecone-database/pinecone"

export class PineconeIndexer extends VectorDatabase {
	private pinecone: any
	private indexName: string

	constructor(apiKey: string, indexName: string) {
		super()
		this.pinecone = new Pinecone({ apiKey })
		this.indexName = indexName
	}

	async add(documents: IndexedDocument[]): Promise<void> {
		const index = this.pinecone.index(this.indexName)
		await index.upsert(documents)
	}

	async query(queryVector: number[], topK: number): Promise<IndexedDocument[]> {
		const index = this.pinecone.index(this.indexName)
		const results = await index.query({
			vector: queryVector,
			topK,
			includeMetadata: true,
		})

		return results.matches.map((match: any) => ({
			id: match.id,
			vector: match.values,
			metadata: match.metadata,
		}))
	}
}
