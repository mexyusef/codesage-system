import { Chunk } from "../types"

export abstract class Chunker {
	abstract chunk(content: string): Chunk[]
}
