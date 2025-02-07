import axios from "axios"
import { Embedder } from "./Embedder"
import { Embedding } from "../types"

export class HuggingFaceEmbedder extends Embedder {
	private apiKey: string
	private model: string

	constructor(apiKey: string, model: string = "sentence-transformers/all-MiniLM-L6-v2") {
		super()
		this.apiKey = apiKey
		this.model = model
	}

	async embed(texts: string[]): Promise<Embedding[]> {
		const response = await axios.post(
			"https://api-inference.huggingface.co/pipeline/feature-extraction",
			{
				inputs: texts,
				options: { wait_for_model: true },
			},
			{
				headers: {
					Authorization: `Bearer ${this.apiKey}`,
					"Content-Type": "application/json",
				},
			},
		)

		return response.data.map((vector: number[], idx: number) => ({
			id: `embedding-${idx}`,
			vector,
		}))
	}
}
