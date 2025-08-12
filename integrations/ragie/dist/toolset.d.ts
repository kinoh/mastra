import { OpenAPIToolset, type ToolAction } from '@mastra/core';
import * as integrationClient from './client/services.gen.js';
import * as zodSchema from './client/zodSchema.js';
import { type RagieConfig } from './types.js';
export declare class RagieToolset extends OpenAPIToolset {
    readonly name = "RAGIE";
    readonly logoUrl: any;
    config: RagieConfig;
    readonly tools: Record<Exclude<keyof typeof integrationClient, 'client'>, ToolAction<any, any, any>>;
    categories: string[];
    description: string;
    constructor({ config }: {
        config: RagieConfig;
    });
    protected get toolSchemas(): typeof zodSchema;
    protected get toolDocumentations(): {
        createDocument: {
            comment: string;
            doc: string;
        };
        listDocuments: {
            comment: string;
            doc: string;
        };
        createDocumentRaw: {
            comment: string;
            doc: string;
        };
        createDocumentFromUrl: {
            comment: string;
            doc: string;
        };
        getDocument: {
            comment: string;
            doc: string;
        };
        deleteDocument: {
            comment: string;
            doc: string;
        };
        updateDocumentFile: {
            comment: string;
            doc: string;
        };
        updateDocumentRaw: {
            comment: string;
            doc: string;
        };
        patchDocumentMetadata: {
            comment: string;
            doc: string;
        };
        retrieve: {
            comment: string;
            doc: string;
        };
        getDocumentSummary: {
            comment: string;
            doc: string;
        };
        listInstructions: {
            comment: string;
            doc: string;
        };
        createInstruction: {
            comment: string;
            doc: string;
        };
        updateInstruction: {
            comment: string;
            doc: string;
        };
        listEntitiesByInstruction: {
            comment: string;
            doc: string;
        };
        listEntitiesByDocument: {
            comment: string;
            doc: string;
        };
        listConnectionsConnectionsGet: {
            comment: string;
            doc: string;
        };
        setConnectionEnabledConnectionsConnectionIdEnabledPut: {
            comment: string;
            doc: string;
        };
        updateConnectionConnectionsConnectionIdPut: {
            comment: string;
            doc: string;
        };
        getConnectionStatsConnectionsConnectionIdStatsGet: {
            comment: string;
            doc: string;
        };
        deleteConnectionConnectionsConnectionIdDeletePost: {
            comment: string;
            doc: string;
        };
    };
    protected get baseClient(): typeof integrationClient;
    getApiClient: () => Promise<typeof integrationClient>;
}
//# sourceMappingURL=toolset.d.ts.map