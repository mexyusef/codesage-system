export interface Chunk {
	id: string
	text: string
}

export interface Embedding {
	id: string
	vector: number[]
}

export interface IndexedDocument {
	id: string
	vector: number[]
	metadata: Record<string, any>
}

export abstract class Chunker {
	abstract chunk(content: string): Chunk[]
}

export abstract class Embedder {
	abstract embed(texts: string[]): Promise<Embedding[]>
}

export abstract class VectorDatabase {
	abstract add(documents: IndexedDocument[]): Promise<void>
	abstract query(queryVector: number[], topK: number): Promise<IndexedDocument[]>
}
