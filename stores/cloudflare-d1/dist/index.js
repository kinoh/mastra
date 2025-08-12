import { MastraError, ErrorCategory, ErrorDomain } from '@mastra/core/error';
import { MastraStorage, StoreOperations, ScoresStorage, TABLE_SCORERS, LegacyEvalsStorage, TABLE_EVALS, serializeDate, TracesStorage, TABLE_TRACES, WorkflowsStorage, TABLE_WORKFLOW_SNAPSHOT, ensureDate, MemoryStorage, TABLE_RESOURCES, TABLE_THREADS, TABLE_MESSAGES, resolveMessageLimit } from '@mastra/core/storage';
import Cloudflare from 'cloudflare';
import { parseSqlIdentifier } from '@mastra/core/utils';
import { MessageList } from '@mastra/core/agent';

// src/storage/index.ts
var SqlBuilder = class {
  sql = "";
  params = [];
  whereAdded = false;
  // Basic query building
  select(columns) {
    if (!columns || Array.isArray(columns) && columns.length === 0) {
      this.sql = "SELECT *";
    } else {
      const cols = Array.isArray(columns) ? columns : [columns];
      const parsedCols = cols.map((col) => parseSelectIdentifier(col));
      this.sql = `SELECT ${parsedCols.join(", ")}`;
    }
    return this;
  }
  from(table) {
    const parsedTableName = parseSqlIdentifier(table, "table name");
    this.sql += ` FROM ${parsedTableName}`;
    return this;
  }
  /**
   * Add a WHERE clause to the query
   * @param condition The condition to add
   * @param params Parameters to bind to the condition
   */
  where(condition, ...params) {
    this.sql += ` WHERE ${condition}`;
    this.params.push(...params);
    this.whereAdded = true;
    return this;
  }
  /**
   * Add a WHERE clause if it hasn't been added yet, otherwise add an AND clause
   * @param condition The condition to add
   * @param params Parameters to bind to the condition
   */
  whereAnd(condition, ...params) {
    if (this.whereAdded) {
      return this.andWhere(condition, ...params);
    } else {
      return this.where(condition, ...params);
    }
  }
  andWhere(condition, ...params) {
    this.sql += ` AND ${condition}`;
    this.params.push(...params);
    return this;
  }
  orWhere(condition, ...params) {
    this.sql += ` OR ${condition}`;
    this.params.push(...params);
    return this;
  }
  orderBy(column, direction = "ASC") {
    const parsedColumn = parseSqlIdentifier(column, "column name");
    if (!["ASC", "DESC"].includes(direction)) {
      throw new Error(`Invalid sort direction: ${direction}`);
    }
    this.sql += ` ORDER BY ${parsedColumn} ${direction}`;
    return this;
  }
  limit(count) {
    this.sql += ` LIMIT ?`;
    this.params.push(count);
    return this;
  }
  offset(count) {
    this.sql += ` OFFSET ?`;
    this.params.push(count);
    return this;
  }
  count() {
    this.sql += "SELECT COUNT(*) AS count";
    return this;
  }
  /**
   * Insert a row, or update specific columns on conflict (upsert).
   * @param table Table name
   * @param columns Columns to insert
   * @param values Values to insert
   * @param conflictColumns Columns to check for conflict (usually PK or UNIQUE)
   * @param updateMap Object mapping columns to update to their new value (e.g. { name: 'excluded.name' })
   */
  insert(table, columns, values, conflictColumns, updateMap) {
    const parsedTableName = parseSqlIdentifier(table, "table name");
    const parsedColumns = columns.map((col) => parseSqlIdentifier(col, "column name"));
    const placeholders = parsedColumns.map(() => "?").join(", ");
    if (conflictColumns && updateMap) {
      const parsedConflictColumns = conflictColumns.map((col) => parseSqlIdentifier(col, "column name"));
      const updateClause = Object.entries(updateMap).map(([col, expr]) => `${col} = ${expr}`).join(", ");
      this.sql = `INSERT INTO ${parsedTableName} (${parsedColumns.join(", ")}) VALUES (${placeholders}) ON CONFLICT(${parsedConflictColumns.join(", ")}) DO UPDATE SET ${updateClause}`;
      this.params.push(...values);
      return this;
    }
    this.sql = `INSERT INTO ${parsedTableName} (${parsedColumns.join(", ")}) VALUES (${placeholders})`;
    this.params.push(...values);
    return this;
  }
  // Update operations
  update(table, columns, values) {
    const parsedTableName = parseSqlIdentifier(table, "table name");
    const parsedColumns = columns.map((col) => parseSqlIdentifier(col, "column name"));
    const setClause = parsedColumns.map((col) => `${col} = ?`).join(", ");
    this.sql = `UPDATE ${parsedTableName} SET ${setClause}`;
    this.params.push(...values);
    return this;
  }
  // Delete operations
  delete(table) {
    const parsedTableName = parseSqlIdentifier(table, "table name");
    this.sql = `DELETE FROM ${parsedTableName}`;
    return this;
  }
  /**
   * Create a table if it doesn't exist
   * @param table The table name
   * @param columnDefinitions The column definitions as an array of strings
   * @param tableConstraints Optional constraints for the table
   * @returns The builder instance
   */
  createTable(table, columnDefinitions, tableConstraints) {
    const parsedTableName = parseSqlIdentifier(table, "table name");
    const parsedColumnDefinitions = columnDefinitions.map((def) => {
      const colName = def.split(/\s+/)[0];
      if (!colName) throw new Error("Empty column name in definition");
      parseSqlIdentifier(colName, "column name");
      return def;
    });
    const columns = parsedColumnDefinitions.join(", ");
    const constraints = tableConstraints && tableConstraints.length > 0 ? ", " + tableConstraints.join(", ") : "";
    this.sql = `CREATE TABLE IF NOT EXISTS ${parsedTableName} (${columns}${constraints})`;
    return this;
  }
  /**
   * Check if an index exists in the database
   * @param indexName The name of the index to check
   * @param tableName The table the index is on
   * @returns The builder instance
   */
  checkIndexExists(indexName, tableName) {
    this.sql = `SELECT name FROM sqlite_master WHERE type='index' AND name=? AND tbl_name=?`;
    this.params.push(indexName, tableName);
    return this;
  }
  /**
   * Create an index if it doesn't exist
   * @param indexName The name of the index to create
   * @param tableName The table to create the index on
   * @param columnName The column to index
   * @param indexType Optional index type (e.g., 'UNIQUE')
   * @returns The builder instance
   */
  createIndex(indexName, tableName, columnName, indexType = "") {
    const parsedIndexName = parseSqlIdentifier(indexName, "index name");
    const parsedTableName = parseSqlIdentifier(tableName, "table name");
    const parsedColumnName = parseSqlIdentifier(columnName, "column name");
    this.sql = `CREATE ${indexType ? indexType + " " : ""}INDEX IF NOT EXISTS ${parsedIndexName} ON ${parsedTableName}(${parsedColumnName})`;
    return this;
  }
  /**
   * Add a LIKE condition to the query
   * @param column The column to check
   * @param value The value to match (will be wrapped with % for LIKE)
   * @param exact If true, will not add % wildcards
   */
  like(column, value, exact = false) {
    const parsedColumnName = parseSqlIdentifier(column, "column name");
    const likeValue = exact ? value : `%${value}%`;
    if (this.whereAdded) {
      this.sql += ` AND ${parsedColumnName} LIKE ?`;
    } else {
      this.sql += ` WHERE ${parsedColumnName} LIKE ?`;
      this.whereAdded = true;
    }
    this.params.push(likeValue);
    return this;
  }
  /**
   * Add a JSON LIKE condition for searching in JSON fields
   * @param column The JSON column to search in
   * @param key The JSON key to match
   * @param value The value to match
   */
  jsonLike(column, key, value) {
    const parsedColumnName = parseSqlIdentifier(column, "column name");
    const parsedKey = parseSqlIdentifier(key, "key name");
    const jsonPattern = `%"${parsedKey}":"${value}"%`;
    if (this.whereAdded) {
      this.sql += ` AND ${parsedColumnName} LIKE ?`;
    } else {
      this.sql += ` WHERE ${parsedColumnName} LIKE ?`;
      this.whereAdded = true;
    }
    this.params.push(jsonPattern);
    return this;
  }
  /**
   * Get the built query
   * @returns Object containing the SQL string and parameters array
   */
  build() {
    return {
      sql: this.sql,
      params: this.params
    };
  }
  /**
   * Reset the builder for reuse
   * @returns The reset builder instance
   */
  reset() {
    this.sql = "";
    this.params = [];
    this.whereAdded = false;
    return this;
  }
};
function createSqlBuilder() {
  return new SqlBuilder();
}
var SQL_IDENTIFIER_PATTERN = /^[a-zA-Z0-9_]+(\s+AS\s+[a-zA-Z0-9_]+)?$/;
function parseSelectIdentifier(column) {
  if (column !== "*" && !SQL_IDENTIFIER_PATTERN.test(column)) {
    throw new Error(
      `Invalid column name: "${column}". Must be "*" or a valid identifier (letters, numbers, underscores), optionally with "AS alias".`
    );
  }
  return column;
}

