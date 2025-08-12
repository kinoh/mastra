import { Entity } from 'electrodb';
export declare const workflowSnapshotEntity: Entity<string, string, string, {
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
//# sourceMappingURL=workflow-snapshot.d.ts.map