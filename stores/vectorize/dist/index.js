import { MastraError, ErrorCategory, ErrorDomain } from '@mastra/core/error';
import { MastraVector } from '@mastra/core/vector';
import Cloudflare from 'cloudflare';
import { BaseFilterTranslator } from '@mastra/core/vector/filter';

// src/vector/index.ts
var VectorizeFilterTranslator = class extends BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...BaseFilterTranslator.DEFAULT_OPERATORS,
      logical: [],
      array: ["$in", "$nin"],
      element: [],
      regex: [],
      custom: []
    };
  }
  translate(filter) {
    if (this.isEmpty(filter)) return filter;
    this.validateFilter(filter);
    return this.translateNode(filter);
  }
  translateNode(node, currentPath = "") {
    if (this.isRegex(node)) {
      throw new Error("Regex is not supported in Vectorize");
    }
    if (this.isPrimitive(node)) return { $eq: this.normalizeComparisonValue(node) };
    if (Array.isArray(node)) return { $in: this.normalizeArrayValues(node) };
    const entries = Object.entries(node);
    const firstEntry = entries[0];
    if (entries.length === 1 && firstEntry && this.isOperator(firstEntry[0])) {
      const [operator, value] = firstEntry;
      return { [operator]: this.normalizeComparisonValue(value) };
    }
    const result = {};
    for (const [key, value] of entries) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (this.isOperator(key)) {
        result[key] = this.normalizeComparisonValue(value);
        continue;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        if (Object.keys(value).length === 0) {
          result[newPath] = this.translateNode(value);
          continue;
        }
        const hasOperators = Object.keys(value).some((k) => this.isOperator(k));
        if (hasOperators) {
          result[newPath] = this.translateNode(value);
        } else {
          Object.assign(result, this.translateNode(value, newPath));
        }
      } else {
        result[newPath] = this.translateNode(value);
      }
    }
    return result;
  }
};

// src/vector/index.ts
var CloudflareVector = class extends MastraVector {
  client;
  accountId;
  constructor({ accountId, apiToken }) {
    super();
    this.accountId = accountId;
    this.client = new Cloudflare({
      apiToken
    });
  }
  get indexSeparator() {
    return "-";
  }
  async upsert({ indexName, vectors, metadata, ids }) {
    const generatedIds = ids || vectors.map(() => crypto.randomUUID());
    const ndjson = vectors.map(
      (vector, index) => JSON.stringify({
        id: generatedIds[index],
        values: vector,
        metadata: metadata?.[index]
      })
    ).join("\n");
    try {
      await this.client.vectorize.indexes.upsert(
        indexName,
        {
          account_id: this.accountId,
          body: ndjson
        },
        {
          __binaryRequest: true
        }
      );
      return generatedIds;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_UPSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, vectorCount: vectors?.length }
        },
        error
      );
    }
  }
  transformFilter(filter) {
    const translator = new VectorizeFilterTranslator();
    return translator.translate(filter);
  }
  async createIndex({ indexName, dimension, metric = "cosine" }) {
    try {
      await this.client.vectorize.indexes.create({
        account_id: this.accountId,
        config: {
          dimensions: dimension,
          metric: metric === "dotproduct" ? "dot-product" : metric
        },
        name: indexName
      });
    } catch (error) {
      const message = error?.errors?.[0]?.message || error?.message;
      if (error.status === 409 || typeof message === "string" && (message.toLowerCase().includes("already exists") || message.toLowerCase().includes("duplicate"))) {
        await this.validateExistingIndex(indexName, dimension, metric);
        return;
      }
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_CREATE_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, dimension, metric }
        },
        error
      );
    }
  }
  async query({
    indexName,
    queryVector,
    topK = 10,
    filter,
    includeVector = false
  }) {
    try {
      const translatedFilter = this.transformFilter(filter) ?? {};
      const response = await this.client.vectorize.indexes.query(indexName, {
        account_id: this.accountId,
        vector: queryVector,
        returnValues: includeVector,
        returnMetadata: "all",
        topK,
        filter: translatedFilter
      });
      return response?.matches?.map((match) => {
        return {
          id: match.id,
          metadata: match.metadata,
          score: match.score,
          vector: match.values
        };
      }) || [];
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_QUERY_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, topK }
        },
        error
      );
    }
  }
  async listIndexes() {
    try {
      const res = await this.client.vectorize.indexes.list({
        account_id: this.accountId
      });
      return res?.result?.map((index) => index.name) || [];
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_LIST_INDEXES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  /**
   * Retrieves statistics about a vector index.
   *
   * @param {string} indexName - The name of the index to describe
   * @returns A promise that resolves to the index statistics including dimension, count and metric
   */
  async describeIndex({ indexName }) {
    try {
      const index = await this.client.vectorize.indexes.get(indexName, {
        account_id: this.accountId
      });
      const described = await this.client.vectorize.indexes.info(indexName, {
        account_id: this.accountId
      });
      return {
        dimension: described?.dimensions,
        // Since vector_count is not available in the response,
        // we might need a separate API call to get the count if needed
        count: described?.vectorCount || 0,
        metric: index?.config?.metric
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_DESCRIBE_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error
      );
    }
  }
  async deleteIndex({ indexName }) {
    try {
      await this.client.vectorize.indexes.delete(indexName, {
        account_id: this.accountId
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_DELETE_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error
      );
    }
  }
  async createMetadataIndex(indexName, propertyName, indexType) {
    try {
      await this.client.vectorize.indexes.metadataIndex.create(indexName, {
        account_id: this.accountId,
        propertyName,
        indexType
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_CREATE_METADATA_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, propertyName, indexType }
        },
        error
      );
    }
  }
  async deleteMetadataIndex(indexName, propertyName) {
    try {
      await this.client.vectorize.indexes.metadataIndex.delete(indexName, {
        account_id: this.accountId,
        propertyName
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_DELETE_METADATA_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, propertyName }
        },
        error
      );
    }
  }
  async listMetadataIndexes(indexName) {
    try {
      const res = await this.client.vectorize.indexes.metadataIndex.list(indexName, {
        account_id: this.accountId
      });
      return res?.metadataIndexes ?? [];
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_LIST_METADATA_INDEXES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error
      );
    }
  }
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
  async updateVector({ indexName, id, update }) {
    if (!update.vector && !update.metadata) {
      throw new MastraError({
        id: "STORAGE_VECTORIZE_VECTOR_UPDATE_VECTOR_INVALID_ARGS",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: "No update data provided",
        details: { indexName, id }
      });
    }
    try {
      const updatePayload = {
        };
      if (update.vector) {
        updatePayload.vectors = [update.vector];
      }
      if (update.metadata) {
        updatePayload.metadata = [update.metadata];
      }
      await this.upsert({ indexName, vectors: updatePayload.vectors, metadata: updatePayload.metadata });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_UPDATE_VECTOR_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, id }
        },
        error
      );
    }
  }
  /**
   * Deletes a vector by its ID.
   * @param indexName - The name of the index containing the vector.
   * @param id - The ID of the vector to delete.
   * @returns A promise that resolves when the deletion is complete.
   * @throws Will throw an error if the deletion operation fails.
   */
  async deleteVector({ indexName, id }) {
    try {
      await this.client.vectorize.indexes.deleteByIds(indexName, {
        ids: [id],
        account_id: this.accountId
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_VECTORIZE_VECTOR_DELETE_VECTOR_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { indexName, id }
        },
        error
      );
    }
  }
};