// src/storage/domains/utils.ts
function isArrayOfRecords(value) {
  return value && Array.isArray(value) && value.length > 0;
}
function deserializeValue(value, type) {
  if (value === null || value === void 0) return null;
  if (type === "date" && typeof value === "string") {
    return new Date(value);
  }
  if (type === "jsonb" && typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  if (typeof value === "string" && (value.startsWith("{") || value.startsWith("["))) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

// src/storage/domains/legacy-evals/index.ts
var LegacyEvalsStorageD1 = class extends LegacyEvalsStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getEvals(options) {
    const { agentName, type, page = 0, perPage = 40, dateRange } = options || {};
    const fullTableName = this.operations.getTableName(TABLE_EVALS);
    const conditions = [];
    const queryParams = [];
    if (agentName) {
      conditions.push(`agent_name = ?`);
      queryParams.push(agentName);
    }
    if (type === "test") {
      conditions.push(`(test_info IS NOT NULL AND json_extract(test_info, '$.testPath') IS NOT NULL)`);
    } else if (type === "live") {
      conditions.push(`(test_info IS NULL OR json_extract(test_info, '$.testPath') IS NULL)`);
    }
    if (dateRange?.start) {
      conditions.push(`created_at >= ?`);
      queryParams.push(serializeDate(dateRange.start));
    }
    if (dateRange?.end) {
      conditions.push(`created_at <= ?`);
      queryParams.push(serializeDate(dateRange.end));
    }
    const countQueryBuilder = createSqlBuilder().count().from(fullTableName);
    if (conditions.length > 0) {
      countQueryBuilder.where(conditions.join(" AND "), ...queryParams);
    }
    const { sql: countSql, params: countParams } = countQueryBuilder.build();
    try {
      const countResult = await this.operations.executeQuery({
        sql: countSql,
        params: countParams,
        first: true
      });
      const total = Number(countResult?.count || 0);
      const currentOffset = page * perPage;
      if (total === 0) {
        return {
          evals: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const dataQueryBuilder = createSqlBuilder().select("*").from(fullTableName);
      if (conditions.length > 0) {
        dataQueryBuilder.where(conditions.join(" AND "), ...queryParams);
      }
      dataQueryBuilder.orderBy("created_at", "DESC").limit(perPage).offset(currentOffset);
      const { sql: dataSql, params: dataParams } = dataQueryBuilder.build();
      const rows = await this.operations.executeQuery({
        sql: dataSql,
        params: dataParams
      });
      const evals = (isArrayOfRecords(rows) ? rows : []).map((row) => {
        const result = deserializeValue(row.result);
        const testInfo = row.test_info ? deserializeValue(row.test_info) : void 0;
        if (!result || typeof result !== "object" || !("score" in result)) {
          throw new Error(`Invalid MetricResult format: ${JSON.stringify(result)}`);
        }
        return {
          input: row.input,
          output: row.output,
          result,
          agentName: row.agent_name,
          metricName: row.metric_name,
          instructions: row.instructions,
          testInfo,
          globalRunId: row.global_run_id,
          runId: row.run_id,
          createdAt: row.created_at
        };
      });
      const hasMore = currentOffset + evals.length < total;
      return {
        evals,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_EVALS_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve evals for agent ${agentName}: ${error instanceof Error ? error.message : String(error)}`,
          details: { agentName: agentName ?? "", type: type ?? "" }
        },
        error
      );
    }
  }
  /**
   * @deprecated use getEvals instead
   */
  async getEvalsByAgentName(agentName, type) {
    const fullTableName = this.operations.getTableName(TABLE_EVALS);
    try {
      let query = createSqlBuilder().select("*").from(fullTableName).where("agent_name = ?", agentName);
      if (type === "test") {
        query = query.andWhere("test_info IS NOT NULL AND json_extract(test_info, '$.testPath') IS NOT NULL");
      } else if (type === "live") {
        query = query.andWhere("(test_info IS NULL OR json_extract(test_info, '$.testPath') IS NULL)");
      }
      query.orderBy("created_at", "DESC");
      const { sql, params } = query.build();
      const results = await this.operations.executeQuery({ sql, params });
      return isArrayOfRecords(results) ? results.map((row) => {
        const result = deserializeValue(row.result);
        const testInfo = row.test_info ? deserializeValue(row.test_info) : void 0;
        return {
          input: row.input || "",
          output: row.output || "",
          result,
          agentName: row.agent_name || "",
          metricName: row.metric_name || "",
          instructions: row.instructions || "",
          runId: row.run_id || "",
          globalRunId: row.global_run_id || "",
          createdAt: row.created_at || "",
          testInfo
        };
      }) : [];
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_EVALS_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve evals for agent ${agentName}: ${error instanceof Error ? error.message : String(error)}`,
          details: { agentName }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return [];
    }
  }
};
var MemoryStorageD1 = class extends MemoryStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getResourceById({ resourceId }) {
    const resource = await this.operations.load({
      tableName: TABLE_RESOURCES,
      keys: { id: resourceId }
    });
    if (!resource) return null;
    try {
      return {
        ...resource,
        createdAt: ensureDate(resource.createdAt),
        updatedAt: ensureDate(resource.updatedAt),
        metadata: typeof resource.metadata === "string" ? JSON.parse(resource.metadata || "{}") : resource.metadata
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_RESOURCE_BY_ID_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error processing resource ${resourceId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { resourceId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return null;
    }
  }
  async saveResource({ resource }) {
    const fullTableName = this.operations.getTableName(TABLE_RESOURCES);
    const resourceToSave = {
      id: resource.id,
      workingMemory: resource.workingMemory,
      metadata: resource.metadata ? JSON.stringify(resource.metadata) : null,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt
    };
    const processedRecord = await this.operations.processRecord(resourceToSave);
    const columns = Object.keys(processedRecord);
    const values = Object.values(processedRecord);
    const updateMap = {
      workingMemory: "excluded.workingMemory",
      metadata: "excluded.metadata",
      createdAt: "excluded.createdAt",
      updatedAt: "excluded.updatedAt"
    };
    const query = createSqlBuilder().insert(fullTableName, columns, values, ["id"], updateMap);
    const { sql, params } = query.build();
    try {
      await this.operations.executeQuery({ sql, params });
      return resource;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_SAVE_RESOURCE_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to save resource to ${fullTableName}: ${error instanceof Error ? error.message : String(error)}`,
          details: { resourceId: resource.id }
        },
        error
      );
    }
  }
  async updateResource({
    resourceId,
    workingMemory,
    metadata
  }) {
    const existingResource = await this.getResourceById({ resourceId });
    if (!existingResource) {
      const newResource = {
        id: resourceId,
        workingMemory,
        metadata: metadata || {},
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      return this.saveResource({ resource: newResource });
    }
    const updatedAt = /* @__PURE__ */ new Date();
    const updatedResource = {
      ...existingResource,
      workingMemory: workingMemory !== void 0 ? workingMemory : existingResource.workingMemory,
      metadata: {
        ...existingResource.metadata,
        ...metadata
      },
      updatedAt
    };
    const fullTableName = this.operations.getTableName(TABLE_RESOURCES);
    const columns = ["workingMemory", "metadata", "updatedAt"];
    const values = [updatedResource.workingMemory, JSON.stringify(updatedResource.metadata), updatedAt.toISOString()];
    const query = createSqlBuilder().update(fullTableName, columns, values).where("id = ?", resourceId);
    const { sql, params } = query.build();
    try {
      await this.operations.executeQuery({ sql, params });
      return updatedResource;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_UPDATE_RESOURCE_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to update resource ${resourceId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { resourceId }
        },
        error
      );
    }
  }
  async getThreadById({ threadId }) {
    const thread = await this.operations.load({
      tableName: TABLE_THREADS,
      keys: { id: threadId }
    });
    if (!thread) return null;
    console.log("thread", thread);
    try {
      return {
        ...thread,
        createdAt: ensureDate(thread.createdAt),
        updatedAt: ensureDate(thread.updatedAt),
        metadata: typeof thread.metadata === "string" ? JSON.parse(thread.metadata || "{}") : thread.metadata || {}
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_THREAD_BY_ID_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error processing thread ${threadId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return null;
    }
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead
   */
  async getThreadsByResourceId({ resourceId }) {
    const fullTableName = this.operations.getTableName(TABLE_THREADS);
    try {
      const query = createSqlBuilder().select("*").from(fullTableName).where("resourceId = ?", resourceId);
      const { sql, params } = query.build();
      const results = await this.operations.executeQuery({ sql, params });
      return (isArrayOfRecords(results) ? results : []).map((thread) => ({
        ...thread,
        createdAt: ensureDate(thread.createdAt),
        updatedAt: ensureDate(thread.updatedAt),
        metadata: typeof thread.metadata === "string" ? JSON.parse(thread.metadata || "{}") : thread.metadata || {}
      }));
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_THREADS_BY_RESOURCE_ID_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error getting threads by resourceId ${resourceId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { resourceId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return [];
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    const { resourceId, page, perPage } = args;
    const fullTableName = this.operations.getTableName(TABLE_THREADS);
    const mapRowToStorageThreadType = (row) => ({
      ...row,
      createdAt: ensureDate(row.createdAt),
      updatedAt: ensureDate(row.updatedAt),
      metadata: typeof row.metadata === "string" ? JSON.parse(row.metadata || "{}") : row.metadata || {}
    });
    try {
      const countQuery = createSqlBuilder().count().from(fullTableName).where("resourceId = ?", resourceId);
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Number(countResult?.[0]?.count ?? 0);
      const selectQuery = createSqlBuilder().select("*").from(fullTableName).where("resourceId = ?", resourceId).orderBy("createdAt", "DESC").limit(perPage).offset(page * perPage);
      const results = await this.operations.executeQuery(selectQuery.build());
      const threads = results.map(mapRowToStorageThreadType);
      return {
        threads,
        total,
        page,
        perPage,
        hasMore: page * perPage + threads.length < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_THREADS_BY_RESOURCE_ID_PAGINATED_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error getting threads by resourceId ${resourceId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { resourceId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return {
        threads: [],
        total: 0,
        page,
        perPage,
        hasMore: false
      };
    }
  }
  async saveThread({ thread }) {
    const fullTableName = this.operations.getTableName(TABLE_THREADS);
    const threadToSave = {
      id: thread.id,
      resourceId: thread.resourceId,
      title: thread.title,
      metadata: thread.metadata ? JSON.stringify(thread.metadata) : null,
      createdAt: thread.createdAt.toISOString(),
      updatedAt: thread.updatedAt.toISOString()
    };
    const processedRecord = await this.operations.processRecord(threadToSave);
    const columns = Object.keys(processedRecord);
    const values = Object.values(processedRecord);
    const updateMap = {
      resourceId: "excluded.resourceId",
      title: "excluded.title",
      metadata: "excluded.metadata",
      createdAt: "excluded.createdAt",
      updatedAt: "excluded.updatedAt"
    };
    const query = createSqlBuilder().insert(fullTableName, columns, values, ["id"], updateMap);
    const { sql, params } = query.build();
    try {
      await this.operations.executeQuery({ sql, params });
      return thread;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_SAVE_THREAD_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to save thread to ${fullTableName}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId: thread.id }
        },
        error
      );
    }
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    const thread = await this.getThreadById({ threadId: id });
    try {
      if (!thread) {
        throw new Error(`Thread ${id} not found`);
      }
      const fullTableName = this.operations.getTableName(TABLE_THREADS);
      const mergedMetadata = {
        ...typeof thread.metadata === "string" ? JSON.parse(thread.metadata) : thread.metadata,
        ...metadata
      };
      const updatedAt = /* @__PURE__ */ new Date();
      const columns = ["title", "metadata", "updatedAt"];
      const values = [title, JSON.stringify(mergedMetadata), updatedAt.toISOString()];
      const query = createSqlBuilder().update(fullTableName, columns, values).where("id = ?", id);
      const { sql, params } = query.build();
      await this.operations.executeQuery({ sql, params });
      return {
        ...thread,
        title,
        metadata: {
          ...typeof thread.metadata === "string" ? JSON.parse(thread.metadata) : thread.metadata,
          ...metadata
        },
        updatedAt
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_UPDATE_THREAD_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to update thread ${id}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId: id }
        },
        error
      );
    }
  }
  async deleteThread({ threadId }) {
    const fullTableName = this.operations.getTableName(TABLE_THREADS);
    try {
      const deleteThreadQuery = createSqlBuilder().delete(fullTableName).where("id = ?", threadId);
      const { sql: threadSql, params: threadParams } = deleteThreadQuery.build();
      await this.operations.executeQuery({ sql: threadSql, params: threadParams });
      const messagesTableName = this.operations.getTableName(TABLE_MESSAGES);
      const deleteMessagesQuery = createSqlBuilder().delete(messagesTableName).where("thread_id = ?", threadId);
      const { sql: messagesSql, params: messagesParams } = deleteMessagesQuery.build();
      await this.operations.executeQuery({ sql: messagesSql, params: messagesParams });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_DELETE_THREAD_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to delete thread ${threadId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId }
        },
        error
      );
    }
  }
  async saveMessages(args) {
    const { messages, format = "v1" } = args;
    if (messages.length === 0) return [];
    try {
      const now = /* @__PURE__ */ new Date();
      const threadId = messages[0]?.threadId;
      for (const [i, message] of messages.entries()) {
        if (!message.id) throw new Error(`Message at index ${i} missing id`);
        if (!message.threadId) {
          throw new Error(`Message at index ${i} missing threadId`);
        }
        if (!message.content) {
          throw new Error(`Message at index ${i} missing content`);
        }
        if (!message.role) {
          throw new Error(`Message at index ${i} missing role`);
        }
        if (!message.resourceId) {
          throw new Error(`Message at index ${i} missing resourceId`);
        }
        const thread = await this.getThreadById({ threadId: message.threadId });
        if (!thread) {
          throw new Error(`Thread ${message.threadId} not found`);
        }
      }
      const messagesToInsert = messages.map((message) => {
        const createdAt = message.createdAt ? new Date(message.createdAt) : now;
        return {
          id: message.id,
          thread_id: message.threadId,
          content: typeof message.content === "string" ? message.content : JSON.stringify(message.content),
          createdAt: createdAt.toISOString(),
          role: message.role,
          type: message.type || "v2",
          resourceId: message.resourceId
        };
      });
      await Promise.all([
        this.operations.batchUpsert({
          tableName: TABLE_MESSAGES,
          records: messagesToInsert
        }),
        // Update thread's updatedAt timestamp
        this.operations.executeQuery({
          sql: `UPDATE ${this.operations.getTableName(TABLE_THREADS)} SET updatedAt = ? WHERE id = ?`,
          params: [now.toISOString(), threadId]
        })
      ]);
      this.logger.debug(`Saved ${messages.length} messages`);
      const list = new MessageList().add(messages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_SAVE_MESSAGES_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to save messages: ${error instanceof Error ? error.message : String(error)}`
        },
        error
      );
    }
  }
  async _getIncludedMessages(threadId, selectBy) {
    const include = selectBy?.include;
    if (!include) return null;
    const unionQueries = [];
    const params = [];
    let paramIdx = 1;
    for (const inc of include) {
      const { id, withPreviousMessages = 0, withNextMessages = 0 } = inc;
      const searchId = inc.threadId || threadId;
      unionQueries.push(`
                SELECT * FROM (
                  WITH ordered_messages AS (
                    SELECT
                      *,
                      ROW_NUMBER() OVER (ORDER BY createdAt ASC) AS row_num
                    FROM ${this.operations.getTableName(TABLE_MESSAGES)}
                    WHERE thread_id = ?
                  )
                  SELECT
                    m.id,
                    m.content,
                    m.role,
                    m.type,
                    m.createdAt,
                    m.thread_id AS threadId,
                    m.resourceId
                  FROM ordered_messages m
                  WHERE m.id = ?
                  OR EXISTS (
                    SELECT 1 FROM ordered_messages target
                    WHERE target.id = ?
                    AND (
                      (m.row_num <= target.row_num + ? AND m.row_num > target.row_num)
                      OR
                      (m.row_num >= target.row_num - ? AND m.row_num < target.row_num)
                    )
                  )
                ) AS query_${paramIdx}
            `);
      params.push(searchId, id, id, withNextMessages, withPreviousMessages);
      paramIdx++;
    }
    const finalQuery = unionQueries.join(" UNION ALL ") + " ORDER BY createdAt ASC";
    const messages = await this.operations.executeQuery({ sql: finalQuery, params });
    if (!Array.isArray(messages)) {
      return [];
    }
    const processedMessages = messages.map((message) => {
      const processedMsg = {};
      for (const [key, value] of Object.entries(message)) {
        if (key === `type` && value === `v2`) continue;
        processedMsg[key] = deserializeValue(value);
      }
      return processedMsg;
    });
    return processedMessages;
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    const fullTableName = this.operations.getTableName(TABLE_MESSAGES);
    const limit = resolveMessageLimit({
      last: selectBy?.last,
      defaultLimit: 40
    });
    const include = selectBy?.include || [];
    const messages = [];
    try {
      if (include.length) {
        const includeResult = await this._getIncludedMessages(threadId, selectBy);
        if (Array.isArray(includeResult)) messages.push(...includeResult);
      }
      const excludeIds = messages.map((m) => m.id);
      const query = createSqlBuilder().select(["id", "content", "role", "type", "createdAt", "thread_id AS threadId"]).from(fullTableName).where("thread_id = ?", threadId);
      if (excludeIds.length > 0) {
        query.andWhere(`id NOT IN (${excludeIds.map(() => "?").join(",")})`, ...excludeIds);
      }
      query.orderBy("createdAt", "DESC").limit(limit);
      const { sql, params } = query.build();
      const result = await this.operations.executeQuery({ sql, params });
      if (Array.isArray(result)) messages.push(...result);
      messages.sort((a, b) => {
        const aRecord = a;
        const bRecord = b;
        const timeA = new Date(aRecord.createdAt).getTime();
        const timeB = new Date(bRecord.createdAt).getTime();
        return timeA - timeB;
      });
      const processedMessages = messages.map((message) => {
        const processedMsg = {};
        for (const [key, value] of Object.entries(message)) {
          if (key === `type` && value === `v2`) continue;
          processedMsg[key] = deserializeValue(value);
        }
        return processedMsg;
      });
      this.logger.debug(`Retrieved ${messages.length} messages for thread ${threadId}`);
      const list = new MessageList().add(processedMessages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_MESSAGES_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve messages for thread ${threadId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      throw mastraError;
    }
  }
  async getMessagesPaginated({
    threadId,
    selectBy,
    format
  }) {
    const { dateRange, page = 0, perPage: perPageInput } = selectBy?.pagination || {};
    const { start: fromDate, end: toDate } = dateRange || {};
    const perPage = perPageInput !== void 0 ? perPageInput : resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
    const fullTableName = this.operations.getTableName(TABLE_MESSAGES);
    const messages = [];
    try {
      if (selectBy?.include?.length) {
        const includeResult = await this._getIncludedMessages(threadId, selectBy);
        if (Array.isArray(includeResult)) messages.push(...includeResult);
      }
      const countQuery = createSqlBuilder().count().from(fullTableName).where("thread_id = ?", threadId);
      if (fromDate) {
        countQuery.andWhere("createdAt >= ?", serializeDate(fromDate));
      }
      if (toDate) {
        countQuery.andWhere("createdAt <= ?", serializeDate(toDate));
      }
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Number(countResult[0]?.count ?? 0);
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
      const excludeCondition = excludeIds.length > 0 ? `AND id NOT IN (${excludeIds.map(() => "?").join(",")})` : "";
      let query;
      let queryParams = [threadId];
      if (fromDate) {
        queryParams.push(serializeDate(fromDate));
      }
      if (toDate) {
        queryParams.push(serializeDate(toDate));
      }
      if (excludeIds.length > 0) {
        queryParams.push(...excludeIds);
      }
      if (selectBy?.last && selectBy.last > 0) {
        query = `
                    SELECT id, content, role, type, createdAt, thread_id AS threadId, resourceId
                    FROM ${fullTableName}
                    WHERE thread_id = ?
                    ${fromDate ? "AND createdAt >= ?" : ""}
                    ${toDate ? "AND createdAt <= ?" : ""}
                    ${excludeCondition}
                    ORDER BY createdAt DESC
                    LIMIT ?
                `;
        queryParams.push(selectBy.last);
      } else {
        query = `
                    SELECT id, content, role, type, createdAt, thread_id AS threadId, resourceId
                    FROM ${fullTableName}
                    WHERE thread_id = ?
                    ${fromDate ? "AND createdAt >= ?" : ""}
                    ${toDate ? "AND createdAt <= ?" : ""}
                    ${excludeCondition}
                    ORDER BY createdAt DESC
                    LIMIT ? OFFSET ?
                `;
        queryParams.push(perPage, page * perPage);
      }
      const results = await this.operations.executeQuery({ sql: query, params: queryParams });
      const processedMessages = results.map((message) => {
        const processedMsg = {};
        for (const [key, value] of Object.entries(message)) {
          if (key === `type` && value === `v2`) continue;
          processedMsg[key] = deserializeValue(value);
        }
        return processedMsg;
      });
      if (selectBy?.last) {
        processedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      const list = new MessageList().add(processedMessages, "memory");
      messages.push(...format === `v2` ? list.get.all.v2() : list.get.all.v1());
      return {
        messages,
        total,
        page,
        perPage,
        hasMore: selectBy?.last ? false : page * perPage + messages.length < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_MESSAGES_PAGINATED_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve messages for thread ${threadId}: ${error instanceof Error ? error.message : String(error)}`,
          details: { threadId }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return {
        messages: [],
        total: 0,
        page,
        perPage,
        hasMore: false
      };
    }
  }
  async updateMessages(args) {
    const { messages } = args;
    this.logger.debug("Updating messages", { count: messages.length });
    if (!messages.length) {
      return [];
    }
    const messageIds = messages.map((m) => m.id);
    const fullTableName = this.operations.getTableName(TABLE_MESSAGES);
    const threadsTableName = this.operations.getTableName(TABLE_THREADS);
    try {
      const placeholders = messageIds.map(() => "?").join(",");
      const selectQuery = `SELECT id, content, role, type, createdAt, thread_id AS threadId, resourceId FROM ${fullTableName} WHERE id IN (${placeholders})`;
      const existingMessages = await this.operations.executeQuery({ sql: selectQuery, params: messageIds });
      if (existingMessages.length === 0) {
        return [];
      }
      const parsedExistingMessages = existingMessages.map((msg) => {
        if (typeof msg.content === "string") {
          try {
            msg.content = JSON.parse(msg.content);
          } catch {
          }
        }
        return msg;
      });
      const threadIdsToUpdate = /* @__PURE__ */ new Set();
      const updateQueries = [];
      for (const existingMessage of parsedExistingMessages) {
        const updatePayload = messages.find((m) => m.id === existingMessage.id);
        if (!updatePayload) continue;
        const { id, ...fieldsToUpdate } = updatePayload;
        if (Object.keys(fieldsToUpdate).length === 0) continue;
        threadIdsToUpdate.add(existingMessage.threadId);
        if ("threadId" in updatePayload && updatePayload.threadId && updatePayload.threadId !== existingMessage.threadId) {
          threadIdsToUpdate.add(updatePayload.threadId);
        }
        const setClauses = [];
        const values = [];
        const updatableFields = { ...fieldsToUpdate };
        if (updatableFields.content) {
          const existingContent = existingMessage.content || {};
          const newContent = {
            ...existingContent,
            ...updatableFields.content,
            // Deep merge metadata if it exists on both
            ...existingContent?.metadata && updatableFields.content.metadata ? {
              metadata: {
                ...existingContent.metadata,
                ...updatableFields.content.metadata
              }
            } : {}
          };
          setClauses.push(`content = ?`);
          values.push(JSON.stringify(newContent));
          delete updatableFields.content;
        }
        for (const key in updatableFields) {
          if (Object.prototype.hasOwnProperty.call(updatableFields, key)) {
            const dbColumn = key === "threadId" ? "thread_id" : key;
            setClauses.push(`${dbColumn} = ?`);
            values.push(updatableFields[key]);
          }
        }
        if (setClauses.length > 0) {
          values.push(id);
          const updateQuery = `UPDATE ${fullTableName} SET ${setClauses.join(", ")} WHERE id = ?`;
          updateQueries.push({ sql: updateQuery, params: values });
        }
      }
      for (const query of updateQueries) {
        await this.operations.executeQuery(query);
      }
      if (threadIdsToUpdate.size > 0) {
        const threadPlaceholders = Array.from(threadIdsToUpdate).map(() => "?").join(",");
        const threadUpdateQuery = `UPDATE ${threadsTableName} SET updatedAt = ? WHERE id IN (${threadPlaceholders})`;
        const threadUpdateParams = [(/* @__PURE__ */ new Date()).toISOString(), ...Array.from(threadIdsToUpdate)];
        await this.operations.executeQuery({ sql: threadUpdateQuery, params: threadUpdateParams });
      }
      const updatedMessages = await this.operations.executeQuery({ sql: selectQuery, params: messageIds });
      return updatedMessages.map((message) => {
        if (typeof message.content === "string") {
          try {
            message.content = JSON.parse(message.content);
          } catch {
          }
        }
        return message;
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_UPDATE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { count: messages.length }
        },
        error
      );
    }
  }
};
var StoreOperationsD1 = class extends StoreOperations {
  client;
  binding;
  tablePrefix;
  constructor(config) {
    super();
    this.client = config.client;
    this.binding = config.binding;
    this.tablePrefix = config.tablePrefix || "";
  }
  async hasColumn(table, column) {
    const fullTableName = table.startsWith(this.tablePrefix) ? table : `${this.tablePrefix}${table}`;
    const sql = `PRAGMA table_info(${fullTableName});`;
    const result = await this.executeQuery({ sql, params: [] });
    if (!result || !Array.isArray(result)) return false;
    return result.some((col) => col.name === column || col.name === column.toLowerCase());
  }
  getTableName(tableName) {
    return `${this.tablePrefix}${tableName}`;
  }
  formatSqlParams(params) {
    return params.map((p) => p === void 0 || p === null ? null : p);
  }
  async executeWorkersBindingQuery({
    sql,
    params = [],
    first = false
  }) {
    if (!this.binding) {
      throw new Error("Workers binding is not configured");
    }
    try {
      const statement = this.binding.prepare(sql);
      const formattedParams = this.formatSqlParams(params);
      let result;
      if (formattedParams.length > 0) {
        if (first) {
          result = await statement.bind(...formattedParams).first();
          if (!result) return null;
          return result;
        } else {
          result = await statement.bind(...formattedParams).all();
          const results = result.results || [];
          return results;
        }
      } else {
        if (first) {
          result = await statement.first();
          if (!result) return null;
          return result;
        } else {
          result = await statement.all();
          const results = result.results || [];
          return results;
        }
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_WORKERS_BINDING_QUERY_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { sql }
        },
        error
      );
    }
  }
  async executeRestQuery({
    sql,
    params = [],
    first = false
  }) {
    if (!this.client) {
      throw new Error("D1 client is not configured");
    }
    try {
      const formattedParams = this.formatSqlParams(params);
      const response = await this.client.query({
        sql,
        params: formattedParams
      });
      const result = response.result || [];
      const results = result.flatMap((r) => r.results || []);
      if (first) {
        return results[0] || null;
      }
      return results;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_REST_QUERY_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { sql }
        },
        error
      );
    }
  }
  async executeQuery(options) {
    if (this.binding) {
      return this.executeWorkersBindingQuery(options);
    } else if (this.client) {
      return this.executeRestQuery(options);
    } else {
      throw new Error("Neither binding nor client is configured");
    }
  }
  async getTableColumns(tableName) {
    try {
      const sql = `PRAGMA table_info(${tableName})`;
      const result = await this.executeQuery({ sql });
      if (!result || !Array.isArray(result)) {
        return [];
      }
      return result.map((row) => ({
        name: row.name,
        type: row.type
      }));
    } catch (error) {
      this.logger.warn(`Failed to get table columns for ${tableName}:`, error);
      return [];
    }
  }
  serializeValue(value) {
    if (value === null || value === void 0) {
      return null;
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  }
  getSqlType(type) {
    switch (type) {
      case "bigint":
        return "INTEGER";
      // SQLite uses INTEGER for all integer sizes
      case "jsonb":
        return "TEXT";
      // Store JSON as TEXT in SQLite
      default:
        return super.getSqlType(type);
    }
  }
  async createTable({
    tableName,
    schema
  }) {
    try {
      const fullTableName = this.getTableName(tableName);
      const columnDefinitions = Object.entries(schema).map(([colName, colDef]) => {
        const type = this.getSqlType(colDef.type);
        const nullable = colDef.nullable === false ? "NOT NULL" : "";
        const primaryKey = colDef.primaryKey ? "PRIMARY KEY" : "";
        return `${colName} ${type} ${nullable} ${primaryKey}`.trim();
      });
      const tableConstraints = [];
      if (tableName === TABLE_WORKFLOW_SNAPSHOT) {
        tableConstraints.push("UNIQUE (workflow_name, run_id)");
      }
      const query = createSqlBuilder().createTable(fullTableName, columnDefinitions, tableConstraints);
      const { sql, params } = query.build();
      await this.executeQuery({ sql, params });
      this.logger.debug(`Created table ${fullTableName}`);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_CREATE_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async clearTable({ tableName }) {
    try {
      const fullTableName = this.getTableName(tableName);
      const query = createSqlBuilder().delete(fullTableName);
      const { sql, params } = query.build();
      await this.executeQuery({ sql, params });
      this.logger.debug(`Cleared table ${fullTableName}`);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_CLEAR_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async dropTable({ tableName }) {
    try {
      const fullTableName = this.getTableName(tableName);
      const sql = `DROP TABLE IF EXISTS ${fullTableName}`;
      await this.executeQuery({ sql });
      this.logger.debug(`Dropped table ${fullTableName}`);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_DROP_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async alterTable(args) {
    try {
      const fullTableName = this.getTableName(args.tableName);
      const existingColumns = await this.getTableColumns(fullTableName);
      const existingColumnNames = new Set(existingColumns.map((col) => col.name));
      for (const [columnName, column] of Object.entries(args.schema)) {
        if (!existingColumnNames.has(columnName) && args.ifNotExists.includes(columnName)) {
          const sqlType = this.getSqlType(column.type);
          const defaultValue = this.getDefaultValue(column.type);
          const sql = `ALTER TABLE ${fullTableName} ADD COLUMN ${columnName} ${sqlType} ${defaultValue}`;
          await this.executeQuery({ sql });
          this.logger.debug(`Added column ${columnName} to table ${fullTableName}`);
        }
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_ALTER_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName: args.tableName }
        },
        error
      );
    }
  }
  async insert({ tableName, record }) {
    try {
      const fullTableName = this.getTableName(tableName);
      const processedRecord = await this.processRecord(record);
      const columns = Object.keys(processedRecord);
      const values = Object.values(processedRecord);
      const query = createSqlBuilder().insert(fullTableName, columns, values);
      const { sql, params } = query.build();
      await this.executeQuery({ sql, params });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async batchInsert({ tableName, records }) {
    try {
      if (records.length === 0) return;
      const fullTableName = this.getTableName(tableName);
      const processedRecords = await Promise.all(records.map((record) => this.processRecord(record)));
      const columns = Object.keys(processedRecords[0] || {});
      for (const record of processedRecords) {
        const values = Object.values(record);
        const query = createSqlBuilder().insert(fullTableName, columns, values);
        const { sql, params } = query.build();
        await this.executeQuery({ sql, params });
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_BATCH_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async load({ tableName, keys }) {
    try {
      const fullTableName = this.getTableName(tableName);
      const query = createSqlBuilder().select("*").from(fullTableName);
      let firstKey = true;
      for (const [key, value] of Object.entries(keys)) {
        if (firstKey) {
          query.where(`${key} = ?`, value);
          firstKey = false;
        } else {
          query.andWhere(`${key} = ?`, value);
        }
      }
      query.limit(1);
      const { sql, params } = query.build();
      const result = await this.executeQuery({ sql, params, first: true });
      if (!result) {
        return null;
      }
      const deserializedResult = {};
      for (const [key, value] of Object.entries(result)) {
        deserializedResult[key] = deserializeValue(value);
      }
      return deserializedResult;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_OPERATIONS_LOAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async processRecord(record) {
    const processed = {};
    for (const [key, value] of Object.entries(record)) {
      processed[key] = this.serializeValue(value);
    }
    return processed;
  }
  /**
   * Upsert multiple records in a batch operation
   * @param tableName The table to insert into
   * @param records The records to insert
   */
  async batchUpsert({ tableName, records }) {
    if (records.length === 0) return;
    const fullTableName = this.getTableName(tableName);
    try {
      const batchSize = 50;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const recordsToInsert = batch;
        if (recordsToInsert.length > 0) {
          const firstRecord = recordsToInsert[0];
          const columns = Object.keys(firstRecord || {});
          for (const record of recordsToInsert) {
            const values = columns.map((col) => {
              if (!record) return null;
              const value = typeof col === "string" ? record[col] : null;
              return this.serializeValue(value);
            });
            const recordToUpsert = columns.reduce(
              (acc, col) => {
                if (col !== "createdAt") acc[col] = `excluded.${col}`;
                return acc;
              },
              {}
            );
            const query = createSqlBuilder().insert(fullTableName, columns, values, ["id"], recordToUpsert);
            const { sql, params } = query.build();
            await this.executeQuery({ sql, params });
          }
        }
        this.logger.debug(
          `Processed batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(records.length / batchSize)}`
        );
      }
      this.logger.debug(`Successfully batch upserted ${records.length} records into ${tableName}`);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_BATCH_UPSERT_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to batch upsert into ${tableName}: ${error instanceof Error ? error.message : String(error)}`,
          details: { tableName }
        },
        error
      );
    }
  }
};
function transformScoreRow(row) {
  let input = void 0;
  if (row.input) {
    try {
      input = JSON.parse(row.input);
    } catch {
      input = row.input;
    }
  }
  return {
    ...row,
    input,
    createdAt: row.createdAtZ || row.createdAt,
    updatedAt: row.updatedAtZ || row.updatedAt
  };
}
var ScoresStorageD1 = class extends ScoresStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getScoreById({ id }) {
    try {
      const fullTableName = this.operations.getTableName(TABLE_SCORERS);
      const query = createSqlBuilder().select("*").from(fullTableName).where("id = ?", id);
      const { sql, params } = query.build();
      const result = await this.operations.executeQuery({ sql, params, first: true });
      if (!result) {
        return null;
      }
      return transformScoreRow(result);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_SCORES_GET_SCORE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async saveScore(score) {
    try {
      const fullTableName = this.operations.getTableName(TABLE_SCORERS);
      const { input, ...rest } = score;
      const serializedRecord = {};
      for (const [key, value] of Object.entries(rest)) {
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            serializedRecord[key] = JSON.stringify(value);
          } else {
            serializedRecord[key] = value;
          }
        } else {
          serializedRecord[key] = null;
        }
      }
      serializedRecord.input = JSON.stringify(input);
      serializedRecord.createdAt = (/* @__PURE__ */ new Date()).toISOString();
      serializedRecord.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      const columns = Object.keys(serializedRecord);
      const values = Object.values(serializedRecord);
      const query = createSqlBuilder().insert(fullTableName, columns, values);
      const { sql, params } = query.build();
      await this.operations.executeQuery({ sql, params });
      const scoreFromDb = await this.getScoreById({ id: score.id });
      return { score: scoreFromDb };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_SCORES_SAVE_SCORE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresByScorerId({
    scorerId,
    pagination
  }) {
    try {
      const fullTableName = this.operations.getTableName(TABLE_SCORERS);
      const countQuery = createSqlBuilder().count().from(fullTableName).where("scorerId = ?", scorerId);
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Array.isArray(countResult) ? Number(countResult?.[0]?.count ?? 0) : Number(countResult?.count ?? 0);
      if (total === 0) {
        return {
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          },
          scores: []
        };
      }
      const selectQuery = createSqlBuilder().select("*").from(fullTableName).where("scorerId = ?", scorerId).limit(pagination.perPage).offset(pagination.page * pagination.perPage);
      const { sql, params } = selectQuery.build();
      const results = await this.operations.executeQuery({ sql, params });
      const scores = Array.isArray(results) ? results.map(transformScoreRow) : [];
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: total > (pagination.page + 1) * pagination.perPage
        },
        scores
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_SCORES_GET_SCORES_BY_SCORER_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    try {
      const fullTableName = this.operations.getTableName(TABLE_SCORERS);
      const countQuery = createSqlBuilder().count().from(fullTableName).where("runId = ?", runId);
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Array.isArray(countResult) ? Number(countResult?.[0]?.count ?? 0) : Number(countResult?.count ?? 0);
      if (total === 0) {
        return {
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          },
          scores: []
        };
      }
      const selectQuery = createSqlBuilder().select("*").from(fullTableName).where("runId = ?", runId).limit(pagination.perPage).offset(pagination.page * pagination.perPage);
      const { sql, params } = selectQuery.build();
      const results = await this.operations.executeQuery({ sql, params });
      const scores = Array.isArray(results) ? results.map(transformScoreRow) : [];
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: total > (pagination.page + 1) * pagination.perPage
        },
        scores
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_SCORES_GET_SCORES_BY_RUN_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    try {
      const fullTableName = this.operations.getTableName(TABLE_SCORERS);
      const countQuery = createSqlBuilder().count().from(fullTableName).where("entityId = ?", entityId).andWhere("entityType = ?", entityType);
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Array.isArray(countResult) ? Number(countResult?.[0]?.count ?? 0) : Number(countResult?.count ?? 0);
      if (total === 0) {
        return {
          pagination: {
            total: 0,
            page: pagination.page,
            perPage: pagination.perPage,
            hasMore: false
          },
          scores: []
        };
      }
      const selectQuery = createSqlBuilder().select("*").from(fullTableName).where("entityId = ?", entityId).andWhere("entityType = ?", entityType).limit(pagination.perPage).offset(pagination.page * pagination.perPage);
      const { sql, params } = selectQuery.build();
      const results = await this.operations.executeQuery({ sql, params });
      const scores = Array.isArray(results) ? results.map(transformScoreRow) : [];
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: total > (pagination.page + 1) * pagination.perPage
        },
        scores
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORE_SCORES_GET_SCORES_BY_ENTITY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
};
function isArrayOfRecords2(value) {
  return value && Array.isArray(value) && value.length > 0;
}
var TracesStorageD1 = class extends TracesStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getTraces(args) {
    const paginatedArgs = {
      name: args.name,
      scope: args.scope,
      page: args.page,
      perPage: args.perPage,
      attributes: args.attributes,
      filters: args.filters,
      dateRange: args.fromDate || args.toDate ? {
        start: args.fromDate,
        end: args.toDate
      } : void 0
    };
    try {
      const result = await this.getTracesPaginated(paginatedArgs);
      return result.traces;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_TRACES_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve traces: ${error instanceof Error ? error.message : String(error)}`,
          details: {
            name: args.name ?? "",
            scope: args.scope ?? ""
          }
        },
        error
      );
    }
  }
  async getTracesPaginated(args) {
    const { name, scope, page = 0, perPage = 100, attributes, dateRange } = args;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const fullTableName = this.operations.getTableName(TABLE_TRACES);
    try {
      const dataQuery = createSqlBuilder().select("*").from(fullTableName).where("1=1");
      const countQuery = createSqlBuilder().count().from(fullTableName).where("1=1");
      if (name) {
        dataQuery.andWhere("name LIKE ?", `%${name}%`);
        countQuery.andWhere("name LIKE ?", `%${name}%`);
      }
      if (scope) {
        dataQuery.andWhere("scope = ?", scope);
        countQuery.andWhere("scope = ?", scope);
      }
      if (attributes && Object.keys(attributes).length > 0) {
        for (const [key, value] of Object.entries(attributes)) {
          dataQuery.jsonLike("attributes", key, value);
          countQuery.jsonLike("attributes", key, value);
        }
      }
      if (fromDate) {
        const fromDateStr = fromDate instanceof Date ? fromDate.toISOString() : fromDate;
        dataQuery.andWhere("createdAt >= ?", fromDateStr);
        countQuery.andWhere("createdAt >= ?", fromDateStr);
      }
      if (toDate) {
        const toDateStr = toDate instanceof Date ? toDate.toISOString() : toDate;
        dataQuery.andWhere("createdAt <= ?", toDateStr);
        countQuery.andWhere("createdAt <= ?", toDateStr);
      }
      const allDataResult = await this.operations.executeQuery(
        createSqlBuilder().select("*").from(fullTableName).where("1=1").build()
      );
      console.log("allDataResult", allDataResult);
      const countResult = await this.operations.executeQuery(countQuery.build());
      const total = Number(countResult?.[0]?.count ?? 0);
      dataQuery.orderBy("startTime", "DESC").limit(perPage).offset(page * perPage);
      const results = await this.operations.executeQuery(dataQuery.build());
      const traces = isArrayOfRecords2(results) ? results.map(
        (trace) => ({
          ...trace,
          attributes: deserializeValue(trace.attributes, "jsonb"),
          status: deserializeValue(trace.status, "jsonb"),
          events: deserializeValue(trace.events, "jsonb"),
          links: deserializeValue(trace.links, "jsonb"),
          other: deserializeValue(trace.other, "jsonb")
        })
      ) : [];
      return {
        traces,
        total,
        page,
        perPage,
        hasMore: page * perPage + traces.length < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_TRACES_PAGINATED_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve traces: ${error instanceof Error ? error.message : String(error)}`,
          details: { name: name ?? "", scope: scope ?? "" }
        },
        error
      );
      this.logger?.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return { traces: [], total: 0, page, perPage, hasMore: false };
    }
  }
  async batchTraceInsert({ records }) {
    this.logger.debug("Batch inserting traces", { count: records.length });
    await this.operations.batchInsert({
      tableName: TABLE_TRACES,
      records
    });
  }
};
var WorkflowsStorageD1 = class extends WorkflowsStorage {
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
    const fullTableName = this.operations.getTableName(TABLE_WORKFLOW_SNAPSHOT);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const currentSnapshot = await this.operations.load({
      tableName: TABLE_WORKFLOW_SNAPSHOT,
      keys: { workflow_name: workflowName, run_id: runId }
    });
    const persisting = currentSnapshot ? {
      ...currentSnapshot,
      snapshot: JSON.stringify(snapshot),
      updatedAt: now
    } : {
      workflow_name: workflowName,
      run_id: runId,
      snapshot,
      createdAt: now,
      updatedAt: now
    };
    const processedRecord = await this.operations.processRecord(persisting);
    const columns = Object.keys(processedRecord);
    const values = Object.values(processedRecord);
    const updateMap = {
      snapshot: "excluded.snapshot",
      updatedAt: "excluded.updatedAt"
    };
    this.logger.debug("Persisting workflow snapshot", { workflowName, runId });
    const query = createSqlBuilder().insert(fullTableName, columns, values, ["workflow_name", "run_id"], updateMap);
    const { sql, params } = query.build();
    try {
      await this.operations.executeQuery({ sql, params });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_PERSIST_WORKFLOW_SNAPSHOT_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to persist workflow snapshot: ${error instanceof Error ? error.message : String(error)}`,
          details: { workflowName, runId }
        },
        error
      );
    }
  }
  async loadWorkflowSnapshot(params) {
    const { workflowName, runId } = params;
    this.logger.debug("Loading workflow snapshot", { workflowName, runId });
    try {
      const d = await this.operations.load({
        tableName: TABLE_WORKFLOW_SNAPSHOT,
        keys: {
          workflow_name: workflowName,
          run_id: runId
        }
      });
      return d ? d.snapshot : null;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_LOAD_WORKFLOW_SNAPSHOT_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to load workflow snapshot: ${error instanceof Error ? error.message : String(error)}`,
          details: { workflowName, runId }
        },
        error
      );
    }
  }
  parseWorkflowRun(row) {
    let parsedSnapshot = row.snapshot;
    if (typeof parsedSnapshot === "string") {
      try {
        parsedSnapshot = JSON.parse(row.snapshot);
      } catch (e) {
        console.warn(`Failed to parse snapshot for workflow ${row.workflow_name}: ${e}`);
      }
    }
    return {
      workflowName: row.workflow_name,
      runId: row.run_id,
      snapshot: parsedSnapshot,
      createdAt: ensureDate(row.createdAt),
      updatedAt: ensureDate(row.updatedAt),
      resourceId: row.resourceId
    };
  }
  async getWorkflowRuns({
    workflowName,
    fromDate,
    toDate,
    limit,
    offset,
    resourceId
  } = {}) {
    const fullTableName = this.operations.getTableName(TABLE_WORKFLOW_SNAPSHOT);
    try {
      const builder = createSqlBuilder().select().from(fullTableName);
      const countBuilder = createSqlBuilder().count().from(fullTableName);
      if (workflowName) builder.whereAnd("workflow_name = ?", workflowName);
      if (resourceId) {
        const hasResourceId = await this.operations.hasColumn(fullTableName, "resourceId");
        if (hasResourceId) {
          builder.whereAnd("resourceId = ?", resourceId);
          countBuilder.whereAnd("resourceId = ?", resourceId);
        } else {
          console.warn(`[${fullTableName}] resourceId column not found. Skipping resourceId filter.`);
        }
      }
      if (fromDate) {
        builder.whereAnd("createdAt >= ?", fromDate instanceof Date ? fromDate.toISOString() : fromDate);
        countBuilder.whereAnd("createdAt >= ?", fromDate instanceof Date ? fromDate.toISOString() : fromDate);
      }
      if (toDate) {
        builder.whereAnd("createdAt <= ?", toDate instanceof Date ? toDate.toISOString() : toDate);
        countBuilder.whereAnd("createdAt <= ?", toDate instanceof Date ? toDate.toISOString() : toDate);
      }
      builder.orderBy("createdAt", "DESC");
      if (typeof limit === "number") builder.limit(limit);
      if (typeof offset === "number") builder.offset(offset);
      const { sql, params } = builder.build();
      let total = 0;
      if (limit !== void 0 && offset !== void 0) {
        const { sql: countSql, params: countParams } = countBuilder.build();
        const countResult = await this.operations.executeQuery({
          sql: countSql,
          params: countParams,
          first: true
        });
        total = Number(countResult?.count ?? 0);
      }
      const results = await this.operations.executeQuery({ sql, params });
      const runs = (isArrayOfRecords(results) ? results : []).map((row) => this.parseWorkflowRun(row));
      return { runs, total: total || runs.length };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_WORKFLOW_RUNS_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve workflow runs: ${error instanceof Error ? error.message : String(error)}`,
          details: {
            workflowName: workflowName ?? "",
            resourceId: resourceId ?? ""
          }
        },
        error
      );
    }
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    const fullTableName = this.operations.getTableName(TABLE_WORKFLOW_SNAPSHOT);
    try {
      const conditions = [];
      const params = [];
      if (runId) {
        conditions.push("run_id = ?");
        params.push(runId);
      }
      if (workflowName) {
        conditions.push("workflow_name = ?");
        params.push(workflowName);
      }
      const whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
      const sql = `SELECT * FROM ${fullTableName} ${whereClause} ORDER BY createdAt DESC LIMIT 1`;
      const result = await this.operations.executeQuery({ sql, params, first: true });
      if (!result) return null;
      return this.parseWorkflowRun(result);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_GET_WORKFLOW_RUN_BY_ID_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to retrieve workflow run by ID: ${error instanceof Error ? error.message : String(error)}`,
          details: { runId, workflowName: workflowName ?? "" }
        },
        error
      );
    }
  }
};

