import { TokenChunker } from "./chunking/TokenChunker"
import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder"
import { getDirname } from "./getDirname"
import { PineconeIndexer } from "./indexing/PineconeIndexer"
import { RagPipeline } from "./pipeline/RagPipeline"

const chunker = new TokenChunker(100)
const embedder = new OpenAIEmbedder("your-openai-api-key")
const vectorDatabase = new PineconeIndexer("your-pinecone-api-key", "rag-index")
const ragPipeline = new RagPipeline(chunker, embedder, vectorDatabase)

async function main() {
	const lokasi = getDirname();
	console.log(`ragging ${lokasi}...`);
	await ragPipeline.index(lokasi);

	const response = await ragPipeline.query("What functions are defined in the chunking folder?")
	console.log(response);
}

main();