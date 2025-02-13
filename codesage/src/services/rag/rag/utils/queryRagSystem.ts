export async function queryRagSystem(chain: any, query: string): Promise<any> {
  if (!query?.trim()) {
    throw new Error("Query cannot be empty");
  }
  console.log("[queryRagSystem] Executing query:", query);
  return await chain.invoke({ input: query });
}