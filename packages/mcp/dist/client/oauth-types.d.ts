/**
 * OAuth 2.1 authentication types for MCP client
 * Compatible with @modelcontextprotocol/sdk OAuthClientProvider interface
 */
import type { OAuthTokens as MCPOAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
export interface CallbackServerConfig {
    /** Port to listen on (0 for random available port) */
    port?: number;
    /** Host to bind to (default: localhost) */
    host?: string;
    /** Timeout in milliseconds to wait for callback (default: 300000ms = 5 minutes) */
    timeout?: number;
    /** Public URL for OAuth callback (used in proxy environments) */
    publicUrl?: string;
}
export interface MCPOAuthConfig {
    /** OAuth client identifier (use dynamic client registration if not provided) */
    clientId?: string;
    /** Requested OAuth scopes (defaults to "mcp:tools") */
    scopes?: string[];
    /** Redirect URI for OAuth callback (defaults to localhost) */
    redirectUri?: string;
    /** Callback to handle auth URL presentation to user */
    onAuthURL: (authUrl: string, state: string) => Promise<void>;
    /** Optional callback when tokens are received */
    onTokenReceived?: (tokens: OAuthTokens) => Promise<void>;
    /** Token storage: file path (string) or custom implementation (TokenStorage) */
    tokenStorage?: string | TokenStorage;
    /** Callback server configuration for OAuth flow */
    callbackServerConfig?: CallbackServerConfig;
}
export interface OAuthTokens extends MCPOAuthTokens {
    /** Token issuance timestamp for expiration calculation */
    issued_at?: number;
}
export interface TokenStorage {
    /** Retrieve stored tokens */
    getTokens(): Promise<OAuthTokens | null>;
    /** Store tokens */
    setTokens(tokens: OAuthTokens): Promise<void>;
    /** Clear stored tokens */
    clearTokens(): Promise<void>;
    /** Store arbitrary key-value data (for client information, etc.) */
    setItem(key: string, value: string): Promise<void>;
    /** Retrieve arbitrary key-value data */
    getItem(key: string): Promise<string | null>;
}
/**
 * @deprecated - PKCE handling is now managed by MCP SDK
 */
export interface PKCEChallenge {
    /** Code verifier for PKCE */
    codeVerifier: string;
    /** Code challenge for PKCE */
    codeChallenge: string;
    /** Code challenge method (always S256) */
    codeChallengeMethod: 'S256';
}
/**
 * OAuth-specific error types
 * @deprecated - Use MCP SDK error types instead
 */
export declare class OAuthError extends Error {
    readonly code?: string | undefined;
    readonly description?: string | undefined;
    constructor(message: string, code?: string | undefined, description?: string | undefined);
}
export declare class TokenExpiredError extends OAuthError {
    constructor();
}
export declare class InvalidTokenError extends OAuthError {
    constructor();
}
export declare class RefreshFailedError extends OAuthError {
    constructor(cause?: Error);
}
export declare class AuthorizationError extends OAuthError {
    constructor(error: string, description?: string);
}
//# sourceMappingURL=oauth-types.d.ts.map