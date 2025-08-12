'use strict';

var error = require('@mastra/core/error');
var vector = require('@mastra/core/vector');
var mongodb = require('mongodb');
var uuid = require('uuid');
var filter = require('@mastra/core/vector/filter');
var storage = require('@mastra/core/storage');
var agent = require('@mastra/core/agent');

// src/vector/index.ts
var MongoDBFilterTranslator = class extends filter.BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...filter.BaseFilterTranslator.DEFAULT_OPERATORS,
      regex: ["$regex"],
      custom: ["$size"]
    };
  }
  translate(filter) {
    if (this.isEmpty(filter)) return filter;
    this.validateFilter(filter);
    return this.translateNode(filter);
  }
  translateNode(node) {
    if (this.isRegex(node)) {
      return node;
    }
    if (this.isPrimitive(node)) return node;
    if (Array.isArray(node)) return node;
    const entries = Object.entries(node);
    const translatedEntries = entries.map(([key, value]) => {
      if (this.isOperator(key)) {
        return [key, this.translateOperatorValue(key, value)];
      }
      return [key, this.translateNode(value)];
    });
    return Object.fromEntries(translatedEntries);
  }
  translateOperatorValue(operator, value) {
    if (this.isLogicalOperator(operator)) {
      if (operator === "$not") {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
          throw new Error("$not operator requires an object");
        }
        if (this.isEmpty(value)) {
          throw new Error("$not operator cannot be empty");
        }
        return this.translateNode(value);
      } else {
        if (!Array.isArray(value)) {
          throw new Error(`Value for logical operator ${operator} must be an array`);
        }
        return value.map((item) => this.translateNode(item));
      }
    }
    if (this.isBasicOperator(operator) || this.isNumericOperator(operator)) {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return this.normalizeComparisonValue(value);
    }
    if (operator === "$elemMatch") {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error(`Value for $elemMatch operator must be an object`);
      }
      return this.translateNode(value);
    }
    if (this.isArrayOperator(operator)) {
      if (!Array.isArray(value)) {
        throw new Error(`Value for array operator ${operator} must be an array`);
      }
      return this.normalizeArrayValues(value);
    }
    if (this.isElementOperator(operator)) {
      if (operator === "$exists" && typeof value !== "boolean") {
        throw new Error(`Value for $exists operator must be a boolean`);
      }
      return value;
    }
    if (this.isRegexOperator(operator)) {
      if (!(value instanceof RegExp) && typeof value !== "string") {
        throw new Error(`Value for ${operator} operator must be a RegExp or string`);
      }
      return value;
    }
    if (operator === "$size") {
      if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
        throw new Error(`Value for $size operator must be a non-negative integer`);
      }
      return value;
    }
    throw new Error(`Unsupported operator: ${operator}`);
  }
  isEmpty(filter) {
    return filter === void 0 || filter === null || typeof filter === "object" && Object.keys(filter).length === 0;
  }
};