// src/vector/prompt.ts
var VECTORIZE_PROMPT = `When querying Vectorize, you can ONLY use the operators listed below. Any other operators will be rejected.
Important: Don't explain how to construct the filter - use the specified operators and fields to search the content and return relevant results.
If a user tries to give an explicit operator that is not supported, reject the filter entirely and let them know that the operator is not supported.

Basic Comparison Operators:
- $eq: Exact match (default when using field: value)
  Example: { "category": "electronics" }
- $ne: Not equal
  Example: { "category": { "$ne": "electronics" } }
- $gt: Greater than
  Example: { "price": { "$gt": 100 } }
- $gte: Greater than or equal
  Example: { "price": { "$gte": 100 } }
- $lt: Less than
  Example: { "price": { "$lt": 100 } }
- $lte: Less than or equal
  Example: { "price": { "$lte": 100 } }

Array Operators:
- $in: Match any value in array
  Example: { "category": { "$in": ["electronics", "books"] } }
- $nin: Does not match any value in array
  Example: { "category": { "$nin": ["electronics", "books"] } }

Logical Operators:
- $and: Logical AND (can be implicit or explicit)
  Implicit Example: { "price": { "$gt": 100 }, "category": "electronics" }
  Explicit Example: { "$and": [{ "price": { "$gt": 100 } }, { "category": "electronics" }] }
- $or: Logical OR
  Example: { "$or": [{ "price": { "$lt": 50 } }, { "category": "books" }] }

Element Operators:
- $exists: Check if field exists
  Example: { "rating": { "$exists": true } }
- $match: Match text using full-text search
  Example: { "description": { "$match": "gaming laptop" } }

Restrictions:
- Regex patterns are not supported
- Only $and and $or logical operators are supported at the top level
- Empty arrays in $in/$nin will return no results
- Nested fields are supported using dot notation
- Multiple conditions on the same field are supported with both implicit and explicit $and
- At least one key-value pair is required in filter object
- Empty objects and undefined values are treated as no filter
- Invalid types in comparison operators will throw errors
- All non-logical operators must be used within a field condition
  Valid: { "field": { "$gt": 100 } }
  Valid: { "$and": [...] }
  Invalid: { "$gt": 100 }
- Logical operators must contain field conditions, not direct operators
  Valid: { "$and": [{ "field": { "$gt": 100 } }] }
  Invalid: { "$and": [{ "$gt": 100 }] }
- Logical operators ($and, $or):
  - Can only be used at top level or nested within other logical operators
  - Can not be used on a field level, or be nested inside a field
  - Can not be used inside an operator
  - Valid: { "$and": [{ "field": { "$gt": 100 } }] }
  - Valid: { "$or": [{ "$and": [{ "field": { "$gt": 100 } }] }] }
  - Invalid: { "field": { "$and": [{ "$gt": 100 }] } }
  - Invalid: { "field": { "$or": [{ "$gt": 100 }] } }
  - Invalid: { "field": { "$gt": { "$and": [{...}] } } }

Example Complex Query:
{
  "$and": [
    { "category": { "$in": ["electronics", "computers"] } },
    { "price": { "$gte": 100, "$lte": 1000 } },
    { "description": { "$match": "gaming laptop" } },
    { "rating": { "$exists": true, "$gt": 4 } },
    { "$or": [
      { "stock": { "$gt": 0 } },
      { "preorder": true }
    ]}
  ]
}`;

export { CloudflareVector, VECTORIZE_PROMPT };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map