// src/storage/index.ts
var D1Store = class extends MastraStorage {
  client;
  binding;
  // D1Database binding
  tablePrefix;
  stores;
  /**
   * Creates a new D1Store instance
   * @param config Configuration for D1 access (either REST API or Workers Binding API)
   */
  constructor(config) {
    try {
      super({ name: "D1" });
      if (config.tablePrefix && !/^[a-zA-Z0-9_]*$/.test(config.tablePrefix)) {
        throw new Error("Invalid tablePrefix: only letters, numbers, and underscores are allowed.");
      }
      this.tablePrefix = config.tablePrefix || "";
      if ("binding" in config) {
        if (!config.binding) {
          throw new Error("D1 binding is required when using Workers Binding API");
        }
        this.binding = config.binding;
        this.logger.info("Using D1 Workers Binding API");
      } else if ("client" in config) {
        if (!config.client) {
          throw new Error("D1 client is required when using D1ClientConfig");
        }
        this.client = config.client;
        this.logger.info("Using D1 Client");
      } else {
        if (!config.accountId || !config.databaseId || !config.apiToken) {
          throw new Error("accountId, databaseId, and apiToken are required when using REST API");
        }
        const cfClient = new Cloudflare({
          apiToken: config.apiToken
        });
        this.client = {
          query: ({ sql, params }) => {
            return cfClient.d1.database.query(config.databaseId, {
              account_id: config.accountId,
              sql,
              params
            });
          }
        };
        this.logger.info("Using D1 REST API");
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_D1_STORAGE_INITIALIZATION_ERROR",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.SYSTEM,
          text: "Error initializing D1Store"
        },
        error
      );
    }
    const operations = new StoreOperationsD1({
      client: this.client,
      binding: this.binding,
      tablePrefix: this.tablePrefix
    });
    const scores = new ScoresStorageD1({
      operations
    });
    const legacyEvals = new LegacyEvalsStorageD1({
      operations
    });
    const traces = new TracesStorageD1({
      operations
    });
    const workflows = new WorkflowsStorageD1({
      operations
    });
    const memory = new MemoryStorageD1({
      operations
    });
    this.stores = {
      operations,
      scores,
      legacyEvals,
      traces,
      workflows,
      memory
    };
  }
  get supports() {
    return {
      selectByIncludeResourceScope: true,
      resourceWorkingMemory: true,
      hasColumn: true,
      createTable: true,
      deleteMessages: false
    };
  }
  async createTable({
    tableName,
    schema
  }) {
    return this.stores.operations.createTable({ tableName, schema });
  }
  /**
   * Alters table schema to add columns if they don't exist
   * @param tableName Name of the table
   * @param schema Schema of the table
   * @param ifNotExists Array of column names to add if they don't exist
   */
  async alterTable({
    tableName,
    schema,
    ifNotExists
  }) {
    return this.stores.operations.alterTable({ tableName, schema, ifNotExists });
  }
  async clearTable({ tableName }) {
    return this.stores.operations.clearTable({ tableName });
  }
  async dropTable({ tableName }) {
    return this.stores.operations.dropTable({ tableName });
  }
  async hasColumn(table, column) {
    return this.stores.operations.hasColumn(table, column);
  }
  async insert({ tableName, record }) {
    return this.stores.operations.insert({ tableName, record });
  }
  async load({ tableName, keys }) {
    return this.stores.operations.load({ tableName, keys });
  }
  async getThreadById({ threadId }) {
    return this.stores.memory.getThreadById({ threadId });
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead
   */
  async getThreadsByResourceId({ resourceId }) {
    return this.stores.memory.getThreadsByResourceId({ resourceId });
  }
  async getThreadsByResourceIdPaginated(args) {
    return this.stores.memory.getThreadsByResourceIdPaginated(args);
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
  async saveMessages(args) {
    return this.stores.memory.saveMessages(args);
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessages({ threadId, selectBy, format });
  }
  async getMessagesPaginated({
    threadId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessagesPaginated({ threadId, selectBy, format });
  }
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    snapshot
  }) {
    return this.stores.workflows.persistWorkflowSnapshot({ workflowName, runId, snapshot });
  }
  async loadWorkflowSnapshot(params) {
    return this.stores.workflows.loadWorkflowSnapshot(params);
  }
  async getWorkflowRuns({
    workflowName,
    fromDate,
    toDate,
    limit,
    offset,
    resourceId
  } = {}) {
    return this.stores.workflows.getWorkflowRuns({ workflowName, fromDate, toDate, limit, offset, resourceId });
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    return this.stores.workflows.getWorkflowRunById({ runId, workflowName });
  }
  /**
   * Insert multiple records in a batch operation
   * @param tableName The table to insert into
   * @param records The records to insert
   */
  async batchInsert({ tableName, records }) {
    return this.stores.operations.batchInsert({ tableName, records });
  }
  /**
   * @deprecated use getTracesPaginated instead
   */
  async getTraces(args) {
    return this.stores.traces.getTraces(args);
  }
  async getTracesPaginated(args) {
    return this.stores.traces.getTracesPaginated(args);
  }
  /**
   * @deprecated use getEvals instead
   */
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  async getEvals(options) {
    return this.stores.legacyEvals.getEvals(options);
  }
  async updateMessages(_args) {
    return this.stores.memory.updateMessages(_args);
  }
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
    return this.stores.memory.updateResource({ resourceId, workingMemory, metadata });
  }
  async getScoreById({ id: _id }) {
    return this.stores.scores.getScoreById({ id: _id });
  }
  async saveScore(_score) {
    return this.stores.scores.saveScore(_score);
  }
  async getScoresByRunId({
    runId: _runId,
    pagination: _pagination
  }) {
    return this.stores.scores.getScoresByRunId({ runId: _runId, pagination: _pagination });
  }
  async getScoresByEntityId({
    entityId: _entityId,
    entityType: _entityType,
    pagination: _pagination
  }) {
    return this.stores.scores.getScoresByEntityId({
      entityId: _entityId,
      entityType: _entityType,
      pagination: _pagination
    });
  }
  async getScoresByScorerId({
    scorerId: _scorerId,
    pagination: _pagination
  }) {
    return this.stores.scores.getScoresByScorerId({ scorerId: _scorerId, pagination: _pagination });
  }
  /**
   * Close the database connection
   * No explicit cleanup needed for D1 in either REST or Workers Binding mode
   */
  async close() {
    this.logger.debug("Closing D1 connection");
  }
};

export { D1Store };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map