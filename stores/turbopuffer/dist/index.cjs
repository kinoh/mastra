'use strict';

var error = require('@mastra/core/error');
var vector = require('@mastra/core/vector');
var turbopuffer = require('@turbopuffer/turbopuffer');
var filter = require('@mastra/core/vector/filter');

// src/vector/index.ts
var TurbopufferFilterTranslator = class extends filter.BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...filter.BaseFilterTranslator.DEFAULT_OPERATORS,
      logical: ["$and", "$or"],
      array: ["$in", "$nin", "$all"],
      element: ["$exists"],
      regex: [],
      // No regex support in Turbopuffer
      custom: []
      // No custom operators
    };
  }
  /**
   * Map Mastra operators to Turbopuffer operators
   */
  operatorMap = {
    $eq: "Eq",
    $ne: "NotEq",
    $gt: "Gt",
    $gte: "Gte",
    $lt: "Lt",
    $lte: "Lte",
    $in: "In",
    $nin: "NotIn"
  };
  /**
   * Convert the Mastra filter to Turbopuffer format
   */
  translate(filter) {
    if (this.isEmpty(filter)) {
      return void 0;
    }
    this.validateFilter(filter);
    const result = this.translateNode(filter);
    if (!Array.isArray(result) || result.length !== 2 || result[0] !== "And" && result[0] !== "Or") {
      return ["And", [result]];
    }
    return result;
  }
  /**
   * Recursively translate a filter node
   */
  translateNode(node) {
    if (node === null || node === void 0 || Object.keys(node).length === 0) {
      return ["And", []];
    }
    if (this.isPrimitive(node)) {
      throw new Error("Direct primitive values not valid in this context for Turbopuffer");
    }
    if (Array.isArray(node)) {
      throw new Error("Direct array values not valid in this context for Turbopuffer");
    }
    const entries = Object.entries(node);
    if (entries.length === 0) {
      return ["And", []];
    }
    const [key, value] = entries[0];
    if (key && this.isLogicalOperator(key)) {
      return this.translateLogical(key, value);
    }
    if (entries.length > 1) {
      const conditions = entries.map(([field, fieldValue]) => this.translateFieldCondition(field, fieldValue));
      return ["And", conditions];
    }
    return this.translateFieldCondition(key, value);
  }
  /**
   * Translate a field condition
   */
  translateFieldCondition(field, value) {
    if (value instanceof Date) {
      return [field, "Eq", this.normalizeValue(value)];
    }
    if (this.isPrimitive(value)) {
      return [field, "Eq", this.normalizeValue(value)];
    }
    if (Array.isArray(value)) {
      return [field, "In", this.normalizeArrayValues(value)];
    }
    if (typeof value === "object" && value !== null) {
      const operators = Object.keys(value);
      if (operators.length > 1) {
        const allOperators = operators.every((op2) => this.isOperator(op2));
        if (allOperators) {
          const conditions = operators.map((op2) => this.translateOperator(field, op2, value[op2]));
          return ["And", conditions];
        } else {
          const conditions = operators.map((op2) => {
            const nestedField = `${field}.${op2}`;
            return this.translateFieldCondition(nestedField, value[op2]);
          });
          return ["And", conditions];
        }
      }
      const op = operators[0];
      if (op && this.isOperator(op)) {
        return this.translateOperator(field, op, value[op]);
      }
      if (op && !this.isOperator(op)) {
        const nestedField = `${field}.${op}`;
        return this.translateFieldCondition(nestedField, value[op]);
      }
    }
    throw new Error(`Unsupported filter format for field: ${field}`);
  }
  /**
   * Translate a logical operator
   */
  translateLogical(operator, conditions) {
    const logicalOp = operator === "$and" ? "And" : "Or";
    if (!Array.isArray(conditions)) {
      throw new Error(`Logical operator ${operator} requires an array of conditions`);
    }
    const translatedConditions = conditions.map((condition) => {
      if (typeof condition !== "object" || condition === null) {
        throw new Error(`Invalid condition for logical operator ${operator}`);
      }
      return this.translateNode(condition);
    });
    return [logicalOp, translatedConditions];
  }
  /**
   * Translate a specific operator
   */
  translateOperator(field, operator, value) {
    if (operator && this.operatorMap[operator]) {
      return [field, this.operatorMap[operator], this.normalizeValue(value)];
    }
    switch (operator) {
      case "$exists":
        return value ? [field, "NotEq", null] : [field, "Eq", null];
      case "$all":
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error("$all operator requires a non-empty array");
        }
        const allConditions = value.map((item) => [field, "In", [this.normalizeValue(item)]]);
        return ["And", allConditions];
      default:
        throw new Error(`Unsupported operator: ${operator || "undefined"}`);
    }
  }
  /**
   * Normalize a value for comparison operations
   */
  normalizeValue(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }
  /**
   * Normalize array values
   */
  normalizeArrayValues(values) {
    return values.map((value) => this.normalizeValue(value));
  }
};

