import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { MastraError, ErrorCategory, ErrorDomain } from '@mastra/core/error';
import { MastraStorage, StoreOperations, TracesStorage, TABLE_TRACES, WorkflowsStorage, MemoryStorage, resolveMessageLimit, ScoresStorage, LegacyEvalsStorage, TABLE_RESOURCES, TABLE_SCORERS, TABLE_EVALS, TABLE_WORKFLOW_SNAPSHOT, TABLE_MESSAGES, TABLE_THREADS } from '@mastra/core/storage';
import { Entity, Service } from 'electrodb';
import { MessageList } from '@mastra/core/agent';

// src/storage/index.ts

// src/entities/utils.ts
var baseAttributes = {
  createdAt: {
    type: "string",
    required: true,
    readOnly: true,
    // Convert Date to ISO string on set
    set: (value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value || (/* @__PURE__ */ new Date()).toISOString();
    },
    // Initialize with current timestamp if not provided
    default: () => (/* @__PURE__ */ new Date()).toISOString()
  },
  updatedAt: {
    type: "string",
    required: true,
    // Convert Date to ISO string on set
    set: (value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value || (/* @__PURE__ */ new Date()).toISOString();
    },
    // Always use current timestamp when creating/updating
    default: () => (/* @__PURE__ */ new Date()).toISOString()
  },
  metadata: {
    type: "string",
    // JSON stringified
    // Stringify objects on set
    set: (value) => {
      if (value && typeof value !== "string") {
        return JSON.stringify(value);
      }
      return value;
    },
    // Parse JSON string to object on get
    get: (value) => {
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    }
  }
};

// src/entities/eval.ts
var evalEntity = new Entity({
  model: {
    entity: "eval",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    input: {
      type: "string",
      required: true
    },
    output: {
      type: "string",
      required: true
    },
    result: {
      type: "string",
      // JSON stringified
      required: true,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        if (value) {
          return JSON.parse(value);
        }
        return value;
      }
    },
    agent_name: {
      type: "string",
      required: true
    },
    metric_name: {
      type: "string",
      required: true
    },
    instructions: {
      type: "string",
      required: true
    },
    test_info: {
      type: "string",
      // JSON stringified
      required: false,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value;
      }
    },
    global_run_id: {
      type: "string",
      required: true
    },
    run_id: {
      type: "string",
      required: true
    },
    created_at: {
      type: "string",
      required: true,
      // Initialize with current timestamp if not provided
      default: () => (/* @__PURE__ */ new Date()).toISOString(),
      // Convert Date to ISO string on set
      set: (value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value || (/* @__PURE__ */ new Date()).toISOString();
      }
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "run_id"] },
      sk: { field: "sk", composite: [] }
    },
    byAgent: {
      index: "gsi1",
      pk: { field: "gsi1pk", composite: ["entity", "agent_name"] },
      sk: { field: "gsi1sk", composite: ["created_at"] }
    }
  }
});
var messageEntity = new Entity({
  model: {
    entity: "message",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    id: {
      type: "string",
      required: true
    },
    threadId: {
      type: "string",
      required: true
    },
    content: {
      type: "string",
      required: true,
      // Stringify content object on set if it's not already a string
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get ONLY if it looks like JSON
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    role: {
      type: "string",
      required: true
    },
    type: {
      type: "string",
      default: "text"
    },
    resourceId: {
      type: "string",
      required: false
    },
    toolCallIds: {
      type: "string",
      required: false,
      set: (value) => {
        if (Array.isArray(value)) {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to array on get
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    toolCallArgs: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    toolNames: {
      type: "string",
      required: false,
      set: (value) => {
        if (Array.isArray(value)) {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to array on get
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "id"] },
      sk: { field: "sk", composite: ["entity"] }
    },
    byThread: {
      index: "gsi1",
      pk: { field: "gsi1pk", composite: ["entity", "threadId"] },
      sk: { field: "gsi1sk", composite: ["createdAt"] }
    }
  }
});
var resourceEntity = new Entity({
  model: {
    entity: "resource",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    id: {
      type: "string",
      required: true
    },
    workingMemory: {
      type: "string",
      required: false
    },
    metadata: {
      type: "string",
      required: false,
      // Stringify content object on set if it's not already a string
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get ONLY if it looks like JSON
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "id"] },
      sk: { field: "sk", composite: ["entity"] }
    }
  }
});
var scoreEntity = new Entity({
  model: {
    entity: "score",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    id: {
      type: "string",
      required: true
    },
    scorerId: {
      type: "string",
      required: true
    },
    traceId: {
      type: "string",
      required: false
    },
    runId: {
      type: "string",
      required: true
    },
    scorer: {
      type: "string",
      required: true,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    extractStepResult: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    preprocessStepResult: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    analyzeStepResult: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    score: {
      type: "number",
      required: true
    },
    reason: {
      type: "string",
      required: false
    },
    extractPrompt: {
      type: "string",
      required: false
    },
    analyzePrompt: {
      type: "string",
      required: false
    },
    // Deprecated in favor of generateReasonPrompt
    reasonPrompt: {
      type: "string",
      required: false
    },
    generateScorePrompt: {
      type: "string",
      required: false
    },
    generateReasonPrompt: {
      type: "string",
      required: false
    },
    input: {
      type: "string",
      required: true,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    output: {
      type: "string",
      required: true,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    additionalContext: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    runtimeContext: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    entityType: {
      type: "string",
      required: false
    },
    entityData: {
      type: "string",
      required: false,
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    },
    entityId: {
      type: "string",
      required: false
    },
    source: {
      type: "string",
      required: true
    },
    resourceId: {
      type: "string",
      required: false
    },
    threadId: {
      type: "string",
      required: false
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "id"] },
      sk: { field: "sk", composite: ["entity"] }
    },
    byScorer: {
      index: "gsi1",
      pk: { field: "gsi1pk", composite: ["entity", "scorerId"] },
      sk: { field: "gsi1sk", composite: ["createdAt"] }
    },
    byRun: {
      index: "gsi2",
      pk: { field: "gsi2pk", composite: ["entity", "runId"] },
      sk: { field: "gsi2sk", composite: ["createdAt"] }
    },
    byTrace: {
      index: "gsi3",
      pk: { field: "gsi3pk", composite: ["entity", "traceId"] },
      sk: { field: "gsi3sk", composite: ["createdAt"] }
    },
    byEntityData: {
      index: "gsi4",
      pk: { field: "gsi4pk", composite: ["entity", "entityId"] },
      sk: { field: "gsi4sk", composite: ["createdAt"] }
    },
    byResource: {
      index: "gsi5",
      pk: { field: "gsi5pk", composite: ["entity", "resourceId"] },
      sk: { field: "gsi5sk", composite: ["createdAt"] }
    },
    byThread: {
      index: "gsi6",
      pk: { field: "gsi6pk", composite: ["entity", "threadId"] },
      sk: { field: "gsi6sk", composite: ["createdAt"] }
    }
  }
});
var threadEntity = new Entity({
  model: {
    entity: "thread",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    id: {
      type: "string",
      required: true
    },
    resourceId: {
      type: "string",
      required: true
    },
    title: {
      type: "string",
      required: true
    },
    metadata: {
      type: "string",
      required: false,
      // Stringify metadata object on set if it's not already a string
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        if (value && typeof value === "string") {
          try {
            if (value.startsWith("{") || value.startsWith("[")) {
              return JSON.parse(value);
            }
          } catch {
            return value;
          }
        }
        return value;
      }
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "id"] },
      sk: { field: "sk", composite: ["id"] }
    },
    byResource: {
      index: "gsi1",
      pk: { field: "gsi1pk", composite: ["entity", "resourceId"] },
      sk: { field: "gsi1sk", composite: ["createdAt"] }
    }
  }
});
var traceEntity = new Entity({
  model: {
    entity: "trace",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    id: {
      type: "string",
      required: true
    },
    parentSpanId: {
      type: "string",
      required: false
    },
    name: {
      type: "string",
      required: true
    },
    traceId: {
      type: "string",
      required: true
    },
    scope: {
      type: "string",
      required: true
    },
    kind: {
      type: "number",
      required: true
    },
    attributes: {
      type: "string",
      // JSON stringified
      required: false,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value ? JSON.parse(value) : value;
      }
    },
    status: {
      type: "string",
      // JSON stringified
      required: false,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value;
      }
    },
    events: {
      type: "string",
      // JSON stringified
      required: false,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value;
      }
    },
    links: {
      type: "string",
      // JSON stringified
      required: false,
      // Stringify object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value;
      }
    },
    other: {
      type: "string",
      required: false
    },
    startTime: {
      type: "number",
      required: true
    },
    endTime: {
      type: "number",
      required: true
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "id"] },
      sk: { field: "sk", composite: [] }
    },
    byName: {
      index: "gsi1",
      pk: { field: "gsi1pk", composite: ["entity", "name"] },
      sk: { field: "gsi1sk", composite: ["startTime"] }
    },
    byScope: {
      index: "gsi2",
      pk: { field: "gsi2pk", composite: ["entity", "scope"] },
      sk: { field: "gsi2sk", composite: ["startTime"] }
    }
  }
});
var workflowSnapshotEntity = new Entity({
  model: {
    entity: "workflow_snapshot",
    version: "1",
    service: "mastra"
  },
  attributes: {
    entity: {
      type: "string",
      required: true
    },
    ...baseAttributes,
    workflow_name: {
      type: "string",
      required: true
    },
    run_id: {
      type: "string",
      required: true
    },
    snapshot: {
      type: "string",
      // JSON stringified
      required: true,
      // Stringify snapshot object on set
      set: (value) => {
        if (value && typeof value !== "string") {
          return JSON.stringify(value);
        }
        return value;
      },
      // Parse JSON string to object on get
      get: (value) => {
        return value ? JSON.parse(value) : value;
      }
    },
    resourceId: {
      type: "string",
      required: false
    }
  },
  indexes: {
    primary: {
      pk: { field: "pk", composite: ["entity", "workflow_name"] },
      sk: { field: "sk", composite: ["run_id"] }
    },
    // GSI to allow querying by run_id efficiently without knowing the workflow_name
    gsi2: {
      index: "gsi2",
      pk: { field: "gsi2pk", composite: ["entity", "run_id"] },
      sk: { field: "gsi2sk", composite: ["workflow_name"] }
    }
  }
});

