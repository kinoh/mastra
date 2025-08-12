import type { CreateIndexParams, DeleteIndexParams, DeleteVectorParams, DescribeIndexParams, IndexStats, QueryResult, QueryVectorParams, UpdateVectorParams, UpsertVectorParams } from '@mastra/core/vector';
import { MastraVector } from '@mastra/core/vector';
import type { Schema } from '@turbopuffer/turbopuffer';
import type { TurbopufferVectorFilter } from './filter.js';
type TurbopufferQueryVectorParams = QueryVectorParams<TurbopufferVectorFilter>;
export interface TurbopufferVectorOptions {
    /** The API key to authenticate with. */
    apiKey: string;
    /** The base URL. Default is https://api.turbopuffer.com. */
    baseUrl?: string;
    /** The timeout to establish a connection, in ms. Default is 10_000. Only applicable in Node and Deno.*/
    connectTimeout?: number;
    /** The socket idle timeout, in ms. Default is 60_000. Only applicable in Node and Deno.*/
    connectionIdleTimeout?: number;
    /** The number of connections to open initially when creating a new client. Default is 0. */
    warmConnections?: number;
    /** Whether to compress requests and accept compressed responses. Default is true. */
    compression?: boolean;
    /**
     * A callback function that takes an index name and returns a config object for that index.
     * This allows you to define explicit schemas per index.
     *
     * Example:
     * ```typescript
     * schemaConfigForIndex: (indexName: string) => {
     *   // Mastra's default embedding model and index for memory messages:
     *   if (indexName === "memory_messages_384") {
     *     return {
     *       dimensions: 384,
     *       schema: {
     *         thread_id: {
     *           type: "string",
     *           filterable: true,
     *         },
     *       },
     *     };
     *   } else {
     *     throw new Error(`TODO: add schema for index: ${indexName}`);
     *   }
     * },
     * ```
     */
    schemaConfigForIndex?: (indexName: string) => {
        dimensions: number;
        schema: Schema;
    };
}
export declare class TurbopufferVector extends MastraVector<TurbopufferVectorFilter> {
    private client;
    private filterTranslator;
    private createIndexCache;
    private opts;
    constructor(opts: TurbopufferVectorOptions);
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    upsert({ indexName, vectors, metadata, ids }: UpsertVectorParams): Promise<string[]>;
    query({ indexName, queryVector, topK, filter, includeVector, }: TurbopufferQueryVectorParams): Promise<QueryResult[]>;
    listIndexes(): Promise<string[]>;
    /**
     * Retrieves statistics about a vector index.
     *
     * @param {string} indexName - The name of the index to describe
     * @returns A promise that resolves to the index statistics including dimension, count and metric
     */
    describeIndex({ indexName }: DescribeIndexParams): Promise<IndexStats>;
    deleteIndex({ indexName }: DeleteIndexParams): Promise<void>;
    /**
     * Updates a vector by its ID with the provided vector and/or metadata.
     * @param indexName - The name of the index containing the vector.
     * @param id - The ID of the vector to update.
     * @param update - An object containing the vector and/or metadata to update.
     * @param update.vector - An optional array of numbers representing the new vector.
     * @param update.metadata - An optional record containing the new metadata.
     * @returns A promise that resolves when the update is complete.
     * @throws Will throw an error if no updates are provided or if the update operation fails.
     */
    updateVector({ indexName, id, update }: UpdateVectorParams): Promise<void>;
    /**
     * Deletes a vector by its ID.
     * @param indexName - The name of the index containing the vector.
     * @param id - The ID of the vector to delete.
     * @returns A promise that resolves when the deletion is complete.
     * @throws Will throw an error if the deletion operation fails.
     */
    deleteVector({ indexName, id }: DeleteVectorParams): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map