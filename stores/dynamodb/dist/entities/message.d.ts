import { Entity } from 'electrodb';
export declare const messageEntity: Entity<string, string, string, {
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
//# sourceMappingURL=message.d.ts.map