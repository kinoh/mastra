'use strict';

var error = require('@mastra/core/error');
var vector = require('@mastra/core/vector');
var opensearch = require('@opensearch-project/opensearch');
var filter = require('@mastra/core/vector/filter');

// src/vector/index.ts
var OpenSearchFilterTranslator = class extends filter.BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...filter.BaseFilterTranslator.DEFAULT_OPERATORS,
      logical: ["$and", "$or", "$not"],
      array: ["$in", "$nin", "$all"],
      regex: ["$regex"],
      custom: []
    };
  }
  translate(filter) {
    if (this.isEmpty(filter)) return void 0;
    this.validateFilter(filter);
    return this.translateNode(filter);
  }
  translateNode(node) {
    if (this.isPrimitive(node) || Array.isArray(node)) {
      return node;
    }
    const entries = Object.entries(node);
    const logicalOperators = [];
    const fieldConditions = [];
    entries.forEach(([key, value]) => {
      if (this.isLogicalOperator(key)) {
        logicalOperators.push([key, value]);
      } else {
        fieldConditions.push([key, value]);
      }
    });
    if (logicalOperators.length === 1 && fieldConditions.length === 0) {
      const [operator, value] = logicalOperators[0];
      if (!Array.isArray(value) && typeof value !== "object") {
        throw new Error(`Invalid logical operator structure: ${operator} must have an array or object value`);
      }
      return this.translateLogicalOperator(operator, value);
    }
    const fieldConditionQueries = fieldConditions.map(([key, value]) => {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const hasOperators = Object.keys(value).some((k) => this.isOperator(k));
        const nestedField = `metadata.${key}`;
        return hasOperators ? this.translateFieldConditions(nestedField, value) : this.translateNestedObject(nestedField, value);
      }
      if (Array.isArray(value)) {
        const fieldWithKeyword2 = this.addKeywordIfNeeded(`metadata.${key}`, value);
        return { terms: { [fieldWithKeyword2]: value } };
      }
      const fieldWithKeyword = this.addKeywordIfNeeded(`metadata.${key}`, value);
      return { term: { [fieldWithKeyword]: value } };
    });
    if (logicalOperators.length > 0) {
      const logicalConditions = logicalOperators.map(
        ([operator, value]) => this.translateOperator(operator, value)
      );
      return {
        bool: {
          must: [...logicalConditions, ...fieldConditionQueries]
        }
      };
    }
    if (fieldConditionQueries.length > 1) {
      return {
        bool: {
          must: fieldConditionQueries
        }
      };
    }
    if (fieldConditionQueries.length === 1) {
      return fieldConditionQueries[0];
    }
    return { match_all: {} };
  }
  /**
   * Handles translation of nested objects with dot notation fields
   */
  translateNestedObject(field, value) {
    const conditions = Object.entries(value).map(([subField, subValue]) => {
      const fullField = `${field}.${subField}`;
      if (this.isOperator(subField)) {
        return this.translateOperator(subField, subValue, field);
      }
      if (typeof subValue === "object" && subValue !== null && !Array.isArray(subValue)) {
        const hasOperators = Object.keys(subValue).some((k) => this.isOperator(k));
        if (hasOperators) {
          return this.translateFieldConditions(fullField, subValue);
        }
        return this.translateNestedObject(fullField, subValue);
      }
      const fieldWithKeyword = this.addKeywordIfNeeded(fullField, subValue);
      return { term: { [fieldWithKeyword]: subValue } };
    });
    return {
      bool: {
        must: conditions
      }
    };
  }
  translateLogicalOperator(operator, value) {
    const conditions = Array.isArray(value) ? value.map((item) => this.translateNode(item)) : [this.translateNode(value)];
    switch (operator) {
      case "$and":
        if (Array.isArray(value) && value.length === 0) {
          return { match_all: {} };
        }
        return {
          bool: {
            must: conditions
          }
        };
      case "$or":
        if (Array.isArray(value) && value.length === 0) {
          return {
            bool: {
              must_not: [{ match_all: {} }]
            }
          };
        }
        return {
          bool: {
            should: conditions
          }
        };
      case "$not":
        return {
          bool: {
            must_not: conditions
          }
        };
      default:
        return value;
    }
  }
  translateFieldOperator(field, operator, value) {
    if (this.isBasicOperator(operator)) {
      const normalizedValue = this.normalizeComparisonValue(value);
      const fieldWithKeyword2 = this.addKeywordIfNeeded(field, value);
      switch (operator) {
        case "$eq":
          return { term: { [fieldWithKeyword2]: normalizedValue } };
        case "$ne":
          return {
            bool: {
              must_not: [{ term: { [fieldWithKeyword2]: normalizedValue } }]
            }
          };
        default:
          return { term: { [fieldWithKeyword2]: normalizedValue } };
      }
    }
    if (this.isNumericOperator(operator)) {
      const normalizedValue = this.normalizeComparisonValue(value);
      const rangeOp = operator.replace("$", "");
      return { range: { [field]: { [rangeOp]: normalizedValue } } };
    }
    if (this.isArrayOperator(operator)) {
      if (!Array.isArray(value)) {
        throw new Error(`Invalid array operator value: ${operator} requires an array value`);
      }
      const normalizedValues = this.normalizeArrayValues(value);
      const fieldWithKeyword2 = this.addKeywordIfNeeded(field, value);
      switch (operator) {
        case "$in":
          return { terms: { [fieldWithKeyword2]: normalizedValues } };
        case "$nin":
          if (normalizedValues.length === 0) {
            return { match_all: {} };
          }
          return {
            bool: {
              must_not: [{ terms: { [fieldWithKeyword2]: normalizedValues } }]
            }
          };
        case "$all":
          if (normalizedValues.length === 0) {
            return {
              bool: {
                must_not: [{ match_all: {} }]
              }
            };
          }
          return {
            bool: {
              must: normalizedValues.map((v) => ({ term: { [fieldWithKeyword2]: v } }))
            }
          };
        default:
          return { terms: { [fieldWithKeyword2]: normalizedValues } };
      }
    }
    if (this.isElementOperator(operator)) {
      switch (operator) {
        case "$exists":
          return value ? { exists: { field } } : { bool: { must_not: [{ exists: { field } }] } };
        default:
          return { exists: { field } };
      }
    }
    if (this.isRegexOperator(operator)) {
      return this.translateRegexOperator(field, value);
    }
    const fieldWithKeyword = this.addKeywordIfNeeded(field, value);
    return { term: { [fieldWithKeyword]: value } };
  }
  /**
   * Translates regex patterns to OpenSearch query syntax
   */
  translateRegexOperator(field, value) {
    const regexValue = typeof value === "string" ? value : value.toString();
    if (regexValue.includes("\n") || regexValue.includes("\r")) {
      return { match: { [field]: value } };
    }
    let processedRegex = regexValue;
    const hasStartAnchor = regexValue.startsWith("^");
    const hasEndAnchor = regexValue.endsWith("$");
    if (hasStartAnchor || hasEndAnchor) {
      if (hasStartAnchor) {
        processedRegex = processedRegex.substring(1);
      }
      if (hasEndAnchor) {
        processedRegex = processedRegex.substring(0, processedRegex.length - 1);
      }
      let wildcardPattern = processedRegex;
      if (!hasStartAnchor) {
        wildcardPattern = "*" + wildcardPattern;
      }
      if (!hasEndAnchor) {
        wildcardPattern = wildcardPattern + "*";
      }
      return { wildcard: { [field]: wildcardPattern } };
    }
    const escapedRegex = regexValue.replace(/\\/g, "\\\\");
    return { regexp: { [field]: escapedRegex } };
  }
  addKeywordIfNeeded(field, value) {
    if (typeof value === "string") {
      return `${field}.keyword`;
    }
    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      return `${field}.keyword`;
    }
    return field;
  }
  /**
   * Helper method to handle special cases for the $not operator
   */
  handleNotOperatorSpecialCases(value, field) {
    if (value === null) {
      return { exists: { field } };
    }
    if (typeof value === "object" && value !== null) {
      if ("$eq" in value && value.$eq === null) {
        return { exists: { field } };
      }
      if ("$ne" in value && value.$ne === null) {
        return {
          bool: {
            must_not: [{ exists: { field } }]
          }
        };
      }
    }
    return null;
  }
  translateOperator(operator, value, field) {
    if (!this.isOperator(operator)) {
      throw new Error(`Unsupported operator: ${operator}`);
    }
    if (operator === "$not" && field) {
      const specialCaseResult = this.handleNotOperatorSpecialCases(value, field);
      if (specialCaseResult) {
        return specialCaseResult;
      }
    }
    if (this.isLogicalOperator(operator)) {
      if (operator === "$not" && field && typeof value === "object" && value !== null && !Array.isArray(value)) {
        const entries = Object.entries(value);
        if (entries.length > 0) {
          if (entries.every(([op]) => this.isOperator(op))) {
            const translatedCondition = this.translateFieldConditions(field, value);
            return {
              bool: {
                must_not: [translatedCondition]
              }
            };
          }
          if (entries.length === 1 && entries[0] && this.isOperator(entries[0][0])) {
            const [nestedOp, nestedVal] = entries[0];
            const translatedNested = this.translateFieldOperator(field, nestedOp, nestedVal);
            return {
              bool: {
                must_not: [translatedNested]
              }
            };
          }
        }
      }
      return this.translateLogicalOperator(operator, value);
    }
    if (field) {
      return this.translateFieldOperator(field, operator, value);
    }
    return value;
  }
  /**
   * Translates field conditions to OpenSearch query syntax
   * Handles special cases like range queries and multiple operators
   */
  translateFieldConditions(field, conditions) {
    if (this.canOptimizeToRangeQuery(conditions)) {
      return this.createRangeQuery(field, conditions);
    }
    const queryConditions = [];
    Object.entries(conditions).forEach(([operator, value]) => {
      if (this.isOperator(operator)) {
        queryConditions.push(this.translateOperator(operator, value, field));
      } else {
        const fieldWithKeyword = this.addKeywordIfNeeded(`${field}.${operator}`, value);
        queryConditions.push({ term: { [fieldWithKeyword]: value } });
      }
    });
    if (queryConditions.length === 1) {
      return queryConditions[0];
    }
    return {
      bool: {
        must: queryConditions
      }
    };
  }
  /**
   * Checks if conditions can be optimized to a range query
   */
  canOptimizeToRangeQuery(conditions) {
    return Object.keys(conditions).every((op) => this.isNumericOperator(op)) && Object.keys(conditions).length > 0;
  }
  /**
   * Creates a range query from numeric operators
   */
  createRangeQuery(field, conditions) {
    const rangeParams = Object.fromEntries(
      Object.entries(conditions).map(([op, val]) => [op.replace("$", ""), this.normalizeComparisonValue(val)])
    );
    return { range: { [field]: rangeParams } };
  }
};

