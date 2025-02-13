import { getRagSettings } from "../../ragSettings.js";
import { Chunk } from "../types.js"
import { Chunker } from "./Chunker.js"

export class SentenceChunker extends Chunker {
	private maxTokens: number

	constructor(maxTokens?: number) {
		super()
		const ragSettings = getRagSettings();
		this.maxTokens = maxTokens ?? ragSettings.CHUNK_MAX_TOKENS;
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
