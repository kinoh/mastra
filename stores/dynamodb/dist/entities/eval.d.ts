import { Entity } from 'electrodb';
export declare const evalEntity: Entity<string, string, string, {
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
//# sourceMappingURL=eval.d.ts.map