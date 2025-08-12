import { MastraVector } from '@mastra/core/vector';
import type { QueryResult, CreateIndexParams, UpsertVectorParams, QueryVectorParams, DescribeIndexParams, DeleteIndexParams, DeleteVectorParams, UpdateVectorParams, IndexStats } from '@mastra/core/vector';
import Cloudflare from 'cloudflare';
import type { VectorizeVectorFilter } from './filter.js';
type VectorizeQueryParams = QueryVectorParams<VectorizeVectorFilter>;
export declare class CloudflareVector extends MastraVector<VectorizeVectorFilter> {
    client: Cloudflare;
    accountId: string;
    constructor({ accountId, apiToken }: {
        accountId: string;
        apiToken: string;
    });
    get indexSeparator(): string;
    upsert({ indexName, vectors, metadata, ids }: UpsertVectorParams): Promise<string[]>;
    transformFilter(filter?: VectorizeVectorFilter): VectorizeVectorFilter;
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    query({ indexName, queryVector, topK, filter, includeVector, }: VectorizeQueryParams): Promise<QueryResult[]>;
    listIndexes(): Promise<string[]>;
    /**
     * Retrieves statistics about a vector index.
     *
     * @param {string} indexName - The name of the index to describe
     * @returns A promise that resolves to the index statistics including dimension, count and metric
     */
    describeIndex({ indexName }: DescribeIndexParams): Promise<IndexStats>;
    deleteIndex({ indexName }: DeleteIndexParams): Promise<void>;
    createMetadataIndex(indexName: string, propertyName: string, indexType: 'string' | 'number' | 'boolean'): Promise<void>;
    deleteMetadataIndex(indexName: string, propertyName: string): Promise<void>;
    listMetadataIndexes(indexName: string): Promise<Cloudflare.Vectorize.Indexes.MetadataIndex.MetadataIndexListResponse.MetadataIndex[]>;
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