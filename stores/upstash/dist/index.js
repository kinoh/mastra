import { MastraStorage, StoreOperations, TracesStorage, TABLE_TRACES, ScoresStorage, TABLE_SCORERS, WorkflowsStorage, TABLE_WORKFLOW_SNAPSHOT, MemoryStorage, TABLE_THREADS, resolveMessageLimit, TABLE_RESOURCES, LegacyEvalsStorage, TABLE_EVALS, TABLE_MESSAGES, serializeDate } from '@mastra/core/storage';
import { Redis } from '@upstash/redis';
import { MastraError, ErrorCategory, ErrorDomain } from '@mastra/core/error';
import { MessageList } from '@mastra/core/agent';
import { randomUUID } from 'crypto';
import { MastraVector } from '@mastra/core/vector';
import { Index } from '@upstash/vector';
import { BaseFilterTranslator } from '@mastra/core/vector/filter';

// src/storage/index.ts
function transformEvalRecord(record) {
  let result = record.result;
  if (typeof result === "string") {
    try {
      result = JSON.parse(result);
    } catch {
      console.warn("Failed to parse result JSON:");
    }
  }
  let testInfo = record.test_info;
  if (typeof testInfo === "string") {
    try {
      testInfo = JSON.parse(testInfo);
    } catch {
      console.warn("Failed to parse test_info JSON:");
    }
  }
  return {
    agentName: record.agent_name,
    input: record.input,
    output: record.output,
    result,
    metricName: record.metric_name,
    instructions: record.instructions,
    testInfo,
    globalRunId: record.global_run_id,
    runId: record.run_id,
    createdAt: typeof record.created_at === "string" ? record.created_at : record.created_at instanceof Date ? record.created_at.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
  };
}
var StoreLegacyEvalsUpstash = class extends LegacyEvalsStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  /**
   * @deprecated Use getEvals instead
   */
  async getEvalsByAgentName(agentName, type) {
    try {
      const pattern = `${TABLE_EVALS}:*`;
      const keys = await this.operations.scanKeys(pattern);
      if (keys.length === 0) {
        return [];
      }
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      const nonNullRecords = results.filter(
        (record) => record !== null && typeof record === "object" && "agent_name" in record && record.agent_name === agentName
      );
      let filteredEvals = nonNullRecords;
      if (type === "test") {
        filteredEvals = filteredEvals.filter((record) => {
          if (!record.test_info) return false;
          try {
            if (typeof record.test_info === "string") {
              const parsedTestInfo = JSON.parse(record.test_info);
              return parsedTestInfo && typeof parsedTestInfo === "object" && "testPath" in parsedTestInfo;
            }
            return typeof record.test_info === "object" && "testPath" in record.test_info;
          } catch {
            return false;
          }
        });
      } else if (type === "live") {
        filteredEvals = filteredEvals.filter((record) => {
          if (!record.test_info) return true;
          try {
            if (typeof record.test_info === "string") {
              const parsedTestInfo = JSON.parse(record.test_info);
              return !(parsedTestInfo && typeof parsedTestInfo === "object" && "testPath" in parsedTestInfo);
            }
            return !(typeof record.test_info === "object" && "testPath" in record.test_info);
          } catch {
            return true;
          }
        });
      }
      return filteredEvals.map((record) => transformEvalRecord(record));
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_EVALS_BY_AGENT_NAME_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { agentName }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return [];
    }
  }
  /**
   * Get all evaluations with pagination and total count
   * @param options Pagination and filtering options
   * @returns Object with evals array and total count
   */
  async getEvals(options) {
    try {
      const { agentName, type, page = 0, perPage = 100, dateRange } = options || {};
      const fromDate = dateRange?.start;
      const toDate = dateRange?.end;
      const pattern = `${TABLE_EVALS}:*`;
      const keys = await this.operations.scanKeys(pattern);
      if (keys.length === 0) {
        return {
          evals: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      let filteredEvals = results.map((result) => result).filter((record) => record !== null && typeof record === "object");
      if (agentName) {
        filteredEvals = filteredEvals.filter((record) => record.agent_name === agentName);
      }
      if (type === "test") {
        filteredEvals = filteredEvals.filter((record) => {
          if (!record.test_info) return false;
          try {
            if (typeof record.test_info === "string") {
              const parsedTestInfo = JSON.parse(record.test_info);
              return parsedTestInfo && typeof parsedTestInfo === "object" && "testPath" in parsedTestInfo;
            }
            return typeof record.test_info === "object" && "testPath" in record.test_info;
          } catch {
            return false;
          }
        });
      } else if (type === "live") {
        filteredEvals = filteredEvals.filter((record) => {
          if (!record.test_info) return true;
          try {
            if (typeof record.test_info === "string") {
              const parsedTestInfo = JSON.parse(record.test_info);
              return !(parsedTestInfo && typeof parsedTestInfo === "object" && "testPath" in parsedTestInfo);
            }
            return !(typeof record.test_info === "object" && "testPath" in record.test_info);
          } catch {
            return true;
          }
        });
      }
      if (fromDate) {
        filteredEvals = filteredEvals.filter((record) => {
          const createdAt = new Date(record.created_at || record.createdAt || 0);
          return createdAt.getTime() >= fromDate.getTime();
        });
      }
      if (toDate) {
        filteredEvals = filteredEvals.filter((record) => {
          const createdAt = new Date(record.created_at || record.createdAt || 0);
          return createdAt.getTime() <= toDate.getTime();
        });
      }
      filteredEvals.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
        const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      const total = filteredEvals.length;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedEvals = filteredEvals.slice(start, end);
      const hasMore = end < total;
      const evals = paginatedEvals.map((record) => transformEvalRecord(record));
      return {
        evals,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      const { page = 0, perPage = 100 } = options || {};
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_EVALS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            page,
            perPage
          }
        },
        error
      );
      this.logger.error(mastraError.toString());
      this.logger?.trackException(mastraError);
      return {
        evals: [],
        total: 0,
        page,
        perPage,
        hasMore: false
      };
    }
  }
};
function ensureDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") return new Date(value);
  if (typeof value === "number") return new Date(value);
  return null;
}
function parseJSON(value) {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}
function getKey(tableName, keys) {
  const keyParts = Object.entries(keys).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}:${value}`);
  return `${tableName}:${keyParts.join(":")}`;
}
function processRecord(tableName, record) {
  let key;
  if (tableName === TABLE_MESSAGES) {
    key = getKey(tableName, { threadId: record.threadId, id: record.id });
  } else if (tableName === TABLE_WORKFLOW_SNAPSHOT) {
    key = getKey(tableName, {
      namespace: record.namespace || "workflows",
      workflow_name: record.workflow_name,
      run_id: record.run_id,
      ...record.resourceId ? { resourceId: record.resourceId } : {}
    });
  } else if (tableName === TABLE_EVALS) {
    key = getKey(tableName, { id: record.run_id });
  } else {
    key = getKey(tableName, { id: record.id });
  }
  const processedRecord = {
    ...record,
    createdAt: serializeDate(record.createdAt),
    updatedAt: serializeDate(record.updatedAt)
  };
  return { key, processedRecord };
}

// src/storage/domains/memory/index.ts
function getThreadMessagesKey(threadId) {
  return `thread:${threadId}:messages`;
}
function getMessageKey(threadId, messageId) {
  const key = getKey(TABLE_MESSAGES, { threadId, id: messageId });
  return key;
}
var StoreMemoryUpstash = class extends MemoryStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  async getThreadById({ threadId }) {
    try {
      const thread = await this.operations.load({
        tableName: TABLE_THREADS,
        keys: { id: threadId }
      });
      if (!thread) return null;
      return {
        ...thread,
        createdAt: ensureDate(thread.createdAt),
        updatedAt: ensureDate(thread.updatedAt),
        metadata: typeof thread.metadata === "string" ? JSON.parse(thread.metadata) : thread.metadata
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_THREAD_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
    }
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead
   */
  async getThreadsByResourceId({ resourceId }) {
    try {
      const pattern = `${TABLE_THREADS}:*`;
      const keys = await this.operations.scanKeys(pattern);
      if (keys.length === 0) {
        return [];
      }
      const allThreads = [];
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      for (let i = 0; i < results.length; i++) {
        const thread = results[i];
        if (thread && thread.resourceId === resourceId) {
          allThreads.push({
            ...thread,
            createdAt: ensureDate(thread.createdAt),
            updatedAt: ensureDate(thread.updatedAt),
            metadata: typeof thread.metadata === "string" ? JSON.parse(thread.metadata) : thread.metadata
          });
        }
      }
      allThreads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return allThreads;
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            resourceId
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return [];
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    const { resourceId, page = 0, perPage = 100 } = args;
    try {
      const allThreads = await this.getThreadsByResourceId({ resourceId });
      const total = allThreads.length;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedThreads = allThreads.slice(start, end);
      const hasMore = end < total;
      return {
        threads: paginatedThreads,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_THREADS_BY_RESOURCE_ID_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            resourceId,
            page,
            perPage
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger.error(mastraError.toString());
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
    try {
      await this.operations.insert({
        tableName: TABLE_THREADS,
        record: thread
      });
      return thread;
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_SAVE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId: thread.id
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger.error(mastraError.toString());
      throw mastraError;
    }
  }
  async updateThread({
    id,
    title,
    metadata
  }) {
    const thread = await this.getThreadById({ threadId: id });
    if (!thread) {
      throw new MastraError({
        id: "STORAGE_UPSTASH_STORAGE_UPDATE_THREAD_FAILED",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: `Thread ${id} not found`,
        details: {
          threadId: id
        }
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
      await this.saveThread({ thread: updatedThread });
      return updatedThread;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_UPDATE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId: id
          }
        },
        error
      );
    }
  }
  async deleteThread({ threadId }) {
    const threadKey = getKey(TABLE_THREADS, { id: threadId });
    const threadMessagesKey = getThreadMessagesKey(threadId);
    try {
      const messageIds = await this.client.zrange(threadMessagesKey, 0, -1);
      const pipeline = this.client.pipeline();
      pipeline.del(threadKey);
      pipeline.del(threadMessagesKey);
      for (let i = 0; i < messageIds.length; i++) {
        const messageId = messageIds[i];
        const messageKey = getMessageKey(threadId, messageId);
        pipeline.del(messageKey);
      }
      await pipeline.exec();
      await this.operations.scanAndDelete(getMessageKey(threadId, "*"));
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_DELETE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
    }
  }
  async saveMessages(args) {
    const { messages, format = "v1" } = args;
    if (messages.length === 0) return [];
    const threadId = messages[0]?.threadId;
    try {
      if (!threadId) {
        throw new Error("Thread ID is required");
      }
      const thread = await this.getThreadById({ threadId });
      if (!thread) {
        throw new Error(`Thread ${threadId} not found`);
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_SAVE_MESSAGES_INVALID_ARGS",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
    const messagesWithIndex = messages.map((message, index) => {
      if (!message.threadId) {
        throw new Error(
          `Expected to find a threadId for message, but couldn't find one. An unexpected error has occurred.`
        );
      }
      if (!message.resourceId) {
        throw new Error(
          `Expected to find a resourceId for message, but couldn't find one. An unexpected error has occurred.`
        );
      }
      return {
        ...message,
        _index: index
      };
    });
    const threadKey = getKey(TABLE_THREADS, { id: threadId });
    const existingThread = await this.client.get(threadKey);
    try {
      const batchSize = 1e3;
      for (let i = 0; i < messagesWithIndex.length; i += batchSize) {
        const batch = messagesWithIndex.slice(i, i + batchSize);
        const pipeline = this.client.pipeline();
        for (const message of batch) {
          const key = getMessageKey(message.threadId, message.id);
          const createdAtScore = new Date(message.createdAt).getTime();
          const score = message._index !== void 0 ? message._index : createdAtScore;
          const existingKeyPattern = getMessageKey("*", message.id);
          const keys = await this.operations.scanKeys(existingKeyPattern);
          if (keys.length > 0) {
            const pipeline2 = this.client.pipeline();
            keys.forEach((key2) => pipeline2.get(key2));
            const results = await pipeline2.exec();
            const existingMessages = results.filter(
              (msg) => msg !== null
            );
            for (const existingMessage of existingMessages) {
              const existingMessageKey = getMessageKey(existingMessage.threadId, existingMessage.id);
              if (existingMessage && existingMessage.threadId !== message.threadId) {
                pipeline.del(existingMessageKey);
                pipeline.zrem(getThreadMessagesKey(existingMessage.threadId), existingMessage.id);
              }
            }
          }
          pipeline.set(key, message);
          pipeline.zadd(getThreadMessagesKey(message.threadId), {
            score,
            member: message.id
          });
        }
        if (i === 0 && existingThread) {
          const updatedThread = {
            ...existingThread,
            updatedAt: /* @__PURE__ */ new Date()
          };
          pipeline.set(threadKey, processRecord(TABLE_THREADS, updatedThread).processedRecord);
        }
        await pipeline.exec();
      }
      const list = new MessageList().add(messages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_SAVE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
    }
  }
  async _getIncludedMessages(threadId, selectBy) {
    const messageIds = /* @__PURE__ */ new Set();
    const messageIdToThreadIds = {};
    if (selectBy?.include?.length) {
      for (const item of selectBy.include) {
        messageIds.add(item.id);
        const itemThreadId = item.threadId || threadId;
        messageIdToThreadIds[item.id] = itemThreadId;
        const itemThreadMessagesKey = getThreadMessagesKey(itemThreadId);
        const rank = await this.client.zrank(itemThreadMessagesKey, item.id);
        if (rank === null) continue;
        if (item.withPreviousMessages) {
          const start = Math.max(0, rank - item.withPreviousMessages);
          const prevIds = rank === 0 ? [] : await this.client.zrange(itemThreadMessagesKey, start, rank - 1);
          prevIds.forEach((id) => {
            messageIds.add(id);
            messageIdToThreadIds[id] = itemThreadId;
          });
        }
        if (item.withNextMessages) {
          const nextIds = await this.client.zrange(itemThreadMessagesKey, rank + 1, rank + item.withNextMessages);
          nextIds.forEach((id) => {
            messageIds.add(id);
            messageIdToThreadIds[id] = itemThreadId;
          });
        }
      }
      const pipeline = this.client.pipeline();
      Array.from(messageIds).forEach((id) => {
        const tId = messageIdToThreadIds[id] || threadId;
        pipeline.get(getMessageKey(tId, id));
      });
      const results = await pipeline.exec();
      return results.filter((result) => result !== null);
    }
    return [];
  }
  async getMessages({
    threadId,
    selectBy,
    format
  }) {
    const threadMessagesKey = getThreadMessagesKey(threadId);
    try {
      const allMessageIds = await this.client.zrange(threadMessagesKey, 0, -1);
      const limit = resolveMessageLimit({ last: selectBy?.last, defaultLimit: Number.MAX_SAFE_INTEGER });
      const messageIds = /* @__PURE__ */ new Set();
      const messageIdToThreadIds = {};
      if (limit === 0 && !selectBy?.include) {
        return [];
      }
      if (limit === Number.MAX_SAFE_INTEGER) {
        const allIds = await this.client.zrange(threadMessagesKey, 0, -1);
        allIds.forEach((id) => {
          messageIds.add(id);
          messageIdToThreadIds[id] = threadId;
        });
      } else if (limit > 0) {
        const latestIds = await this.client.zrange(threadMessagesKey, -limit, -1);
        latestIds.forEach((id) => {
          messageIds.add(id);
          messageIdToThreadIds[id] = threadId;
        });
      }
      const includedMessages = await this._getIncludedMessages(threadId, selectBy);
      const messages = [
        ...includedMessages,
        ...(await Promise.all(
          Array.from(messageIds).map(async (id) => {
            const tId = messageIdToThreadIds[id] || threadId;
            const byThreadId = await this.client.get(getMessageKey(tId, id));
            if (byThreadId) return byThreadId;
            return null;
          })
        )).filter((msg) => msg !== null)
      ];
      messages.sort((a, b) => allMessageIds.indexOf(a.id) - allMessageIds.indexOf(b.id));
      const seen = /* @__PURE__ */ new Set();
      const dedupedMessages = messages.filter((row) => {
        if (seen.has(row.id)) return false;
        seen.add(row.id);
        return true;
      });
      const prepared = dedupedMessages.filter((message) => message !== null && message !== void 0).map((message) => {
        const { _index, ...messageWithoutIndex } = message;
        return messageWithoutIndex;
      });
      if (format === "v2") {
        return prepared.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
          content: msg.content || { format: 2, parts: [{ type: "text", text: "" }] }
        }));
      }
      return prepared.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt)
      }));
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
    }
  }
  async getMessagesPaginated(args) {
    const { threadId, selectBy, format } = args;
    const { page = 0, perPage = 40, dateRange } = selectBy?.pagination || {};
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const threadMessagesKey = getThreadMessagesKey(threadId);
    const messages = [];
    try {
      const includedMessages = await this._getIncludedMessages(threadId, selectBy);
      messages.push(...includedMessages);
      const allMessageIds = await this.client.zrange(
        threadMessagesKey,
        args?.selectBy?.last ? -args.selectBy.last : 0,
        -1
      );
      if (allMessageIds.length === 0) {
        return {
          messages: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      const pipeline = this.client.pipeline();
      allMessageIds.forEach((id) => pipeline.get(getMessageKey(threadId, id)));
      const results = await pipeline.exec();
      let messagesData = results.filter((msg) => msg !== null);
      if (fromDate) {
        messagesData = messagesData.filter((msg) => msg && new Date(msg.createdAt).getTime() >= fromDate.getTime());
      }
      if (toDate) {
        messagesData = messagesData.filter((msg) => msg && new Date(msg.createdAt).getTime() <= toDate.getTime());
      }
      messagesData.sort((a, b) => allMessageIds.indexOf(a.id) - allMessageIds.indexOf(b.id));
      const total = messagesData.length;
      const start = page * perPage;
      const end = start + perPage;
      const hasMore = end < total;
      const paginatedMessages = messagesData.slice(start, end);
      messages.push(...paginatedMessages);
      const list = new MessageList().add(messages, "memory");
      const finalMessages = format === `v2` ? list.get.all.v2() : list.get.all.v1();
      return {
        messages: finalMessages,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_MESSAGES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
      this.logger.error(mastraError.toString());
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
  async getResourceById({ resourceId }) {
    try {
      const key = `${TABLE_RESOURCES}:${resourceId}`;
      const data = await this.client.get(key);
      if (!data) {
        return null;
      }
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
        // Ensure workingMemory is always returned as a string, regardless of automatic parsing
        workingMemory: typeof data.workingMemory === "object" ? JSON.stringify(data.workingMemory) : data.workingMemory,
        metadata: typeof data.metadata === "string" ? JSON.parse(data.metadata) : data.metadata
      };
    } catch (error) {
      this.logger.error("Error getting resource by ID:", error);
      throw error;
    }
  }
  async saveResource({ resource }) {
    try {
      const key = `${TABLE_RESOURCES}:${resource.id}`;
      const serializedResource = {
        ...resource,
        metadata: JSON.stringify(resource.metadata),
        createdAt: resource.createdAt.toISOString(),
        updatedAt: resource.updatedAt.toISOString()
      };
      await this.client.set(key, serializedResource);
      return resource;
    } catch (error) {
      this.logger.error("Error saving resource:", error);
      throw error;
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
          workingMemory,
          metadata: metadata || {},
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
        return this.saveResource({ resource: newResource });
      }
      const updatedResource = {
        ...existingResource,
        workingMemory: workingMemory !== void 0 ? workingMemory : existingResource.workingMemory,
        metadata: {
          ...existingResource.metadata,
          ...metadata
        },
        updatedAt: /* @__PURE__ */ new Date()
      };
      await this.saveResource({ resource: updatedResource });
      return updatedResource;
    } catch (error) {
      this.logger.error("Error updating resource:", error);
      throw error;
    }
  }
  async updateMessages(args) {
    const { messages } = args;
    if (messages.length === 0) {
      return [];
    }
    try {
      const messageIds = messages.map((m) => m.id);
      const existingMessages = [];
      const messageIdToKey = {};
      for (const messageId of messageIds) {
        const pattern = getMessageKey("*", messageId);
        const keys = await this.operations.scanKeys(pattern);
        for (const key of keys) {
          const message = await this.client.get(key);
          if (message && message.id === messageId) {
            existingMessages.push(message);
            messageIdToKey[messageId] = key;
            break;
          }
        }
      }
      if (existingMessages.length === 0) {
        return [];
      }
      const threadIdsToUpdate = /* @__PURE__ */ new Set();
      const pipeline = this.client.pipeline();
      for (const existingMessage of existingMessages) {
        const updatePayload = messages.find((m) => m.id === existingMessage.id);
        if (!updatePayload) continue;
        const { id, ...fieldsToUpdate } = updatePayload;
        if (Object.keys(fieldsToUpdate).length === 0) continue;
        threadIdsToUpdate.add(existingMessage.threadId);
        if (updatePayload.threadId && updatePayload.threadId !== existingMessage.threadId) {
          threadIdsToUpdate.add(updatePayload.threadId);
        }
        const updatedMessage = { ...existingMessage };
        if (fieldsToUpdate.content) {
          const existingContent = existingMessage.content;
          const newContent = {
            ...existingContent,
            ...fieldsToUpdate.content,
            // Deep merge metadata if it exists on both
            ...existingContent?.metadata && fieldsToUpdate.content.metadata ? {
              metadata: {
                ...existingContent.metadata,
                ...fieldsToUpdate.content.metadata
              }
            } : {}
          };
          updatedMessage.content = newContent;
        }
        for (const key2 in fieldsToUpdate) {
          if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, key2) && key2 !== "content") {
            updatedMessage[key2] = fieldsToUpdate[key2];
          }
        }
        const key = messageIdToKey[id];
        if (key) {
          if (updatePayload.threadId && updatePayload.threadId !== existingMessage.threadId) {
            const oldThreadMessagesKey = getThreadMessagesKey(existingMessage.threadId);
            pipeline.zrem(oldThreadMessagesKey, id);
            pipeline.del(key);
            const newKey = getMessageKey(updatePayload.threadId, id);
            pipeline.set(newKey, updatedMessage);
            const newThreadMessagesKey = getThreadMessagesKey(updatePayload.threadId);
            const score = updatedMessage._index !== void 0 ? updatedMessage._index : new Date(updatedMessage.createdAt).getTime();
            pipeline.zadd(newThreadMessagesKey, { score, member: id });
          } else {
            pipeline.set(key, updatedMessage);
          }
        }
      }
      const now = /* @__PURE__ */ new Date();
      for (const threadId of threadIdsToUpdate) {
        if (threadId) {
          const threadKey = getKey(TABLE_THREADS, { id: threadId });
          const existingThread = await this.client.get(threadKey);
          if (existingThread) {
            const updatedThread = {
              ...existingThread,
              updatedAt: now
            };
            pipeline.set(threadKey, processRecord(TABLE_THREADS, updatedThread).processedRecord);
          }
        }
      }
      await pipeline.exec();
      const updatedMessages = [];
      for (const messageId of messageIds) {
        const key = messageIdToKey[messageId];
        if (key) {
          const updatedMessage = await this.client.get(key);
          if (updatedMessage) {
            const v2e = updatedMessage;
            updatedMessages.push(v2e);
          }
        }
      }
      return updatedMessages;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_UPDATE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            messageIds: messages.map((m) => m.id).join(",")
          }
        },
        error
      );
    }
  }
  async deleteMessages(messageIds) {
    if (!messageIds || messageIds.length === 0) {
      return;
    }
    try {
      const threadIds = /* @__PURE__ */ new Set();
      const messageKeys = [];
      for (const messageId of messageIds) {
        const pattern = getMessageKey("*", messageId);
        const keys = await this.operations.scanKeys(pattern);
        for (const key of keys) {
          const message = await this.client.get(key);
          if (message && message.id === messageId) {
            messageKeys.push(key);
            if (message.threadId) {
              threadIds.add(message.threadId);
            }
            break;
          }
        }
      }
      if (messageKeys.length === 0) {
        return;
      }
      const pipeline = this.client.pipeline();
      for (const key of messageKeys) {
        pipeline.del(key);
      }
      if (threadIds.size > 0) {
        for (const threadId of threadIds) {
          const threadKey = getKey(TABLE_THREADS, { id: threadId });
          const thread = await this.client.get(threadKey);
          if (thread) {
            const updatedThread = {
              ...thread,
              updatedAt: /* @__PURE__ */ new Date()
            };
            pipeline.set(threadKey, processRecord(TABLE_THREADS, updatedThread).processedRecord);
          }
        }
      }
      await pipeline.exec();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_DELETE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { messageIds: messageIds.join(", ") }
        },
        error
      );
    }
  }
};
var StoreOperationsUpstash = class extends StoreOperations {
  client;
  constructor({ client }) {
    super();
    this.client = client;
  }
  async createTable({
    tableName: _tableName,
    schema: _schema
  }) {
  }
  async alterTable({
    tableName: _tableName,
    schema: _schema,
    ifNotExists: _ifNotExists
  }) {
  }
  async clearTable({ tableName }) {
    const pattern = `${tableName}:*`;
    try {
      await this.scanAndDelete(pattern);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_CLEAR_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  async dropTable({ tableName }) {
    return this.clearTable({ tableName });
  }
  async insert({ tableName, record }) {
    const { key, processedRecord } = processRecord(tableName, record);
    try {
      await this.client.set(key, processedRecord);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  async batchInsert(input) {
    const { tableName, records } = input;
    if (!records.length) return;
    const batchSize = 1e3;
    try {
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const pipeline = this.client.pipeline();
        for (const record of batch) {
          const { key, processedRecord } = processRecord(tableName, record);
          pipeline.set(key, processedRecord);
        }
        await pipeline.exec();
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_BATCH_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  async load({ tableName, keys }) {
    const key = getKey(tableName, keys);
    try {
      const data = await this.client.get(key);
      return data || null;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_LOAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
    }
  }
  async hasColumn(_tableName, _column) {
    return true;
  }
  async scanKeys(pattern, batchSize = 1e4) {
    let cursor = "0";
    let keys = [];
    do {
      const [nextCursor, batch] = await this.client.scan(cursor, {
        match: pattern,
        count: batchSize
      });
      keys.push(...batch);
      cursor = nextCursor;
    } while (cursor !== "0");
    return keys;
  }
  async scanAndDelete(pattern, batchSize = 1e4) {
    let cursor = "0";
    let totalDeleted = 0;
    do {
      const [nextCursor, keys] = await this.client.scan(cursor, {
        match: pattern,
        count: batchSize
      });
      if (keys.length > 0) {
        await this.client.del(...keys);
        totalDeleted += keys.length;
      }
      cursor = nextCursor;
    } while (cursor !== "0");
    return totalDeleted;
  }
};
function transformScoreRow(row) {
  const parseField = (v) => {
    if (typeof v === "string") {
      try {
        return JSON.parse(v);
      } catch {
        return v;
      }
    }
    return v;
  };
  return {
    ...row,
    scorer: parseField(row.scorer),
    preprocessStepResult: parseField(row.preprocessStepResult),
    generateScorePrompt: row.generateScorePrompt,
    generateReasonPrompt: row.generateReasonPrompt,
    analyzeStepResult: parseField(row.analyzeStepResult),
    metadata: parseField(row.metadata),
    input: parseField(row.input),
    output: parseField(row.output),
    additionalContext: parseField(row.additionalContext),
    runtimeContext: parseField(row.runtimeContext),
    entity: parseField(row.entity),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}
var ScoresUpstash = class extends ScoresStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  async getScoreById({ id }) {
    try {
      const data = await this.operations.load({
        tableName: TABLE_SCORERS,
        keys: { id }
      });
      if (!data) return null;
      return transformScoreRow(data);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_SCORE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { id }
        },
        error
      );
    }
  }
  async getScoresByScorerId({
    scorerId,
    pagination = { page: 0, perPage: 20 }
  }) {
    const pattern = `${TABLE_SCORERS}:*`;
    const keys = await this.operations.scanKeys(pattern);
    if (keys.length === 0) {
      return {
        scores: [],
        pagination: { total: 0, page: pagination.page, perPage: pagination.perPage, hasMore: false }
      };
    }
    const pipeline = this.client.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    const filtered = results.map((row) => row).filter((row) => !!row && typeof row === "object" && row.scorerId === scorerId);
    const total = filtered.length;
    const { page, perPage } = pagination;
    const start = page * perPage;
    const end = start + perPage;
    const paged = filtered.slice(start, end);
    const scores = paged.map((row) => transformScoreRow(row));
    return {
      scores,
      pagination: {
        total,
        page,
        perPage,
        hasMore: end < total
      }
    };
  }
  async saveScore(score) {
    const { key, processedRecord } = processRecord(TABLE_SCORERS, score);
    try {
      await this.client.set(key, processedRecord);
      return { score };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_SAVE_SCORE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { id: score.id }
        },
        error
      );
    }
  }
  async getScoresByRunId({
    runId,
    pagination = { page: 0, perPage: 20 }
  }) {
    const pattern = `${TABLE_SCORERS}:*`;
    const keys = await this.operations.scanKeys(pattern);
    if (keys.length === 0) {
      return {
        scores: [],
        pagination: { total: 0, page: pagination.page, perPage: pagination.perPage, hasMore: false }
      };
    }
    const pipeline = this.client.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    const filtered = results.map((row) => row).filter((row) => !!row && typeof row === "object" && row.runId === runId);
    const total = filtered.length;
    const { page, perPage } = pagination;
    const start = page * perPage;
    const end = start + perPage;
    const paged = filtered.slice(start, end);
    const scores = paged.map((row) => transformScoreRow(row));
    return {
      scores,
      pagination: {
        total,
        page,
        perPage,
        hasMore: end < total
      }
    };
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination = { page: 0, perPage: 20 }
  }) {
    const pattern = `${TABLE_SCORERS}:*`;
    const keys = await this.operations.scanKeys(pattern);
    if (keys.length === 0) {
      return {
        scores: [],
        pagination: { total: 0, page: pagination.page, perPage: pagination.perPage, hasMore: false }
      };
    }
    const pipeline = this.client.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    const filtered = results.map((row) => row).filter((row) => {
      if (!row || typeof row !== "object") return false;
      if (row.entityId !== entityId) return false;
      if (entityType && row.entityType !== entityType) return false;
      return true;
    });
    const total = filtered.length;
    const { page, perPage } = pagination;
    const start = page * perPage;
    const end = start + perPage;
    const paged = filtered.slice(start, end);
    const scores = paged.map((row) => transformScoreRow(row));
    return {
      scores,
      pagination: {
        total,
        page,
        perPage,
        hasMore: end < total
      }
    };
  }
};
var TracesUpstash = class extends TracesStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  /**
   * @deprecated use getTracesPaginated instead
   */
  async getTraces(args) {
    if (args.fromDate || args.toDate) {
      args.dateRange = {
        start: args.fromDate,
        end: args.toDate
      };
    }
    try {
      const { traces } = await this.getTracesPaginated(args);
      return traces;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_TRACES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getTracesPaginated(args) {
    const { name, scope, page = 0, perPage = 100, attributes, filters, dateRange } = args;
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    try {
      const pattern = `${TABLE_TRACES}:*`;
      const keys = await this.operations.scanKeys(pattern);
      if (keys.length === 0) {
        return {
          traces: [],
          total: 0,
          page,
          perPage: perPage || 100,
          hasMore: false
        };
      }
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      let filteredTraces = results.filter(
        (record) => record !== null && typeof record === "object"
      );
      if (name) {
        filteredTraces = filteredTraces.filter((record) => record.name?.toLowerCase().startsWith(name.toLowerCase()));
      }
      if (scope) {
        filteredTraces = filteredTraces.filter((record) => record.scope === scope);
      }
      if (attributes) {
        filteredTraces = filteredTraces.filter((record) => {
          const recordAttributes = record.attributes;
          if (!recordAttributes) return false;
          const parsedAttributes = typeof recordAttributes === "string" ? JSON.parse(recordAttributes) : recordAttributes;
          return Object.entries(attributes).every(([key, value]) => parsedAttributes[key] === value);
        });
      }
      if (filters) {
        filteredTraces = filteredTraces.filter(
          (record) => Object.entries(filters).every(([key, value]) => record[key] === value)
        );
      }
      if (fromDate) {
        filteredTraces = filteredTraces.filter(
          (record) => new Date(record.createdAt).getTime() >= new Date(fromDate).getTime()
        );
      }
      if (toDate) {
        filteredTraces = filteredTraces.filter(
          (record) => new Date(record.createdAt).getTime() <= new Date(toDate).getTime()
        );
      }
      filteredTraces.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const transformedTraces = filteredTraces.map((record) => ({
        id: record.id,
        parentSpanId: record.parentSpanId,
        traceId: record.traceId,
        name: record.name,
        scope: record.scope,
        kind: record.kind,
        status: parseJSON(record.status),
        events: parseJSON(record.events),
        links: parseJSON(record.links),
        attributes: parseJSON(record.attributes),
        startTime: record.startTime,
        endTime: record.endTime,
        other: parseJSON(record.other),
        createdAt: ensureDate(record.createdAt)
      }));
      const total = transformedTraces.length;
      const resolvedPerPage = perPage || 100;
      const start = page * resolvedPerPage;
      const end = start + resolvedPerPage;
      const paginatedTraces = transformedTraces.slice(start, end);
      const hasMore = end < total;
      return {
        traces: paginatedTraces,
        total,
        page,
        perPage: resolvedPerPage,
        hasMore
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            name: args.name || "",
            scope: args.scope || ""
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return {
        traces: [],
        total: 0,
        page,
        perPage: perPage || 100,
        hasMore: false
      };
    }
  }
  async batchTraceInsert(args) {
    return this.operations.batchInsert({
      tableName: TABLE_TRACES,
      records: args.records
    });
  }
};
function parseWorkflowRun(row) {
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
var WorkflowsUpstash = class extends WorkflowsStorage {
  client;
  operations;
  constructor({ client, operations }) {
    super();
    this.client = client;
    this.operations = operations;
  }
  async persistWorkflowSnapshot(params) {
    const { namespace = "workflows", workflowName, runId, snapshot } = params;
    try {
      await this.operations.insert({
        tableName: TABLE_WORKFLOW_SNAPSHOT,
        record: {
          namespace,
          workflow_name: workflowName,
          run_id: runId,
          snapshot,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_PERSIST_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            namespace,
            workflowName,
            runId
          }
        },
        error
      );
    }
  }
  async loadWorkflowSnapshot(params) {
    const { namespace = "workflows", workflowName, runId } = params;
    const key = getKey(TABLE_WORKFLOW_SNAPSHOT, {
      namespace,
      workflow_name: workflowName,
      run_id: runId
    });
    try {
      const data = await this.client.get(key);
      if (!data) return null;
      return data.snapshot;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_LOAD_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            namespace,
            workflowName,
            runId
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
    try {
      const key = getKey(TABLE_WORKFLOW_SNAPSHOT, { namespace: "workflows", workflow_name: workflowName, run_id: runId }) + "*";
      const keys = await this.operations.scanKeys(key);
      const workflows = await Promise.all(
        keys.map(async (key2) => {
          const data2 = await this.client.get(key2);
          return data2;
        })
      );
      const data = workflows.find((w) => w?.run_id === runId && w?.workflow_name === workflowName);
      if (!data) return null;
      return parseWorkflowRun(data);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_WORKFLOW_RUN_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            namespace: "workflows",
            runId,
            workflowName: workflowName || ""
          }
        },
        error
      );
    }
  }
  async getWorkflowRuns({
    workflowName,
    fromDate,
    toDate,
    limit,
    offset,
    resourceId
  }) {
    try {
      let pattern = getKey(TABLE_WORKFLOW_SNAPSHOT, { namespace: "workflows" }) + ":*";
      if (workflowName && resourceId) {
        pattern = getKey(TABLE_WORKFLOW_SNAPSHOT, {
          namespace: "workflows",
          workflow_name: workflowName,
          run_id: "*",
          resourceId
        });
      } else if (workflowName) {
        pattern = getKey(TABLE_WORKFLOW_SNAPSHOT, { namespace: "workflows", workflow_name: workflowName }) + ":*";
      } else if (resourceId) {
        pattern = getKey(TABLE_WORKFLOW_SNAPSHOT, {
          namespace: "workflows",
          workflow_name: "*",
          run_id: "*",
          resourceId
        });
      }
      const keys = await this.operations.scanKeys(pattern);
      if (keys.length === 0) {
        return { runs: [], total: 0 };
      }
      const pipeline = this.client.pipeline();
      keys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      let runs = results.map((result) => result).filter(
        (record) => record !== null && record !== void 0 && typeof record === "object" && "workflow_name" in record
      ).filter((record) => !workflowName || record.workflow_name === workflowName).map((w) => parseWorkflowRun(w)).filter((w) => {
        if (fromDate && w.createdAt < fromDate) return false;
        if (toDate && w.createdAt > toDate) return false;
        return true;
      }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const total = runs.length;
      if (limit !== void 0 && offset !== void 0) {
        runs = runs.slice(offset, offset + limit);
      }
      return { runs, total };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_STORAGE_GET_WORKFLOW_RUNS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            namespace: "workflows",
            workflowName: workflowName || "",
            resourceId: resourceId || ""
          }
        },
        error
      );
    }
  }
};

