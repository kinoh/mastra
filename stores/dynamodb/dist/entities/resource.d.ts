import { Entity } from 'electrodb';
export declare const resourceEntity: Entity<string, string, string, {
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
//# sourceMappingURL=resource.d.ts.map