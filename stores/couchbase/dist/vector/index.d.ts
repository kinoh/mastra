import { MastraVector } from '@mastra/core/vector';
import type { QueryResult, IndexStats, CreateIndexParams, UpsertVectorParams, QueryVectorParams, DescribeIndexParams, DeleteIndexParams, DeleteVectorParams, UpdateVectorParams } from '@mastra/core/vector';
import type { Collection } from 'couchbase';
type MastraMetric = 'cosine' | 'euclidean' | 'dotproduct';
type CouchbaseMetric = 'cosine' | 'l2_norm' | 'dot_product';
export declare const DISTANCE_MAPPING: Record<MastraMetric, CouchbaseMetric>;
export type CouchbaseVectorParams = {
    connectionString: string;
    username: string;
    password: string;
    bucketName: string;
    scopeName: string;
    collectionName: string;
};
export declare class CouchbaseVector extends MastraVector {
    private clusterPromise;
    private cluster;
    private bucketName;
    private collectionName;
    private scopeName;
    private collection;
    private bucket;
    private scope;
    private vector_dimension;
    constructor({ connectionString, username, password, bucketName, scopeName, collectionName }: CouchbaseVectorParams);
    getCollection(): Promise<Collection>;
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    upsert({ vectors, metadata, ids }: UpsertVectorParams): Promise<string[]>;
    query({ indexName, queryVector, topK, includeVector }: QueryVectorParams): Promise<QueryResult[]>;
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
    updateVector({ id, update }: UpdateVectorParams): Promise<void>;
    /**
     * Deletes a vector by its ID.
     * @param indexName - The name of the index containing the vector.
     * @param id - The ID of the vector to delete.
     * @returns A promise that resolves when the deletion is complete.
     * @throws Will throw an error if the deletion operation fails.
     */
    deleteVector({ id }: DeleteVectorParams): Promise<void>;
    disconnect(): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map