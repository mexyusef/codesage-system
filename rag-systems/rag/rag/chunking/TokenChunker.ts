import { Chunk } from "../types"
import { Chunker } from "./Chunker"

export class TokenChunker extends Chunker {
	private maxTokens: number

	constructor(maxTokens: number = 100) {
		super()
		this.maxTokens = maxTokens
	}

	chunk(content: string): Chunk[] {
		const words = content.split(/\s+/)
		const chunks: Chunk[] = []
		let currentChunk = ""
		let chunkId = 0

		for (const word of words) {
			if ((currentChunk + word).length > this.maxTokens) {
				chunks.push({ id: `chunk-${chunkId++}`, text: currentChunk.trim() })
				currentChunk = ""
			}
			currentChunk += word + " "
		}

		if (currentChunk.trim()) {
			chunks.push({ id: `chunk-${chunkId}`, text: currentChunk.trim() })
		}

		return chunks
	}
}
