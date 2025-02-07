import { Chunk } from "../types"
import { Chunker } from "./Chunker"

export class SentenceChunker extends Chunker {
	private maxTokens: number

	constructor(maxTokens: number = 100) {
		super()
		this.maxTokens = maxTokens
	}

	chunk(content: string): Chunk[] {
		const sentences = content.split(/(?<=[.!?])\s+/) // Split by sentence-ending punctuation
		const chunks: Chunk[] = []
		let currentChunk = ""
		let chunkId = 0

		for (const sentence of sentences) {
			if ((currentChunk + sentence).split(/\s+/).length > this.maxTokens) {
				chunks.push({ id: `chunk-${chunkId++}`, text: currentChunk.trim() })
				currentChunk = ""
			}
			currentChunk += sentence + " "
		}

		if (currentChunk.trim()) {
			chunks.push({ id: `chunk-${chunkId}`, text: currentChunk.trim() })
		}

		return chunks
	}
}
