import type { MCPServer } from '@mastra/mcp';
export interface Logger {
    info: (message: string, data?: any) => Promise<void>;
    warning: (message: string, data?: any) => Promise<void>;
    error: (message: string, error?: any) => Promise<void>;
    debug: (message: string, data?: any) => Promise<void>;
}
export declare const writeErrorLog: (message: string, data?: any) => void;
export declare function createLogger(server?: MCPServer): Logger;
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map