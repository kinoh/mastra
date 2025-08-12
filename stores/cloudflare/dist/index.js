import { MastraError, ErrorCategory, ErrorDomain } from '@mastra/core/error';
import { MastraStorage, TABLE_THREADS, TABLE_MESSAGES, TABLE_WORKFLOW_SNAPSHOT, TABLE_EVALS, TABLE_SCORERS, TABLE_TRACES, StoreOperations, serializeDate, ensureDate, LegacyEvalsStorage, WorkflowsStorage, TracesStorage, MemoryStorage, resolveMessageLimit, TABLE_RESOURCES, ScoresStorage } from '@mastra/core/storage';
import Cloudflare from 'cloudflare';
import { MessageList } from '@mastra/core/agent';

// src/storage/index.ts
var LegacyEvalsStorageCloudflare = class extends LegacyEvalsStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getEvalsByAgentName(agentName, type) {
    try {
      const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
      const keyObjs = await this.operations.listKV(TABLE_EVALS, { prefix: `${prefix}${TABLE_EVALS}` });
      const evals = [];
      for (const { name: key } of keyObjs) {
        const data = await this.operations.getKV(TABLE_EVALS, key);
        if (!data) continue;
        if (data.agent_name !== agentName) continue;
        if (type) {
          const isTest = data.test_info !== null && data.test_info !== void 0;
          const evalType = isTest ? "test" : "live";
          if (evalType !== type) continue;
        }
        const mappedData = {
          ...data,
          runId: data.run_id,
          testInfo: data.test_info
        };
        evals.push(mappedData);
      }
      evals.sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });
      return evals;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_EVALS_BY_AGENT_NAME_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Failed to get evals by agent name"
        },
        error
      );
    }
  }
  async getEvals(options) {
    try {
      const { agentName, type, page = 0, perPage = 100, dateRange } = options;
      const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
      const keyObjs = await this.operations.listKV(TABLE_EVALS, { prefix: `${prefix}${TABLE_EVALS}` });
      const evals = [];
      for (const { name: key } of keyObjs) {
        const data = await this.operations.getKV(TABLE_EVALS, key);
        if (!data) continue;
        if (agentName && data.agent_name !== agentName) continue;
        if (type) {
          const isTest = data.test_info !== null && data.test_info !== void 0;
          const evalType = isTest ? "test" : "live";
          if (evalType !== type) continue;
        }
        if (dateRange?.start || dateRange?.end) {
          const evalDate = new Date(data.createdAt || data.created_at || 0);
          if (dateRange.start && evalDate < dateRange.start) continue;
          if (dateRange.end && evalDate > dateRange.end) continue;
        }
        const mappedData = {
          ...data,
          runId: data.run_id,
          testInfo: data.test_info
        };
        evals.push(mappedData);
      }
      evals.sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });
      const start = page * perPage;
      const end = start + perPage;
      const paginatedEvals = evals.slice(start, end);
      return {
        page,
        perPage,
        total: evals.length,
        hasMore: start + perPage < evals.length,
        evals: paginatedEvals
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_EVALS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Failed to get evals"
        },
        error
      );
    }
  }
};
var MemoryStorageCloudflare = class extends MemoryStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  ensureMetadata(metadata) {
    if (!metadata) return void 0;
    return typeof metadata === "string" ? JSON.parse(metadata) : metadata;
  }
  async getThreadById({ threadId }) {
    const thread = await this.operations.load({ tableName: TABLE_THREADS, keys: { id: threadId } });
    if (!thread) return null;
    try {
      return {
        ...thread,
        createdAt: ensureDate(thread.createdAt),
        updatedAt: ensureDate(thread.updatedAt),
        metadata: this.ensureMetadata(thread.metadata)
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_THREAD_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return null;
    }
  }
  async getThreadsByResourceId({ resourceId }) {
    try {
      const keyList = await this.operations.listKV(TABLE_THREADS);
      const threads = await Promise.all(
        keyList.map(async (keyObj) => {
          try {
            const data = await this.operations.getKV(TABLE_THREADS, keyObj.name);
            if (!data) return null;
            const thread = typeof data === "string" ? JSON.parse(data) : data;
            if (!thread || !thread.resourceId || thread.resourceId !== resourceId) return null;
            return {
              ...thread,
              createdAt: ensureDate(thread.createdAt),
              updatedAt: ensureDate(thread.updatedAt),
              metadata: this.ensureMetadata(thread.metadata)
            };
          } catch (error) {
            const mastraError = new MastraError(
              {
                id: "CLOUDFLARE_STORAGE_GET_THREADS_BY_RESOURCE_ID_FAILED",
                domain: ErrorDomain.STORAGE,
                category: ErrorCategory.THIRD_PARTY,
                details: {
                  resourceId
                }
              },
              error
            );
            this.logger?.trackException(mastraError);
            this.logger?.error(mastraError.toString());
            return null;
          }
        })
      );
      return threads.filter((thread) => thread !== null);
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            resourceId
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return [];
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    try {
      const { resourceId, page = 0, perPage = 100 } = args;
      const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
      const keyObjs = await this.operations.listKV(TABLE_THREADS, { prefix: `${prefix}${TABLE_THREADS}` });
      const threads = [];
      for (const { name: key } of keyObjs) {
        const data = await this.operations.getKV(TABLE_THREADS, key);
        if (!data) continue;
        if (data.resourceId !== resourceId) continue;
        threads.push(data);
      }
      threads.sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });
      const start = page * perPage;
      const end = start + perPage;
      const paginatedThreads = threads.slice(start, end);
      return {
        page,
        perPage,
        total: threads.length,
        hasMore: start + perPage < threads.length,
        threads: paginatedThreads
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_THREADS_BY_RESOURCE_ID_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Failed to get threads by resource ID with pagination"
        },
        error
      );
    }
  }
  async saveThread({ thread }) {
    try {
      await this.operations.insert({ tableName: TABLE_THREADS, record: thread });
      return thread;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SAVE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId: thread.id
          }
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
    try {
      const thread = await this.getThreadById({ threadId: id });
      if (!thread) {
        throw new Error(`Thread ${id} not found`);
      }
      const updatedThread = {
        ...thread,
        title,
        metadata: this.ensureMetadata({
          ...thread.metadata ?? {},
          ...metadata
        }),
        updatedAt: /* @__PURE__ */ new Date()
      };
      await this.operations.insert({ tableName: TABLE_THREADS, record: updatedThread });
      return updatedThread;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_UPDATE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            threadId: id,
            title
          }
        },
        error
      );
    }
  }
  getMessageKey(threadId, messageId) {
    try {
      return this.operations.getKey(TABLE_MESSAGES, { threadId, id: messageId });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting message key for thread ${threadId} and message ${messageId}:`, { message });
      throw error;
    }
  }
  getThreadMessagesKey(threadId) {
    try {
      return this.operations.getKey(TABLE_MESSAGES, { threadId, id: "messages" });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting thread messages key for thread ${threadId}:`, { message });
      throw error;
    }
  }
  async deleteThread({ threadId }) {
    try {
      const thread = await this.getThreadById({ threadId });
      if (!thread) {
        throw new Error(`Thread ${threadId} not found`);
      }
      const messageKeys = await this.operations.listKV(TABLE_MESSAGES);
      const threadMessageKeys = messageKeys.filter((key) => key.name.includes(`${TABLE_MESSAGES}:${threadId}:`));
      await Promise.all([
        // Delete message order
        this.operations.deleteKV(TABLE_MESSAGES, this.getThreadMessagesKey(threadId)),
        // Delete all messages
        ...threadMessageKeys.map((key) => this.operations.deleteKV(TABLE_MESSAGES, key.name)),
        // Delete thread
        this.operations.deleteKV(TABLE_THREADS, this.operations.getKey(TABLE_THREADS, { id: threadId }))
      ]);
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_DELETE_THREAD_FAILED",
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
  async findMessageInAnyThread(messageId) {
    try {
      const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
      const threadKeys = await this.operations.listKV(TABLE_THREADS, { prefix: `${prefix}${TABLE_THREADS}` });
      for (const { name: threadKey } of threadKeys) {
        const threadId = threadKey.split(":").pop();
        if (!threadId || threadId === "messages") continue;
        const messageKey = this.getMessageKey(threadId, messageId);
        const message = await this.operations.getKV(TABLE_MESSAGES, messageKey);
        if (message) {
          return { ...message, threadId };
        }
      }
      return null;
    } catch (error) {
      this.logger?.error(`Error finding message ${messageId} in any thread:`, error);
      return null;
    }
  }
  /**
   * Queue for serializing sorted order updates.
   * Updates the sorted order for a given key. This operation is eventually consistent.
   */
  updateQueue = /* @__PURE__ */ new Map();
  async updateSorting(threadMessages) {
    return threadMessages.map((msg) => ({
      message: msg,
      // Use _index if available, otherwise timestamp, matching Upstash
      score: msg._index !== void 0 ? msg._index : msg.createdAt.getTime()
    })).sort((a, b) => a.score - b.score).map((item) => ({
      id: item.message.id,
      score: item.score
    }));
  }
  /**
   * Updates the sorted order for a given key. This operation is eventually consistent.
   * Note: Operations on the same orderKey are serialized using a queue to prevent
   * concurrent updates from conflicting with each other.
   */
  async updateSortedMessages(orderKey, newEntries) {
    const currentPromise = this.updateQueue.get(orderKey) || Promise.resolve();
    const nextPromise = currentPromise.then(async () => {
      try {
        const currentOrder = await this.getSortedMessages(orderKey);
        const orderMap = new Map(currentOrder.map((entry) => [entry.id, entry]));
        for (const entry of newEntries) {
          orderMap.set(entry.id, entry);
        }
        const updatedOrder = Array.from(orderMap.values()).sort((a, b) => a.score - b.score);
        await this.operations.putKV({
          tableName: TABLE_MESSAGES,
          key: orderKey,
          value: JSON.stringify(updatedOrder)
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(`Error updating sorted order for key ${orderKey}:`, { message });
        throw error;
      } finally {
        if (this.updateQueue.get(orderKey) === nextPromise) {
          this.updateQueue.delete(orderKey);
        }
      }
    });
    this.updateQueue.set(orderKey, nextPromise);
    return nextPromise;
  }
  async getSortedMessages(orderKey) {
    const raw = await this.operations.getKV(TABLE_MESSAGES, orderKey);
    if (!raw) return [];
    try {
      const arr = JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      this.logger.error(`Error parsing order data for key ${orderKey}:`, { e });
      return [];
    }
  }
  async migrateMessage(messageId, fromThreadId, toThreadId) {
    try {
      const oldMessageKey = this.getMessageKey(fromThreadId, messageId);
      const message = await this.operations.getKV(TABLE_MESSAGES, oldMessageKey);
      if (!message) return;
      const updatedMessage = {
        ...message,
        threadId: toThreadId
      };
      const newMessageKey = this.getMessageKey(toThreadId, messageId);
      await this.operations.putKV({ tableName: TABLE_MESSAGES, key: newMessageKey, value: updatedMessage });
      const oldOrderKey = this.getThreadMessagesKey(fromThreadId);
      const oldEntries = await this.getSortedMessages(oldOrderKey);
      const filteredEntries = oldEntries.filter((entry) => entry.id !== messageId);
      await this.updateSortedMessages(oldOrderKey, filteredEntries);
      const newOrderKey = this.getThreadMessagesKey(toThreadId);
      const newEntries = await this.getSortedMessages(newOrderKey);
      const newEntry = { id: messageId, score: Date.now() };
      newEntries.push(newEntry);
      await this.updateSortedMessages(newOrderKey, newEntries);
      await this.operations.deleteKV(TABLE_MESSAGES, oldMessageKey);
    } catch (error) {
      this.logger?.error(`Error migrating message ${messageId} from ${fromThreadId} to ${toThreadId}:`, error);
      throw error;
    }
  }
  async saveMessages(args) {
    const { messages, format = "v1" } = args;
    if (!Array.isArray(messages) || messages.length === 0) return [];
    try {
      const validatedMessages = messages.map((message, index) => {
        const errors = [];
        if (!message.id) errors.push("id is required");
        if (!message.threadId) errors.push("threadId is required");
        if (!message.content) errors.push("content is required");
        if (!message.role) errors.push("role is required");
        if (!message.createdAt) errors.push("createdAt is required");
        if (message.resourceId === null || message.resourceId === void 0) errors.push("resourceId is required");
        if (errors.length > 0) {
          throw new Error(`Invalid message at index ${index}: ${errors.join(", ")}`);
        }
        return {
          ...message,
          createdAt: ensureDate(message.createdAt),
          type: message.type || "v2",
          _index: index
        };
      }).filter((m) => !!m);
      const messageMigrationTasks = [];
      for (const message of validatedMessages) {
        const existingMessage = await this.findMessageInAnyThread(message.id);
        console.log(`Checking message ${message.id}: existing=${existingMessage?.threadId}, new=${message.threadId}`);
        if (existingMessage && existingMessage.threadId && existingMessage.threadId !== message.threadId) {
          console.log(`Migrating message ${message.id} from ${existingMessage.threadId} to ${message.threadId}`);
          messageMigrationTasks.push(this.migrateMessage(message.id, existingMessage.threadId, message.threadId));
        }
      }
      await Promise.all(messageMigrationTasks);
      const messagesByThread = validatedMessages.reduce((acc, message) => {
        if (message.threadId && !acc.has(message.threadId)) {
          acc.set(message.threadId, []);
        }
        if (message.threadId) {
          acc.get(message.threadId).push(message);
        }
        return acc;
      }, /* @__PURE__ */ new Map());
      await Promise.all(
        Array.from(messagesByThread.entries()).map(async ([threadId, threadMessages]) => {
          try {
            const thread = await this.getThreadById({ threadId });
            if (!thread) {
              throw new Error(`Thread ${threadId} not found`);
            }
            await Promise.all(
              threadMessages.map(async (message) => {
                const key = this.getMessageKey(threadId, message.id);
                const { _index, ...cleanMessage } = message;
                const serializedMessage = {
                  ...cleanMessage,
                  createdAt: serializeDate(cleanMessage.createdAt)
                };
                console.log(`Saving message ${message.id} with content:`, {
                  content: serializedMessage.content,
                  contentType: typeof serializedMessage.content,
                  isArray: Array.isArray(serializedMessage.content)
                });
                await this.operations.putKV({ tableName: TABLE_MESSAGES, key, value: serializedMessage });
              })
            );
            const orderKey = this.getThreadMessagesKey(threadId);
            const entries = await this.updateSorting(threadMessages);
            await this.updateSortedMessages(orderKey, entries);
            const updatedThread = {
              ...thread,
              updatedAt: /* @__PURE__ */ new Date()
            };
            await this.operations.putKV({
              tableName: TABLE_THREADS,
              key: this.operations.getKey(TABLE_THREADS, { id: threadId }),
              value: updatedThread
            });
          } catch (error) {
            throw new MastraError(
              {
                id: "CLOUDFLARE_STORAGE_SAVE_MESSAGES_FAILED",
                domain: ErrorDomain.STORAGE,
                category: ErrorCategory.THIRD_PARTY,
                details: {
                  threadId
                }
              },
              error
            );
          }
        })
      );
      const prepared = validatedMessages.map(
        ({ _index, ...message }) => ({ ...message, type: message.type !== "v2" ? message.type : void 0 })
      );
      const list = new MessageList().add(prepared, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SAVE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async getRank(orderKey, id) {
    const order = await this.getSortedMessages(orderKey);
    const index = order.findIndex((item) => item.id === id);
    return index >= 0 ? index : null;
  }
  async getRange(orderKey, start, end) {
    const order = await this.getSortedMessages(orderKey);
    const actualStart = start < 0 ? Math.max(0, order.length + start) : start;
    const actualEnd = end < 0 ? order.length + end : Math.min(end, order.length - 1);
    const sliced = order.slice(actualStart, actualEnd + 1);
    return sliced.map((item) => item.id);
  }
  async getLastN(orderKey, n) {
    return this.getRange(orderKey, -n, -1);
  }
  async getFullOrder(orderKey) {
    return this.getRange(orderKey, 0, -1);
  }
  async getIncludedMessagesWithContext(threadId, include, messageIds) {
    await Promise.all(
      include.map(async (item) => {
        const targetThreadId = item.threadId || threadId;
        if (!targetThreadId) return;
        const threadMessagesKey = this.getThreadMessagesKey(targetThreadId);
        messageIds.add(item.id);
        if (!item.withPreviousMessages && !item.withNextMessages) return;
        const rank = await this.getRank(threadMessagesKey, item.id);
        if (rank === null) return;
        if (item.withPreviousMessages) {
          const prevIds = await this.getRange(
            threadMessagesKey,
            Math.max(0, rank - item.withPreviousMessages),
            rank - 1
          );
          prevIds.forEach((id) => messageIds.add(id));
        }
        if (item.withNextMessages) {
          const nextIds = await this.getRange(threadMessagesKey, rank + 1, rank + item.withNextMessages);
          nextIds.forEach((id) => messageIds.add(id));
        }
      })
    );
  }
  async getRecentMessages(threadId, limit, messageIds) {
    if (limit <= 0) return;
    try {
      const threadMessagesKey = this.getThreadMessagesKey(threadId);
      const latestIds = await this.getLastN(threadMessagesKey, limit);
      latestIds.forEach((id) => messageIds.add(id));
    } catch {
      console.log(`No message order found for thread ${threadId}, skipping latest messages`);
    }
  }
  async fetchAndParseMessagesFromMultipleThreads(messageIds, include, targetThreadId) {
    const messageIdToThreadId = /* @__PURE__ */ new Map();
    if (include) {
      for (const item of include) {
        if (item.threadId) {
          messageIdToThreadId.set(item.id, item.threadId);
        }
      }
    }
    const messages = await Promise.all(
      messageIds.map(async (id) => {
        try {
          let threadId = messageIdToThreadId.get(id);
          if (!threadId) {
            if (targetThreadId) {
              threadId = targetThreadId;
            } else {
              const foundMessage = await this.findMessageInAnyThread(id);
              if (foundMessage) {
                threadId = foundMessage.threadId;
              }
            }
          }
          if (!threadId) return null;
          const key = this.getMessageKey(threadId, id);
          const data = await this.operations.getKV(TABLE_MESSAGES, key);
          if (!data) return null;
          const parsed = typeof data === "string" ? JSON.parse(data) : data;
          console.log(`Retrieved message ${id} from thread ${threadId} with content:`, {
            content: parsed.content,
            contentType: typeof parsed.content,
            isArray: Array.isArray(parsed.content)
          });
          return parsed;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          this.logger.error(`Error retrieving message ${id}:`, { message });
          return null;
        }
      })
    );
    return messages.filter((msg) => msg !== null);
  }
  async getMessages({
    threadId,
    resourceId,
    selectBy,
    format
  }) {
    console.log(`getMessages called with format: ${format}, threadId: ${threadId}`);
    if (!threadId) throw new Error("threadId is required");
    const actualFormat = format || "v1";
    console.log(`Using format: ${actualFormat}`);
    if (!threadId) throw new Error("threadId is required");
    const limit = resolveMessageLimit({ last: selectBy?.last, defaultLimit: 40 });
    const messageIds = /* @__PURE__ */ new Set();
    if (limit === 0 && !selectBy?.include?.length) return [];
    try {
      await Promise.all([
        selectBy?.include?.length ? this.getIncludedMessagesWithContext(threadId, selectBy.include, messageIds) : Promise.resolve(),
        limit > 0 ? this.getRecentMessages(threadId, limit, messageIds) : Promise.resolve()
      ]);
      const targetThreadId = selectBy?.include?.length ? void 0 : threadId;
      const messages = await this.fetchAndParseMessagesFromMultipleThreads(
        Array.from(messageIds),
        selectBy?.include,
        targetThreadId
      );
      if (!messages.length) return [];
      try {
        const threadMessagesKey = this.getThreadMessagesKey(threadId);
        const messageOrder = await this.getFullOrder(threadMessagesKey);
        const orderMap = new Map(messageOrder.map((id, index) => [id, index]));
        messages.sort((a, b) => {
          const indexA = orderMap.get(a.id);
          const indexB = orderMap.get(b.id);
          if (indexA !== void 0 && indexB !== void 0) return orderMap.get(a.id) - orderMap.get(b.id);
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
      } catch (error) {
        const mastraError = new MastraError(
          {
            id: "CLOUDFLARE_STORAGE_SORT_MESSAGES_FAILED",
            domain: ErrorDomain.STORAGE,
            category: ErrorCategory.THIRD_PARTY,
            text: `Error sorting messages for thread ${threadId} falling back to creation time`,
            details: {
              threadId
            }
          },
          error
        );
        this.logger?.trackException(mastraError);
        this.logger?.error(mastraError.toString());
        messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      const prepared = messages.map(({ _index, ...message }) => ({
        ...message,
        type: message.type === `v2` ? void 0 : message.type,
        createdAt: ensureDate(message.createdAt)
      }));
      if (actualFormat === `v1`) {
        console.log(`Processing ${prepared.length} messages for v1 format - returning directly without MessageList`);
        return prepared.map((msg) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
      }
      const list = new MessageList({ threadId, resourceId }).add(prepared, "memory");
      return list.get.all.v2();
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error retrieving messages for thread ${threadId}`,
          details: {
            threadId
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return [];
    }
  }
  async getMessagesPaginated(args) {
    try {
      const { threadId, selectBy, format = "v1" } = args;
      const { page = 0, perPage = 100 } = selectBy?.pagination || {};
      const messages = format === "v2" ? await this.getMessages({ threadId, selectBy, format: "v2" }) : await this.getMessages({ threadId, selectBy, format: "v1" });
      let filteredMessages = messages;
      if (selectBy?.pagination?.dateRange) {
        const { start: dateStart, end: dateEnd } = selectBy.pagination.dateRange;
        filteredMessages = messages.filter((message) => {
          const messageDate = new Date(message.createdAt);
          if (dateStart && messageDate < dateStart) return false;
          if (dateEnd && messageDate > dateEnd) return false;
          return true;
        });
      }
      const start = page * perPage;
      const end = start + perPage;
      const paginatedMessages = filteredMessages.slice(start, end);
      return {
        page,
        perPage,
        total: filteredMessages.length,
        hasMore: start + perPage < filteredMessages.length,
        messages: paginatedMessages
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_MESSAGES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Failed to get messages with pagination"
        },
        error
      );
    }
  }
  async updateMessages(args) {
    try {
      const { messages } = args;
      const updatedMessages = [];
      for (const messageUpdate of messages) {
        const { id, content, ...otherFields } = messageUpdate;
        const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
        const keyObjs = await this.operations.listKV(TABLE_MESSAGES, { prefix: `${prefix}${TABLE_MESSAGES}` });
        let existingMessage = null;
        let messageKey = "";
        for (const { name: key } of keyObjs) {
          const data = await this.operations.getKV(TABLE_MESSAGES, key);
          if (data && data.id === id) {
            existingMessage = data;
            messageKey = key;
            break;
          }
        }
        if (!existingMessage) {
          continue;
        }
        const updatedMessage = {
          ...existingMessage,
          ...otherFields,
          id
        };
        if (content) {
          if (content.metadata !== void 0) {
            updatedMessage.content = {
              ...updatedMessage.content,
              metadata: {
                ...updatedMessage.content?.metadata,
                ...content.metadata
              }
            };
          }
          if (content.content !== void 0) {
            updatedMessage.content = {
              ...updatedMessage.content,
              content: content.content
            };
          }
        }
        if ("threadId" in messageUpdate && messageUpdate.threadId && messageUpdate.threadId !== existingMessage.threadId) {
          await this.operations.deleteKV(TABLE_MESSAGES, messageKey);
          updatedMessage.threadId = messageUpdate.threadId;
          const newMessageKey = this.getMessageKey(messageUpdate.threadId, id);
          await this.operations.putKV({
            tableName: TABLE_MESSAGES,
            key: newMessageKey,
            value: updatedMessage
          });
          if (existingMessage.threadId) {
            const sourceOrderKey = this.getThreadMessagesKey(existingMessage.threadId);
            const sourceEntries = await this.getSortedMessages(sourceOrderKey);
            const filteredEntries = sourceEntries.filter((entry) => entry.id !== id);
            await this.updateSortedMessages(sourceOrderKey, filteredEntries);
          }
          const destOrderKey = this.getThreadMessagesKey(messageUpdate.threadId);
          const destEntries = await this.getSortedMessages(destOrderKey);
          const newEntry = { id, score: Date.now() };
          destEntries.push(newEntry);
          await this.updateSortedMessages(destOrderKey, destEntries);
        } else {
          await this.operations.putKV({
            tableName: TABLE_MESSAGES,
            key: messageKey,
            value: updatedMessage
          });
        }
        const threadsToUpdate = /* @__PURE__ */ new Set();
        if (updatedMessage.threadId) {
          threadsToUpdate.add(updatedMessage.threadId);
        }
        if ("threadId" in messageUpdate && messageUpdate.threadId && messageUpdate.threadId !== existingMessage.threadId) {
          if (existingMessage.threadId) {
            threadsToUpdate.add(existingMessage.threadId);
          }
          threadsToUpdate.add(messageUpdate.threadId);
        }
        for (const threadId of threadsToUpdate) {
          const thread = await this.getThreadById({ threadId });
          if (thread) {
            const updatedThread = {
              ...thread,
              updatedAt: /* @__PURE__ */ new Date()
            };
            await this.operations.putKV({
              tableName: TABLE_THREADS,
              key: this.operations.getKey(TABLE_THREADS, { id: threadId }),
              value: updatedThread
            });
          }
        }
        updatedMessages.push(updatedMessage);
      }
      return updatedMessages;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_UPDATE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Failed to update messages"
        },
        error
      );
    }
  }
  async getResourceById({ resourceId }) {
    try {
      const data = await this.operations.getKV(TABLE_RESOURCES, resourceId);
      if (!data) return null;
      const resource = typeof data === "string" ? JSON.parse(data) : data;
      return {
        ...resource,
        createdAt: ensureDate(resource.createdAt),
        updatedAt: ensureDate(resource.updatedAt),
        metadata: this.ensureMetadata(resource.metadata)
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_RESOURCE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            resourceId
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return null;
    }
  }
  async saveResource({ resource }) {
    try {
      const resourceToSave = {
        ...resource,
        metadata: resource.metadata ? JSON.stringify(resource.metadata) : null
      };
      await this.operations.putKV({
        tableName: TABLE_RESOURCES,
        key: resource.id,
        value: resourceToSave
      });
      return resource;
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SAVE_RESOURCE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            resourceId: resource.id
          }
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
    return this.saveResource({ resource: updatedResource });
  }
};
var StoreOperationsCloudflare = class extends StoreOperations {
  bindings;
  client;
  accountId;
  namespacePrefix;
  constructor({
    namespacePrefix,
    bindings,
    client,
    accountId
  }) {
    super();
    this.bindings = bindings;
    this.namespacePrefix = namespacePrefix;
    this.client = client;
    this.accountId = accountId;
  }
  async hasColumn() {
    return true;
  }
  async alterTable(_args) {
  }
  async clearTable({ tableName }) {
    try {
      const keys = await this.listKV(tableName);
      if (keys.length > 0) {
        await Promise.all(keys.map((keyObj) => this.deleteKV(tableName, keyObj.name)));
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_CLEAR_TABLE_FAILED",
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
    try {
      const keys = await this.listKV(tableName);
      if (keys.length > 0) {
        await Promise.all(keys.map((keyObj) => this.deleteKV(tableName, keyObj.name)));
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_DROP_TABLE_FAILED",
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
  getBinding(tableName) {
    if (!this.bindings) {
      throw new Error(`Cannot use Workers API binding for ${tableName}: Store initialized with REST API configuration`);
    }
    const binding = this.bindings[tableName];
    if (!binding) throw new Error(`No binding found for namespace ${tableName}`);
    return binding;
  }
  getKey(tableName, record) {
    const prefix = this.namespacePrefix ? `${this.namespacePrefix}:` : "";
    switch (tableName) {
      case TABLE_THREADS:
        if (!record.id) throw new Error("Thread ID is required");
        return `${prefix}${tableName}:${record.id}`;
      case TABLE_MESSAGES:
        if (!record.threadId || !record.id) throw new Error("Thread ID and Message ID are required");
        return `${prefix}${tableName}:${record.threadId}:${record.id}`;
      case TABLE_WORKFLOW_SNAPSHOT:
        if (!record.workflow_name || !record.run_id) {
          throw new Error("Workflow name, and run ID are required");
        }
        let key = `${prefix}${tableName}:${record.workflow_name}:${record.run_id}`;
        if (record.resourceId) {
          key = `${key}:${record.resourceId}`;
        }
        return key;
      case TABLE_TRACES:
        if (!record.id) throw new Error("Trace ID is required");
        return `${prefix}${tableName}:${record.id}`;
      case TABLE_EVALS:
        const evalId = record.id || record.run_id;
        if (!evalId) throw new Error("Eval ID or run_id is required");
        return `${prefix}${tableName}:${evalId}`;
      case TABLE_SCORERS:
        if (!record.id) throw new Error("Score ID is required");
        return `${prefix}${tableName}:${record.id}`;
      default:
        throw new Error(`Unsupported table: ${tableName}`);
    }
  }
  getSchemaKey(tableName) {
    const prefix = this.namespacePrefix ? `${this.namespacePrefix}:` : "";
    return `${prefix}schema:${tableName}`;
  }
  /**
   * Helper to safely parse data from KV storage
   */
  safeParse(text) {
    if (!text) return null;
    try {
      const data = JSON.parse(text);
      if (data && typeof data === "object" && "value" in data) {
        if (typeof data.value === "string") {
          try {
            return JSON.parse(data.value);
          } catch {
            return data.value;
          }
        }
        return null;
      }
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error("Failed to parse text:", { message, text });
      return null;
    }
  }
  async createNamespaceById(title) {
    if (this.bindings) {
      return {
        id: title,
        // Use title as ID since that's what we need
        title,
        supports_url_encoding: true
      };
    }
    return await this.client.kv.namespaces.create({
      account_id: this.accountId,
      title
    });
  }
  async createNamespace(namespaceName) {
    try {
      const response = await this.createNamespaceById(namespaceName);
      return response.id;
    } catch (error) {
      if (error.message && error.message.includes("already exists")) {
        const namespaces = await this.listNamespaces();
        const namespace = namespaces.result.find((ns) => ns.title === namespaceName);
        if (namespace) return namespace.id;
      }
      this.logger.error("Error creating namespace:", error);
      throw new Error(`Failed to create namespace ${namespaceName}: ${error.message}`);
    }
  }
  async listNamespaces() {
    if (this.bindings) {
      return {
        result: Object.keys(this.bindings).map((name) => ({
          id: name,
          title: name,
          supports_url_encoding: true
        }))
      };
    }
    let allNamespaces = [];
    let currentPage = 1;
    const perPage = 50;
    let morePagesExist = true;
    while (morePagesExist) {
      const response = await this.client.kv.namespaces.list({
        account_id: this.accountId,
        page: currentPage,
        per_page: perPage
      });
      if (response.result) {
        allNamespaces = allNamespaces.concat(response.result);
      }
      morePagesExist = response.result ? response.result.length === perPage : false;
      if (morePagesExist) {
        currentPage++;
      }
    }
    return { result: allNamespaces };
  }
  async getNamespaceIdByName(namespaceName) {
    try {
      const response = await this.listNamespaces();
      const namespace = response.result.find((ns) => ns.title === namespaceName);
      return namespace ? namespace.id : null;
    } catch (error) {
      this.logger.error(`Failed to get namespace ID for ${namespaceName}:`, error);
      return null;
    }
  }
  async getOrCreateNamespaceId(namespaceName) {
    let namespaceId = await this.getNamespaceIdByName(namespaceName);
    if (!namespaceId) {
      namespaceId = await this.createNamespace(namespaceName);
    }
    return namespaceId;
  }
  async getNamespaceId(tableName) {
    const prefix = this.namespacePrefix ? `${this.namespacePrefix}_` : "";
    try {
      return await this.getOrCreateNamespaceId(`${prefix}${tableName}`);
    } catch (error) {
      this.logger.error("Error fetching namespace ID:", error);
      throw new Error(`Failed to fetch namespace ID for table ${tableName}: ${error.message}`);
    }
  }
  async getNamespaceValue(tableName, key) {
    try {
      if (this.bindings) {
        const binding = this.getBinding(tableName);
        const result = await binding.getWithMetadata(key, "text");
        if (!result) return null;
        return JSON.stringify(result);
      } else {
        const namespaceId = await this.getNamespaceId(tableName);
        const response = await this.client.kv.namespaces.values.get(namespaceId, key, {
          account_id: this.accountId
        });
        return await response.text();
      }
    } catch (error) {
      if (error.message && error.message.includes("key not found")) {
        return null;
      }
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get value for ${tableName} ${key}:`, { message });
      throw error;
    }
  }
  async getKV(tableName, key) {
    try {
      const text = await this.getNamespaceValue(tableName, key);
      return this.safeParse(text);
    } catch (error) {
      this.logger.error(`Failed to get KV value for ${tableName}:${key}:`, error);
      throw new Error(`Failed to get KV value: ${error.message}`);
    }
  }
  async getTableSchema(tableName) {
    try {
      const schemaKey = this.getSchemaKey(tableName);
      return await this.getKV(tableName, schemaKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get schema for ${tableName}:`, { message });
      return null;
    }
  }
  validateColumnValue(value, column) {
    if (value === void 0 || value === null) {
      return column.nullable ?? false;
    }
    switch (column.type) {
      case "text":
      case "uuid":
        return typeof value === "string";
      case "integer":
      case "bigint":
        return typeof value === "number";
      case "timestamp":
        return value instanceof Date || typeof value === "string" && !isNaN(Date.parse(value));
      case "jsonb":
        if (typeof value !== "object") return false;
        try {
          JSON.stringify(value);
          return true;
        } catch {
          return false;
        }
      default:
        return false;
    }
  }
  async validateAgainstSchema(record, schema) {
    try {
      if (!schema || typeof schema !== "object" || schema.value === null) {
        throw new Error("Invalid schema format");
      }
      for (const [columnName, column] of Object.entries(schema)) {
        const value = record[columnName];
        if (column.primaryKey && (value === void 0 || value === null)) {
          throw new Error(`Missing primary key value for column ${columnName}`);
        }
        if (!this.validateColumnValue(value, column)) {
          const valueType = value === null ? "null" : typeof value;
          throw new Error(`Invalid value for column ${columnName}: expected ${column.type}, got ${valueType}`);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error validating record against schema:`, { message, record, schema });
      throw error;
    }
  }
  async validateRecord(record, tableName) {
    try {
      if (!record || typeof record !== "object") {
        throw new Error("Record must be an object");
      }
      const recordTyped = record;
      const schema = await this.getTableSchema(tableName);
      if (schema) {
        await this.validateAgainstSchema(recordTyped, schema);
        return;
      }
      switch (tableName) {
        case TABLE_THREADS:
          if (!("id" in recordTyped) || !("resourceId" in recordTyped) || !("title" in recordTyped)) {
            throw new Error("Thread record missing required fields");
          }
          break;
        case TABLE_MESSAGES:
          if (!("id" in recordTyped) || !("threadId" in recordTyped) || !("content" in recordTyped) || !("role" in recordTyped)) {
            throw new Error("Message record missing required fields");
          }
          break;
        case TABLE_WORKFLOW_SNAPSHOT:
          if (!("workflow_name" in recordTyped) || !("run_id" in recordTyped)) {
            throw new Error("Workflow record missing required fields");
          }
          break;
        case TABLE_TRACES:
          if (!("id" in recordTyped)) {
            throw new Error("Trace record missing required fields");
          }
          break;
        case TABLE_EVALS:
          if (!("agent_name" in recordTyped) || !("run_id" in recordTyped)) {
            throw new Error("Eval record missing required fields");
          }
          break;
        case TABLE_SCORERS:
          if (!("id" in recordTyped) || !("scorerId" in recordTyped)) {
            throw new Error("Score record missing required fields");
          }
          break;
        default:
          throw new Error(`Unknown table type: ${tableName}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to validate record for ${tableName}:`, { message, record });
      throw error;
    }
  }
  async insert({ tableName, record }) {
    try {
      const key = this.getKey(tableName, record);
      const processedRecord = {
        ...record,
        createdAt: record.createdAt ? serializeDate(record.createdAt) : void 0,
        updatedAt: record.updatedAt ? serializeDate(record.updatedAt) : void 0,
        metadata: record.metadata ? JSON.stringify(record.metadata) : ""
      };
      await this.validateRecord(processedRecord, tableName);
      await this.putKV({ tableName, key, value: processedRecord });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_INSERT_FAILED",
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
  ensureMetadata(metadata) {
    if (!metadata) return {};
    return typeof metadata === "string" ? JSON.parse(metadata) : metadata;
  }
  async load({ tableName, keys }) {
    try {
      const key = this.getKey(tableName, keys);
      const data = await this.getKV(tableName, key);
      if (!data) return null;
      const processed = {
        ...data,
        createdAt: ensureDate(data.createdAt),
        updatedAt: ensureDate(data.updatedAt),
        metadata: this.ensureMetadata(data.metadata)
      };
      return processed;
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_LOAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            tableName
          }
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return null;
    }
  }
  async batchInsert(input) {
    if (!input.records || input.records.length === 0) return;
    try {
      await Promise.all(
        input.records.map(async (record) => {
          const key = this.getKey(input.tableName, record);
          const processedRecord = {
            ...record,
            createdAt: record.createdAt ? serializeDate(record.createdAt) : void 0,
            updatedAt: record.updatedAt ? serializeDate(record.updatedAt) : void 0,
            metadata: record.metadata ? JSON.stringify(record.metadata) : void 0
          };
          await this.putKV({ tableName: input.tableName, key, value: processedRecord });
        })
      );
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_BATCH_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error in batch insert for table ${input.tableName}`,
          details: {
            tableName: input.tableName
          }
        },
        error
      );
    }
  }
  /**
   * Helper to safely serialize data for KV storage
   */
  safeSerialize(data) {
    return typeof data === "string" ? data : JSON.stringify(data);
  }
  async putNamespaceValue({
    tableName,
    key,
    value,
    metadata
  }) {
    try {
      const serializedValue = this.safeSerialize(value);
      const serializedMetadata = metadata ? this.safeSerialize(metadata) : "";
      if (this.bindings) {
        const binding = this.getBinding(tableName);
        await binding.put(key, serializedValue, { metadata: serializedMetadata });
      } else {
        const namespaceId = await this.getNamespaceId(tableName);
        await this.client.kv.namespaces.values.update(namespaceId, key, {
          account_id: this.accountId,
          value: serializedValue,
          metadata: serializedMetadata
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to put value for ${tableName} ${key}:`, { message });
      throw error;
    }
  }
  async putKV({
    tableName,
    key,
    value,
    metadata
  }) {
    try {
      await this.putNamespaceValue({ tableName, key, value, metadata });
    } catch (error) {
      this.logger.error(`Failed to put KV value for ${tableName}:${key}:`, error);
      throw new Error(`Failed to put KV value: ${error.message}`);
    }
  }
  async createTable({
    tableName,
    schema
  }) {
    try {
      const schemaKey = this.getSchemaKey(tableName);
      const metadata = {
        type: "table_schema",
        tableName,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.putKV({ tableName, key: schemaKey, value: schema, metadata });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_CREATE_TABLE_FAILED",
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
  async listNamespaceKeys(tableName, options) {
    try {
      if (this.bindings) {
        const binding = this.getBinding(tableName);
        const response = await binding.list({
          limit: options?.limit || 1e3,
          prefix: options?.prefix
        });
        return response.keys;
      } else {
        const namespaceId = await this.getNamespaceId(tableName);
        const response = await this.client.kv.namespaces.keys.list(namespaceId, {
          account_id: this.accountId,
          limit: options?.limit || 1e3,
          prefix: options?.prefix
        });
        return response.result;
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_LIST_NAMESPACE_KEYS_FAILED",
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
  async deleteNamespaceValue(tableName, key) {
    if (this.bindings) {
      const binding = this.getBinding(tableName);
      await binding.delete(key);
    } else {
      const namespaceId = await this.getNamespaceId(tableName);
      await this.client.kv.namespaces.values.delete(namespaceId, key, {
        account_id: this.accountId
      });
    }
  }
  async deleteKV(tableName, key) {
    try {
      await this.deleteNamespaceValue(tableName, key);
    } catch (error) {
      this.logger.error(`Failed to delete KV value for ${tableName}:${key}:`, error);
      throw new Error(`Failed to delete KV value: ${error.message}`);
    }
  }
  async listKV(tableName, options) {
    try {
      return await this.listNamespaceKeys(tableName, options);
    } catch (error) {
      this.logger.error(`Failed to list KV for ${tableName}:`, error);
      throw new Error(`Failed to list KV: ${error.message}`);
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
    input
  };
}
var ScoresStorageCloudflare = class extends ScoresStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  async getScoreById({ id }) {
    try {
      const score = await this.operations.getKV(TABLE_SCORERS, id);
      if (!score) {
        return null;
      }
      return transformScoreRow(score);
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SCORES_GET_SCORE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to get score by id: ${id}`
        },
        error
      );
      this.logger.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return null;
    }
  }
  async saveScore(score) {
    try {
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
      await this.operations.putKV({
        tableName: TABLE_SCORERS,
        key: score.id,
        value: serializedRecord
      });
      const scoreFromDb = await this.getScoreById({ id: score.id });
      return { score: scoreFromDb };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SCORES_SAVE_SCORE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to save score: ${score.id}`
        },
        error
      );
      this.logger.trackException(mastraError);
      this.logger.error(mastraError.toString());
      throw mastraError;
    }
  }
  async getScoresByScorerId({
    scorerId,
    pagination
  }) {
    try {
      const keys = await this.operations.listKV(TABLE_SCORERS);
      const scores = [];
      for (const { name: key } of keys) {
        const score = await this.operations.getKV(TABLE_SCORERS, key);
        if (score && score.scorerId === scorerId) {
          scores.push(transformScoreRow(score));
        }
      }
      scores.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      const total = scores.length;
      const start = pagination.page * pagination.perPage;
      const end = start + pagination.perPage;
      const pagedScores = scores.slice(start, end);
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: end < total
        },
        scores: pagedScores
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SCORES_GET_SCORES_BY_SCORER_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to get scores by scorer id: ${scorerId}`
        },
        error
      );
      this.logger?.trackException(mastraError);
      this.logger?.error(mastraError.toString());
      return { pagination: { total: 0, page: 0, perPage: 100, hasMore: false }, scores: [] };
    }
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    try {
      const keys = await this.operations.listKV(TABLE_SCORERS);
      const scores = [];
      for (const { name: key } of keys) {
        const score = await this.operations.getKV(TABLE_SCORERS, key);
        if (score && score.runId === runId) {
          scores.push(transformScoreRow(score));
        }
      }
      scores.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      const total = scores.length;
      const start = pagination.page * pagination.perPage;
      const end = start + pagination.perPage;
      const pagedScores = scores.slice(start, end);
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: end < total
        },
        scores: pagedScores
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SCORES_GET_SCORES_BY_RUN_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to get scores by run id: ${runId}`
        },
        error
      );
      this.logger.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return { pagination: { total: 0, page: 0, perPage: 100, hasMore: false }, scores: [] };
    }
  }
  async getScoresByEntityId({
    entityId,
    entityType,
    pagination
  }) {
    try {
      const keys = await this.operations.listKV(TABLE_SCORERS);
      const scores = [];
      for (const { name: key } of keys) {
        const score = await this.operations.getKV(TABLE_SCORERS, key);
        if (score && score.entityId === entityId && score.entityType === entityType) {
          scores.push(transformScoreRow(score));
        }
      }
      scores.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      const total = scores.length;
      const start = pagination.page * pagination.perPage;
      const end = start + pagination.perPage;
      const pagedScores = scores.slice(start, end);
      return {
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore: end < total
        },
        scores: pagedScores
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_SCORES_GET_SCORES_BY_ENTITY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Failed to get scores by entity id: ${entityId}, type: ${entityType}`
        },
        error
      );
      this.logger.trackException(mastraError);
      this.logger.error(mastraError.toString());
      return { pagination: { total: 0, page: 0, perPage: 100, hasMore: false }, scores: [] };
    }
  }
};
var TracesStorageCloudflare = class extends TracesStorage {
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
          id: "CLOUDFLARE_STORAGE_GET_TRACES_ERROR",
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
    try {
      const { name, scope, attributes, filters, page = 0, perPage = 100, dateRange } = args;
      const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
      const keyObjs = await this.operations.listKV(TABLE_TRACES, { prefix: `${prefix}${TABLE_TRACES}` });
      const traces = [];
      for (const { name: key } of keyObjs) {
        try {
          const data = await this.operations.getKV(TABLE_TRACES, key);
          if (!data) continue;
          if (name && data.name !== name) continue;
          if (scope && data.scope !== scope) continue;
          if (attributes) {
            const dataAttributes = data.attributes || {};
            let shouldSkip = false;
            for (const [key2, value] of Object.entries(attributes)) {
              if (dataAttributes[key2] !== value) {
                shouldSkip = true;
                break;
              }
            }
            if (shouldSkip) continue;
          }
          if (dateRange?.start || dateRange?.end) {
            const traceDate = new Date(data.createdAt || 0);
            if (dateRange.start && traceDate < dateRange.start) continue;
            if (dateRange.end && traceDate > dateRange.end) continue;
          }
          if (filters) {
            let shouldSkip = false;
            for (const [key2, value] of Object.entries(filters)) {
              if (data[key2] !== value) {
                shouldSkip = true;
                break;
              }
            }
            if (shouldSkip) continue;
          }
          traces.push(data);
        } catch (err) {
          this.logger.error("Failed to parse trace:", { key, error: err });
        }
      }
      traces.sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return bTime - aTime;
      });
      const total = traces.length;
      const start = page * perPage;
      const end = start + perPage;
      const pagedTraces = traces.slice(start, end);
      return {
        traces: pagedTraces,
        total,
        page,
        perPage,
        hasMore: end < total
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: "Error getting traces with pagination"
        },
        error
      );
      this.logger.trackException?.(mastraError);
      this.logger.error(mastraError.toString());
      return { traces: [], total: 0, page: 0, perPage: 100, hasMore: false };
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
var WorkflowsStorageCloudflare = class extends WorkflowsStorage {
  operations;
  constructor({ operations }) {
    super();
    this.operations = operations;
  }
  validateWorkflowParams(params) {
    const { workflowName, runId } = params;
    if (!workflowName || !runId) {
      throw new Error("Invalid workflow snapshot parameters");
    }
  }
  async persistWorkflowSnapshot(params) {
    try {
      const { workflowName, runId, snapshot } = params;
      await this.operations.putKV({
        tableName: TABLE_WORKFLOW_SNAPSHOT,
        key: this.operations.getKey(TABLE_WORKFLOW_SNAPSHOT, { workflow_name: workflowName, run_id: runId }),
        value: {
          workflow_name: workflowName,
          run_id: runId,
          snapshot: typeof snapshot === "string" ? snapshot : JSON.stringify(snapshot),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_PERSIST_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error persisting workflow snapshot for workflow ${params.workflowName}, run ${params.runId}`,
          details: {
            workflowName: params.workflowName,
            runId: params.runId
          }
        },
        error
      );
    }
  }
  async loadWorkflowSnapshot(params) {
    try {
      this.validateWorkflowParams(params);
      const { workflowName, runId } = params;
      const key = this.operations.getKey(TABLE_WORKFLOW_SNAPSHOT, { workflow_name: workflowName, run_id: runId });
      const data = await this.operations.getKV(TABLE_WORKFLOW_SNAPSHOT, key);
      if (!data) return null;
      const snapshotData = typeof data.snapshot === "string" ? JSON.parse(data.snapshot) : data.snapshot;
      return snapshotData;
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_LOAD_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          text: `Error loading workflow snapshot for workflow ${params.workflowName}, run ${params.runId}`,
          details: {
            workflowName: params.workflowName,
            runId: params.runId
          }
        },
        error
      );
      this.logger.trackException?.(mastraError);
      this.logger.error(mastraError.toString());
      return null;
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
  buildWorkflowSnapshotPrefix({
    workflowName,
    runId,
    resourceId
  }) {
    const prefix = this.operations.namespacePrefix ? `${this.operations.namespacePrefix}:` : "";
    let key = `${prefix}${TABLE_WORKFLOW_SNAPSHOT}`;
    if (workflowName) key += `:${workflowName}`;
    if (runId) key += `:${runId}`;
    if (resourceId) key += `:${resourceId}`;
    return key;
  }
  async getWorkflowRuns({
    workflowName,
    limit = 20,
    offset = 0,
    resourceId,
    fromDate,
    toDate
  } = {}) {
    try {
      const prefix = this.buildWorkflowSnapshotPrefix({ workflowName });
      const keyObjs = await this.operations.listKV(TABLE_WORKFLOW_SNAPSHOT, { prefix });
      const runs = [];
      for (const { name: key } of keyObjs) {
        const parts = key.split(":");
        const idx = parts.indexOf(TABLE_WORKFLOW_SNAPSHOT);
        if (idx === -1 || parts.length < idx + 3) continue;
        const wfName = parts[idx + 1];
        const keyResourceId = parts.length > idx + 3 ? parts[idx + 3] : void 0;
        if (workflowName && wfName !== workflowName) continue;
        if (resourceId && keyResourceId !== resourceId) continue;
        const data = await this.operations.getKV(TABLE_WORKFLOW_SNAPSHOT, key);
        if (!data) continue;
        try {
          if (resourceId && !keyResourceId) continue;
          const createdAt = ensureDate(data.createdAt);
          if (fromDate && createdAt && createdAt < fromDate) continue;
          if (toDate && createdAt && createdAt > toDate) continue;
          const snapshotData = typeof data.snapshot === "string" ? JSON.parse(data.snapshot) : data.snapshot;
          const resourceIdToUse = keyResourceId || data.resourceId;
          const run = this.parseWorkflowRun({
            ...data,
            workflow_name: wfName,
            resourceId: resourceIdToUse,
            snapshot: snapshotData
          });
          runs.push(run);
        } catch (err) {
          this.logger.error("Failed to parse workflow snapshot:", { key, error: err });
        }
      }
      runs.sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      });
      const pagedRuns = runs.slice(offset, offset + limit);
      return {
        runs: pagedRuns,
        total: runs.length
      };
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_WORKFLOW_RUNS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
      this.logger.trackException?.(mastraError);
      this.logger.error(mastraError.toString());
      return { runs: [], total: 0 };
    }
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    try {
      if (!runId || !workflowName) {
        throw new Error("runId, workflowName, are required");
      }
      const prefix = this.buildWorkflowSnapshotPrefix({ workflowName, runId });
      const keyObjs = await this.operations.listKV(TABLE_WORKFLOW_SNAPSHOT, { prefix });
      if (!keyObjs.length) return null;
      const exactKey = keyObjs.find((k) => {
        const parts = k.name.split(":");
        const idx = parts.indexOf(TABLE_WORKFLOW_SNAPSHOT);
        if (idx === -1 || parts.length < idx + 3) return false;
        const wfName = parts[idx + 1];
        const rId = parts[idx + 2];
        return wfName === workflowName && rId === runId;
      });
      if (!exactKey) return null;
      const data = await this.operations.getKV(TABLE_WORKFLOW_SNAPSHOT, exactKey.name);
      if (!data) return null;
      const snapshotData = typeof data.snapshot === "string" ? JSON.parse(data.snapshot) : data.snapshot;
      return this.parseWorkflowRun({ ...data, snapshot: snapshotData });
    } catch (error) {
      const mastraError = new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_GET_WORKFLOW_RUN_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            workflowName,
            runId
          }
        },
        error
      );
      this.logger.trackException?.(mastraError);
      this.logger.error(mastraError.toString());
      return null;
    }
  }
};

// src/storage/types.ts
function isWorkersConfig(config) {
  return "bindings" in config;
}

// src/storage/index.ts
var CloudflareStore = class extends MastraStorage {
  stores;
  client;
  accountId;
  namespacePrefix;
  bindings;
  validateWorkersConfig(config) {
    if (!isWorkersConfig(config)) {
      throw new Error("Invalid Workers API configuration");
    }
    if (!config.bindings) {
      throw new Error("KV bindings are required when using Workers Binding API");
    }
    const requiredTables = [
      TABLE_THREADS,
      TABLE_MESSAGES,
      TABLE_WORKFLOW_SNAPSHOT,
      TABLE_EVALS,
      TABLE_SCORERS,
      TABLE_TRACES
    ];
    for (const table of requiredTables) {
      if (!(table in config.bindings)) {
        throw new Error(`Missing KV binding for table: ${table}`);
      }
    }
  }
  validateRestConfig(config) {
    if (isWorkersConfig(config)) {
      throw new Error("Invalid REST API configuration");
    }
    if (!config.accountId?.trim()) {
      throw new Error("accountId is required for REST API");
    }
    if (!config.apiToken?.trim()) {
      throw new Error("apiToken is required for REST API");
    }
  }
  constructor(config) {
    super({ name: "Cloudflare" });
    try {
      if (isWorkersConfig(config)) {
        this.validateWorkersConfig(config);
        this.bindings = config.bindings;
        this.namespacePrefix = config.keyPrefix?.trim() || "";
        this.logger.info("Using Cloudflare KV Workers Binding API");
      } else {
        this.validateRestConfig(config);
        this.accountId = config.accountId.trim();
        this.namespacePrefix = config.namespacePrefix?.trim() || "";
        this.client = new Cloudflare({
          apiToken: config.apiToken.trim()
        });
        this.logger.info("Using Cloudflare KV REST API");
      }
      const operations = new StoreOperationsCloudflare({
        accountId: this.accountId,
        client: this.client,
        namespacePrefix: this.namespacePrefix,
        bindings: this.bindings
      });
      const legacyEvals = new LegacyEvalsStorageCloudflare({
        operations
      });
      const workflows = new WorkflowsStorageCloudflare({
        operations
      });
      const traces = new TracesStorageCloudflare({
        operations
      });
      const memory = new MemoryStorageCloudflare({
        operations
      });
      const scores = new ScoresStorageCloudflare({
        operations
      });
      this.stores = {
        operations,
        legacyEvals,
        workflows,
        traces,
        memory,
        scores
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "CLOUDFLARE_STORAGE_INIT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
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
  async clearTable({ tableName }) {
    return this.stores.operations.clearTable({ tableName });
  }
  async dropTable({ tableName }) {
    return this.stores.operations.dropTable({ tableName });
  }
  async insert({
    tableName,
    record
  }) {
    return this.stores.operations.insert({ tableName, record });
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
  async saveMessages(args) {
    return this.stores.memory.saveMessages(args);
  }
  async getMessages({
    threadId,
    resourceId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessages({ threadId, resourceId, selectBy, format });
  }
  async persistWorkflowSnapshot(params) {
    return this.stores.workflows.persistWorkflowSnapshot(params);
  }
  async loadWorkflowSnapshot(params) {
    return this.stores.workflows.loadWorkflowSnapshot(params);
  }
  async batchInsert(input) {
    return this.stores.operations.batchInsert(input);
  }
  async getTraces({
    name,
    scope,
    page = 0,
    perPage = 100,
    attributes,
    fromDate,
    toDate
  }) {
    return this.stores.traces.getTraces({
      name,
      scope,
      page,
      perPage,
      attributes,
      fromDate,
      toDate
    });
  }
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  async getEvals(options) {
    return this.stores.legacyEvals.getEvals(options);
  }
  async getWorkflowRuns({
    workflowName,
    limit = 20,
    offset = 0,
    resourceId,
    fromDate,
    toDate
  } = {}) {
    return this.stores.workflows.getWorkflowRuns({
      workflowName,
      limit,
      offset,
      resourceId,
      fromDate,
      toDate
    });
  }
  async getWorkflowRunById({
    runId,
    workflowName
  }) {
    return this.stores.workflows.getWorkflowRunById({ runId, workflowName });
  }
  async getTracesPaginated(args) {
    return this.stores.traces.getTracesPaginated(args);
  }
  async getThreadsByResourceIdPaginated(args) {
    return this.stores.memory.getThreadsByResourceIdPaginated(args);
  }
  async getMessagesPaginated(args) {
    return this.stores.memory.getMessagesPaginated(args);
  }
  async updateMessages(args) {
    return this.stores.memory.updateMessages(args);
  }
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
    pagination
  }) {
    return this.stores.scores.getScoresByScorerId({ scorerId, pagination });
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
  async close() {
  }
};

export { CloudflareStore };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map