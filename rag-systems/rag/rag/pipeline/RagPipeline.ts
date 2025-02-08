import { Chunker } from "../chunking/Chunker.js"
import { Embedder } from "../embedding/Embedder.js"
import { VectorDatabase } from "../indexing/VectorDatabase.js"
import { QueryEngine } from "../querying/QueryEngine.js"
import { listFiles } from "./listFiles.js"

export class RagPipeline {
	private chunker: Chunker
	private embedder: Embedder
	private vectorDatabase: VectorDatabase
	private queryEngine: QueryEngine

	constructor(chunker: Chunker, embedder: Embedder, vectorDatabase: VectorDatabase) {
		this.chunker = chunker
		this.embedder = embedder
		this.vectorDatabase = vectorDatabase
		this.queryEngine = new QueryEngine(embedder, vectorDatabase)
	}

	async index(folderPath: string): Promise<void> {
		// Read files, chunk, embed, and index
		const files = await listFiles(folderPath)
		const chunks = files.flatMap((file: { content: string }) => this.chunker.chunk(file.content))
		const embeddings = await this.embedder.embed(chunks.map((chunk: { text: string }) => chunk.text))
		const documents = chunks.map((chunk: { id: string; text: string }, idx: number) => ({
			id: chunk.id,
			vector: embeddings[idx].vector,
			metadata: { text: chunk.text },
		}))
		await this.vectorDatabase.add(documents)
	}

	async query(prompt: string): Promise<string> {
		const results = await this.queryEngine.query(prompt)
		const context = results.map((doc) => doc.metadata.text).join("\n")
		return `${prompt}\n\nContext:\n${context}`
	}
}
