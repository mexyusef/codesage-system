import { Embedding } from "../types.js"
import { Embedder } from "./Embedder.js"
import axios from "axios"

export class OpenAIEmbedder extends Embedder {
	private apiKey: string

	constructor(apiKey: string) {
		super()
		this.apiKey = apiKey
	}

	async embed(texts: string[]): Promise<Embedding[]> {
		const response = await axios.post(
			"https://api.openai.com/v1/embeddings",
			{
				input: texts,
				model: "text-embedding-ada-002",
			},
			{
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
				},
			},
		)

		return response.data.data.map((item: any, idx: number) => ({
			id: `embedding-${idx}`,
			vector: item.embedding,
		}))
	}
}