// src/vector/index.ts
var METRIC_MAPPING = {
  cosine: "cosinesimil",
  euclidean: "l2",
  dotproduct: "innerproduct"
};
var REVERSE_METRIC_MAPPING = {
  cosinesimil: "cosine",
  l2: "euclidean",
  innerproduct: "dotproduct"
};
var OpenSearchVector = class extends vector.MastraVector {
  client;
  /**
   * Creates a new OpenSearchVector client.
   *
   * @param {string} url - The url of the OpenSearch node.
   */
  constructor({ url }) {
    super();
    this.client = new opensearch.Client({ node: url });
  }
  /**
   * Creates a new collection with the specified configuration.
   *
   * @param {string} indexName - The name of the collection to create.
   * @param {number} dimension - The dimension of the vectors to be stored in the collection.
   * @param {'cosine' | 'euclidean' | 'dotproduct'} [metric=cosine] - The metric to use to sort vectors in the collection.
   * @returns {Promise<void>} A promise that resolves when the collection is created.
   */
  async createIndex({ indexName, dimension, metric = "cosine" }) {
    if (!Number.isInteger(dimension) || dimension <= 0) {
      throw new error.MastraError({
        id: "STORAGE_OPENSEARCH_VECTOR_CREATE_INDEX_INVALID_ARGS",
        domain: error.ErrorDomain.STORAGE,
        category: error.ErrorCategory.USER,
        text: "Dimension must be a positive integer",
        details: { indexName, dimension }
      });
    }
    try {
      await this.client.indices.create({
        index: indexName,
        body: {
          settings: { index: { knn: true } },
          mappings: {
            properties: {
              metadata: { type: "object" },
              id: { type: "keyword" },
              embedding: {
                type: "knn_vector",
                dimension,
                method: {
                  name: "hnsw",
                  space_type: METRIC_MAPPING[metric],
                  engine: "faiss",
                  parameters: { ef_construction: 128, m: 16 }
                }
              }
            }
          }
        }
      });
    } catch (error$1) {
      const message = error$1?.message || error$1?.toString();
      if (message && message.toLowerCase().includes("already exists")) {
        await this.validateExistingIndex(indexName, dimension, metric);
        return;
      }
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_CREATE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName, dimension, metric }
        },
        error$1
      );
    }
  }
  /**
   * Lists all indexes.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of indexes.
   */
  async listIndexes() {
    try {
      const response = await this.client.cat.indices({ format: "json" });
      const indexes = response.body.map((record) => record.index).filter((index) => index !== void 0);
      return indexes;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_LIST_INDEXES_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
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
    const { body: indexInfo } = await this.client.indices.get({ index: indexName });
    const mappings = indexInfo[indexName]?.mappings;
    const embedding = mappings?.properties?.embedding;
    const spaceType = embedding.method.space_type;
    const { body: countInfo } = await this.client.count({ index: indexName });
    return {
      dimension: Number(embedding.dimension),
      count: Number(countInfo.count),
      metric: REVERSE_METRIC_MAPPING[spaceType]
    };
  }
  /**
   * Deletes the specified index.
   *
   * @param {string} indexName - The name of the index to delete.
   * @returns {Promise<void>} A promise that resolves when the index is deleted.
   */
  async deleteIndex({ indexName }) {
    try {
      await this.client.indices.delete({ index: indexName });
    } catch (error$1) {
      const mastraError = new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_DELETE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
    }
  }
  /**
   * Inserts or updates vectors in the specified collection.
   *
   * @param {string} indexName - The name of the collection to upsert into.
   * @param {number[][]} vectors - An array of vectors to upsert.
   * @param {Record<string, any>[]} [metadata] - An optional array of metadata objects corresponding to each vector.
   * @param {string[]} [ids] - An optional array of IDs corresponding to each vector. If not provided, new IDs will be generated.
   * @returns {Promise<string[]>} A promise that resolves to an array of IDs of the upserted vectors.
   */
  async upsert({ indexName, vectors, metadata = [], ids }) {
    const vectorIds = ids || vectors.map(() => crypto.randomUUID());
    const operations = [];
    try {
      const indexInfo = await this.describeIndex({ indexName });
      this.validateVectorDimensions(vectors, indexInfo.dimension);
      for (let i = 0; i < vectors.length; i++) {
        const operation = {
          index: {
            _index: indexName,
            _id: vectorIds[i]
          }
        };
        const document = {
          id: vectorIds[i],
          embedding: vectors[i],
          metadata: metadata[i] || {}
        };
        operations.push(operation);
        operations.push(document);
      }
      if (operations.length > 0) {
        await this.client.bulk({ body: operations, refresh: true });
      }
      return vectorIds;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_UPSERT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName, vectorCount: vectors?.length || 0 }
        },
        error$1
      );
    }
  }
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
  async query({
    indexName,
    queryVector,
    filter,
    topK = 10,
    includeVector = false
  }) {
    try {
      const translatedFilter = this.transformFilter(filter);
      const response = await this.client.search({
        index: indexName,
        body: {
          query: {
            bool: {
              must: { knn: { embedding: { vector: queryVector, k: topK } } },
              filter: translatedFilter ? [translatedFilter] : []
            }
          },
          _source: ["id", "metadata", "embedding"]
        }
      });
      const results = response.body.hits.hits.map((hit) => {
        const source = hit._source || {};
        return {
          id: String(source.id || ""),
          score: typeof hit._score === "number" ? hit._score : 0,
          metadata: source.metadata || {},
          ...includeVector && { vector: source.embedding }
        };
      });
      return results;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_QUERY_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName, topK }
        },
        error$1
      );
    }
  }
  /**
   * Validates the dimensions of the vectors.
   *
   * @param {number[][]} vectors - The vectors to validate.
   * @param {number} dimension - The dimension of the vectors.
   * @returns {void}
   */
  validateVectorDimensions(vectors, dimension) {
    if (vectors.some((vector) => vector.length !== dimension)) {
      throw new Error("Vector dimension does not match index dimension");
    }
  }
  /**
   * Transforms the filter to the OpenSearch DSL.
   *
   * @param {OpenSearchVectorFilter} filter - The filter to transform.
   * @returns {Record<string, any>} The transformed filter.
   */
  transformFilter(filter) {
    const translator = new OpenSearchFilterTranslator();
    return translator.translate(filter);
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
    let existingDoc;
    try {
      if (!update.vector && !update.metadata) {
        throw new Error("No updates provided");
      }
      const { body } = await this.client.get({
        index: indexName,
        id
      }).catch(() => {
        throw new Error(`Document with ID ${id} not found in index ${indexName}`);
      });
      if (!body || !body._source) {
        throw new Error(`Document with ID ${id} has no source data in index ${indexName}`);
      }
      existingDoc = body;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_UPDATE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: { indexName, id }
        },
        error$1
      );
    }
    const source = existingDoc._source;
    const updatedDoc = {
      id: source?.id || id
    };
    try {
      if (update.vector) {
        console.log(`1`);
        const indexInfo = await this.describeIndex({ indexName });
        console.log(`2`);
        this.validateVectorDimensions([update.vector], indexInfo.dimension);
        updatedDoc.embedding = update.vector;
      } else if (source?.embedding) {
        updatedDoc.embedding = source.embedding;
      }
      if (update.metadata) {
        updatedDoc.metadata = update.metadata;
      } else {
        updatedDoc.metadata = source?.metadata || {};
      }
      console.log(`3`);
      await this.client.index({
        index: indexName,
        id,
        body: updatedDoc,
        refresh: true
      });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_UPDATE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName, id }
        },
        error$1
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
      await this.client.delete({
        index: indexName,
        id,
        refresh: true
      });
    } catch (error$1) {
      if (error$1 && typeof error$1 === "object" && "statusCode" in error$1 && error$1.statusCode === 404) {
        return;
      }
      throw new error.MastraError(
        {
          id: "STORAGE_OPENSEARCH_VECTOR_DELETE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName, id }
        },
        error$1
      );
    }
  }
};

exports.OpenSearchVector = OpenSearchVector;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map