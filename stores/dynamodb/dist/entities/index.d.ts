import type { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Service } from 'electrodb';
export declare function getElectroDbService(client: DynamoDBDocumentClient, tableName: string): Service<{
    thread: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            id: {
                type: "string";
                required: true;
            };
            resourceId: {
                type: "string";
                required: true;
            };
            title: {
                type: "string";
                required: true;
            };
            metadata: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "id")[];
                };
                sk: {
                    field: string;
                    composite: "id"[];
                };
            };
            byResource: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "resourceId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
        };
    }>;
    message: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            id: {
                type: "string";
                required: true;
            };
            threadId: {
                type: "string";
                required: true;
            };
            content: {
                type: "string";
                required: true;
                set: (value?: string | void | undefined) => string | void;
                get: (value?: string) => any;
            };
            role: {
                type: "string";
                required: true;
            };
            type: {
                type: "string";
                default: string;
            };
            resourceId: {
                type: "string";
                required: false;
            };
            toolCallIds: {
                type: "string";
                required: false;
                set: (value?: string[] | string) => string | undefined;
                get: (value?: string) => any;
            };
            toolCallArgs: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown>[] | string) => string | undefined;
                get: (value?: string) => any;
            };
            toolNames: {
                type: "string";
                required: false;
                set: (value?: string[] | string) => string | undefined;
                get: (value?: string) => any;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            metadata: {
                readonly type: "string";
                readonly set: (value?: Record<string, unknown> | string) => string | undefined;
                readonly get: (value?: string) => any;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "id")[];
                };
                sk: {
                    field: string;
                    composite: "entity"[];
                };
            };
            byThread: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "threadId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
        };
    }>;
    eval: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            input: {
                type: "string";
                required: true;
            };
            output: {
                type: "string";
                required: true;
            };
            result: {
                type: "string";
                required: true;
                set: (value?: any) => any;
                get: (value?: string) => any;
            };
            agent_name: {
                type: "string";
                required: true;
            };
            metric_name: {
                type: "string";
                required: true;
            };
            instructions: {
                type: "string";
                required: true;
            };
            test_info: {
                type: "string";
                required: false;
                set: (value?: any) => any;
                get: (value?: string) => string | undefined;
            };
            global_run_id: {
                type: "string";
                required: true;
            };
            run_id: {
                type: "string";
                required: true;
            };
            created_at: {
                type: "string";
                required: true;
                default: () => string;
                set: (value?: Date | string) => string;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            metadata: {
                readonly type: "string";
                readonly set: (value?: Record<string, unknown> | string) => string | undefined;
                readonly get: (value?: string) => any;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "run_id")[];
                };
                sk: {
                    field: string;
                    composite: never[];
                };
            };
            byAgent: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "agent_name")[];
                };
                sk: {
                    field: string;
                    composite: "created_at"[];
                };
            };
        };
    }>;
    trace: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            id: {
                type: "string";
                required: true;
            };
            parentSpanId: {
                type: "string";
                required: false;
            };
            name: {
                type: "string";
                required: true;
            };
            traceId: {
                type: "string";
                required: true;
            };
            scope: {
                type: "string";
                required: true;
            };
            kind: {
                type: "number";
                required: true;
            };
            attributes: {
                type: "string";
                required: false;
                set: (value?: any) => any;
                get: (value?: string) => any;
            };
            status: {
                type: "string";
                required: false;
                set: (value?: any) => any;
                get: (value?: string) => string | undefined;
            };
            events: {
                type: "string";
                required: false;
                set: (value?: any) => any;
                get: (value?: string) => string | undefined;
            };
            links: {
                type: "string";
                required: false;
                set: (value?: any) => any;
                get: (value?: string) => string | undefined;
            };
            other: {
                type: "string";
                required: false;
            };
            startTime: {
                type: "number";
                required: true;
            };
            endTime: {
                type: "number";
                required: true;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            metadata: {
                readonly type: "string";
                readonly set: (value?: Record<string, unknown> | string) => string | undefined;
                readonly get: (value?: string) => any;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "id")[];
                };
                sk: {
                    field: string;
                    composite: never[];
                };
            };
            byName: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "name")[];
                };
                sk: {
                    field: string;
                    composite: "startTime"[];
                };
            };
            byScope: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "scope")[];
                };
                sk: {
                    field: string;
                    composite: "startTime"[];
                };
            };
        };
    }>;
    workflow_snapshot: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            workflow_name: {
                type: "string";
                required: true;
            };
            run_id: {
                type: "string";
                required: true;
            };
            snapshot: {
                type: "string";
                required: true;
                set: (value?: any) => any;
                get: (value?: string) => any;
            };
            resourceId: {
                type: "string";
                required: false;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            metadata: {
                readonly type: "string";
                readonly set: (value?: Record<string, unknown> | string) => string | undefined;
                readonly get: (value?: string) => any;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "workflow_name")[];
                };
                sk: {
                    field: string;
                    composite: "run_id"[];
                };
            };
            gsi2: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "run_id")[];
                };
                sk: {
                    field: string;
                    composite: "workflow_name"[];
                };
            };
        };
    }>;
    resource: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            id: {
                type: "string";
                required: true;
            };
            workingMemory: {
                type: "string";
                required: false;
            };
            metadata: {
                type: "string";
                required: false;
                set: (value?: string | void | undefined) => string | void;
                get: (value?: string) => any;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "id")[];
                };
                sk: {
                    field: string;
                    composite: "entity"[];
                };
            };
        };
    }>;
    score: import("electrodb").Entity<string, string, string, {
        model: {
            entity: string;
            version: string;
            service: string;
        };
        attributes: {
            id: {
                type: "string";
                required: true;
            };
            scorerId: {
                type: "string";
                required: true;
            };
            traceId: {
                type: "string";
                required: false;
            };
            runId: {
                type: "string";
                required: true;
            };
            scorer: {
                type: "string";
                required: true;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            extractStepResult: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            preprocessStepResult: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            analyzeStepResult: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            score: {
                type: "number";
                required: true;
            };
            reason: {
                type: "string";
                required: false;
            };
            extractPrompt: {
                type: "string";
                required: false;
            };
            analyzePrompt: {
                type: "string";
                required: false;
            };
            reasonPrompt: {
                type: "string";
                required: false;
            };
            generateScorePrompt: {
                type: "string";
                required: false;
            };
            generateReasonPrompt: {
                type: "string";
                required: false;
            };
            input: {
                type: "string";
                required: true;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            output: {
                type: "string";
                required: true;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            additionalContext: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            runtimeContext: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            entityType: {
                type: "string";
                required: false;
            };
            entityData: {
                type: "string";
                required: false;
                set: (value?: Record<string, unknown> | string) => string | undefined;
                get: (value?: string) => any;
            };
            entityId: {
                type: "string";
                required: false;
            };
            source: {
                type: "string";
                required: true;
            };
            resourceId: {
                type: "string";
                required: false;
            };
            threadId: {
                type: "string";
                required: false;
            };
            createdAt: {
                readonly type: "string";
                readonly required: true;
                readonly readOnly: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            updatedAt: {
                readonly type: "string";
                readonly required: true;
                readonly set: (value?: Date | string) => string;
                readonly default: () => string;
            };
            metadata: {
                readonly type: "string";
                readonly set: (value?: Record<string, unknown> | string) => string | undefined;
                readonly get: (value?: string) => any;
            };
            entity: {
                type: "string";
                required: true;
            };
        };
        indexes: {
            primary: {
                pk: {
                    field: string;
                    composite: ("entity" | "id")[];
                };
                sk: {
                    field: string;
                    composite: "entity"[];
                };
            };
            byScorer: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "scorerId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
            byRun: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "runId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
            byTrace: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "traceId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
            byEntityData: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "entityId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
            byResource: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "resourceId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
            byThread: {
                index: string;
                pk: {
                    field: string;
                    composite: ("entity" | "threadId")[];
                };
                sk: {
                    field: string;
                    composite: "createdAt"[];
                };
            };
        };
    }>;
}>;
//# sourceMappingURL=index.d.ts.map