import { Entity } from 'electrodb';
export declare const threadEntity: Entity<string, string, string, {
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
//# sourceMappingURL=thread.d.ts.map