// src/entities/index.ts
function getElectroDbService(client, tableName) {
  return new Service(
    {
      thread: threadEntity,
      message: messageEntity,
      eval: evalEntity,
      trace: traceEntity,
      workflow_snapshot: workflowSnapshotEntity,
      resource: resourceEntity,
      score: scoreEntity
    },
    {
      client,
      table: tableName
    }
  );
}
var LegacyEvalsDynamoDB = class extends LegacyEvalsStorage {
  service;
  tableName;
  constructor({ service, tableName }) {
    super();
    this.service = service;
    this.tableName = tableName;
  }
  // Eval operations
  async getEvalsByAgentName(agentName, type) {
    this.logger.debug("Getting evals for agent", { agentName, type });
    try {
      const query = this.service.entities.eval.query.byAgent({ entity: "eval", agent_name: agentName });
      const results = await query.go({ order: "desc", limit: 100 });
      if (!results.data.length) {
        return [];
      }
      let filteredData = results.data;
      if (type) {
        filteredData = filteredData.filter((evalRecord) => {
          try {
            const testInfo = evalRecord.test_info && typeof evalRecord.test_info === "string" ? JSON.parse(evalRecord.test_info) : void 0;
            if (type === "test" && !testInfo) {
              return false;
            }
            if (type === "live" && testInfo) {
              return false;
            }
          } catch (e) {
            this.logger.warn("Failed to parse test_info during filtering", { record: evalRecord, error: e });
          }
          return true;
        });
      }
      return filteredData.map((evalRecord) => {
        try {
          return {
            input: evalRecord.input,
            output: evalRecord.output,
            // Safely parse result and test_info
            result: evalRecord.result && typeof evalRecord.result === "string" ? JSON.parse(evalRecord.result) : void 0,
            agentName: evalRecord.agent_name,
            createdAt: evalRecord.created_at,
            // Keep as string from DDB?
            metricName: evalRecord.metric_name,
            instructions: evalRecord.instructions,
            runId: evalRecord.run_id,
            globalRunId: evalRecord.global_run_id,
            testInfo: evalRecord.test_info && typeof evalRecord.test_info === "string" ? JSON.parse(evalRecord.test_info) : void 0
          };
        } catch (parseError) {
          this.logger.error("Failed to parse eval record", { record: evalRecord, error: parseError });
          return {
            agentName: evalRecord.agent_name,
            createdAt: evalRecord.created_at,
            runId: evalRecord.run_id,
            globalRunId: evalRecord.global_run_id
          };
        }
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_EVALS_BY_AGENT_NAME_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { agentName }
        },
        error
      );
    }
  }
  async getEvals(options = {}) {
    const { agentName, type, page = 0, perPage = 100, dateRange } = options;
    this.logger.debug("Getting evals with pagination", { agentName, type, page, perPage, dateRange });
    try {
      let query;
      if (agentName) {
        query = this.service.entities.eval.query.byAgent({ entity: "eval", agent_name: agentName });
      } else {
        query = this.service.entities.eval.query.byEntity({ entity: "eval" });
      }
      const results = await query.go({
        order: "desc",
        pages: "all"
        // Get all pages to apply filtering and pagination
      });
      if (!results.data.length) {
        return {
          evals: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      let filteredData = results.data;
      if (type) {
        filteredData = filteredData.filter((evalRecord) => {
          try {
            const testInfo = evalRecord.test_info && typeof evalRecord.test_info === "string" ? JSON.parse(evalRecord.test_info) : void 0;
            if (type === "test" && !testInfo) {
              return false;
            }
            if (type === "live" && testInfo) {
              return false;
            }
          } catch (e) {
            this.logger.warn("Failed to parse test_info during filtering", { record: evalRecord, error: e });
          }
          return true;
        });
      }
      if (dateRange) {
        const fromDate = dateRange.start;
        const toDate = dateRange.end;
        filteredData = filteredData.filter((evalRecord) => {
          const recordDate = new Date(evalRecord.created_at);
          if (fromDate && recordDate < fromDate) {
            return false;
          }
          if (toDate && recordDate > toDate) {
            return false;
          }
          return true;
        });
      }
      const total = filteredData.length;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedData = filteredData.slice(start, end);
      const evals = paginatedData.map((evalRecord) => {
        try {
          return {
            input: evalRecord.input,
            output: evalRecord.output,
            result: evalRecord.result && typeof evalRecord.result === "string" ? JSON.parse(evalRecord.result) : void 0,
            agentName: evalRecord.agent_name,
            createdAt: evalRecord.created_at,
            metricName: evalRecord.metric_name,
            instructions: evalRecord.instructions,
            runId: evalRecord.run_id,
            globalRunId: evalRecord.global_run_id,
            testInfo: evalRecord.test_info && typeof evalRecord.test_info === "string" ? JSON.parse(evalRecord.test_info) : void 0
          };
        } catch (parseError) {
          this.logger.error("Failed to parse eval record", { record: evalRecord, error: parseError });
          return {
            agentName: evalRecord.agent_name,
            createdAt: evalRecord.created_at,
            runId: evalRecord.run_id,
            globalRunId: evalRecord.global_run_id
          };
        }
      });
      const hasMore = end < total;
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
          id: "STORAGE_DYNAMODB_STORE_GET_EVALS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            agentName: agentName || "all",
            type: type || "all",
            page,
            perPage
          }
        },
        error
      );
    }
  }
};
var MemoryStorageDynamoDB = class extends MemoryStorage {
  service;
  constructor({ service }) {
    super();
    this.service = service;
  }
  // Helper function to parse message data (handle JSON fields)
  parseMessageData(data) {
    return {
      ...data,
      // Ensure dates are Date objects if needed (ElectroDB might return strings)
      createdAt: data.createdAt ? new Date(data.createdAt) : void 0,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : void 0
      // Other fields like content, toolCallArgs etc. are assumed to be correctly
      // transformed by the ElectroDB entity getters.
    };
  }
  // Helper function to transform and sort threads
  transformAndSortThreads(rawThreads, orderBy, sortDirection) {
    return rawThreads.map((data) => ({
      ...data,
      // Convert date strings back to Date objects for consistency
      createdAt: typeof data.createdAt === "string" ? new Date(data.createdAt) : data.createdAt,
      updatedAt: typeof data.updatedAt === "string" ? new Date(data.updatedAt) : data.updatedAt
    })).sort((a, b) => {
      const fieldA = orderBy === "createdAt" ? a.createdAt : a.updatedAt;
      const fieldB = orderBy === "createdAt" ? b.createdAt : b.updatedAt;
      const comparison = fieldA.getTime() - fieldB.getTime();
      return sortDirection === "DESC" ? -comparison : comparison;
    });
  }
  async getThreadById({ threadId }) {
    this.logger.debug("Getting thread by ID", { threadId });
    try {
      const result = await this.service.entities.thread.get({ entity: "thread", id: threadId }).go();
      if (!result.data) {
        return null;
      }
      const data = result.data;
      return {
        ...data,
        // Convert date strings back to Date objects for consistency
        createdAt: typeof data.createdAt === "string" ? new Date(data.createdAt) : data.createdAt,
        updatedAt: typeof data.updatedAt === "string" ? new Date(data.updatedAt) : data.updatedAt
        // metadata: data.metadata ? JSON.parse(data.metadata) : undefined, // REMOVED by AI
        // metadata is already transformed by the entity's getter
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_THREAD_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
  /**
   * @deprecated use getThreadsByResourceIdPaginated instead for paginated results.
   */
  async getThreadsByResourceId(args) {
    const resourceId = args.resourceId;
    const orderBy = this.castThreadOrderBy(args.orderBy);
    const sortDirection = this.castThreadSortDirection(args.sortDirection);
    this.logger.debug("Getting threads by resource ID", { resourceId, orderBy, sortDirection });
    try {
      const result = await this.service.entities.thread.query.byResource({ entity: "thread", resourceId }).go();
      if (!result.data.length) {
        return [];
      }
      return this.transformAndSortThreads(result.data, orderBy, sortDirection);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_THREADS_BY_RESOURCE_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error
      );
    }
  }
  async saveThread({ thread }) {
    this.logger.debug("Saving thread", { threadId: thread.id });
    const now = /* @__PURE__ */ new Date();
    const threadData = {
      entity: "thread",
      id: thread.id,
      resourceId: thread.resourceId,
      title: thread.title || `Thread ${thread.id}`,
      createdAt: thread.createdAt?.toISOString() || now.toISOString(),
      updatedAt: now.toISOString(),
      metadata: thread.metadata ? JSON.stringify(thread.metadata) : void 0
    };
    try {
      await this.service.entities.thread.upsert(threadData).go();
      return {
        id: thread.id,
        resourceId: thread.resourceId,
        title: threadData.title,
        createdAt: thread.createdAt || now,
        updatedAt: now,
        metadata: thread.metadata
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_SAVE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
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
    this.logger.debug("Updating thread", { threadId: id });
    try {
      const existingThread = await this.getThreadById({ threadId: id });
      if (!existingThread) {
        throw new Error(`Thread not found: ${id}`);
      }
      const now = /* @__PURE__ */ new Date();
      const updateData = {
        updatedAt: now.toISOString()
      };
      if (title) {
        updateData.title = title;
      }
      if (metadata) {
        const existingMetadata = existingThread.metadata ? typeof existingThread.metadata === "string" ? JSON.parse(existingThread.metadata) : existingThread.metadata : {};
        const mergedMetadata = { ...existingMetadata, ...metadata };
        updateData.metadata = JSON.stringify(mergedMetadata);
      }
      await this.service.entities.thread.update({ entity: "thread", id }).set(updateData).go();
      return {
        ...existingThread,
        title: title || existingThread.title,
        metadata: metadata ? { ...existingThread.metadata, ...metadata } : existingThread.metadata,
        updatedAt: now
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_UPDATE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId: id }
        },
        error
      );
    }
  }
  async deleteThread({ threadId }) {
    this.logger.debug("Deleting thread", { threadId });
    try {
      const messages = await this.getMessages({ threadId });
      if (messages.length > 0) {
        const batchSize = 25;
        for (let i = 0; i < messages.length; i += batchSize) {
          const batch = messages.slice(i, i + batchSize);
          await Promise.all(
            batch.map(
              (message) => this.service.entities.message.delete({
                entity: "message",
                id: message.id,
                threadId: message.threadId
              }).go()
            )
          );
        }
      }
      await this.service.entities.thread.delete({ entity: "thread", id: threadId }).go();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_DELETE_THREAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
  async getMessages({
    threadId,
    resourceId,
    selectBy,
    format
  }) {
    this.logger.debug("Getting messages", { threadId, selectBy });
    try {
      const messages = [];
      const limit = resolveMessageLimit({ last: selectBy?.last, defaultLimit: Number.MAX_SAFE_INTEGER });
      if (selectBy?.include?.length) {
        const includeMessages = await this._getIncludedMessages(threadId, selectBy);
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      }
      if (limit !== 0) {
        const query = this.service.entities.message.query.byThread({ entity: "message", threadId });
        let results;
        if (limit !== Number.MAX_SAFE_INTEGER && limit > 0) {
          results = await query.go({ limit, order: "desc" });
          results.data = results.data.reverse();
        } else {
          results = await query.go();
        }
        let allThreadMessages = results.data.map((data) => this.parseMessageData(data)).filter((msg) => "content" in msg);
        allThreadMessages.sort((a, b) => {
          const timeA = a.createdAt.getTime();
          const timeB = b.createdAt.getTime();
          if (timeA === timeB) {
            return a.id.localeCompare(b.id);
          }
          return timeA - timeB;
        });
        messages.push(...allThreadMessages);
      }
      messages.sort((a, b) => {
        const timeA = a.createdAt.getTime();
        const timeB = b.createdAt.getTime();
        if (timeA === timeB) {
          return a.id.localeCompare(b.id);
        }
        return timeA - timeB;
      });
      const uniqueMessages = messages.filter(
        (message, index, self) => index === self.findIndex((m) => m.id === message.id)
      );
      const list = new MessageList({ threadId, resourceId }).add(uniqueMessages, "memory");
      if (format === `v2`) return list.get.all.v2();
      return list.get.all.v1();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
  async saveMessages(args) {
    const { messages, format = "v1" } = args;
    this.logger.debug("Saving messages", { count: messages.length });
    if (!messages.length) {
      return [];
    }
    const threadId = messages[0]?.threadId;
    if (!threadId) {
      throw new Error("Thread ID is required");
    }
    const messagesToSave = messages.map((msg) => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      return {
        entity: "message",
        // Add entity type
        id: msg.id,
        threadId: msg.threadId,
        role: msg.role,
        type: msg.type,
        resourceId: msg.resourceId,
        // Ensure complex fields are stringified if not handled by attribute setters
        content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
        toolCallArgs: `toolCallArgs` in msg && msg.toolCallArgs ? JSON.stringify(msg.toolCallArgs) : void 0,
        toolCallIds: `toolCallIds` in msg && msg.toolCallIds ? JSON.stringify(msg.toolCallIds) : void 0,
        toolNames: `toolNames` in msg && msg.toolNames ? JSON.stringify(msg.toolNames) : void 0,
        createdAt: msg.createdAt instanceof Date ? msg.createdAt.toISOString() : msg.createdAt || now,
        updatedAt: now
        // Add updatedAt
      };
    });
    try {
      const savedMessageIds = [];
      for (const messageData of messagesToSave) {
        if (!messageData.entity) {
          this.logger.error("Missing entity property in message data for create", { messageData });
          throw new Error("Internal error: Missing entity property during saveMessages");
        }
        try {
          await this.service.entities.message.put(messageData).go();
          savedMessageIds.push(messageData.id);
        } catch (error) {
          for (const savedId of savedMessageIds) {
            try {
              await this.service.entities.message.delete({ entity: "message", id: savedId }).go();
            } catch (rollbackError) {
              this.logger.error("Failed to rollback message during save error", {
                messageId: savedId,
                error: rollbackError
              });
            }
          }
          throw error;
        }
      }
      await this.service.entities.thread.update({ entity: "thread", id: threadId }).set({
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).go();
      const list = new MessageList().add(messages, "memory");
      if (format === `v1`) return list.get.all.v1();
      return list.get.all.v2();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_SAVE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { count: messages.length }
        },
        error
      );
    }
  }
  async getThreadsByResourceIdPaginated(args) {
    const { resourceId, page = 0, perPage = 100 } = args;
    const orderBy = this.castThreadOrderBy(args.orderBy);
    const sortDirection = this.castThreadSortDirection(args.sortDirection);
    this.logger.debug("Getting threads by resource ID with pagination", {
      resourceId,
      page,
      perPage,
      orderBy,
      sortDirection
    });
    try {
      const query = this.service.entities.thread.query.byResource({ entity: "thread", resourceId });
      const results = await query.go();
      const allThreads = this.transformAndSortThreads(results.data, orderBy, sortDirection);
      const startIndex = page * perPage;
      const endIndex = startIndex + perPage;
      const paginatedThreads = allThreads.slice(startIndex, endIndex);
      const total = allThreads.length;
      const hasMore = endIndex < total;
      return {
        threads: paginatedThreads,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_THREADS_BY_RESOURCE_ID_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId, page, perPage }
        },
        error
      );
    }
  }
  async getMessagesPaginated(args) {
    const { threadId, resourceId, selectBy, format = "v1" } = args;
    const { page = 0, perPage = 40, dateRange } = selectBy?.pagination || {};
    const fromDate = dateRange?.start;
    const toDate = dateRange?.end;
    const limit = resolveMessageLimit({ last: selectBy?.last, defaultLimit: Number.MAX_SAFE_INTEGER });
    this.logger.debug("Getting messages with pagination", { threadId, page, perPage, fromDate, toDate, limit });
    try {
      let messages = [];
      if (selectBy?.include?.length) {
        const includeMessages = await this._getIncludedMessages(threadId, selectBy);
        if (includeMessages) {
          messages.push(...includeMessages);
        }
      }
      if (limit !== 0) {
        const query = this.service.entities.message.query.byThread({ entity: "message", threadId });
        let results;
        if (limit !== Number.MAX_SAFE_INTEGER && limit > 0) {
          results = await query.go({ limit, order: "desc" });
          results.data = results.data.reverse();
        } else {
          results = await query.go();
        }
        let allThreadMessages = results.data.map((data) => this.parseMessageData(data)).filter((msg) => "content" in msg);
        allThreadMessages.sort((a, b) => {
          const timeA = a.createdAt.getTime();
          const timeB = b.createdAt.getTime();
          if (timeA === timeB) {
            return a.id.localeCompare(b.id);
          }
          return timeA - timeB;
        });
        const excludeIds = messages.map((m) => m.id);
        if (excludeIds.length > 0) {
          allThreadMessages = allThreadMessages.filter((msg) => !excludeIds.includes(msg.id));
        }
        messages.push(...allThreadMessages);
      }
      messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      if (fromDate || toDate) {
        messages = messages.filter((msg) => {
          const createdAt = new Date(msg.createdAt).getTime();
          if (fromDate && createdAt < new Date(fromDate).getTime()) return false;
          if (toDate && createdAt > new Date(toDate).getTime()) return false;
          return true;
        });
      }
      const total = messages.length;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedMessages = messages.slice(start, end);
      const hasMore = end < total;
      const list = new MessageList({ threadId, resourceId }).add(paginatedMessages, "memory");
      const finalMessages = format === "v2" ? list.get.all.v2() : list.get.all.v1();
      return {
        messages: finalMessages,
        total,
        page,
        perPage,
        hasMore
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_MESSAGES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { threadId }
        },
        error
      );
    }
  }
  // Helper method to get included messages with context
  async _getIncludedMessages(threadId, selectBy) {
    if (!selectBy?.include?.length) {
      return [];
    }
    const includeMessages = [];
    for (const includeItem of selectBy.include) {
      try {
        const { id, threadId: targetThreadId, withPreviousMessages = 0, withNextMessages = 0 } = includeItem;
        const searchThreadId = targetThreadId || threadId;
        this.logger.debug("Getting included messages for", {
          id,
          targetThreadId,
          searchThreadId,
          withPreviousMessages,
          withNextMessages
        });
        const query = this.service.entities.message.query.byThread({ entity: "message", threadId: searchThreadId });
        const results = await query.go();
        const allMessages = results.data.map((data) => this.parseMessageData(data)).filter((msg) => "content" in msg && typeof msg.content === "object");
        this.logger.debug("Found messages in thread", {
          threadId: searchThreadId,
          messageCount: allMessages.length,
          messageIds: allMessages.map((m) => m.id)
        });
        allMessages.sort((a, b) => {
          const timeA = a.createdAt.getTime();
          const timeB = b.createdAt.getTime();
          if (timeA === timeB) {
            return a.id.localeCompare(b.id);
          }
          return timeA - timeB;
        });
        const targetIndex = allMessages.findIndex((msg) => msg.id === id);
        if (targetIndex === -1) {
          this.logger.warn("Target message not found", { id, threadId: searchThreadId });
          continue;
        }
        this.logger.debug("Found target message at index", { id, targetIndex, totalMessages: allMessages.length });
        const startIndex = Math.max(0, targetIndex - withPreviousMessages);
        const endIndex = Math.min(allMessages.length, targetIndex + withNextMessages + 1);
        const contextMessages = allMessages.slice(startIndex, endIndex);
        this.logger.debug("Context messages", {
          startIndex,
          endIndex,
          contextCount: contextMessages.length,
          contextIds: contextMessages.map((m) => m.id)
        });
        includeMessages.push(...contextMessages);
      } catch (error) {
        this.logger.warn("Failed to get included message", { messageId: includeItem.id, error });
      }
    }
    this.logger.debug("Total included messages", {
      count: includeMessages.length,
      ids: includeMessages.map((m) => m.id)
    });
    return includeMessages;
  }
  async updateMessages(args) {
    const { messages } = args;
    this.logger.debug("Updating messages", { count: messages.length });
    if (!messages.length) {
      return [];
    }
    const updatedMessages = [];
    const affectedThreadIds = /* @__PURE__ */ new Set();
    try {
      for (const updateData of messages) {
        const { id, ...updates } = updateData;
        const existingMessage = await this.service.entities.message.get({ entity: "message", id }).go();
        if (!existingMessage.data) {
          this.logger.warn("Message not found for update", { id });
          continue;
        }
        const existingMsg = this.parseMessageData(existingMessage.data);
        const originalThreadId = existingMsg.threadId;
        affectedThreadIds.add(originalThreadId);
        const updatePayload = {
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        if ("role" in updates && updates.role !== void 0) updatePayload.role = updates.role;
        if ("type" in updates && updates.type !== void 0) updatePayload.type = updates.type;
        if ("resourceId" in updates && updates.resourceId !== void 0) updatePayload.resourceId = updates.resourceId;
        if ("threadId" in updates && updates.threadId !== void 0 && updates.threadId !== null) {
          updatePayload.threadId = updates.threadId;
          affectedThreadIds.add(updates.threadId);
        }
        if (updates.content) {
          const existingContent = existingMsg.content;
          let newContent = { ...existingContent };
          if (updates.content.metadata !== void 0) {
            newContent.metadata = {
              ...existingContent.metadata || {},
              ...updates.content.metadata || {}
            };
          }
          if (updates.content.content !== void 0) {
            newContent.content = updates.content.content;
          }
          if ("parts" in updates.content && updates.content.parts !== void 0) {
            newContent.parts = updates.content.parts;
          }
          updatePayload.content = JSON.stringify(newContent);
        }
        await this.service.entities.message.update({ entity: "message", id }).set(updatePayload).go();
        const updatedMessage = await this.service.entities.message.get({ entity: "message", id }).go();
        if (updatedMessage.data) {
          updatedMessages.push(this.parseMessageData(updatedMessage.data));
        }
      }
      for (const threadId of affectedThreadIds) {
        await this.service.entities.thread.update({ entity: "thread", id: threadId }).set({
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }).go();
      }
      return updatedMessages;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_UPDATE_MESSAGES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { count: messages.length }
        },
        error
      );
    }
  }
  async getResourceById({ resourceId }) {
    this.logger.debug("Getting resource by ID", { resourceId });
    try {
      const result = await this.service.entities.resource.get({ entity: "resource", id: resourceId }).go();
      if (!result.data) {
        return null;
      }
      const data = result.data;
      return {
        ...data,
        // Convert date strings back to Date objects for consistency
        createdAt: typeof data.createdAt === "string" ? new Date(data.createdAt) : data.createdAt,
        updatedAt: typeof data.updatedAt === "string" ? new Date(data.updatedAt) : data.updatedAt,
        // Ensure workingMemory is always returned as a string, regardless of automatic parsing
        workingMemory: typeof data.workingMemory === "object" ? JSON.stringify(data.workingMemory) : data.workingMemory
        // metadata is already transformed by the entity's getter
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_RESOURCE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error
      );
    }
  }
  async saveResource({ resource }) {
    this.logger.debug("Saving resource", { resourceId: resource.id });
    const now = /* @__PURE__ */ new Date();
    const resourceData = {
      entity: "resource",
      id: resource.id,
      workingMemory: resource.workingMemory,
      metadata: resource.metadata ? JSON.stringify(resource.metadata) : void 0,
      createdAt: resource.createdAt?.toISOString() || now.toISOString(),
      updatedAt: now.toISOString()
    };
    try {
      await this.service.entities.resource.upsert(resourceData).go();
      return {
        id: resource.id,
        workingMemory: resource.workingMemory,
        metadata: resource.metadata,
        createdAt: resource.createdAt || now,
        updatedAt: now
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_SAVE_RESOURCE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
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
    this.logger.debug("Updating resource", { resourceId });
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
      const now = /* @__PURE__ */ new Date();
      const updateData = {
        updatedAt: now.toISOString()
      };
      if (workingMemory !== void 0) {
        updateData.workingMemory = workingMemory;
      }
      if (metadata) {
        const existingMetadata = existingResource.metadata || {};
        const mergedMetadata = { ...existingMetadata, ...metadata };
        updateData.metadata = JSON.stringify(mergedMetadata);
      }
      await this.service.entities.resource.update({ entity: "resource", id: resourceId }).set(updateData).go();
      return {
        ...existingResource,
        workingMemory: workingMemory !== void 0 ? workingMemory : existingResource.workingMemory,
        metadata: metadata ? { ...existingResource.metadata, ...metadata } : existingResource.metadata,
        updatedAt: now
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_UPDATE_RESOURCE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { resourceId }
        },
        error
      );
    }
  }
};
var StoreOperationsDynamoDB = class extends StoreOperations {
  client;
  tableName;
  service;
  constructor({
    service,
    tableName,
    client
  }) {
    super();
    this.service = service;
    this.client = client;
    this.tableName = tableName;
  }
  async hasColumn() {
    return true;
  }
  async dropTable() {
  }
  // Helper methods for entity/table mapping
  getEntityNameForTable(tableName) {
    const mapping = {
      [TABLE_THREADS]: "thread",
      [TABLE_MESSAGES]: "message",
      [TABLE_WORKFLOW_SNAPSHOT]: "workflow_snapshot",
      [TABLE_EVALS]: "eval",
      [TABLE_SCORERS]: "score",
      [TABLE_TRACES]: "trace",
      [TABLE_RESOURCES]: "resource"
    };
    return mapping[tableName] || null;
  }
  /**
   * Pre-processes a record to ensure Date objects are converted to ISO strings
   * This is necessary because ElectroDB validation happens before setters are applied
   */
  preprocessRecord(record) {
    const processed = { ...record };
    if (processed.createdAt instanceof Date) {
      processed.createdAt = processed.createdAt.toISOString();
    }
    if (processed.updatedAt instanceof Date) {
      processed.updatedAt = processed.updatedAt.toISOString();
    }
    if (processed.created_at instanceof Date) {
      processed.created_at = processed.created_at.toISOString();
    }
    if (processed.result && typeof processed.result === "object") {
      processed.result = JSON.stringify(processed.result);
    }
    if (processed.test_info && typeof processed.test_info === "object") {
      processed.test_info = JSON.stringify(processed.test_info);
    } else if (processed.test_info === void 0 || processed.test_info === null) {
      delete processed.test_info;
    }
    if (processed.snapshot && typeof processed.snapshot === "object") {
      processed.snapshot = JSON.stringify(processed.snapshot);
    }
    if (processed.attributes && typeof processed.attributes === "object") {
      processed.attributes = JSON.stringify(processed.attributes);
    }
    if (processed.status && typeof processed.status === "object") {
      processed.status = JSON.stringify(processed.status);
    }
    if (processed.events && typeof processed.events === "object") {
      processed.events = JSON.stringify(processed.events);
    }
    if (processed.links && typeof processed.links === "object") {
      processed.links = JSON.stringify(processed.links);
    }
    return processed;
  }
  /**
   * Validates that the required DynamoDB table exists and is accessible.
   * This does not check the table structure - it assumes the table
   * was created with the correct structure via CDK/CloudFormation.
   */
  async validateTableExists() {
    try {
      const command = new DescribeTableCommand({
        TableName: this.tableName
      });
      await this.client.send(command);
      return true;
    } catch (error) {
      if (error.name === "ResourceNotFoundException") {
        return false;
      }
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_VALIDATE_TABLE_EXISTS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName: this.tableName }
        },
        error
      );
    }
  }
  /**
   * This method is modified for DynamoDB with ElectroDB single-table design.
   * It assumes the table is created and managed externally via CDK/CloudFormation.
   *
   * This implementation only validates that the required table exists and is accessible.
   * No table creation is attempted - we simply check if we can access the table.
   */
  async createTable({ tableName }) {
    this.logger.debug("Validating access to externally managed table", { tableName, physicalTable: this.tableName });
    try {
      const tableExists = await this.validateTableExists();
      if (!tableExists) {
        this.logger.error(
          `Table ${this.tableName} does not exist or is not accessible. It should be created via CDK/CloudFormation.`
        );
        throw new Error(
          `Table ${this.tableName} does not exist or is not accessible. Ensure it's created via CDK/CloudFormation before using this store.`
        );
      }
      this.logger.debug(`Table ${this.tableName} exists and is accessible`);
    } catch (error) {
      this.logger.error("Error validating table access", { tableName: this.tableName, error });
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_VALIDATE_TABLE_ACCESS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName: this.tableName }
        },
        error
      );
    }
  }
  async insert({ tableName, record }) {
    this.logger.debug("DynamoDB insert called", { tableName });
    const entityName = this.getEntityNameForTable(tableName);
    if (!entityName || !this.service.entities[entityName]) {
      throw new MastraError({
        id: "STORAGE_DYNAMODB_STORE_INSERT_INVALID_ARGS",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: "No entity defined for tableName",
        details: { tableName }
      });
    }
    try {
      const dataToSave = { entity: entityName, ...this.preprocessRecord(record) };
      await this.service.entities[entityName].create(dataToSave).go();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  async alterTable(_args) {
  }
  /**
   * Clear all items from a logical "table" (entity type)
   */
  async clearTable({ tableName }) {
    this.logger.debug("DynamoDB clearTable called", { tableName });
    const entityName = this.getEntityNameForTable(tableName);
    if (!entityName || !this.service.entities[entityName]) {
      throw new MastraError({
        id: "STORAGE_DYNAMODB_STORE_CLEAR_TABLE_INVALID_ARGS",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: "No entity defined for tableName",
        details: { tableName }
      });
    }
    try {
      const result = await this.service.entities[entityName].scan.go({ pages: "all" });
      if (!result.data.length) {
        this.logger.debug(`No records found to clear for ${tableName}`);
        return;
      }
      this.logger.debug(`Found ${result.data.length} records to delete for ${tableName}`);
      const keysToDelete = result.data.map((item) => {
        const key = { entity: entityName };
        switch (entityName) {
          case "thread":
            if (!item.id) throw new Error(`Missing required key 'id' for entity 'thread'`);
            key.id = item.id;
            break;
          case "message":
            if (!item.id) throw new Error(`Missing required key 'id' for entity 'message'`);
            key.id = item.id;
            break;
          case "workflow_snapshot":
            if (!item.workflow_name)
              throw new Error(`Missing required key 'workflow_name' for entity 'workflow_snapshot'`);
            if (!item.run_id) throw new Error(`Missing required key 'run_id' for entity 'workflow_snapshot'`);
            key.workflow_name = item.workflow_name;
            key.run_id = item.run_id;
            break;
          case "eval":
            if (!item.run_id) throw new Error(`Missing required key 'run_id' for entity 'eval'`);
            key.run_id = item.run_id;
            break;
          case "trace":
            if (!item.id) throw new Error(`Missing required key 'id' for entity 'trace'`);
            key.id = item.id;
            break;
          case "score":
            if (!item.id) throw new Error(`Missing required key 'id' for entity 'score'`);
            key.id = item.id;
            break;
          default:
            this.logger.warn(`Unknown entity type encountered during clearTable: ${entityName}`);
            throw new Error(`Cannot construct delete key for unknown entity type: ${entityName}`);
        }
        return key;
      });
      const batchSize = 25;
      for (let i = 0; i < keysToDelete.length; i += batchSize) {
        const batchKeys = keysToDelete.slice(i, i + batchSize);
        await this.service.entities[entityName].delete(batchKeys).go();
      }
      this.logger.debug(`Successfully cleared all records for ${tableName}`);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_CLEAR_TABLE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  /**
   * Insert multiple records as a batch
   */
  async batchInsert({ tableName, records }) {
    this.logger.debug("DynamoDB batchInsert called", { tableName, count: records.length });
    const entityName = this.getEntityNameForTable(tableName);
    if (!entityName || !this.service.entities[entityName]) {
      throw new MastraError({
        id: "STORAGE_DYNAMODB_STORE_BATCH_INSERT_INVALID_ARGS",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: "No entity defined for tableName",
        details: { tableName }
      });
    }
    const recordsToSave = records.map((rec) => ({ entity: entityName, ...this.preprocessRecord(rec) }));
    const batchSize = 25;
    const batches = [];
    for (let i = 0; i < recordsToSave.length; i += batchSize) {
      const batch = recordsToSave.slice(i, i + batchSize);
      batches.push(batch);
    }
    try {
      for (const batch of batches) {
        for (const recordData of batch) {
          if (!recordData.entity) {
            this.logger.error("Missing entity property in record data for batchInsert", { recordData, tableName });
            throw new Error(`Internal error: Missing entity property during batchInsert for ${tableName}`);
          }
          this.logger.debug("Attempting to create record in batchInsert:", { entityName, recordData });
          await this.service.entities[entityName].create(recordData).go();
        }
      }
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_BATCH_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
  /**
   * Load a record by its keys
   */
  async load({ tableName, keys }) {
    this.logger.debug("DynamoDB load called", { tableName, keys });
    const entityName = this.getEntityNameForTable(tableName);
    if (!entityName || !this.service.entities[entityName]) {
      throw new MastraError({
        id: "STORAGE_DYNAMODB_STORE_LOAD_INVALID_ARGS",
        domain: ErrorDomain.STORAGE,
        category: ErrorCategory.USER,
        text: "No entity defined for tableName",
        details: { tableName }
      });
    }
    try {
      const keyObject = { entity: entityName, ...keys };
      const result = await this.service.entities[entityName].get(keyObject).go();
      if (!result.data) {
        return null;
      }
      let data = result.data;
      return data;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_LOAD_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName }
        },
        error
      );
    }
  }
};
var ScoresStorageDynamoDB = class extends ScoresStorage {
  service;
  constructor({ service }) {
    super();
    this.service = service;
  }
  // Helper function to parse score data (handle JSON fields)
  parseScoreData(data) {
    return {
      ...data,
      // Convert date strings back to Date objects for consistency
      createdAt: data.createdAt ? new Date(data.createdAt) : /* @__PURE__ */ new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : /* @__PURE__ */ new Date()
      // JSON fields are already transformed by the entity's getters
    };
  }
  async getScoreById({ id }) {
    this.logger.debug("Getting score by ID", { id });
    try {
      const result = await this.service.entities.score.get({ entity: "score", id }).go();
      if (!result.data) {
        return null;
      }
      return this.parseScoreData(result.data);
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_SCORE_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { id }
        },
        error
      );
    }
  }
  async saveScore(score) {
    this.logger.debug("Saving score", { scorerId: score.scorerId, runId: score.runId });
    const now = /* @__PURE__ */ new Date();
    const scoreId = `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const scoreData = {
      entity: "score",
      id: scoreId,
      scorerId: score.scorerId,
      traceId: score.traceId || "",
      runId: score.runId,
      scorer: typeof score.scorer === "string" ? score.scorer : JSON.stringify(score.scorer),
      preprocessStepResult: typeof score.preprocessStepResult === "string" ? score.preprocessStepResult : JSON.stringify(score.preprocessStepResult),
      analyzeStepResult: typeof score.analyzeStepResult === "string" ? score.analyzeStepResult : JSON.stringify(score.analyzeStepResult),
      score: score.score,
      reason: score.reason,
      preprocessPrompt: score.preprocessPrompt,
      generateScorePrompt: score.generateScorePrompt,
      analyzePrompt: score.analyzePrompt,
      reasonPrompt: score.reasonPrompt,
      input: typeof score.input === "string" ? score.input : JSON.stringify(score.input),
      output: typeof score.output === "string" ? score.output : JSON.stringify(score.output),
      additionalContext: typeof score.additionalContext === "string" ? score.additionalContext : JSON.stringify(score.additionalContext),
      runtimeContext: typeof score.runtimeContext === "string" ? score.runtimeContext : JSON.stringify(score.runtimeContext),
      entityType: score.entityType,
      entityData: typeof score.entity === "string" ? score.entity : JSON.stringify(score.entity),
      entityId: score.entityId,
      source: score.source,
      resourceId: score.resourceId || "",
      threadId: score.threadId || "",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    try {
      await this.service.entities.score.upsert(scoreData).go();
      const savedScore = {
        ...score,
        id: scoreId,
        createdAt: now,
        updatedAt: now
      };
      return { score: savedScore };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_SAVE_SCORE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { scorerId: score.scorerId, runId: score.runId }
        },
        error
      );
    }
  }
  async getScoresByScorerId({
    scorerId,
    pagination,
    entityId,
    entityType
  }) {
    this.logger.debug("Getting scores by scorer ID", { scorerId, pagination, entityId, entityType });
    try {
      const query = this.service.entities.score.query.byScorer({ entity: "score", scorerId });
      const results = await query.go();
      let allScores = results.data.map((data) => this.parseScoreData(data));
      if (entityId) {
        allScores = allScores.filter((score) => score.entityId === entityId);
      }
      if (entityType) {
        allScores = allScores.filter((score) => score.entityType === entityType);
      }
      allScores.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const startIndex = pagination.page * pagination.perPage;
      const endIndex = startIndex + pagination.perPage;
      const paginatedScores = allScores.slice(startIndex, endIndex);
      const total = allScores.length;
      const hasMore = endIndex < total;
      return {
        scores: paginatedScores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_SCORES_BY_SCORER_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: {
            scorerId: scorerId || "",
            entityId: entityId || "",
            entityType: entityType || "",
            page: pagination.page,
            perPage: pagination.perPage
          }
        },
        error
      );
    }
  }
  async getScoresByRunId({
    runId,
    pagination
  }) {
    this.logger.debug("Getting scores by run ID", { runId, pagination });
    try {
      const query = this.service.entities.score.query.byRun({ entity: "score", runId });
      const results = await query.go();
      const allScores = results.data.map((data) => this.parseScoreData(data));
      allScores.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const startIndex = pagination.page * pagination.perPage;
      const endIndex = startIndex + pagination.perPage;
      const paginatedScores = allScores.slice(startIndex, endIndex);
      const total = allScores.length;
      const hasMore = endIndex < total;
      return {
        scores: paginatedScores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_SCORES_BY_RUN_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { runId, page: pagination.page, perPage: pagination.perPage }
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
    this.logger.debug("Getting scores by entity ID", { entityId, entityType, pagination });
    try {
      const query = this.service.entities.score.query.byEntityData({ entity: "score", entityId });
      const results = await query.go();
      let allScores = results.data.map((data) => this.parseScoreData(data));
      allScores = allScores.filter((score) => score.entityType === entityType);
      allScores.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      const startIndex = pagination.page * pagination.perPage;
      const endIndex = startIndex + pagination.perPage;
      const paginatedScores = allScores.slice(startIndex, endIndex);
      const total = allScores.length;
      const hasMore = endIndex < total;
      return {
        scores: paginatedScores,
        pagination: {
          total,
          page: pagination.page,
          perPage: pagination.perPage,
          hasMore
        }
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_SCORES_BY_ENTITY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { entityId, entityType, page: pagination.page, perPage: pagination.perPage }
        },
        error
      );
    }
  }
};
var TracesStorageDynamoDB = class extends TracesStorage {
  service;
  operations;
  constructor({ service, operations }) {
    super();
    this.service = service;
    this.operations = operations;
  }
  // Trace operations
  async getTraces(args) {
    const { name, scope, page, perPage } = args;
    this.logger.debug("Getting traces", { name, scope, page, perPage });
    try {
      let query;
      if (name) {
        query = this.service.entities.trace.query.byName({ entity: "trace", name });
      } else if (scope) {
        query = this.service.entities.trace.query.byScope({ entity: "trace", scope });
      } else {
        this.logger.warn("Performing a scan operation on traces - consider using a more specific query");
        query = this.service.entities.trace.scan;
      }
      let items = [];
      let cursor = null;
      let pagesFetched = 0;
      const startPage = page > 0 ? page : 1;
      do {
        const results = await query.go({ cursor, limit: perPage });
        pagesFetched++;
        if (pagesFetched === startPage) {
          items = results.data;
          break;
        }
        cursor = results.cursor;
        if (!cursor && results.data.length > 0 && pagesFetched < startPage) {
          break;
        }
      } while (cursor && pagesFetched < startPage);
      return items;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_TRACES_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  async batchTraceInsert({ records }) {
    this.logger.debug("Batch inserting traces", { count: records.length });
    if (!records.length) {
      return;
    }
    try {
      const recordsToSave = records.map((rec) => ({ entity: "trace", ...rec }));
      await this.operations.batchInsert({
        tableName: TABLE_TRACES,
        records: recordsToSave
        // Pass records with 'entity' included
      });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_BATCH_TRACE_INSERT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { count: records.length }
        },
        error
      );
    }
  }
  async getTracesPaginated(args) {
    const { name, scope, page = 0, perPage = 100, attributes, filters, dateRange } = args;
    this.logger.debug("Getting traces with pagination", { name, scope, page, perPage, attributes, filters, dateRange });
    try {
      let query;
      if (name) {
        query = this.service.entities.trace.query.byName({ entity: "trace", name });
      } else if (scope) {
        query = this.service.entities.trace.query.byScope({ entity: "trace", scope });
      } else {
        this.logger.warn("Performing a scan operation on traces - consider using a more specific query");
        query = this.service.entities.trace.scan;
      }
      const results = await query.go({
        order: "desc",
        pages: "all"
        // Get all pages to apply filtering and pagination
      });
      if (!results.data.length) {
        return {
          traces: [],
          total: 0,
          page,
          perPage,
          hasMore: false
        };
      }
      let filteredData = results.data;
      if (attributes) {
        filteredData = filteredData.filter((item) => {
          try {
            let itemAttributes = {};
            if (item.attributes) {
              if (typeof item.attributes === "string") {
                if (item.attributes === "[object Object]") {
                  itemAttributes = {};
                } else {
                  try {
                    itemAttributes = JSON.parse(item.attributes);
                  } catch {
                    itemAttributes = {};
                  }
                }
              } else if (typeof item.attributes === "object") {
                itemAttributes = item.attributes;
              }
            }
            return Object.entries(attributes).every(([key, value]) => itemAttributes[key] === value);
          } catch (e) {
            this.logger.warn("Failed to parse attributes during filtering", { item, error: e });
            return false;
          }
        });
      }
      if (dateRange?.start) {
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= dateRange.start;
        });
      }
      if (dateRange?.end) {
        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return itemDate <= dateRange.end;
        });
      }
      const total = filteredData.length;
      const start = page * perPage;
      const end = start + perPage;
      const paginatedData = filteredData.slice(start, end);
      const traces = paginatedData.map((item) => {
        let attributes2;
        if (item.attributes) {
          if (typeof item.attributes === "string") {
            if (item.attributes === "[object Object]") {
              attributes2 = void 0;
            } else {
              try {
                attributes2 = JSON.parse(item.attributes);
              } catch {
                attributes2 = void 0;
              }
            }
          } else if (typeof item.attributes === "object") {
            attributes2 = item.attributes;
          }
        }
        let status;
        if (item.status) {
          if (typeof item.status === "string") {
            try {
              status = JSON.parse(item.status);
            } catch {
              status = void 0;
            }
          } else if (typeof item.status === "object") {
            status = item.status;
          }
        }
        let events;
        if (item.events) {
          if (typeof item.events === "string") {
            try {
              events = JSON.parse(item.events);
            } catch {
              events = void 0;
            }
          } else if (Array.isArray(item.events)) {
            events = item.events;
          }
        }
        let links;
        if (item.links) {
          if (typeof item.links === "string") {
            try {
              links = JSON.parse(item.links);
            } catch {
              links = void 0;
            }
          } else if (Array.isArray(item.links)) {
            links = item.links;
          }
        }
        return {
          id: item.id,
          parentSpanId: item.parentSpanId,
          name: item.name,
          traceId: item.traceId,
          scope: item.scope,
          kind: item.kind,
          attributes: attributes2,
          status,
          events,
          links,
          other: item.other,
          startTime: item.startTime,
          endTime: item.endTime,
          createdAt: item.createdAt
        };
      });
      return {
        traces,
        total,
        page,
        perPage,
        hasMore: end < total
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_TRACES_PAGINATED_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
};
function formatWorkflowRun(snapshotData) {
  return {
    workflowName: snapshotData.workflow_name,
    runId: snapshotData.run_id,
    snapshot: snapshotData.snapshot,
    createdAt: new Date(snapshotData.createdAt),
    updatedAt: new Date(snapshotData.updatedAt),
    resourceId: snapshotData.resourceId
  };
}
var WorkflowStorageDynamoDB = class extends WorkflowsStorage {
  service;
  constructor({ service }) {
    super();
    this.service = service;
  }
  // Workflow operations
  async persistWorkflowSnapshot({
    workflowName,
    runId,
    snapshot
  }) {
    this.logger.debug("Persisting workflow snapshot", { workflowName, runId });
    try {
      const resourceId = "resourceId" in snapshot ? snapshot.resourceId : void 0;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const data = {
        entity: "workflow_snapshot",
        // Add entity type
        workflow_name: workflowName,
        run_id: runId,
        snapshot: JSON.stringify(snapshot),
        // Stringify the snapshot object
        createdAt: now,
        updatedAt: now,
        resourceId
      };
      await this.service.entities.workflow_snapshot.upsert(data).go();
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_PERSIST_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { workflowName, runId }
        },
        error
      );
    }
  }
  async loadWorkflowSnapshot({
    workflowName,
    runId
  }) {
    this.logger.debug("Loading workflow snapshot", { workflowName, runId });
    try {
      const result = await this.service.entities.workflow_snapshot.get({
        entity: "workflow_snapshot",
        // Add entity type
        workflow_name: workflowName,
        run_id: runId
      }).go();
      if (!result.data?.snapshot) {
        return null;
      }
      return result.data.snapshot;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_LOAD_WORKFLOW_SNAPSHOT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { workflowName, runId }
        },
        error
      );
    }
  }
  async getWorkflowRuns(args) {
    this.logger.debug("Getting workflow runs", { args });
    try {
      const limit = args?.limit || 10;
      const offset = args?.offset || 0;
      let query;
      if (args?.workflowName) {
        query = this.service.entities.workflow_snapshot.query.primary({
          entity: "workflow_snapshot",
          // Add entity type
          workflow_name: args.workflowName
        });
      } else {
        this.logger.warn("Performing a scan operation on workflow snapshots - consider using a more specific query");
        query = this.service.entities.workflow_snapshot.scan;
      }
      const allMatchingSnapshots = [];
      let cursor = null;
      const DYNAMODB_PAGE_SIZE = 100;
      do {
        const pageResults = await query.go({
          limit: DYNAMODB_PAGE_SIZE,
          cursor
        });
        if (pageResults.data && pageResults.data.length > 0) {
          let pageFilteredData = pageResults.data;
          if (args?.fromDate || args?.toDate) {
            pageFilteredData = pageFilteredData.filter((snapshot) => {
              const createdAt = new Date(snapshot.createdAt);
              if (args.fromDate && createdAt < args.fromDate) {
                return false;
              }
              if (args.toDate && createdAt > args.toDate) {
                return false;
              }
              return true;
            });
          }
          if (args?.resourceId) {
            pageFilteredData = pageFilteredData.filter((snapshot) => {
              return snapshot.resourceId === args.resourceId;
            });
          }
          allMatchingSnapshots.push(...pageFilteredData);
        }
        cursor = pageResults.cursor;
      } while (cursor);
      if (!allMatchingSnapshots.length) {
        return { runs: [], total: 0 };
      }
      const total = allMatchingSnapshots.length;
      const paginatedData = allMatchingSnapshots.slice(offset, offset + limit);
      const runs = paginatedData.map((snapshot) => formatWorkflowRun(snapshot));
      return {
        runs,
        total
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_WORKFLOW_RUNS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { workflowName: args?.workflowName || "", resourceId: args?.resourceId || "" }
        },
        error
      );
    }
  }
  async getWorkflowRunById(args) {
    const { runId, workflowName } = args;
    this.logger.debug("Getting workflow run by ID", { runId, workflowName });
    console.log("workflowName", workflowName);
    console.log("runId", runId);
    try {
      if (workflowName) {
        this.logger.debug("WorkflowName provided, using direct GET operation.");
        const result2 = await this.service.entities.workflow_snapshot.get({
          entity: "workflow_snapshot",
          // Entity type for PK
          workflow_name: workflowName,
          run_id: runId
        }).go();
        console.log("result", result2);
        if (!result2.data) {
          return null;
        }
        const snapshot2 = result2.data.snapshot;
        return {
          workflowName: result2.data.workflow_name,
          runId: result2.data.run_id,
          snapshot: snapshot2,
          createdAt: new Date(result2.data.createdAt),
          updatedAt: new Date(result2.data.updatedAt),
          resourceId: result2.data.resourceId
        };
      }
      this.logger.debug(
        'WorkflowName not provided. Attempting to find workflow run by runId using GSI. Ensure GSI (e.g., "byRunId") is defined on the workflowSnapshot entity with run_id as its key and provisioned in DynamoDB.'
      );
      const result = await this.service.entities.workflow_snapshot.query.gsi2({ entity: "workflow_snapshot", run_id: runId }).go();
      const matchingRunDbItem = result.data && result.data.length > 0 ? result.data[0] : null;
      if (!matchingRunDbItem) {
        return null;
      }
      const snapshot = matchingRunDbItem.snapshot;
      return {
        workflowName: matchingRunDbItem.workflow_name,
        runId: matchingRunDbItem.run_id,
        snapshot,
        createdAt: new Date(matchingRunDbItem.createdAt),
        updatedAt: new Date(matchingRunDbItem.updatedAt),
        resourceId: matchingRunDbItem.resourceId
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_GET_WORKFLOW_RUN_BY_ID_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { runId, workflowName: args?.workflowName || "" }
        },
        error
      );
    }
  }
};

// src/storage/index.ts
var DynamoDBStore = class extends MastraStorage {
  tableName;
  client;
  service;
  hasInitialized = null;
  stores;
  constructor({ name, config }) {
    super({ name });
    try {
      if (!config.tableName || typeof config.tableName !== "string" || config.tableName.trim() === "") {
        throw new Error("DynamoDBStore: config.tableName must be provided and cannot be empty.");
      }
      if (!/^[a-zA-Z0-9_.-]{3,255}$/.test(config.tableName)) {
        throw new Error(
          `DynamoDBStore: config.tableName "${config.tableName}" contains invalid characters or is not between 3 and 255 characters long.`
        );
      }
      const dynamoClient = new DynamoDBClient({
        region: config.region || "us-east-1",
        endpoint: config.endpoint,
        credentials: config.credentials
      });
      this.tableName = config.tableName;
      this.client = DynamoDBDocumentClient.from(dynamoClient);
      this.service = getElectroDbService(this.client, this.tableName);
      const operations = new StoreOperationsDynamoDB({
        service: this.service,
        tableName: this.tableName,
        client: this.client
      });
      const traces = new TracesStorageDynamoDB({ service: this.service, operations });
      const workflows = new WorkflowStorageDynamoDB({ service: this.service });
      const memory = new MemoryStorageDynamoDB({ service: this.service });
      const scores = new ScoresStorageDynamoDB({ service: this.service });
      this.stores = {
        operations,
        legacyEvals: new LegacyEvalsDynamoDB({ service: this.service, tableName: this.tableName }),
        traces,
        workflows,
        memory,
        scores
      };
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_CONSTRUCTOR_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.USER
        },
        error
      );
    }
  }
  get supports() {
    return {
      selectByIncludeResourceScope: true,
      resourceWorkingMemory: true,
      hasColumn: false,
      createTable: false,
      deleteMessages: false
    };
  }
  /**
   * Validates that the required DynamoDB table exists and is accessible.
   * This does not check the table structure - it assumes the table
   * was created with the correct structure via CDK/CloudFormation.
   */
  async validateTableExists() {
    try {
      const command = new DescribeTableCommand({
        TableName: this.tableName
      });
      await this.client.send(command);
      return true;
    } catch (error) {
      if (error.name === "ResourceNotFoundException") {
        return false;
      }
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_VALIDATE_TABLE_EXISTS_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName: this.tableName }
        },
        error
      );
    }
  }
  /**
   * Initialize storage, validating the externally managed table is accessible.
   * For the single-table design, we only validate once that we can access
   * the table that was created via CDK/CloudFormation.
   */
  async init() {
    if (this.hasInitialized === null) {
      this.hasInitialized = this._performInitializationAndStore();
    }
    try {
      await this.hasInitialized;
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_INIT_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY,
          details: { tableName: this.tableName }
        },
        error
      );
    }
  }
  /**
   * Performs the actual table validation and stores the promise.
   * Handles resetting the stored promise on failure to allow retries.
   */
  _performInitializationAndStore() {
    return this.validateTableExists().then((exists) => {
      if (!exists) {
        throw new Error(
          `Table ${this.tableName} does not exist or is not accessible. Ensure it's created via CDK/CloudFormation before using this store.`
        );
      }
      return true;
    }).catch((err) => {
      this.hasInitialized = null;
      throw err;
    });
  }
  async createTable({ tableName, schema }) {
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
  async insert({ tableName, record }) {
    return this.stores.operations.insert({ tableName, record });
  }
  async batchInsert({ tableName, records }) {
    return this.stores.operations.batchInsert({ tableName, records });
  }
  async load({ tableName, keys }) {
    return this.stores.operations.load({ tableName, keys });
  }
  // Thread operations
  async getThreadById({ threadId }) {
    return this.stores.memory.getThreadById({ threadId });
  }
  async getThreadsByResourceId(args) {
    return this.stores.memory.getThreadsByResourceId(args);
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
    resourceId,
    selectBy,
    format
  }) {
    return this.stores.memory.getMessages({ threadId, resourceId, selectBy, format });
  }
  async saveMessages(args) {
    return this.stores.memory.saveMessages(args);
  }
  async getThreadsByResourceIdPaginated(args) {
    return this.stores.memory.getThreadsByResourceIdPaginated(args);
  }
  async getMessagesPaginated(args) {
    return this.stores.memory.getMessagesPaginated(args);
  }
  async updateMessages(_args) {
    return this.stores.memory.updateMessages(_args);
  }
  // Trace operations
  async getTraces(args) {
    return this.stores.traces.getTraces(args);
  }
  async batchTraceInsert({ records }) {
    return this.stores.traces.batchTraceInsert({ records });
  }
  async getTracesPaginated(_args) {
    return this.stores.traces.getTracesPaginated(_args);
  }
  // Workflow operations
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
  async getWorkflowRuns(args) {
    return this.stores.workflows.getWorkflowRuns(args);
  }
  async getWorkflowRunById(args) {
    return this.stores.workflows.getWorkflowRunById(args);
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
  // Eval operations
  async getEvalsByAgentName(agentName, type) {
    return this.stores.legacyEvals.getEvalsByAgentName(agentName, type);
  }
  async getEvals(options) {
    return this.stores.legacyEvals.getEvals(options);
  }
  /**
   * Closes the DynamoDB client connection and cleans up resources.
   * Should be called when the store is no longer needed, e.g., at the end of tests or application shutdown.
   */
  async close() {
    this.logger.debug("Closing DynamoDB client for store:", { name: this.name });
    try {
      this.client.destroy();
      this.logger.debug("DynamoDB client closed successfully for store:", { name: this.name });
    } catch (error) {
      throw new MastraError(
        {
          id: "STORAGE_DYNAMODB_STORE_CLOSE_FAILED",
          domain: ErrorDomain.STORAGE,
          category: ErrorCategory.THIRD_PARTY
        },
        error
      );
    }
  }
  /**
   * SCORERS - Not implemented
   */
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
};

export { DynamoDBStore };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map