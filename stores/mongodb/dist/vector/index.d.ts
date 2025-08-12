import { MastraVector } from '@mastra/core/vector';
import type { QueryResult, IndexStats, CreateIndexParams, UpsertVectorParams, QueryVectorParams, DescribeIndexParams, DeleteIndexParams, DeleteVectorParams, UpdateVectorParams } from '@mastra/core/vector';
import type { MongoClientOptions } from 'mongodb';
import type { MongoDBVectorFilter } from './filter.js';
export interface MongoDBUpsertVectorParams extends UpsertVectorParams {
    documents?: string[];
}
interface MongoDBQueryVectorParams extends QueryVectorParams<MongoDBVectorFilter> {
    documentFilter?: MongoDBVectorFilter;
}
export interface MongoDBIndexReadyParams {
    indexName: string;
    timeoutMs?: number;
    checkIntervalMs?: number;
}
export declare class MongoDBVector extends MastraVector<MongoDBVectorFilter> {
    private client;
    private db;
    private collections;
    private readonly embeddingFieldName;
    private readonly metadataFieldName;
    private readonly documentFieldName;
    private collectionForValidation;
    private mongoMetricMap;
    constructor({ uri, dbName, options }: {
        uri: string;
        dbName: string;
        options?: MongoClientOptions;
    });
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    /**
     * Waits for the index to be ready.
     *
     * @param {string} indexName - The name of the index to wait for
     * @param {number} timeoutMs - The maximum time in milliseconds to wait for the index to be ready (default: 60000)
     * @param {number} checkIntervalMs - The interval in milliseconds at which to check if the index is ready (default: 2000)
     * @returns A promise that resolves when the index is ready
     */
    waitForIndexReady({ indexName, timeoutMs, checkIntervalMs, }: MongoDBIndexReadyParams): Promise<void>;
    upsert({ indexName, vectors, metadata, ids, documents }: MongoDBUpsertVectorParams): Promise<string[]>;
    query({ indexName, queryVector, topK, filter, includeVector, documentFilter, }: MongoDBQueryVectorParams): Promise<QueryResult[]>;
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
    private getCollection;
    private validateVectorDimensions;
    private setIndexDimension;
    private transformFilter;
    /**
     * Transform metadata field filters to use MongoDB dot notation.
     * Fields that are stored in the metadata subdocument need to be prefixed with 'metadata.'
     * This handles filters from the Memory system which expects direct field access.
     *
     * @param filter - The filter object to transform
     * @returns Transformed filter with metadata fields properly prefixed
     */
    private transformMetadataFilter;
    /**
     * Determine if a field should be treated as a metadata field.
     * Common metadata fields include thread_id, resource_id, message_id, and any field
     * that doesn't start with underscore (MongoDB system fields).
     */
    private isMetadataField;
}
export {};
//# sourceMappingURL=index.d.ts.map