import { Chunk } from "../types.js"

export abstract class Chunker {
	abstract chunk(content: string): Chunk[]
}
