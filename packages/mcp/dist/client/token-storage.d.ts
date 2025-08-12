import type { TokenStorage, OAuthTokens } from './oauth-types.js';
/**
 * Simple file-based token storage with generic key-value support
 */
export declare class FileTokenStorage implements TokenStorage {
    private filePath;
    constructor(filePath: string);
    getTokens(): Promise<OAuthTokens | null>;
    setTokens(tokens: OAuthTokens): Promise<void>;
    clearTokens(): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    private readStorageFile;
    private writeStorageFile;
}
/**
 * Shared token storage across all servers - provides simple proxy to base storage
 */
export declare class MultiServerTokenStorage implements TokenStorage {
    private baseStorage;
    private serverId;
    constructor(baseStorage: TokenStorage, serverId: string);
    getTokens(): Promise<OAuthTokens | null>;
    setTokens(tokens: OAuthTokens): Promise<void>;
    clearTokens(): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
}
/**
 * Factory for creating appropriate token storage instances
 */
export declare class TokenStorageFactory {
    /**
     * Create default token storage that shares tokens across all servers
     */
    static createDefault(filePath: string, serverId: string): TokenStorage;
    /**
     * Create memory-only storage (for testing)
     */
    static createMemory(): TokenStorage;
}
//# sourceMappingURL=token-storage.d.ts.map