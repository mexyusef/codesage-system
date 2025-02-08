# Current Status

Error in Pinecone.

# ERROR LOGS

# 8-2-2025
> rag@1.0.0 dev
> tsc && node dist\main.js

Loaded environment variables for development environment
Found 20 files in: ./rag
Skipping non-text file: .env
=== DEBUG: Raw Documents ===
Total raw documents: 19
First document sample: {
  content: 'import { Chunk } from "../types.js"\n' +
    '\n' +
    'export abstract class Chunker {\n' +
    '\tabstract chunk(content: string',
  metadata: { source: 'chunking\\Chunker.ts' }
}
=== DEBUG: Split Documents ===
Total document chunks: 38
First chunk sample: {
  content: 'import { Chunk } from "../types.js"\n' +
    '\n' +
    'export abstract class Chunker {\n' +
    '\tabstract chunk(content: string',
  metadata: { source: 'chunking\\Chunker.ts', loc: { lines: [Object] } }
}
=== DEBUG: Pinecone Indexing ===
Successfully indexed documents
=== DEBUG: Query Execution ===
Executing query: What functions are defined in the rag/chunking folder?
=== DEBUG: Query Input ===
Query text: What functions are defined in the rag/chunking folder?
Query length: 54
Query type: string
Query Result: {
  input: 'What functions are defined in the rag/chunking folder?',
  chat_history: [],
  context: [
    Document {
      pageContent: 'import { TokenChunker } from "./chunking/TokenChunker.js"\n' +
        'import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder.js"\n' +
        'import { getDirname } from "./getDirname.js"\n' +
        'import { PineconeIndexer } from "./indexing/PineconeIndexer.js"\n' +
        'import { RagPipeline } from "./pipeline/RagPipeline.js"\n' +
        '\n' +
        'const chunker = new TokenChunker(100)\n' +
        'const embedder = new OpenAIEmbedder("your-openai-api-key")\n' +
        'const vectorDatabase = new PineconeIndexer("your-pinecone-api-key", "rag-index")\n' +
        'const ragPipeline = new RagPipeline(chunker, embedder, vectorDatabase)\n' +
        '\n' +
        'async function main() {\n' +
        '\tconst lokasi = getDirname();\n' +
        '\tconsole.log(`ragging ${lokasi}...`);\n' +
        '\tawait ragPipeline.index(lokasi);\n' +
        '\n' +
        '\tconst response = await ragPipeline.query("What functions are defined in the chunking folder?")\n' +
        '\tconsole.log(response);\n' +
        '}\n' +
        '\n' +
        'main();',
      metadata: [Object],
      id: 'b14680b2-6eb1-4cb4-b47b-5a257cc5f1ae'
    },
    Document {
      pageContent: 'import { TokenChunker } from "./chunking/TokenChunker.js"\n' +
        'import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder.js"\n' +
        'import { getDirname } from "./getDirname.js"\n' +
        'import { PineconeIndexer } from "./indexing/PineconeIndexer.js"\n' +
        'import { RagPipeline } from "./pipeline/RagPipeline.js"\n' +
        '\n' +
        'const chunker = new TokenChunker(100)\n' +
        'const embedder = new OpenAIEmbedder("your-openai-api-key")\n' +
        'const vectorDatabase = new PineconeIndexer("your-pinecone-api-key", "rag-index")\n' +
        'const ragPipeline = new RagPipeline(chunker, embedder, vectorDatabase)\n' +
        '\n' +
        'async function main() {\n' +
        '\tconst lokasi = getDirname();\n' +
        '\tconsole.log(`ragging ${lokasi}...`);\n' +
        '\tawait ragPipeline.index(lokasi);\n' +
        '\n' +
        '\tconst response = await ragPipeline.query("What functions are defined in the chunking folder?")\n' +
        '\tconsole.log(response);\n' +
        '}\n' +
        '\n' +
        'main();',
      metadata: [Object],
      id: '0dd12ca8-8a58-45d7-b51f-09b49b388cb2'
    },
    Document {
      pageContent: 'import { TokenChunker } from "./chunking/TokenChunker.js"\n' +
        'import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder.js"\n' +
        'import { getDirname } from "./getDirname.js"\n' +
        'import { PineconeIndexer } from "./indexing/PineconeIndexer.js"\n' +
        'import { RagPipeline } from "./pipeline/RagPipeline.js"\n' +
        '\n' +
        'const chunker = new TokenChunker(100)\n' +
        'const embedder = new OpenAIEmbedder("your-openai-api-key")\n' +
        'const vectorDatabase = new PineconeIndexer("your-pinecone-api-key", "rag-index")\n' +
        'const ragPipeline = new RagPipeline(chunker, embedder, vectorDatabase)\n' +
        '\n' +
        'async function main() {\n' +
        '\tconst lokasi = getDirname();\n' +
        '\tconsole.log(`ragging ${lokasi}...`);\n' +
        '\tawait ragPipeline.index(lokasi);\n' +
        '\n' +
        '\tconst response = await ragPipeline.query("What functions are defined in the chunking folder?")\n' +
        '\tconsole.log(response);\n' +
        '}\n' +
        '\n' +
        'main();',
      metadata: [Object],
      id: '79652dcf-baa6-45cf-801f-efc2f2a02996'
    },
    Document {
      pageContent: 'import { TokenChunker } from "./chunking/TokenChunker.js"\n' +
        'import { OpenAIEmbedder } from "./embedding/OpenAIEmbedder.js"\n' +
        'import { getDirname } from "./getDirname.js"\n' +
        'import { PineconeIndexer } from "./indexing/PineconeIndexer.js"\n' +
        'import { RagPipeline } from "./pipeline/RagPipeline.js"\n' +
        '\n' +
        'const chunker = new TokenChunker(100)\n' +
        'const embedder = new OpenAIEmbedder("your-openai-api-key")\n' +
        'const vectorDatabase = new PineconeIndexer("your-pinecone-api-key", "rag-index")\n' +
        'const ragPipeline = new RagPipeline(chunker, embedder, vectorDatabase)\n' +
        '\n' +
        'async function main() {\n' +
        '\tconst lokasi = getDirname();\n' +
        '\tconsole.log(`ragging ${lokasi}...`);\n' +
        '\tawait ragPipeline.index(lokasi);\n' +
        '\n' +
        '\tconst response = await ragPipeline.query("What functions are defined in the chunking folder?")\n' +
        '\tconsole.log(response);\n' +
        '}\n' +
        '\n' +
        'main();',
      metadata: [Object],
      id: '39d23ab7-de48-4fde-8bf3-e013414bc535'
    },
    Document {
      pageContent: 'import { Chunker } from "../chunking/Chunker.js"\n' +
        'import { Embedder } from "../embedding/Embedder.js"\n' +
        'import { VectorDatabase } from "../indexing/VectorDatabase.js"\n' +
        'import { QueryEngine } from "../querying/QueryEngine.js"\n' +
        'import { listFiles } from "./listFiles.js"\n' +
        '\n' +
        'export class RagPipeline {\n' +
        '\tprivate chunker: Chunker\n' +
        '\tprivate embedder: Embedder\n' +
        '\tprivate vectorDatabase: VectorDatabase\n' +
        '\tprivate queryEngine: QueryEngine\n' +
        '\n' +
        '\tconstructor(chunker: Chunker, embedder: Embedder, vectorDatabase: VectorDatabase) {\n' +
        '\t\tthis.chunker = chunker\n' +
        '\t\tthis.embedder = embedder\n' +
        '\t\tthis.vectorDatabase = vectorDatabase\n' +
        '\t\tthis.queryEngine = new QueryEngine(embedder, vectorDatabase)\n' +
        '\t}',
      metadata: [Object],
      id: '3cec2602-8a3f-4437-83af-4cf4dd6a86d0'
    }
  ],
  answer: 'The functions defined in the `rag/chunking` folder are:\n' +
    '1. `TokenChunker` in `TokenChunker.js`\n' +
    '2. `OpenAIEmbedder` in `OpenAIEmbedder.js`\n' +
    '3. `getDirname` in `getDirname.js`\n' +
    '4. `PineconeIndexer` in `PineconeIndexer.js`\n' +
    '5. `RagPipeline` in `RagPipeline.js`'
}

