import type { CallbackServerConfig } from './oauth-types.js';
export interface CallbackResult {
    /** Authorization code from OAuth provider */
    code: string;
    /** State parameter for CSRF protection */
    state: string;
    /** Additional parameters from callback */
    additionalParams?: Record<string, string>;
}
export interface CallbackServerResult {
    /** Callback URL for OAuth redirect */
    url: string;
    /** Promise that resolves when callback is received */
    promise: Promise<CallbackResult>;
}
/**
 * Ephemeral HTTP server for handling OAuth callbacks
 * Creates a temporary server that listens for the OAuth redirect
 */
export declare class OAuthCallbackServer {
    private readonly config;
    private server;
    private handler;
    constructor(config?: CallbackServerConfig);
    /**
     * Start the callback server and return callback URL with promise
     */
    start(): Promise<{
        url: string;
        promise: Promise<CallbackResult>;
    }>;
    /**
     * Wait for OAuth callback (simplified - use start().promise instead)
     */
    waitForCallback(): Promise<CallbackResult>;
    /**
     * Stop the callback server
     */
    stop(): Promise<void>;
    /**
     * Get the callback URL if server is running
     */
    getCallbackUrl(): string | null;
}
//# sourceMappingURL=oauth-callback-server.d.ts.map