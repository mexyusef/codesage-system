import { IndexedDocument } from "../types.js"

export abstract class VectorDatabase {
	abstract add(documents: IndexedDocument[]): Promise<void>
	abstract query(queryVector: number[], topK: number): Promise<IndexedDocument[]>
}
