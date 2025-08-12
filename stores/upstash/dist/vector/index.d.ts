import { MastraVector } from '@mastra/core/vector';
import type { CreateIndexParams, DeleteIndexParams, DeleteVectorParams, DescribeIndexParams, IndexStats, QueryResult } from '@mastra/core/vector';
import type { UpstashVectorFilter } from './filter.js';
import type { UpstashUpsertVectorParams, UpstashQueryVectorParams, UpstashUpdateVectorParams } from './types.js';
export declare class UpstashVector extends MastraVector<UpstashVectorFilter> {
    private client;
    /**
     * Creates a new UpstashVector instance.
     * @param {object} params - The parameters for the UpstashVector.
     * @param {string} params.url - The URL of the Upstash vector index.
     * @param {string} params.token - The token for the Upstash vector index.
     */
    constructor({ url, token }: {
        url: string;
        token: string;
    });
    /**
     * Upserts vectors into the index.
     * @param {UpsertVectorParams} params - The parameters for the upsert operation.
     * @returns {Promise<string[]>} A promise that resolves to the IDs of the upserted vectors.
     */
    upsert({ indexName: namespace, vectors, metadata, ids, sparseVectors, }: UpstashUpsertVectorParams): Promise<string[]>;
    /**
     * Transforms a Mastra vector filter into an Upstash-compatible filter string.
     * @param {UpstashVectorFilter} [filter] - The filter to transform.
     * @returns {string | undefined} The transformed filter string, or undefined if no filter is provided.
     */
    transformFilter(filter?: UpstashVectorFilter): string | undefined;
    /**
     * Creates a new index. For Upstash, this is a no-op as indexes (known as namespaces in Upstash) are created on-the-fly.
     * @param {CreateIndexParams} _params - The parameters for creating the index (ignored).
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    createIndex(_params: CreateIndexParams): Promise<void>;
    /**
     * Queries the vector index.
     * @param {QueryVectorParams} params - The parameters for the query operation. indexName is the namespace in Upstash.
     * @returns {Promise<QueryResult[]>} A promise that resolves to the query results.
     */
    query({ indexName: namespace, queryVector, topK, filter, includeVector, sparseVector, fusionAlgorithm, queryMode, }: UpstashQueryVectorParams): Promise<QueryResult[]>;
    /**
     * Lists all namespaces in the Upstash vector index, which correspond to indexes.
     * @returns {Promise<string[]>} A promise that resolves to a list of index names.
     */
    listIndexes(): Promise<string[]>;
    /**
     * Retrieves statistics about a vector index.
     *
     * @param {string} indexName - The name of the namespace to describe
     * @returns A promise that resolves to the index statistics including dimension, count and metric
     */
    describeIndex({ indexName: namespace }: DescribeIndexParams): Promise<IndexStats>;
    /**
     * Deletes an index (namespace).
     * @param {DeleteIndexParams} params - The parameters for the delete operation.
     * @returns {Promise<void>} A promise that resolves when the deletion is complete.
     */
    deleteIndex({ indexName: namespace }: DeleteIndexParams): Promise<void>;
    /**
     * Updates a vector by its ID with the provided vector and/or metadata.
     * @param indexName - The name of the namespace containing the vector.
     * @param id - The ID of the vector to update.
     * @param update - An object containing the vector and/or metadata to update.
     * @param update.vector - An optional array of numbers representing the new vector.
     * @param update.metadata - An optional record containing the new metadata.
     * @returns A promise that resolves when the update is complete.
     * @throws Will throw an error if no updates are provided or if the update operation fails.
     */
    updateVector({ indexName: namespace, id, update }: UpstashUpdateVectorParams): Promise<void>;
    /**
     * Deletes a vector by its ID.
     * @param indexName - The name of the namespace containing the vector.
     * @param id - The ID of the vector to delete.
     * @returns A promise that resolves when the deletion is complete.
     * @throws Will throw an error if the deletion operation fails.
     */
    deleteVector({ indexName: namespace, id }: DeleteVectorParams): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map