// src/vector/index.ts
var MongoDBVector = class extends vector.MastraVector {
  client;
  db;
  collections;
  embeddingFieldName = "embedding";
  metadataFieldName = "metadata";
  documentFieldName = "document";
  collectionForValidation = null;
  mongoMetricMap = {
    cosine: "cosine",
    euclidean: "euclidean",
    dotproduct: "dotProduct"
  };
  constructor({ uri, dbName, options }) {
    super();
    this.client = new mongodb.MongoClient(uri, options);
    this.db = this.client.db(dbName);
    this.collections = /* @__PURE__ */ new Map();
  }
  // Public methods
  async connect() {
    try {
      await this.client.connect();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_CONNECT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
      );
    }
  }
  async disconnect() {
    try {
      await this.client.close();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_DISCONNECT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
      );
    }
  }
  async createIndex({ indexName, dimension, metric = "cosine" }) {
    let mongoMetric;
    try {
      if (!Number.isInteger(dimension) || dimension <= 0) {
        throw new Error("Dimension must be a positive integer");
      }
      mongoMetric = this.mongoMetricMap[metric];
      if (!mongoMetric) {
        throw new Error(`Invalid metric: "${metric}". Must be one of: cosine, euclidean, dotproduct`);
      }
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_CREATE_INDEX_INVALID_ARGS",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER,
          details: {
            indexName,
            dimension,
            metric
          }
        },
        error$1
      );
    }
    let collection;
    try {
      const collectionExists = await this.db.listCollections({ name: indexName }).hasNext();
      if (!collectionExists) {
        await this.db.createCollection(indexName);
      }
      collection = await this.getCollection(indexName);
      const indexNameInternal = `${indexName}_vector_index`;
      const embeddingField = this.embeddingFieldName;
      const numDimensions = dimension;
      await collection.createSearchIndex({
        definition: {
          fields: [
            {
              type: "vector",
              path: embeddingField,
              numDimensions,
              similarity: mongoMetric
            },
            {
              type: "filter",
              path: "_id"
            }
          ]
        },
        name: indexNameInternal,
        type: "vectorSearch"
      });
      await collection.createSearchIndex({
        definition: {
          mappings: {
            dynamic: true
          }
        },
        name: `${indexName}_search_index`,
        type: "search"
      });
    } catch (error$1) {
      if (error$1.codeName !== "IndexAlreadyExists") {
        throw new error.MastraError(
          {
            id: "STORAGE_MONGODB_VECTOR_CREATE_INDEX_FAILED",
            domain: error.ErrorDomain.STORAGE,
            category: error.ErrorCategory.THIRD_PARTY
          },
          error$1
        );
      }
    }
    try {
      await collection?.updateOne({ _id: "__index_metadata__" }, { $set: { dimension, metric } }, { upsert: true });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_CREATE_INDEX_FAILED_STORE_METADATA",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName
          }
        },
        error$1
      );
    }
  }
  /**
   * Waits for the index to be ready.
   *
   * @param {string} indexName - The name of the index to wait for
   * @param {number} timeoutMs - The maximum time in milliseconds to wait for the index to be ready (default: 60000)
   * @param {number} checkIntervalMs - The interval in milliseconds at which to check if the index is ready (default: 2000)
   * @returns A promise that resolves when the index is ready
   */
  async waitForIndexReady({
    indexName,
    timeoutMs = 6e4,
    checkIntervalMs = 2e3
  }) {
    const collection = await this.getCollection(indexName, true);
    const indexNameInternal = `${indexName}_vector_index`;
    const startTime = Date.now();
    while (Date.now() - startTime < timeoutMs) {
      const indexInfo = await collection.listSearchIndexes().toArray();
      const indexData = indexInfo.find((idx) => idx.name === indexNameInternal);
      const status = indexData?.status;
      if (status === "READY") {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, checkIntervalMs));
    }
    throw new Error(`Index "${indexNameInternal}" did not become ready within timeout`);
  }
  async upsert({ indexName, vectors, metadata, ids, documents }) {
    try {
      const collection = await this.getCollection(indexName);
      this.collectionForValidation = collection;
      const stats = await this.describeIndex({ indexName });
      await this.validateVectorDimensions(vectors, stats.dimension);
      const generatedIds = ids || vectors.map(() => uuid.v4());
      const operations = vectors.map((vector, idx) => {
        const id = generatedIds[idx];
        const meta = metadata?.[idx] || {};
        const doc = documents?.[idx];
        const normalizedMeta = Object.keys(meta).reduce(
          (acc, key) => {
            acc[key] = meta[key] instanceof Date ? meta[key].toISOString() : meta[key];
            return acc;
          },
          {}
        );
        const updateDoc = {
          [this.embeddingFieldName]: vector,
          [this.metadataFieldName]: normalizedMeta
        };
        if (doc !== void 0) {
          updateDoc[this.documentFieldName] = doc;
        }
        return {
          updateOne: {
            filter: { _id: id },
            // '_id' is a string as per MongoDBDocument interface
            update: { $set: updateDoc },
            upsert: true
          }
        };
      });
      await collection.bulkWrite(operations);
      return generatedIds;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_UPSERT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName
          }
        },
        error$1
      );
    }
  }
  async query({
    indexName,
    queryVector,
    topK = 10,
    filter,
    includeVector = false,
    documentFilter
  }) {
    try {
      const collection = await this.getCollection(indexName, true);
      const indexNameInternal = `${indexName}_vector_index`;
      const mongoFilter = this.transformFilter(filter);
      const documentMongoFilter = documentFilter ? { [this.documentFieldName]: documentFilter } : {};
      const transformedMongoFilter = this.transformMetadataFilter(mongoFilter);
      let combinedFilter = {};
      if (Object.keys(transformedMongoFilter).length > 0 && Object.keys(documentMongoFilter).length > 0) {
        combinedFilter = { $and: [transformedMongoFilter, documentMongoFilter] };
      } else if (Object.keys(transformedMongoFilter).length > 0) {
        combinedFilter = transformedMongoFilter;
      } else if (Object.keys(documentMongoFilter).length > 0) {
        combinedFilter = documentMongoFilter;
      }
      const vectorSearch = {
        index: indexNameInternal,
        queryVector,
        path: this.embeddingFieldName,
        numCandidates: 100,
        limit: topK
      };
      if (Object.keys(combinedFilter).length > 0) {
        const candidateIds = await collection.aggregate([{ $match: combinedFilter }, { $project: { _id: 1 } }]).map((doc) => doc._id).toArray();
        if (candidateIds.length > 0) {
          vectorSearch.filter = { _id: { $in: candidateIds } };
        } else {
          return [];
        }
      }
      const pipeline = [
        {
          $vectorSearch: vectorSearch
        },
        {
          $set: { score: { $meta: "vectorSearchScore" } }
        },
        {
          $project: {
            _id: 1,
            score: 1,
            metadata: `$${this.metadataFieldName}`,
            document: `$${this.documentFieldName}`,
            ...includeVector && { vector: `$${this.embeddingFieldName}` }
          }
        }
      ];
      const results = await collection.aggregate(pipeline).toArray();
      return results.map((result) => ({
        id: result._id,
        score: result.score,
        metadata: result.metadata,
        vector: includeVector ? result.vector : void 0,
        document: result.document
      }));
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_QUERY_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName
          }
        },
        error$1
      );
    }
  }
  async listIndexes() {
    try {
      const collections = await this.db.listCollections().toArray();
      return collections.map((col) => col.name);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_LIST_INDEXES_FAILED",
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
      const collection = await this.getCollection(indexName, true);
      const count = await collection.countDocuments({ _id: { $ne: "__index_metadata__" } });
      const metadataDoc = await collection.findOne({ _id: "__index_metadata__" });
      const dimension = metadataDoc?.dimension || 0;
      const metric = metadataDoc?.metric || "cosine";
      return {
        dimension,
        count,
        metric
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_DESCRIBE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName
          }
        },
        error$1
      );
    }
  }
  async deleteIndex({ indexName }) {
    const collection = await this.getCollection(indexName, false);
    try {
      if (collection) {
        await collection.drop();
        this.collections.delete(indexName);
      } else {
        throw new Error(`Index (Collection) "${indexName}" does not exist`);
      }
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_DELETE_INDEX_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName
          }
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
    try {
      if (!update.vector && !update.metadata) {
        throw new Error("No updates provided");
      }
      const collection = await this.getCollection(indexName, true);
      const updateDoc = {};
      if (update.vector) {
        const stats = await this.describeIndex({ indexName });
        await this.validateVectorDimensions([update.vector], stats.dimension);
        updateDoc[this.embeddingFieldName] = update.vector;
      }
      if (update.metadata) {
        const normalizedMeta = Object.keys(update.metadata).reduce(
          (acc, key) => {
            acc[key] = update.metadata[key] instanceof Date ? update.metadata[key].toISOString() : update.metadata[key];
            return acc;
          },
          {}
        );
        updateDoc[this.metadataFieldName] = normalizedMeta;
      }
      await collection.findOneAndUpdate({ _id: id }, { $set: updateDoc });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_UPDATE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName,
            id
          }
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
      const collection = await this.getCollection(indexName, true);
      await collection.deleteOne({ _id: id });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_VECTOR_DELETE_VECTOR_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            indexName,
            id
          }
        },
        error$1
      );
    }
  }
  // Private methods
  async getCollection(indexName, throwIfNotExists = true) {
    if (this.collections.has(indexName)) {
      return this.collections.get(indexName);
    }
    const collection = this.db.collection(indexName);
    const collectionExists = await this.db.listCollections({ name: indexName }).hasNext();
    if (!collectionExists && throwIfNotExists) {
      throw new Error(`Index (Collection) "${indexName}" does not exist`);
    }
    this.collections.set(indexName, collection);
    return collection;
  }
  async validateVectorDimensions(vectors, dimension) {
    if (vectors.length === 0) {
      throw new Error("No vectors provided for validation");
    }
    if (dimension === 0) {
      dimension = vectors[0] ? vectors[0].length : 0;
      await this.setIndexDimension(dimension);
    }
    for (let i = 0; i < vectors.length; i++) {
      let v = vectors[i]?.length;
      if (v !== dimension) {
        throw new Error(`Vector at index ${i} has invalid dimension ${v}. Expected ${dimension} dimensions.`);
      }
    }
  }
  async setIndexDimension(dimension) {
    const collection = this.collectionForValidation;
    await collection.updateOne({ _id: "__index_metadata__" }, { $set: { dimension } }, { upsert: true });
  }
  transformFilter(filter) {
    const translator = new MongoDBFilterTranslator();
    if (!filter) return {};
    return translator.translate(filter);
  }
  /**
   * Transform metadata field filters to use MongoDB dot notation.
   * Fields that are stored in the metadata subdocument need to be prefixed with 'metadata.'
   * This handles filters from the Memory system which expects direct field access.
   *
   * @param filter - The filter object to transform
   * @returns Transformed filter with metadata fields properly prefixed
   */
  transformMetadataFilter(filter) {
    if (!filter || typeof filter !== "object") return filter;
    const transformed = {};
    for (const [key, value] of Object.entries(filter)) {
      if (key.startsWith("$")) {
        if (Array.isArray(value)) {
          transformed[key] = value.map((item) => this.transformMetadataFilter(item));
        } else {
          transformed[key] = this.transformMetadataFilter(value);
        }
      } else if (key.startsWith("metadata.")) {
        transformed[key] = value;
      } else if (this.isMetadataField(key)) {
        transformed[`metadata.${key}`] = value;
      } else {
        transformed[key] = value;
      }
    }
    return transformed;
  }
  /**
   * Determine if a field should be treated as a metadata field.
   * Common metadata fields include thread_id, resource_id, message_id, and any field
   * that doesn't start with underscore (MongoDB system fields).
   */
  isMetadataField(key) {
    if (key.startsWith("_")) return false;
    const documentFields = ["_id", this.embeddingFieldName, this.documentFieldName];
    if (documentFields.includes(key)) return false;
    return true;
  }
};
var MongoDBConnector = class _MongoDBConnector {
  #client;
  #dbName;
  #handler;
  #isConnected;
  #db;
  constructor(options) {
    this.#client = options.client;
    this.#dbName = options.dbName;
    this.#handler = options.handler;
    this.#isConnected = false;
  }
  static fromDatabaseConfig(config) {
    if (!config.url?.trim().length) {
      throw new Error(
        "MongoDBStore: url must be provided and cannot be empty. Passing an empty string may cause fallback to local MongoDB defaults."
      );
    }
    if (!config.dbName?.trim().length) {
      throw new Error(
        "MongoDBStore: dbName must be provided and cannot be empty. Passing an empty string may cause fallback to local MongoDB defaults."
      );
    }
    return new _MongoDBConnector({
      client: new mongodb.MongoClient(config.url, config.options),
      dbName: config.dbName,
      handler: void 0
    });
  }
  static fromConnectionHandler(handler) {
    return new _MongoDBConnector({
      client: void 0,
      dbName: void 0,
      handler
    });
  }
  async getConnection() {
    if (this.#client) {
      if (this.#isConnected && this.#db) {
        return this.#db;
      }
      await this.#client.connect();
      this.#db = this.#client.db(this.#dbName);
      this.#isConnected = true;
      return this.#db;
    }
    throw new Error("MongoDBStore: client cannot be empty. Check your MongoDBConnector configuration.");
  }
  async getCollection(collectionName) {
    if (this.#handler) {
      return this.#handler.getCollection(collectionName);
    }
    const db = await this.getConnection();
    return db.collection(collectionName);
  }
  async close() {
    if (this.#client) {
      await this.#client.close();
      this.#isConnected = false;
      return;
    }
    if (this.#handler) {
      await this.#handler.close();
    }
  }
};
function transformEvalRow(row) {
  let testInfoValue = null;
  if (row.test_info) {
    try {
      testInfoValue = typeof row.test_info === "string" ? storage.safelyParseJSON(row.test_info) : row.test_info;
    } catch (e) {
      console.warn("Failed to parse test_info:", e);
    }
  }
  let resultValue;
  try {
    resultValue = typeof row.result === "string" ? storage.safelyParseJSON(row.result) : row.result;
  } catch (e) {
    console.warn("Failed to parse result:", e);
    throw new Error("Invalid result format");
  }
  return {
    agentName: row.agent_name,
    input: row.input,
    output: row.output,
    result: resultValue,
    metricName: row.metric_name,
    instructions: row.instructions,
    testInfo: testInfoValue,
    globalRunId: row.global_run_id,
    runId: row.run_id,
    createdAt: row.createdAt
  };
}
var LegacyEvalsMongoDB = class extends storage.LegacyEvalsStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  /** @deprecated use getEvals instead */
  async getEvalsByAgentName(agentName, type) {
    try {
      const query = {
        agent_name: agentName
      };
      if (type === "test") {
        query["test_info"] = { $ne: null };
      }
      if (type === "live") {
        query["test_info"] = null;
      }
      const collection = await this.operations.getCollection(storage.TABLE_EVALS);
      const documents = await collection.find(query).sort({ created_at: "desc" }).toArray();
      const result = documents.map((row) => transformEvalRow(row));
      return result.filter((row) => {
        if (type === "live") {
          return !Boolean(row.testInfo?.testPath);
        }
        if (type === "test") {
          return row.testInfo?.testPath !== null;
        }
        return true;
      });
    } catch (error$1) {
      if (error$1 instanceof Error && error$1.message.includes("no such table")) {
        return [];
      }
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_EVALS_BY_AGENT_NAME_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { agentName }
        },
        error$1
      );
    }
  }
  async getEvals(options = {}) {
    const { agentName, type, page = 0, perPage = 100, dateRange } = options;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const currentOffset = page * perPage;
    const query = {};
    if (agentName) {
      query["agent_name"] = agentName;
    }
    if (type === "test") {
      query["test_info"] = { $ne: null };
    } else if (type === "live") {
      query["test_info"] = null;
    }
    if (fromDate || toDate) {
      query["createdAt"] = {};
      if (fromDate) {
        query["createdAt"]["$gte"] = fromDate;
      }
      if (toDate) {
        query["createdAt"]["$lte"] = toDate;
      }
    }
    try {
      const collection = await this.operations.getCollection(storage.TABLE_EVALS);
      let total = 0;
      if (page === 0 || perPage < 1e3) {
        total = await collection.countDocuments(query);
      }
      if (total === 0) {
        return {
          evals: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const documents = await collection.find(query).sort({ created_at: "desc" }).skip(currentOffset).limit(perPage).toArray();
      const evals = documents.map((row) => transformEvalRow(row));
      const filteredEvals = evals.filter((row) => {
        if (type === "live") {
          return !Boolean(row.testInfo?.testPath);
        }
        if (type === "test") {
          return row.testInfo?.testPath !== null;
        }
        return true;
      });
      const hasMore = currentOffset + filteredEvals.length < total;
      return {
        evals: filteredEvals,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_EVALS_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: {
            agentName: agentName || "all",
            type: type || "all",
            page,
            perPage
          }
        },
        error$1
      );
    }
  }
};

