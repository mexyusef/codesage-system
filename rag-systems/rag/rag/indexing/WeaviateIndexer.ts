import weaviate from "weaviate-ts-client"
import { VectorDatabase } from "./VectorDatabase"
import { IndexedDocument } from "../types"

export class WeaviateIndexer extends VectorDatabase {
	private client: any
	private className: string

	constructor(apiKey: string, endpoint: string, className: string) {
		super()
		this.client = weaviate.client({
			scheme: "https",
			host: endpoint,
			apiKey: new weaviate.ApiKey(apiKey),
		})
		this.className = className
	}

	async add(documents: IndexedDocument[]): Promise<void> {
		const batcher = this.client.batch.objectsBatcher()

		documents.forEach((doc) => {
			batcher.withObject({
				class: this.className,
				id: doc.id,
				vector: doc.vector,
				properties: doc.metadata,
			})
		})

		await batcher.do()
	}

	async query(queryVector: number[], topK: number): Promise<IndexedDocument[]> {
		const result = await this.client.graphql
			.get()
			.withClassName(this.className)
			.withFields("id vector ... on Document { metadata }")
			.withNearVector({ vector: queryVector })
			.withLimit(topK)
			.do()

		return result.data.Get[this.className].map((item: any) => ({
			id: item.id,
			vector: item.vector,
			metadata: item.metadata,
		}))
	}
}