// src/storage/index.ts
var UpstashStore = class extends MastraStorage {
  redis;
  stores;
  constructor(config) {
    super({ name: "Upstash" });
    this.redis = new Redis({
      url: config.url,
      token: config.token
    });
    const operations = new StoreOperationsUpstash({ client: this.redis });
    const traces = new TracesUpstash({ client: this.redis, operations });
    const scores = new ScoresUpstash({ client: this.redis, operations });
    const workflows = new WorkflowsUpstash({ client: this.redis, operations });
    const memory = new StoreMemoryUpstash({ client: this.redis, operations });
    const legacyEvals = new StoreLegacyEvalsUpstash({ client: this.redis, operations });
    this.stores = {
      operations,
      traces,
      scores,
      workflows,
      memory,
      legacyEvals
    };
  }
  get supports() {
    return {
      selectByIncludeResourceScope: true,
      resourceWorkingMemory: true,
      hasColumn: false,
      createTable: false,
      deleteMessages: true
    };
  }
  /**
   * @deprecated Use getEvals instead
   */
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  /**
   * Get all evaluations with pagination and total count
   * @param options Pagination and filtering options
   * @returns Object with evals array and total count
   */
  async getEvals(options) {
    return this.stores.legacyEvals.getEvals(options);
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
  async batchTraceInsert(args) {
    return this.stores.traces.batchTraceInsert(args);
  }
  async createTable({
    tableName,
    schema
  }) {
    return this.stores.operations.createTable({ tableName, schema });
  }
  /**
   * No-op: This backend is schemaless and does not require schema changes.
   * @param tableName Name of the table
   * @param schema Schema of the table
   * @param ifNotExists Array of column names to add if they don't exist
   */
  async alterTable(args) {
    return this.stores.operations.alterTable(args);
  }
  async clearTable({ tableName }) {
    return this.stores.operations.clearTable({ tableName });
  }
  async dropTable({ tableName }) {
    return this.stores.operations.dropTable({ tableName });
  }
  async insert({ tableName, record }) {
    return this.stores.operations.insert({ tableName, record });
  }
  async batchInsert(input) {
    return this.stores.operations.batchInsert(input);
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
  async getMessagesPaginated(args) {
    return this.stores.memory.getMessagesPaginated(args);
  }
  async persistWorkflowSnapshot(params) {
    return this.stores.workflows.persistWorkflowSnapshot(params);
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
  async close() {
  }
  async updateMessages(args) {
    return this.stores.memory.updateMessages(args);
  }
  async deleteMessages(messageIds) {
    return this.stores.memory.deleteMessages(messageIds);
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
    return this.stores.scores.getScoresByEntityId({
      entityId,
      entityType,
      pagination
    });
  }
  async getScoresByScorerId({
    scorerId,
    pagination
  }) {
    return this.stores.scores.getScoresByScorerId({ scorerId, pagination });
  }
};
var UpstashFilterTranslator = class extends BaseFilterTranslator {
  getSupportedOperators() {
    return {
      ...BaseFilterTranslator.DEFAULT_OPERATORS,
      array: ["$in", "$nin", "$all"],
      regex: ["$regex"],
      custom: ["$contains"]
    };
  }
  translate(filter) {
    if (this.isEmpty(filter)) return void 0;
    this.validateFilter(filter);
    return this.translateNode(filter);
  }
  translateNode(node, path = "") {
    if (this.isRegex(node)) {
      throw new Error("Direct regex pattern format is not supported in Upstash");
    }
    if (node === null || node === void 0) {
      throw new Error("Filtering for null/undefined values is not supported by Upstash Vector");
    }
    if (this.isPrimitive(node)) {
      if (node === null || node === void 0) {
        throw new Error("Filtering for null/undefined values is not supported by Upstash Vector");
      }
      return this.formatComparison(path, "=", node);
    }
    if (Array.isArray(node)) {
      if (node.length === 0) {
        return "(HAS FIELD empty AND HAS NOT FIELD empty)";
      }
      return `${path} IN (${this.formatArray(node)})`;
    }
    const entries = Object.entries(node);
    const conditions = [];
    for (const [key, value] of entries) {
      const newPath = path ? `${path}.${key}` : key;
      if (this.isOperator(key)) {
        conditions.push(this.translateOperator(key, value, path));
      } else if (typeof value === "object" && value !== null) {
        conditions.push(this.translateNode(value, newPath));
      } else if (value === null || value === void 0) {
        throw new Error("Filtering for null/undefined values is not supported by Upstash Vector");
      } else {
        conditions.push(this.formatComparison(newPath, "=", value));
      }
    }
    return conditions.length > 1 ? `(${conditions.join(" AND ")})` : conditions[0] ?? "";
  }
  COMPARISON_OPS = {
    $eq: "=",
    $ne: "!=",
    $gt: ">",
    $gte: ">=",
    $lt: "<",
    $lte: "<="
  };
  translateOperator(operator, value, path) {
    if (this.isBasicOperator(operator) || this.isNumericOperator(operator)) {
      return this.formatComparison(path, this.COMPARISON_OPS[operator], value);
    }
    switch (operator) {
      case "$in":
        if (!Array.isArray(value) || value.length === 0) {
          return "(HAS FIELD empty AND HAS NOT FIELD empty)";
        }
        return `${path} IN (${this.formatArray(value)})`;
      case "$nin":
        return `${path} NOT IN (${this.formatArray(value)})`;
      case "$contains":
        return `${path} CONTAINS ${this.formatValue(value)}`;
      case "$regex":
        return `${path} GLOB ${this.formatValue(value)}`;
      case "$exists":
        return value ? `HAS FIELD ${path}` : `HAS NOT FIELD ${path}`;
      case "$and":
        if (!Array.isArray(value) || value.length === 0) {
          return "(HAS FIELD empty OR HAS NOT FIELD empty)";
        }
        return this.joinConditions(value, "AND");
      case "$or":
        if (!Array.isArray(value) || value.length === 0) {
          return "(HAS FIELD empty AND HAS NOT FIELD empty)";
        }
        return this.joinConditions(value, "OR");
      case "$not":
        return this.formatNot(path, value);
      case "$nor":
        return this.formatNot("", { $or: value });
      case "$all":
        return this.translateOperator(
          "$and",
          value.map((item) => ({ [path]: { $contains: item } })),
          ""
        );
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
  NEGATED_OPERATORS = {
    $eq: "$ne",
    $ne: "$eq",
    $gt: "$lte",
    $gte: "$lt",
    $lt: "$gte",
    $lte: "$gt",
    $in: "$nin",
    $nin: "$in",
    $exists: "$exists"
    // Special case - we'll flip the value
  };
  formatNot(path, value) {
    if (typeof value !== "object") {
      return `${path} != ${this.formatValue(value)}`;
    }
    if (!Object.keys(value).some((k) => k.startsWith("$"))) {
      const [fieldName, fieldValue] = Object.entries(value)[0] ?? [];
      if (typeof fieldValue === "object" && fieldValue !== null && Object.keys(fieldValue)[0]?.startsWith("$")) {
        const [op2, val2] = Object.entries(fieldValue)[0] ?? [];
        const negatedOp = this.NEGATED_OPERATORS[op2];
        if (!negatedOp) throw new Error(`Unsupported operator in NOT: ${op2}`);
        if (op2 === "$exists") {
          return this.translateOperator(op2, !val2, fieldName ?? "");
        }
        return this.translateOperator(negatedOp, val2, fieldName ?? "");
      }
      return `${fieldName} != ${this.formatValue(fieldValue)}`;
    }
    const [op, val] = Object.entries(value)[0] ?? [];
    if (op === "$lt") return `${path} >= ${this.formatValue(val)}`;
    if (op === "$lte") return `${path} > ${this.formatValue(val)}`;
    if (op === "$gt") return `${path} <= ${this.formatValue(val)}`;
    if (op === "$gte") return `${path} < ${this.formatValue(val)}`;
    if (op === "$ne") return `${path} = ${this.formatValue(val)}`;
    if (op === "$eq") return `${path} != ${this.formatValue(val)}`;
    if (op === "$contains") return `${path} NOT CONTAINS ${this.formatValue(val)}`;
    if (op === "$regex") return `${path} NOT GLOB ${this.formatValue(val)}`;
    if (op === "$in") return `${path} NOT IN (${this.formatArray(val)})`;
    if (op === "$exists") return val ? `HAS NOT FIELD ${path}` : `HAS FIELD ${path}`;
    if (op === "$and" || op === "$or") {
      const newOp = op === "$and" ? "$or" : "$and";
      const conditions = val.map((condition) => {
        const [fieldName, fieldValue] = Object.entries(condition)[0] ?? [];
        return { [fieldName]: { $not: fieldValue } };
      });
      return this.translateOperator(newOp, conditions, "");
    }
    if (op === "$nor") {
      return this.translateOperator("$or", val, "");
    }
    return `${path} != ${this.formatValue(val)}`;
  }
  formatValue(value) {
    if (value === null || value === void 0) {
      throw new Error("Filtering for null/undefined values is not supported by Upstash Vector");
    }
    if (typeof value === "string") {
      const hasSingleQuote = /'/g.test(value);
      const hasDoubleQuote = /"/g.test(value);
      if (hasSingleQuote && hasDoubleQuote) {
        return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
      }
      if (hasSingleQuote) {
        return `"${value}"`;
      }
      return `'${value}'`;
    }
    if (typeof value === "number") {
      if (Math.abs(value) < 1e-6 || Math.abs(value) > 1e6) {
        return value.toFixed(20).replace(/\.?0+$/, "");
      }
      return value.toString();
    }
    return String(value);
  }
  formatArray(values) {
    return values.map((value) => {
      if (value === null || value === void 0) {
        throw new Error("Filtering for null/undefined values is not supported by Upstash Vector");
      }
      return this.formatValue(value);
    }).join(", ");
  }
  formatComparison(path, op, value) {
    return `${path} ${op} ${this.formatValue(value)}`;
  }
  joinConditions(conditions, operator) {
    const translated = Array.isArray(conditions) ? conditions.map((c) => this.translateNode(c)) : [this.translateNode(conditions)];
    return `(${translated.join(` ${operator} `)})`;
  }
};

// src/vector/index.ts
var UpstashVector = class extends MastraVector {
  client;
  /**
   * Creates a new UpstashVector instance.
   * @param {object} params - The parameters for the UpstashVector.
   * @param {string} params.url - The URL of the Upstash vector index.
   * @param {string} params.token - The token for the Upstash vector index.
   */
  constructor({ url, token }) {
    super();
    this.client = new Index({
      url,
      token
    });
  }
  /**
   * Upserts vectors into the index.
   * @param {UpsertVectorParams} params - The parameters for the upsert operation.
   * @returns {Promise<string[]>} A promise that resolves to the IDs of the upserted vectors.
   */
  async upsert({
    indexName: namespace,
    vectors,
    metadata,
    ids,
    sparseVectors
  }) {
    const generatedIds = ids || vectors.map(() => randomUUID());
    const points = vectors.map((vector, index) => ({
      id: generatedIds[index],
      vector,
      ...sparseVectors?.[index] && { sparseVector: sparseVectors[index] },
      metadata: metadata?.[index]
    }));
    try {
      await this.client.upsert(points, {
        namespace
      });
      return generatedIds;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_UPSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace, vectorCount: vectors.length }
        },
        error
      );
    }
  }
  /**
   * Transforms a Mastra vector filter into an Upstash-compatible filter string.
   * @param {UpstashVectorFilter} [filter] - The filter to transform.
   * @returns {string | undefined} The transformed filter string, or undefined if no filter is provided.
   */
  transformFilter(filter) {
    const translator = new UpstashFilterTranslator();
    return translator.translate(filter);
  }
  /**
   * Creates a new index. For Upstash, this is a no-op as indexes (known as namespaces in Upstash) are created on-the-fly.
   * @param {CreateIndexParams} _params - The parameters for creating the index (ignored).
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async createIndex(_params) {
    this.logger.debug("No need to call createIndex for Upstash");
  }
  /**
   * Queries the vector index.
   * @param {QueryVectorParams} params - The parameters for the query operation. indexName is the namespace in Upstash.
   * @returns {Promise<QueryResult[]>} A promise that resolves to the query results.
   */
  async query({
    indexName: namespace,
    queryVector,
    topK = 10,
    filter,
    includeVector = false,
    sparseVector,
    fusionAlgorithm,
    queryMode
  }) {
    try {
      const ns = this.client.namespace(namespace);
      const filterString = this.transformFilter(filter);
      const results = await ns.query({
        topK,
        vector: queryVector,
        ...sparseVector && { sparseVector },
        includeVectors: includeVector,
        includeMetadata: true,
        ...filterString ? { filter: filterString } : {},
        ...fusionAlgorithm && { fusionAlgorithm },
        ...queryMode && { queryMode }
      });
      return (results || []).map((result) => ({
        id: `${result.id}`,
        score: result.score,
        metadata: result.metadata,
        ...includeVector && { vector: result.vector || [] }
      }));
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_QUERY_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace, topK }
        },
        error
      );
    }
  }
  /**
   * Lists all namespaces in the Upstash vector index, which correspond to indexes.
   * @returns {Promise<string[]>} A promise that resolves to a list of index names.
   */
  async listIndexes() {
    try {
      const indexes = await this.client.listNamespaces();
      return indexes.filter(Boolean);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_LIST_INDEXES_FAILED",
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
   * @param {string} indexName - The name of the namespace to describe
   * @returns A promise that resolves to the index statistics including dimension, count and metric
   */
  async describeIndex({ indexName: namespace }) {
    try {
      const info = await this.client.info();
      return {
        dimension: info.dimension,
        count: info.namespaces?.[namespace]?.vectorCount || 0,
        metric: info?.similarityFunction?.toLowerCase()
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_DESCRIBE_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace }
        },
        error
      );
    }
  }
  /**
   * Deletes an index (namespace).
   * @param {DeleteIndexParams} params - The parameters for the delete operation.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  async deleteIndex({ indexName: namespace }) {
    try {
      await this.client.deleteNamespace(namespace);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_DELETE_INDEX_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace }
        },
        error
      );
    }
  }
  /**
   * Updates a vector by its ID with the provided vector and/or metadata.
   * @param indexName - The name of the namespace containing the vector.
   * @param id - The ID of the vector to update.
   * @param update - An object containing the vector and/or metadata to update.
   * @param update.vector - An optional array of numbers representing the new vector.
   * @param update.metadata - An optional record containing the new metadata.
   * @returns A promise that resolves when the update is complete.
   * @throws Will throw an error if no updates are provided or if the update operation fails.
   */
  async updateVector({ indexName: namespace, id, update }) {
    if (!update.vector && !update.metadata && !update.sparseVector) {
      throw new MastraError({
        id: "STORAGE_UPSTASH_VECTOR_UPDATE_VECTOR_FAILED",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.THIRD_PARTY,
        details: { namespace, id },
        text: "No update data provided"
      });
    }
    if (!update.vector && !update.sparseVector && update.metadata) {
      throw new MastraError({
        id: "STORAGE_UPSTASH_VECTOR_UPDATE_VECTOR_FAILED",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.THIRD_PARTY,
        details: { namespace, id },
        text: "Both vector and metadata must be provided for an update"
      });
    }
    try {
      const points = { id };
      if (update.vector) points.vector = update.vector;
      if (update.metadata) points.metadata = update.metadata;
      if (update.sparseVector) points.sparseVector = update.sparseVector;
      await this.client.upsert(points, { namespace });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_UPDATE_VECTOR_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace, id }
        },
        error
      );
    }
  }
  /**
   * Deletes a vector by its ID.
   * @param indexName - The name of the namespace containing the vector.
   * @param id - The ID of the vector to delete.
   * @returns A promise that resolves when the deletion is complete.
   * @throws Will throw an error if the deletion operation fails.
   */
  async deleteVector({ indexName: namespace, id }) {
    try {
      await this.client.delete(id, {
        namespace
      });
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "STORAGE_UPSTASH_VECTOR_DELETE_VECTOR_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { namespace, id }
        },
        error
      );
      this.logger?.error(mastraError.toString());
    }
  }
};

// src/vector/prompt.ts
var UPSTASH_PROMPT = `When querying Upstash Vector, you can ONLY use the operators listed below. Any other operators will be rejected.
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
    { "rating": { "$exists": true, "$gt": 4 } },
    { "$or": [
      { "stock": { "$gt": 0 } },
      { "preorder": true }
    ]}
  ]
}`;

export { UPSTASH_PROMPT, UpstashStore, UpstashVector };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map