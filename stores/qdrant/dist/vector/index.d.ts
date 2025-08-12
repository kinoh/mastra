import { MastraVector } from '@mastra/core/vector';
import type { QueryResult, IndexStats, CreateIndexParams, UpsertVectorParams, QueryVectorParams, DescribeIndexParams, DeleteIndexParams, DeleteVectorParams, UpdateVectorParams } from '@mastra/core/vector';
import type { QdrantVectorFilter } from './filter.js';
type QdrantQueryVectorParams = QueryVectorParams<QdrantVectorFilter>;
export declare class QdrantVector extends MastraVector {
    private client;
    /**
     * Creates a new QdrantVector client.
     * @param url - The URL of the Qdrant server.
     * @param apiKey - The API key for Qdrant.
     * @param https - Whether to use HTTPS.
     */
    constructor({ url, apiKey, https }: {
        url: string;
        apiKey?: string;
        https?: boolean;
    });
    upsert({ indexName, vectors, metadata, ids }: UpsertVectorParams): Promise<string[]>;
    createIndex({ indexName, dimension, metric }: CreateIndexParams): Promise<void>;
    transformFilter(filter?: QdrantVectorFilter): QdrantVectorFilter;
    query({ indexName, queryVector, topK, filter, includeVector, }: QdrantQueryVectorParams): Promise<QueryResult[]>;
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
    /**
     * Parses and converts a string ID to the appropriate type (string or number) for Qdrant point operations.
     *
     * Qdrant supports both numeric and string IDs. This helper method ensures IDs are in the correct format
     * before sending them to the Qdrant client API.
     *
     * @param id - The ID string to parse
     * @returns The parsed ID as either a number (if string contains only digits) or the original string
     *
     * @example
     * // Numeric ID strings are converted to numbers
     * parsePointId("123") => 123
     * parsePointId("42") => 42
     * parsePointId("0") => 0
     *
     * // String IDs containing any non-digit characters remain as strings
     * parsePointId("doc-123") => "doc-123"
     * parsePointId("user_42") => "user_42"
     * parsePointId("abc123") => "abc123"
     * parsePointId("123abc") => "123abc"
     * parsePointId("") => ""
     * parsePointId("uuid-5678-xyz") => "uuid-5678-xyz"
     *
     * @remarks
     * - This conversion is important because Qdrant treats numeric and string IDs differently
     * - Only positive integers are converted to numbers (negative numbers with minus signs remain strings)
     * - The method uses base-10 parsing, so leading zeros will be dropped in numeric conversions
     * - reference: https://qdrant.tech/documentation/concepts/points/?q=qdrant+point+id#point-ids
     */
    private parsePointId;
}
export {};
//# sourceMappingURL=index.d.ts.map