import { Integration } from '@mastra/core';
import * as integrationClient from './client/services.gen.js';
import { type RagieConfig } from './types.js';
export declare class RagieIntegration extends Integration<void, typeof integrationClient> {
    readonly name = "RAGIE";
    readonly logoUrl: any;
    config: RagieConfig;
    categories: string[];
    description: string;
    constructor({ config }: {
        config: RagieConfig;
    });
    getStaticTools(): Record<"createDocument" | "listDocuments" | "createDocumentRaw" | "createDocumentFromUrl" | "getDocument" | "deleteDocument" | "updateDocumentFile" | "updateDocumentRaw" | "patchDocumentMetadata" | "retrieve" | "getDocumentSummary" | "listInstructions" | "createInstruction" | "updateInstruction" | "listEntitiesByInstruction" | "listEntitiesByDocument" | "listConnectionsConnectionsGet" | "setConnectionEnabledConnectionsConnectionIdEnabledPut" | "updateConnectionConnectionsConnectionIdPut" | "getConnectionStatsConnectionsConnectionIdStatsGet" | "deleteConnectionConnectionsConnectionIdDeletePost", import("@mastra/core").ToolAction<any, any, any>>;
}
//# sourceMappingURL=index.d.ts.map