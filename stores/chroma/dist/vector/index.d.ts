import { MastraVector } from '@mastra/core/vector';
import type { QueryResult, IndexStats, CreateIndexParams, UpsertVectorParams, QueryVectorParams, DescribeIndexParams, DeleteIndexParams, DeleteVectorParams, UpdateVectorParams } from '@mastra/core/vector';
import type { ChromaVectorDocumentFilter, ChromaVectorFilter } from './filter.js';
interface ChromaUpsertVectorParams extends UpsertVectorParams {
    documents?: string[];
}
interface ChromaQueryVectorParams extends QueryVectorParams<ChromaVectorFilter> {
    documentFilter?: ChromaVectorDocumentFilter;
}
export declare class ChromaVector extends MastraVector<ChromaVectorFilter> {
    private client;
    private collections;
    constructor({ path, auth, }: {
        path: string;
        auth?: {
            provider: string;
            credentials: string;
        };
    });
    getCollection(indexName: string, throwIfNotExists?: boolean): Promise<any>;
    private validateVectorDimensions;
    upsert({ indexName, vectors, metadata, ids, documents }: ChromaUpsertVectorParams): Promise<string[]>;
    private HnswSpaceMap;
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    transformFilter(filter?: ChromaVectorFilter): ChromaVectorFilter;
    query({ indexName, queryVector, topK, filter, includeVector, documentFilter, }: ChromaQueryVectorParams): Promise<QueryResult[]>;
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
    deleteVector({ indexName, id }: DeleteVectorParams): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map