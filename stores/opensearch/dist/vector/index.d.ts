import type { CreateIndexParams, DeleteIndexParams, DeleteVectorParams, DescribeIndexParams, IndexStats, QueryResult, QueryVectorParams, UpdateVectorParams, UpsertVectorParams } from '@mastra/core';
import { MastraVector } from '@mastra/core/vector';
import type { OpenSearchVectorFilter } from './filter.js';
type OpenSearchVectorParams = QueryVectorParams<OpenSearchVectorFilter>;
export declare class OpenSearchVector extends MastraVector<OpenSearchVectorFilter> {
    private client;
    /**
     * Creates a new OpenSearchVector client.
     *
     * @param {string} url - The url of the OpenSearch node.
     */
    constructor({ url }: {
        url: string;
    });
    /**
     * Creates a new collection with the specified configuration.
     *
     * @param {string} indexName - The name of the collection to create.
     * @param {number} dimension - The dimension of the vectors to be stored in the collection.
     * @param {'cosine' | 'euclidean' | 'dotproduct'} [metric=cosine] - The metric to use to sort vectors in the collection.
     * @returns {Promise<void>} A promise that resolves when the collection is created.
     */
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    /**
     * Lists all indexes.
     *
     * @returns {Promise<string[]>} A promise that resolves to an array of indexes.
     */
    listIndexes(): Promise<string[]>;
    /**
     * Retrieves statistics about a vector index.
     *
     * @param {string} indexName - The name of the index to describe
     * @returns A promise that resolves to the index statistics including dimension, count and metric
     */
    describeIndex({ indexName }: DescribeIndexParams): Promise<IndexStats>;
    /**
     * Deletes the specified index.
     *
     * @param {string} indexName - The name of the index to delete.
     * @returns {Promise<void>} A promise that resolves when the index is deleted.
     */
    deleteIndex({ indexName }: DeleteIndexParams): Promise<void>;
    /**
     * Inserts or updates vectors in the specified collection.
     *
     * @param {string} indexName - The name of the collection to upsert into.
     * @param {number[][]} vectors - An array of vectors to upsert.
     * @param {Record<string, any>[]} [metadata] - An optional array of metadata objects corresponding to each vector.
     * @param {string[]} [ids] - An optional array of IDs corresponding to each vector. If not provided, new IDs will be generated.
     * @returns {Promise<string[]>} A promise that resolves to an array of IDs of the upserted vectors.
     */
    upsert({ indexName, vectors, metadata, ids }: UpsertVectorParams): Promise<string[]>;
    /**
     * Queries the specified collection using a vector and optional filter.
     *
     * @param {string} indexName - The name of the collection to query.
     * @param {number[]} queryVector - The vector to query with.
     * @param {number} [topK] - The maximum number of results to return.
     * @param {Record<string, any>} [filter] - An optional filter to apply to the query. For more on filters in OpenSearch, see the filtering reference: https://opensearch.org/docs/latest/query-dsl/
     * @param {boolean} [includeVectors=false] - Whether to include the vectors in the response.
     * @returns {Promise<QueryResult[]>} A promise that resolves to an array of query results.
     */
    query({ indexName, queryVector, filter, topK, includeVector, }: OpenSearchVectorParams): Promise<QueryResult[]>;
    /**
     * Validates the dimensions of the vectors.
     *
     * @param {number[][]} vectors - The vectors to validate.
     * @param {number} dimension - The dimension of the vectors.
     * @returns {void}
     */
    private validateVectorDimensions;
    /**
     * Transforms the filter to the OpenSearch DSL.
     *
     * @param {OpenSearchVectorFilter} filter - The filter to transform.
     * @returns {Record<string, any>} The transformed filter.
     */
    private transformFilter;
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