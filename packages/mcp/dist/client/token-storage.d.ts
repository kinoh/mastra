import type { TokenStorage, OAuthTokens } from './oauth-types.js';
/**
 * Hierarchical storage structure for MCP client data
 */
interface ClientStorageData {
    [clientId: string]: {
        tokens: {
            [serverId: string]: OAuthTokens;
        };
        data: {
            [serverId: string]: {
                [key: string]: string;
            };
        };
    };
}
/**
 * Simple file-based storage for hierarchical MCP client data
 */
export declare class FileTokenStorage {
    private filePath;
    constructor(filePath: string);
    readData(): Promise<ClientStorageData>;
    writeData(data: ClientStorageData): Promise<void>;
    clear(): Promise<void>;
}
/**
 * MCP Client token storage - manages hierarchical storage for MCP clients
 * Provides isolation between different MCPClient instances and their servers
 */
export declare class MCPClientTokenStorage implements TokenStorage {
    private fileStorage;
    private serverId;
    private mcpClientId;
    constructor(fileStorage: FileTokenStorage, serverId: string, mcpClientId: string);
    getTokens(): Promise<OAuthTokens | null>;
    setTokens(tokens: OAuthTokens): Promise<void>;
    clearTokens(): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
}
/**
 * Factory for creating MCP Client token storage instances
 */
export declare class TokenStorageFactory {
    /**
     * Create default hierarchical token storage for MCP clients
     */
    static createDefault(filePath: string, serverId: string, mcpClientId: string): TokenStorage;
    /**
     * Create memory-only storage (for testing)
     */
    static createMemory(): TokenStorage;
}
export {};
//# sourceMappingURL=token-storage.d.ts.map