C:\hapus\upwork\rag-systems\rag>

# 8-2-2025

> rag@1.0.0 dev
> tsc && node dist\main.js

Loaded environment variables for development environment
Found 20 files in: ./rag
Skipping non-text file: .env
=== DEBUG: Raw Documents ===
Total raw documents: 19
First document sample: {
  content: 'import { Chunk } from "../types.js"\n' +
    '\n' +
    'export abstract class Chunker {\n' +
    '\tabstract chunk(content: string',
  metadata: { source: 'chunking\\Chunker.ts' }
}
=== DEBUG: Split Documents ===
Total document chunks: 38
First chunk sample: {
  content: 'import { Chunk } from "../types.js"\n' +
    '\n' +
    'export abstract class Chunker {\n' +
    '\tabstract chunk(content: string',
  metadata: { source: 'chunking\\Chunker.ts', loc: { lines: [Object] } }
}
=== DEBUG: Pinecone Indexing ===
Successfully indexed documents
=== DEBUG: Query Execution ===
Executing query: What functions are defined in the rag/chunking folder?
=== DEBUG: Query Input ===
Query text: What functions are defined in the rag/chunking folder?
Query length: 54
Query type: string
=== DEBUG: Query Failure ===
Query failed: TypeError: Cannot read properties of undefined (reading 'replace')
    at OpenAIEmbeddings.embedQuery (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/openai/dist/embeddings.js:147:46)
    at PineconeStore.similaritySearch (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:260:90)
    at VectorStoreRetriever._getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:172:33)
    at VectorStoreRetriever.getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/retrievers/index.js:118:40)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RunnableSequence.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1280:27)
    at async file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1493:31
    at async Promise.all (index 0)
    at async RunnableMap.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1497:13)
    at async RunnableAssign.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:2154:30)
