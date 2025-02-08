import { TokenChunker } from "./chunking/TokenChunker.js"
import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder.js"
import { getDirname } from "./getDirname.js"
import { PineconeIndexer } from "./indexing/PineconeIndexer.js"
import { RagPipeline } from "./pipeline/RagPipeline.js"

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