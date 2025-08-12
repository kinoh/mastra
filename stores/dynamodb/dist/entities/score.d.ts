import { Entity } from 'electrodb';
export declare const scoreEntity: Entity<string, string, string, {
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
//# sourceMappingURL=score.d.ts.map