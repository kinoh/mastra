import { Entity } from 'electrodb';
export declare const traceEntity: Entity<string, string, string, {
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
//# sourceMappingURL=trace.d.ts.map