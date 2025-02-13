import { Embedding } from "../types.js"

export abstract class Embedder {
	abstract embed(texts: string[]): Promise<Embedding[]>
}