=== DEBUG: Application Error ===
Application error: TypeError: Cannot read properties of undefined (reading 'replace')
    at OpenAIEmbeddings.embedQuery (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/openai/dist/embeddings.js:147:46)
    at PineconeStore.similaritySearch (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:260:90)
    at VectorStoreRetriever._getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:172:33)
    at VectorStoreRetriever.getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/retrievers/index.js:118:40)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RunnableSequence.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1280:27)
    at async file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1493:31
    at async Promise.all (index 0)
    at async RunnableMap.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1497:13)
    at async RunnableAssign.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:2154:30)

# 7-2-20205

> rag@1.0.0 dev
> tsc && node dist\main.js

Loaded environment variables for development environment
----------------------------------
----------------------------------
Found 19 files in the folder: ./rag
Splitting 19 documents into 247 chunks...
Indexed 247 document chunks in Pinecone.
An error occurred: TypeError: Cannot read properties of undefined (reading 'replace')
    at OpenAIEmbeddings.embedQuery (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/openai/dist/embeddings.js:147:46)
    at PineconeStore.similaritySearch (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:260:90)
    at VectorStoreRetriever._getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/vectorstores.js:172:33)
    at VectorStoreRetriever.getRelevantDocuments (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/retrievers/index.js:118:40)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RunnableSequence.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1280:27)
    at async file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1493:31
    at async Promise.all (index 0)
    at async RunnableMap.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:1497:13)
    at async RunnableAssign.invoke (file:///C:/hapus/upwork/rag-systems/rag/node_modules/@langchain/core/dist/runnables/base.js:2154:30)


Loaded environment variables for development environment
----------------------------------
----------------------------------
Found 19 files in the folder: ./rag
Splitting 19 documents into 238 chunks...
An error occurred: PineconeArgumentError: You must pass a non-empty string for `name` in order to describe an index
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\control\describeIndex.ts:24:13)
    at step (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:33:23)
    at Object.next (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:14:53)
    at C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:4:12)
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\control\describeIndex.ts:22:48)
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\data\indexHostSingleton.ts:18:69)
    at step (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\data\indexHostSingleton.js:33:23)
    at Object.next (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\data\indexHostSingleton.js:14:53) {
  cause: undefined,
  attemptNumber: 7,
  retriesLeft: 0
}









----------------------------------
Found 19 files in the folder: ./rag
Splitting 19 documents into 238 chunks...
An error occurred: PineconeArgumentError: You must pass a non-empty string for `name` in order to describe an index
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\control\describeIndex.ts:24:13)
    at step (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:33:23)
    at Object.next (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:14:53)        
    at C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\control\describeIndex.js:4:12)
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\control\describeIndex.ts:22:48)
    at <anonymous> (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\src\data\indexHostSingleton.ts:18:69)       
    at step (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\data\indexHostSingleton.js:33:23)
    at Object.next (C:\hapus\upwork\rag-systems\rag\node_modules\@pinecone-database\pinecone\dist\data\indexHostSingleton.js:14:53) {    
  cause: undefined,
  attemptNumber: 7,
  retriesLeft: 0
}