// src/vector/index.ts
var TurbopufferVector = class extends vector.MastraVector {
  client;
  filterTranslator;
  // There is no explicit create index operation in Turbopuffer, so just register that
  // someone has called createIndex() and verify that subsequent upsert calls are consistent
  // with how the index was "created"
  createIndexCache = /* @__PURE__ */ new Map();
  opts;
  constructor(opts) {
    super();
    this.filterTranslator = new TurbopufferFilterTranslator();
    this.opts = opts;
    const baseClient = new turbopuffer.Turbopuffer(opts);
    const telemetry = this.__getTelemetry();
    this.client = telemetry?.traceClass(baseClient, {
      spanNamePrefix: "turbopuffer-vector",
      attributes: {
        "vector.type": "turbopuffer"
      }
    }) ?? baseClient;
  }
  async createIndex({ indexName, dimension, metric }) {
    metric = metric ?? "cosine";
    let distanceMetric = "cosine_distance";
    try {
      if (this.createIndexCache.has(indexName)) {
        const expected = this.createIndexCache.get(indexName);
        if (dimension !== expected.dimension || metric !== expected.metric) {
          throw new Error(
            `createIndex() called more than once with inconsistent inputs. Index ${indexName} expected dimensions=${expected.dimension} and metric=${expected.metric} but got dimensions=${dimension} and metric=${metric}`
          );
        }
        return;
      }
      if (dimension <= 0) {
        throw new Error("Dimension must be a positive integer");
      }
      switch (metric) {
        case "cosine":
          distanceMetric = "cosine_distance";
          break;
        case "euclidean":
          distanceMetric = "euclidean_squared";
          break;
        case "dotproduct":
          throw new Error("dotproduct is not supported in Turbopuffer");
      }
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_CREATE_INDEX_INVALID_ARGS",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: { indexName, dimension, metric }
        },
        error$1
      );
    }
    this.createIndexCache.set(indexName, {
      indexName,
      dimension,
      metric,
      tpufDistanceMetric: distanceMetric
    });
  }
  async upsert({ indexName, vectors, metadata, ids }) {
    let index;
    let createIndex;
    try {
      if (vectors.length === 0) {
        throw new Error("upsert() called with empty vectors");
      }
      index = this.client.namespace(indexName);
      createIndex = this.createIndexCache.get(indexName);
      if (!createIndex) {
        throw new Error(`createIndex() not called for this index`);
      }
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_UPSERT_INVALID_ARGS",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: { indexName }
        },
        error$1
      );
    }
    try {
      const distanceMetric = createIndex.tpufDistanceMetric;
      const vectorIds = ids || vectors.map(() => crypto.randomUUID());
      const records = vectors.map((vector, i) => ({
        id: vectorIds[i],
        vector,
        attributes: metadata?.[i] || {}
      }));
      const batchSize = 100;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const upsertOptions = {
          vectors: batch,
          distance_metric: distanceMetric
        };
        const schemaConfig = this.opts.schemaConfigForIndex?.(indexName);
        if (schemaConfig) {
          upsertOptions.schema = schemaConfig.schema;
          if (vectors[0]?.length !== schemaConfig.dimensions) {
            throw new Error(
              `Turbopuffer index ${indexName} was configured with dimensions=${schemaConfig.dimensions} but attempting to upsert vectors[0].length=${vectors[0]?.length}`
            );
          }
        }
        await index.upsert(upsertOptions);
      }
      return vectorIds;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_UPSERT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
      );
    }
  }
  async query({
    indexName,
    queryVector,
    topK,
    filter,
    includeVector
  }) {
    let createIndex;
    try {
      const schemaConfig = this.opts.schemaConfigForIndex?.(indexName);
      if (schemaConfig) {
        if (queryVector.length !== schemaConfig.dimensions) {
          throw new Error(
            `Turbopuffer index ${indexName} was configured with dimensions=${schemaConfig.dimensions} but attempting to query with queryVector.length=${queryVector.length}`
          );
        }
      }
      createIndex = this.createIndexCache.get(indexName);
      if (!createIndex) {
        throw new Error(`createIndex() not called for this index`);
      }
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_QUERY_INVALID_ARGS",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: { indexName }
        },
        error$1
      );
    }
    const distanceMetric = createIndex.tpufDistanceMetric;
    try {
      const index = this.client.namespace(indexName);
      const translatedFilter = this.filterTranslator.translate(filter);
      const results = await index.query({
        distance_metric: distanceMetric,
        vector: queryVector,
        top_k: topK,
        filters: translatedFilter,
        include_vectors: includeVector,
        include_attributes: true,
        consistency: { level: "strong" }
        // todo: make this configurable somehow?
      });
      return results.map((item) => ({
        id: String(item.id),
        score: typeof item.dist === "number" ? item.dist : 0,
        metadata: item.attributes || {},
        ...includeVector && item.vector ? { vector: item.vector } : {}
      }));
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_QUERY_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
      );
    }
  }
  async listIndexes() {
    try {
      const namespacesResult = await this.client.namespaces({});
      return namespacesResult.namespaces.map((namespace) => namespace.id);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_LIST_INDEXES_FAILED",
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
    try {
      const namespace = this.client.namespace(indexName);
      const metadata = await namespace.metadata();
      const createIndex = this.createIndexCache.get(indexName);
      if (!createIndex) {
        throw new Error(`createIndex() not called for this index`);
      }
      const dimension = metadata.dimensions;
      const count = metadata.approx_count;
      return {
        dimension,
        count,
        metric: createIndex.metric
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_DESCRIBE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
      );
    }
  }
  async deleteIndex({ indexName }) {
    try {
      const namespace = this.client.namespace(indexName);
      await namespace.deleteAll();
      this.createIndexCache.delete(indexName);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_DELETE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
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
    let namespace;
    let createIndex;
    let distanceMetric;
    let record;
    try {
      namespace = this.client.namespace(indexName);
      createIndex = this.createIndexCache.get(indexName);
      if (!createIndex) {
        throw new Error(`createIndex() not called for this index`);
      }
      distanceMetric = createIndex.tpufDistanceMetric;
      record = { id };
      if (update.vector) record.vector = update.vector;
      if (update.metadata) record.attributes = update.metadata;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_UPDATE_VECTOR_INVALID_ARGS",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: { indexName }
        },
        error$1
      );
    }
    try {
      await namespace.upsert({
        vectors: [record],
        distance_metric: distanceMetric
      });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_UPDATE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
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
      const namespace = this.client.namespace(indexName);
      await namespace.delete({ ids: [id] });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_TURBOBUFFER_VECTOR_DELETE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { indexName }
        },
        error$1
      );
    }
  }
};

exports.TurbopufferVector = TurbopufferVector;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map