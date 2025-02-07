import { Embedding } from "../types"

export abstract class Embedder {
	abstract embed(texts: string[]): Promise<Embedding[]>
}
