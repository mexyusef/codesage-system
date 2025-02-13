// import { Chunk } from "../types.js"
// import { Chunker } from "./Chunker.js"

// export class TokenChunker extends Chunker {
// 	private maxTokens: number

// 	constructor(maxTokens: number = parseInt(process.env.CHUNK_MAX_TOKENS || "100", 10)) {
// 		super()
// 		this.maxTokens = maxTokens
// 	}

// 	chunk(content: string): Chunk[] {
// 		const words = content.split(/\s+/)
// 		const chunks: Chunk[] = []
// 		let currentChunk = ""
// 		let chunkId = 0

// 		for (const word of words) {
// 			if ((currentChunk + word).length > this.maxTokens) {
// 				chunks.push({ id: `chunk-${chunkId++}`, text: currentChunk.trim() })
// 				currentChunk = ""
// 			}
// 			currentChunk += word + " "
// 		}

// 		if (currentChunk.trim()) {
// 			chunks.push({ id: `chunk-${chunkId}`, text: currentChunk.trim() })
// 		}

// 		return chunks
// 	}
// }
import { Chunk } from "../types.js";
import { Chunker } from "./Chunker.js";
import { getRagSettings } from "../../ragSettings.js"; // Import the settings provider

export class TokenChunker extends Chunker {
	private maxTokens: number;

	constructor(maxTokens?: number) {
		super();
		// Dynamically fetch the maxTokens value from the RAG settings
		const ragSettings = getRagSettings();
		this.maxTokens = maxTokens ?? ragSettings.CHUNK_MAX_TOKENS;
	}

	chunk(content: string): Chunk[] {
		const words = content.split(/\s+/);
		const chunks: Chunk[] = [];
		let currentChunk = "";
		let chunkId = 0;

		for (const word of words) {
			if ((currentChunk + word).length > this.maxTokens) {
				chunks.push({ id: `chunk-${chunkId++}`, text: currentChunk.trim() });
				currentChunk = "";
			}
			currentChunk += word + " ";
		}

		if (currentChunk.trim()) {
			chunks.push({ id: `chunk-${chunkId}`, text: currentChunk.trim() });
		}

		return chunks;
	}
}