// src/storage/domains/utils.ts
function formatDateForMongoDB(date) {
  return typeof date === "string" ? new Date(date) : date;
}

// src/storage/domains/memory/index.ts
var MemoryStorageMongoDB = class extends storage.MemoryStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  parseRow(row) {
    let content = row.content;
    if (typeof content === "string") {
      try {
        content = JSON.parse(content);
      } catch {
      }
    }
    const result = {
      id: row.id,
      content,
      role: row.role,
      createdAt: formatDateForMongoDB(row.createdAt),
      threadId: row.thread_id,
      resourceId: row.resourceId
    };
    if (row.type && row.type !== "v2") result.type = row.type;
    return result;
  }
  async _getIncludedMessages({
    threadId,
    selectBy
  }) {
    const include = selectBy?.include;
    if (!include) return null;
    const collection = await this.operations.getCollection(storage.TABLE_MESSAGES);
    const includedMessages = [];
    for (const inc of include) {
      const { id, withPreviousMessages = 0, withNextMessages = 0 } = inc;
      const searchThreadId = inc.threadId || threadId;
      const allMessages = await collection.find({ thread_id: searchThreadId }).sort({ createdAt: 1 }).toArray();
      const targetIndex = allMessages.findIndex((msg) => msg.id === id);
      if (targetIndex === -1) continue;
      const startIndex = Math.max(0, targetIndex - withPreviousMessages);
      const endIndex = Math.min(allMessages.length - 1, targetIndex + withNextMessages);
      for (let i = startIndex; i <= endIndex; i++) {
        includedMessages.push(allMessages[i]);
      }
    }
    const seen = /* @__PURE__ */ new Set();
    const dedupedMessages = includedMessages.filter((msg) => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    });
    return dedupedMessages.map((row) => this.parseRow(row));
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    try {
      const messages = [];
      const limit = storage.resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
      if (selectBy?.include?.length) {
        const includeMessages = await this._getIncludedMessages({ threadId, selectBy });
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      }
      const excludeIds = messages.map((m) => m.id);
      const collection = await this.operations.getCollection(storage.TABLE_MESSAGES);
      const query = { thread_id: threadId };
      if (excludeIds.length > 0) {
        query.id = { $nin: excludeIds };
      }
      if (limit > 0) {
        const remainingMessages = await collection.find(query).sort({ createdAt: -1 }).limit(limit).toArray();
        messages.push(...remainingMessages.map((row) => this.parseRow(row)));
      }
      messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const list = new agent.MessageList().add(messages, "memory");
      if (format === "v2") return list.get.all.v2();
      return list.get.all.v1();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "MONGODB_STORE_GET_MESSAGES_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error$1
      );
    }
  }
  async getMessagesPaginated(args) {
    const { threadId, format, selectBy } = args;
    const { page = 0, perPage: perPageInput, dateRange } = selectBy?.pagination || {};
    const perPage = perPageInput !== void 0 ? perPageInput : storage.resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const messages = [];
    if (selectBy?.include?.length) {
      try {
        const includeMessages = await this._getIncludedMessages({ threadId, selectBy });
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      } catch (error$1) {
        throw new error.MastraError(
          {
            id: "MONGODB_STORE_GET_MESSAGES_PAGINATED_GET_INCLUDE_MESSAGES_FAILED",
            domain: error.ErrorDomain.STORAGE,
            category: error.ErrorCategory.THIRD_PARTY,
            details: { threadId }
          },
          error$1
        );
      }
    }
    try {
      const currentOffset = page * perPage;
      const collection = await this.operations.getCollection(storage.TABLE_MESSAGES);
      const query = { thread_id: threadId };
      if (fromDate) {
        query.createdAt = { ...query.createdAt, $gte: fromDate };
      }
      if (toDate) {
        query.createdAt = { ...query.createdAt, $lte: toDate };
      }
      const total = await collection.countDocuments(query);
      if (total === 0 && messages.length === 0) {
        return {
          messages: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const excludeIds = messages.map((m) => m.id);
      if (excludeIds.length > 0) {
        query.id = { $nin: excludeIds };
      }
      const dataResult = await collection.find(query).sort({ createdAt: -1 }).skip(currentOffset).limit(perPage).toArray();
      messages.push(...dataResult.map((row) => this.parseRow(row)));
      const messagesToReturn = format === "v1" ? new agent.MessageList().add(messages, "memory").get.all.v1() : new agent.MessageList().add(messages, "memory").get.all.v2();
      return {
        messages: messagesToReturn,
        total,
        page,
        perPage,
        hasMore: (page + 1) * perPage < total
      };
    } catch (error$1) {
      const mastraError = new error.MastraError(
        {
          id: "MONGODB_STORE_GET_MESSAGES_PAGINATED_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error$1
      );
      this.logger?.trackException?.(mastraError);
      this.logger?.error?.(mastraError.toString());
      return { messages: [], total: 0, page, perPage, hasMore: false };
    }
  }
  async saveMessages({
    messages,
    format
  }) {
    if (messages.length === 0) return messages;
    try {
      const threadId = messages[0]?.threadId;
      if (!threadId) {
        throw new Error("Thread ID is required");
      }
      const collection = await this.operations.getCollection(storage.TABLE_MESSAGES);
      const threadsCollection = await this.operations.getCollection(storage.TABLE_THREADS);
      const messagesToInsert = messages.map((message) => {
        const time = message.createdAt || /* @__PURE__ */ new Date();
        if (!message.threadId) {
          throw new Error(
            "Expected to find a threadId for message, but couldn't find one. An unexpected error has occurred."
          );
        }
        if (!message.resourceId) {
          throw new Error(
            "Expected to find a resourceId for message, but couldn't find one. An unexpected error has occurred."
          );
        }
        return {
          updateOne: {
            filter: { id: message.id },
            update: {
              $set: {
                id: message.id,
                thread_id: message.threadId,
                content: typeof message.content === "object" ? JSON.stringify(message.content) : message.content,
                role: message.role,
                type: message.type || "v2",
                createdAt: formatDateForMongoDB(time),
                resourceId: message.resourceId
              }
            },
            upsert: true
          }
        };
      });
      await Promise.all([
        collection.bulkWrite(messagesToInsert),
        threadsCollection.updateOne({ id: threadId }, { $set: { updatedAt: /* @__PURE__ */ new Date() } })
      ]);
      const list = new agent.MessageList().add(messages, "memory");
      if (format === "v2") return list.get.all.v2();
      return list.get.all.v1();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "MONGODB_STORE_SAVE_MESSAGES_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
      );
    }
  }
  async updateMessages({
    messages
  }) {
    if (messages.length === 0) {
      return [];
    }
    const messageIds = messages.map((m) => m.id);
    const collection = await this.operations.getCollection(storage.TABLE_MESSAGES);
    const existingMessages = await collection.find({ id: { $in: messageIds } }).toArray();
    const existingMessagesParsed = existingMessages.map((msg) => this.parseRow(msg));
    if (existingMessagesParsed.length === 0) {
      return [];
    }
    const threadIdsToUpdate = /* @__PURE__ */ new Set();
    const bulkOps = [];
    for (const existingMessage of existingMessagesParsed) {
      const updatePayload = messages.find((m) => m.id === existingMessage.id);
      if (!updatePayload) continue;
      const { id, ...fieldsToUpdate } = updatePayload;
      if (Object.keys(fieldsToUpdate).length === 0) continue;
      threadIdsToUpdate.add(existingMessage.threadId);
      if (updatePayload.threadId && updatePayload.threadId !== existingMessage.threadId) {
        threadIdsToUpdate.add(updatePayload.threadId);
      }
      const updateDoc = {};
      const updatableFields = { ...fieldsToUpdate };
      if (updatableFields.content) {
        const newContent = {
          ...existingMessage.content,
          ...updatableFields.content,
          // Deep merge metadata if it exists on both
          ...existingMessage.content?.metadata && updatableFields.content.metadata ? {
            metadata: {
              ...existingMessage.content.metadata,
              ...updatableFields.content.metadata
            }
          } : {}
        };
        updateDoc.content = JSON.stringify(newContent);
        delete updatableFields.content;
      }
      for (const key in updatableFields) {
        if (Object.prototype.hasOwnProperty.call(updatableFields, key)) {
          const dbKey = key === "threadId" ? "thread_id" : key;
          let value = updatableFields[key];
          if (typeof value === "object" && value !== null) {
            value = JSON.stringify(value);
          }
          updateDoc[dbKey] = value;
        }
      }
      if (Object.keys(updateDoc).length > 0) {
        bulkOps.push({
          updateOne: {
            filter: { id },
            update: { $set: updateDoc }
          }
        });
      }
    }
    if (bulkOps.length > 0) {
      await collection.bulkWrite(bulkOps);
    }
    if (threadIdsToUpdate.size > 0) {
      const threadsCollection = await this.operations.getCollection(storage.TABLE_THREADS);
      await threadsCollection.updateMany(
        { id: { $in: Array.from(threadIdsToUpdate) } },
        { $set: { updatedAt: /* @__PURE__ */ new Date() } }
      );
    }
    const updatedMessages = await collection.find({ id: { $in: messageIds } }).toArray();
    return updatedMessages.map((row) => this.parseRow(row));
  }
  async getResourceById({ resourceId }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_RESOURCES);
      const result = await collection.findOne({ id: resourceId });
      if (!result) {
        return null;
      }
      return {
        id: result.id,
        workingMemory: result.workingMemory || "",
        metadata: typeof result.metadata === "string" ? storage.safelyParseJSON(result.metadata) : result.metadata,
        createdAt: formatDateForMongoDB(result.createdAt),
        updatedAt: formatDateForMongoDB(result.updatedAt)
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_RESOURCE_BY_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error$1
      );
    }
  }
  async saveResource({ resource }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_RESOURCES);
      await collection.updateOne(
        { id: resource.id },
        {
          $set: {
            ...resource,
            metadata: JSON.stringify(resource.metadata)
          }
        },
        { upsert: true }
      );
      return resource;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_SAVE_RESOURCE_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { resourceId: resource.id }
        },
        error$1
      );
    }
  }
  async updateResource({
    resourceId,
    workingMemory,
    metadata
  }) {
    try {
      const existingResource = await this.getResourceById({ resourceId });
      if (!existingResource) {
        const newResource = {
          id: resourceId,
          workingMemory: workingMemory || "",
          metadata: metadata || {},
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
        return this.saveResource({ resource: newResource });
      }
      const updatedResource = {
        ...existingResource,
        workingMemory: workingMemory !== void 0 ? workingMemory : existingResource.workingMemory,
        metadata: metadata ? { ...existingResource.metadata, ...metadata } : existingResource.metadata,
        updatedAt: /* @__PURE__ */ new Date()
      };
      const collection = await this.operations.getCollection(storage.TABLE_RESOURCES);
      const updateDoc = { updatedAt: updatedResource.updatedAt };
      if (workingMemory !== void 0) {
        updateDoc.workingMemory = workingMemory;
      }
      if (metadata) {
        updateDoc.metadata = JSON.stringify(updatedResource.metadata);
      }
      await collection.updateOne({ id: resourceId }, { $set: updateDoc });
      return updatedResource;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_UPDATE_RESOURCE_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error$1
      );
    }
  }
  async getThreadById({ threadId }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_THREADS);
      const result = await collection.findOne({ id: threadId });
      if (!result) {
        return null;
      }
      return {
        ...result,
        metadata: typeof result.metadata === "string" ? storage.safelyParseJSON(result.metadata) : result.metadata
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_THREAD_BY_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error$1
      );
    }
  }
  async getThreadsByResourceId({ resourceId }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_THREADS);
      const results = await collection.find({ resourceId }).sort({ updatedAt: -1 }).toArray();
      if (!results.length) {
        return [];
      }
      return results.map((result) => ({
        ...result,
        metadata: typeof result.metadata === "string" ? storage.safelyParseJSON(result.metadata) : result.metadata
      }));
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error$1
      );
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    try {
      const { resourceId, page, perPage } = args;
      const collection = await this.operations.getCollection(storage.TABLE_THREADS);
      const query = { resourceId };
      const total = await collection.countDocuments(query);
      const threads = await collection.find(query).sort({ updatedAt: -1 }).skip(page * perPage).limit(perPage).toArray();
      return {
        threads: threads.map((thread) => ({
          id: thread.id,
          title: thread.title,
          resourceId: thread.resourceId,
          createdAt: formatDateForMongoDB(thread.createdAt),
          updatedAt: formatDateForMongoDB(thread.updatedAt),
          metadata: thread.metadata || {}
        })),
        total,
        page,
        perPage,
        hasMore: (page + 1) * perPage < total
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "MONGODB_STORE_GET_THREADS_BY_RESOURCE_ID_PAGINATED_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { resourceId: args.resourceId }
        },
        error$1
      );
    }
  }
  async saveThread({ thread }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_THREADS);
      await collection.updateOne(
        { id: thread.id },
        {
          $set: {
            ...thread,
            metadata: thread.metadata
          }
        },
        { upsert: true }
      );
      return thread;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_SAVE_THREAD_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId: thread.id }
        },
        error$1
      );
    }
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    const thread = await this.getThreadById({ threadId: id });
    if (!thread) {
      throw new error.MastraError({
        id: "STORAGE_MONGODB_STORE_UPDATE_THREAD_NOT_FOUND",
        domain: error.ErrorDomain.STORAGE,
        category: error.ErrorCategory.THIRD_PARTY,
        details: { threadId: id, status: 404 },
        text: `Thread ${id} not found`
      });
    }
    const updatedThread = {
      ...thread,
      title,
      metadata: {
        ...thread.metadata,
        ...metadata
      }
    };
    try {
      const collection = await this.operations.getCollection(storage.TABLE_THREADS);
      await collection.updateOne(
        { id },
        {
          $set: {
            title,
            metadata: updatedThread.metadata
          }
        }
      );
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_UPDATE_THREAD_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId: id }
        },
        error$1
      );
    }
    return updatedThread;
  }
  async deleteThread({ threadId }) {
    try {
      const collectionMessages = await this.operations.getCollection(storage.TABLE_MESSAGES);
      await collectionMessages.deleteMany({ thread_id: threadId });
      const collectionThreads = await this.operations.getCollection(storage.TABLE_THREADS);
      await collectionThreads.deleteOne({ id: threadId });
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_DELETE_THREAD_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error$1
      );
    }
  }
};
var StoreOperationsMongoDB = class extends storage.StoreOperations {
  #connector;
  constructor(config) {
    super();
    this.#connector = config.connector;
  }
  async getCollection(collectionName) {
    return this.#connector.getCollection(collectionName);
  }
  async hasColumn(_table, _column) {
    return true;
  }
  async createTable() {
  }
  async alterTable(_args) {
  }
  async clearTable({ tableName }) {
    try {
      const collection = await this.getCollection(tableName);
      await collection.deleteMany({});
    } catch (error$1) {
      if (error$1 instanceof Error) {
        const matstraError = new error.MastraError(
          {
            id: "STORAGE_MONGODB_STORE_CLEAR_TABLE_FAILED",
            domain: error.ErrorDomain.STORAGE,
            category: error.ErrorCategory.THIRD_PARTY,
            details: { tableName }
          },
          error$1
        );
        this.logger.error(matstraError.message);
        this.logger?.trackException(matstraError);
      }
    }
  }
  async dropTable({ tableName }) {
    try {
      const collection = await this.getCollection(tableName);
      await collection.drop();
    } catch (error$1) {
      if (error$1 instanceof Error && error$1.message.includes("ns not found")) {
        return;
      }
      throw new error.MastraError(
        {
          id: "MONGODB_STORE_DROP_TABLE_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error$1
      );
    }
  }
  processJsonbFields(tableName, record) {
    const schema = storage.TABLE_SCHEMAS[tableName];
    return Object.fromEntries(
      Object.entries(schema).map(([key, value]) => {
        if (value.type === "jsonb" && record[key] && typeof record[key] === "string") {
          return [key, storage.safelyParseJSON(record[key])];
        }
        return [key, record[key]];
      })
    );
  }
  async insert({ tableName, record }) {
    try {
      const collection = await this.getCollection(tableName);
      const recordToInsert = this.processJsonbFields(tableName, record);
      await collection.insertOne(recordToInsert);
    } catch (error$1) {
      if (error$1 instanceof Error) {
        const matstraError = new error.MastraError(
          {
            id: "STORAGE_MONGODB_STORE_INSERT_FAILED",
            domain: error.ErrorDomain.STORAGE,
            category: error.ErrorCategory.THIRD_PARTY,
            details: { tableName }
          },
          error$1
        );
        this.logger.error(matstraError.message);
        this.logger?.trackException(matstraError);
      }
    }
  }
  async batchInsert({ tableName, records }) {
    if (!records.length) {
      return;
    }
    try {
      const collection = await this.getCollection(tableName);
      const processedRecords = records.map((record) => this.processJsonbFields(tableName, record));
      await collection.insertMany(processedRecords);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_BATCH_INSERT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error$1
      );
    }
  }
  async load({ tableName, keys }) {
    this.logger.info(`Loading ${tableName} with keys ${JSON.stringify(keys)}`);
    try {
      const collection = await this.getCollection(tableName);
      return await collection.find(keys).toArray();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_LOAD_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error$1
      );
    }
  }
};
function transformScoreRow(row) {
  let scorerValue = null;
  if (row.scorer) {
    try {
      scorerValue = typeof row.scorer === "string" ? storage.safelyParseJSON(row.scorer) : row.scorer;
    } catch (e) {
      console.warn("Failed to parse scorer:", e);
    }
  }
  let preprocessStepResultValue = null;
  if (row.preprocessStepResult) {
    try {
      preprocessStepResultValue = typeof row.preprocessStepResult === "string" ? storage.safelyParseJSON(row.preprocessStepResult) : row.preprocessStepResult;
    } catch (e) {
      console.warn("Failed to parse preprocessStepResult:", e);
    }
  }
  let analyzeStepResultValue = null;
  if (row.analyzeStepResult) {
    try {
      analyzeStepResultValue = typeof row.analyzeStepResult === "string" ? storage.safelyParseJSON(row.analyzeStepResult) : row.analyzeStepResult;
    } catch (e) {
      console.warn("Failed to parse analyzeStepResult:", e);
    }
  }
  let inputValue = null;
  if (row.input) {
    try {
      inputValue = typeof row.input === "string" ? storage.safelyParseJSON(row.input) : row.input;
    } catch (e) {
      console.warn("Failed to parse input:", e);
    }
  }
  let outputValue = null;
  if (row.output) {
    try {
      outputValue = typeof row.output === "string" ? storage.safelyParseJSON(row.output) : row.output;
    } catch (e) {
      console.warn("Failed to parse output:", e);
    }
  }
  let entityValue = null;
  if (row.entity) {
    try {
      entityValue = typeof row.entity === "string" ? storage.safelyParseJSON(row.entity) : row.entity;
    } catch (e) {
      console.warn("Failed to parse entity:", e);
    }
  }
  let runtimeContextValue = null;
  if (row.runtimeContext) {
    try {
      runtimeContextValue = typeof row.runtimeContext === "string" ? storage.safelyParseJSON(row.runtimeContext) : row.runtimeContext;
    } catch (e) {
      console.warn("Failed to parse runtimeContext:", e);
    }
  }
  return {
    id: row.id,
    entityId: row.entityId,
    entityType: row.entityType,
    scorerId: row.scorerId,
    traceId: row.traceId,
    runId: row.runId,
    scorer: scorerValue,
    preprocessStepResult: preprocessStepResultValue,
    analyzeStepResult: analyzeStepResultValue,
    score: row.score,
    reason: row.reason,
    extractPrompt: row.extractPrompt,
    analyzePrompt: row.analyzePrompt,
    reasonPrompt: row.reasonPrompt,
    input: inputValue,
    output: outputValue,
    additionalContext: row.additionalContext,
    runtimeContext: runtimeContextValue,
    entity: entityValue,
    source: row.source,
    resourceId: row.resourceId,
    threadId: row.threadId,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt)
  };
}
var ScoresStorageMongoDB = class extends storage.ScoresStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getScoreById({ id }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_SCORERS);
      const document = await collection.findOne({ id });
      if (!document) {
        return null;
      }
      return transformScoreRow(document);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_SCORE_BY_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { id }
        },
        error$1
      );
    }
  }
  async saveScore(score) {
    try {
      const now = /* @__PURE__ */ new Date();
      const scoreId = `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const scoreData = {
        id: scoreId,
        entityId: score.entityId,
        entityType: score.entityType,
        scorerId: score.scorerId,
        traceId: score.traceId || "",
        runId: score.runId,
        scorer: typeof score.scorer === "string" ? storage.safelyParseJSON(score.scorer) : score.scorer,
        preprocessStepResult: typeof score.preprocessStepResult === "string" ? storage.safelyParseJSON(score.preprocessStepResult) : score.preprocessStepResult,
        analyzeStepResult: typeof score.analyzeStepResult === "string" ? storage.safelyParseJSON(score.analyzeStepResult) : score.analyzeStepResult,
        score: score.score,
        reason: score.reason,
        preprocessPrompt: score.preprocessPrompt,
        generateScorePrompt: score.generateScorePrompt,
        generateReasonPrompt: score.generateReasonPrompt,
        analyzePrompt: score.analyzePrompt,
        reasonPrompt: score.reasonPrompt,
        input: typeof score.input === "string" ? storage.safelyParseJSON(score.input) : score.input,
        output: typeof score.output === "string" ? storage.safelyParseJSON(score.output) : score.output,
        additionalContext: score.additionalContext,
        runtimeContext: typeof score.runtimeContext === "string" ? storage.safelyParseJSON(score.runtimeContext) : score.runtimeContext,
        entity: typeof score.entity === "string" ? storage.safelyParseJSON(score.entity) : score.entity,
        source: score.source,
        resourceId: score.resourceId || "",
        threadId: score.threadId || "",
        createdAt: now,
        updatedAt: now
      };
      const collection = await this.operations.getCollection(storage.TABLE_SCORERS);
      await collection.insertOne(scoreData);
      const savedScore = {
        ...score,
        id: scoreId,
        createdAt: now,
        updatedAt: now
      };
      return { score: savedScore };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_SAVE_SCORE_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { scorerId: score.scorerId, runId: score.runId }
        },
        error$1
      );
    }
  }
  async getScoresByScorerId({
    scorerId,
    pagination,
    entityId,
    entityType
  }) {
    try {
      const query = { scorerId };
      if (entityId) {
        query.entityId = entityId;
      }
      if (entityType) {
        query.entityType = entityType;
      }
      const collection = await this.operations.getCollection(storage.TABLE_SCORERS);
      const total = await collection.countDocuments(query);
      const currentOffset = pagination.page * pagination.perPage;
      if (total === 0) {
        return {
          scores: [],
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          }
        };
      }
      const documents = await collection.find(query).sort({ createdAt: "desc" }).skip(currentOffset).limit(pagination.perPage).toArray();
      const scores = documents.map((row) => transformScoreRow(row));
      const hasMore = currentOffset + scores.length < total;
      return {
        scores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_SCORES_BY_SCORER_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { scorerId, page: pagination.page, perPage: pagination.perPage }
        },
        error$1
      );
    }
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_SCORERS);
      const total = await collection.countDocuments({ runId });
      const currentOffset = pagination.page * pagination.perPage;
      if (total === 0) {
        return {
          scores: [],
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          }
        };
      }
      const documents = await collection.find({ runId }).sort({ createdAt: "desc" }).skip(currentOffset).limit(pagination.perPage).toArray();
      const scores = documents.map((row) => transformScoreRow(row));
      const hasMore = currentOffset + scores.length < total;
      return {
        scores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_SCORES_BY_RUN_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { runId, page: pagination.page, perPage: pagination.perPage }
        },
        error$1
      );
    }
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_SCORERS);
      const total = await collection.countDocuments({ entityId, entityType });
      const currentOffset = pagination.page * pagination.perPage;
      if (total === 0) {
        return {
          scores: [],
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          }
        };
      }
      const documents = await collection.find({ entityId, entityType }).sort({ createdAt: "desc" }).skip(currentOffset).limit(pagination.perPage).toArray();
      const scores = documents.map((row) => transformScoreRow(row));
      const hasMore = currentOffset + scores.length < total;
      return {
        scores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_SCORES_BY_ENTITY_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { entityId, entityType, page: pagination.page, perPage: pagination.perPage }
        },
        error$1
      );
    }
  }
};
var TracesStorageMongoDB = class extends storage.TracesStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getTraces(args) {
    if (args.fromDate || args.toDate) {
      args.dateRange = {
        start: args.fromDate,
        end: args.toDate
      };
    }
    try {
      const result = await this.getTracesPaginated(args);
      return result.traces;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_TRACES_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
      );
    }
  }
  async getTracesPaginated(args) {
    const { name, scope, page = 0, perPage = 100, attributes, filters, dateRange } = args;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const currentOffset = page * perPage;
    const query = {};
    if (name) {
      query["name"] = new RegExp(name);
    }
    if (scope) {
      query["scope"] = scope;
    }
    if (attributes) {
      query["$and"] = Object.entries(attributes).map(([key, value]) => ({
        [`attributes.${key}`]: value
      }));
    }
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query[key] = value;
      });
    }
    if (fromDate || toDate) {
      query["createdAt"] = {};
      if (fromDate) {
        query["createdAt"]["$gte"] = fromDate;
      }
      if (toDate) {
        query["createdAt"]["$lte"] = toDate;
      }
    }
    try {
      const collection = await this.operations.getCollection(storage.TABLE_TRACES);
      const total = await collection.countDocuments(query);
      if (total === 0) {
        return {
          traces: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const result = await collection.find(query, {
        sort: { startTime: -1 }
      }).limit(perPage).skip(currentOffset).toArray();
      const traces = result.map((row) => ({
        id: row.id,
        parentSpanId: row.parentSpanId,
        traceId: row.traceId,
        name: row.name,
        scope: row.scope,
        kind: row.kind,
        status: storage.safelyParseJSON(row.status),
        events: storage.safelyParseJSON(row.events),
        links: storage.safelyParseJSON(row.links),
        attributes: storage.safelyParseJSON(row.attributes),
        startTime: row.startTime,
        endTime: row.endTime,
        other: storage.safelyParseJSON(row.other),
        createdAt: row.createdAt
      }));
      return {
        traces,
        total,
        page,
        perPage,
        hasMore: currentOffset + traces.length < total
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_TRACES_PAGINATED_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY
        },
        error$1
      );
    }
  }
  async batchTraceInsert({ records }) {
    this.logger.debug("Batch inserting traces", { count: records.length });
    await this.operations.batchInsert({
      tableName: storage.TABLE_TRACES,
      records
    });
  }
};
var WorkflowsStorageMongoDB = class extends storage.WorkflowsStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    snapshot
  }) {
    try {
      const collection = await this.operations.getCollection(storage.TABLE_WORKFLOW_SNAPSHOT);
      await collection.updateOne(
        { workflow_name: workflowName, run_id: runId },
        {
          $set: {
            workflow_name: workflowName,
            run_id: runId,
            snapshot,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }
        },
        { upsert: true }
      );
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_PERSIST_WORKFLOW_SNAPSHOT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { workflowName, runId }
        },
        error$1
      );
    }
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    try {
      const result = await this.operations.load({
        tableName: storage.TABLE_WORKFLOW_SNAPSHOT,
        keys: {
          workflow_name: workflowName,
          run_id: runId
        }
      });
      if (!result?.length) {
        return null;
      }
      return typeof result[0].snapshot === "string" ? storage.safelyParseJSON(result[0].snapshot) : result[0].snapshot;
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_LOAD_WORKFLOW_SNAPSHOT_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { workflowName, runId }
        },
        error$1
      );
    }
  }
  async getWorkflowRuns(args) {
    const options = args || {};
    try {
      const query = {};
      if (options.workflowName) {
        query["workflow_name"] = options.workflowName;
      }
      if (options.fromDate) {
        query["createdAt"] = { $gte: options.fromDate };
      }
      if (options.toDate) {
        if (query["createdAt"]) {
          query["createdAt"].$lte = options.toDate;
        } else {
          query["createdAt"] = { $lte: options.toDate };
        }
      }
      if (options.resourceId) {
        query["resourceId"] = options.resourceId;
      }
      const collection = await this.operations.getCollection(storage.TABLE_WORKFLOW_SNAPSHOT);
      const total = await collection.countDocuments(query);
      let cursor = collection.find(query).sort({ createdAt: -1 });
      if (options.offset) {
        cursor = cursor.skip(options.offset);
      }
      if (options.limit) {
        cursor = cursor.limit(options.limit);
      }
      const results = await cursor.toArray();
      const runs = results.map((row) => this.parseWorkflowRun(row));
      return {
        runs,
        total
      };
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_WORKFLOW_RUNS_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { workflowName: options.workflowName || "unknown" }
        },
        error$1
      );
    }
  }
  async getWorkflowRunById(args) {
    try {
      const query = {};
      if (args.runId) {
        query["run_id"] = args.runId;
      }
      if (args.workflowName) {
        query["workflow_name"] = args.workflowName;
      }
      const collection = await this.operations.getCollection(storage.TABLE_WORKFLOW_SNAPSHOT);
      const result = await collection.findOne(query);
      if (!result) {
        return null;
      }
      return this.parseWorkflowRun(result);
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_GET_WORKFLOW_RUN_BY_ID_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.THIRD_PARTY,
          details: { runId: args.runId }
        },
        error$1
      );
    }
  }
  parseWorkflowRun(row) {
    let parsedSnapshot = row.snapshot;
    if (typeof parsedSnapshot === "string") {
      try {
        parsedSnapshot = typeof row.snapshot === "string" ? storage.safelyParseJSON(row.snapshot) : row.snapshot;
      } catch (e) {
        console.warn(`Failed to parse snapshot for workflow ${row.workflow_name}: ${e}`);
      }
    }
    return {
      workflowName: row.workflow_name,
      runId: row.run_id,
      snapshot: parsedSnapshot,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      resourceId: row.resourceId
    };
  }
};

// src/storage/index.ts
var loadConnector = (config) => {
  try {
    if ("connectorHandler" in config) {
      return MongoDBConnector.fromConnectionHandler(config.connectorHandler);
    }
  } catch (error$1) {
    throw new error.MastraError(
      {
        id: "STORAGE_MONGODB_STORE_CONSTRUCTOR_FAILED",
        domain: error.ErrorDomain.STORAGE,
        category: error.ErrorCategory.USER,
        details: { connectionHandler: true }
      },
      error$1
    );
  }
  try {
    return MongoDBConnector.fromDatabaseConfig({
      options: config.options,
      url: config.url,
      dbName: config.dbName
    });
  } catch (error$1) {
    throw new error.MastraError(
      {
        id: "STORAGE_MONGODB_STORE_CONSTRUCTOR_FAILED",
        domain: error.ErrorDomain.STORAGE,
        category: error.ErrorCategory.USER,
        details: { url: config?.url, dbName: config?.dbName }
      },
      error$1
    );
  }
};
var MongoDBStore = class extends storage.MastraStorage {
  #connector;
  stores;
  get supports() {
    return {
      selectByIncludeResourceScope: true,
      resourceWorkingMemory: true,
      hasColumn: false,
      createTable: false,
      deleteMessages: false
    };
  }
  constructor(config) {
    super({ name: "MongoDBStore" });
    this.stores = {};
    this.#connector = loadConnector(config);
    const operations = new StoreOperationsMongoDB({
      connector: this.#connector
    });
    const memory = new MemoryStorageMongoDB({
      operations
    });
    const traces = new TracesStorageMongoDB({
      operations
    });
    const legacyEvals = new LegacyEvalsMongoDB({
      operations
    });
    const scores = new ScoresStorageMongoDB({
      operations
    });
    const workflows = new WorkflowsStorageMongoDB({
      operations
    });
    this.stores = {
      operations,
      memory,
      traces,
      legacyEvals,
      scores,
      workflows
    };
  }
  async createTable({
    tableName,
    schema
  }) {
    return this.stores.operations.createTable({ tableName, schema });
  }
  async alterTable(_args) {
    return this.stores.operations.alterTable(_args);
  }
  async dropTable({ tableName }) {
    return this.stores.operations.dropTable({ tableName });
  }
  async clearTable({ tableName }) {
    return this.stores.operations.clearTable({ tableName });
  }
  async insert({ tableName, record }) {
    return this.stores.operations.insert({ tableName, record });
  }
  async batchInsert({ tableName, records }) {
    return this.stores.operations.batchInsert({ tableName, records });
  }
  async load({ tableName, keys }) {
    return this.stores.operations.load({ tableName, keys });
  }
  async getThreadById({ threadId }) {
    return this.stores.memory.getThreadById({ threadId });
  }
  async getThreadsByResourceId({ resourceId }) {
    return this.stores.memory.getThreadsByResourceId({ resourceId });
  }
  async saveThread({ thread }) {
    return this.stores.memory.saveThread({ thread });
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    return this.stores.memory.updateThread({ id, title, metadata });
  }
  async deleteThread({ threadId }) {
    return this.stores.memory.deleteThread({ threadId });
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessages({ threadId, selectBy, format });
  }
  async saveMessages(args) {
    return this.stores.memory.saveMessages(args);
  }
  async getThreadsByResourceIdPaginated(_args) {
    return this.stores.memory.getThreadsByResourceIdPaginated(_args);
  }
  async getMessagesPaginated(_args) {
    return this.stores.memory.getMessagesPaginated(_args);
  }
  async updateMessages(_args) {
    return this.stores.memory.updateMessages(_args);
  }
  async getTraces(args) {
    return this.stores.traces.getTraces(args);
  }
  async getTracesPaginated(args) {
    return this.stores.traces.getTracesPaginated(args);
  }
  async getWorkflowRuns(args) {
    return this.stores.workflows.getWorkflowRuns(args);
  }
  async getEvals(options = {}) {
    return this.stores.legacyEvals.getEvals(options);
  }
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    snapshot
  }) {
    return this.stores.workflows.persistWorkflowSnapshot({ workflowName, runId, snapshot });
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    return this.stores.workflows.loadWorkflowSnapshot({ workflowName, runId });
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    return this.stores.workflows.getWorkflowRunById({ runId, workflowName });
  }
  async close() {
    try {
      await this.#connector.close();
    } catch (error$1) {
      throw new error.MastraError(
        {
          id: "STORAGE_MONGODB_STORE_CLOSE_FAILED",
          domain: error.ErrorDomain.STORAGE,
          category: error.ErrorCategory.USER
        },
        error$1
      );
    }
  }
  /**
   * SCORERS
   */
  async getScoreById({ id }) {
    return this.stores.scores.getScoreById({ id });
  }
  async saveScore(score) {
    return this.stores.scores.saveScore(score);
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    return this.stores.scores.getScoresByRunId({ runId, pagination });
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    return this.stores.scores.getScoresByEntityId({ entityId, entityType, pagination });
  }
  async getScoresByScorerId({
    scorerId,
    pagination,
    entityId,
    entityType
  }) {
    return this.stores.scores.getScoresByScorerId({ scorerId, pagination, entityId, entityType });
  }
  /**
   * RESOURCES
   */
  async getResourceById({ resourceId }) {
    return this.stores.memory.getResourceById({ resourceId });
  }
  async saveResource({ resource }) {
    return this.stores.memory.saveResource({ resource });
  }
  async updateResource({
    resourceId,
    workingMemory,
    metadata
  }) {
    return this.stores.memory.updateResource({
      resourceId,
      workingMemory,
      metadata
    });
  }
};

// src/vector/prompt.ts
var MONGODB_PROMPT = `When querying MongoDB Vector, you can ONLY use the operators listed below. Any other operators will be rejected.
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
- $all: Match all values in array
  Example: { "tags": { "$all": ["premium", "sale"] } }
- $elemMatch: Match array elements that meet all specified conditions
  Example: { "items": { "$elemMatch": { "price": { "$gt": 100 } } } }
- $size: Match arrays with specific length
  Example: { "tags": { "$size": 3 } }

Logical Operators:
- $and: Logical AND (can be implicit or explicit)
  Implicit Example: { "price": { "$gt": 100 }, "category": "electronics" }
  Explicit Example: { "$and": [{ "price": { "$gt": 100 } }, { "category": "electronics" }] }
- $or: Logical OR
  Example: { "$or": [{ "price": { "$lt": 50 } }, { "category": "books" }] }
- $not: Logical NOT
  Example: { "$not": { "category": "electronics" } }
- $nor: Logical NOR
  Example: { "$nor": [{ "price": { "$lt": 50 } }, { "category": "books" }] }

Element Operators:
- $exists: Check if field exists
  Example: { "rating": { "$exists": true } }
- $type: Check field type
  Example: { "price": { "$type": "number" } }

Text Search Operators:
- $text: Full text search
  Example: { "$text": { "$search": "gaming laptop" } }
- $regex: Regular expression match
  Example: { "name": { "$regex": "^Gaming" } }

Restrictions:
- Only logical operators ($and, $or, $not, $nor) can be used at the top level
- Empty arrays in array operators will return no results
- Nested fields are supported using dot notation
- Multiple conditions on the same field are supported
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
- Logical operators ($and, $or, $not, $nor):
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
    { "tags": { "$all": ["premium", "sale"] } },
    { "items": { "$elemMatch": { "price": { "$gt": 50 }, "inStock": true } } },
    { "$text": { "$search": "gaming laptop" } },
    { "$or": [
      { "stock": { "$gt": 0 } },
      { "preorder": true }
    ]},
    { "$not": { "status": "discontinued" } }
  ]
}`;

exports.MONGODB_PROMPT = MONGODB_PROMPT;
exports.MongoDBStore = MongoDBStore;
exports.MongoDBVector = MongoDBVector;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map