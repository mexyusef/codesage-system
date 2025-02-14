import { handleRagRequest } from "../../services/rag/handleRagRequest";
import { RagSettings } from "../../services/rag/interfaces";
import { reinitializeRagSystem, retrievalChain } from "../../services/rag/reinitializeRagSystem";
import { ClineMessage } from "../../shared/ExtensionMessage";

export function transformRagResponseToClineMessage(
  ragResponse: any,
  answerPrefix: string = '',
  timestamp: number = Date.now(),
): ClineMessage {

  // const contextString = ragResponse.context
  //   ?.map((item: { pageContent: string; metadata: Record<string, any> }) => {
  //     return `${item.pageContent}\nMetadata: ${JSON.stringify(item.metadata)}`;
  //   })
  //   .join("\n\n");

  return {
    ts: timestamp,
    type: "say",
    say: "reasoning",
    text: answerPrefix + ragResponse.answer,
    // reasoning: contextString || undefined,
    reasoning: "",
    partial: false,
  };
}

// const ragService = new RagService(getRagSettings());
export class RagService {
  private retrievalChain: any;
  private ragSettings: RagSettings;

  constructor(ragSettings: RagSettings) {
    this.ragSettings = ragSettings;
  }

  async initialize(): Promise<void> {
    if (!retrievalChain) {
      await reinitializeRagSystem(this.ragSettings.RAG_FOLDER_PATH);
    }
    this.retrievalChain = retrievalChain;
  }

  async handleRagRequestWithCitations(query: string): Promise<{ response: string; sources: string[] }> {
    try {
      if (!retrievalChain) {
        console.log(`[RagService][handleRagRequestWithCitations] retrievalChain not initialized...initializing...`);
        await this.initialize();
      }

      const ragResponse = await retrievalChain.invoke({ input: query }); // Use retrievalChain.invoke

      // Extract sources from the ragResponse.context
      const sources = ragResponse.context?.map((item: any) => item.metadata?.source) || [];

      return { response: ragResponse.answer, sources };
    } catch (error: any) {
      console.error("[RagService][handleRagRequestWithCitations]Error querying RAG system with citations:", error);
      return { response: `Error: ${error.message}`, sources: [] };
    }
  }

  async processQuery(query: string): Promise<ClineMessage> {
    if (!this.retrievalChain) {
      // throw new Error("Retrieval chain is not initialized. Call initialize() first.");
      console.log(`[RagService][processQuery] retrievalChain not initialized...initializing...`);
      await this.initialize();
    }
    const ragResponse = await handleRagRequest(query);
    const clineMesagge = transformRagResponseToClineMessage(
      ragResponse,
      `[RAG Response - Folder: ${this.ragSettings.RAG_FOLDER_PATH}]\n\n`
    );
    return clineMesagge;
  }

}
