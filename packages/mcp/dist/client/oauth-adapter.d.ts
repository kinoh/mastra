import type { OAuthClientProvider } from '@modelcontextprotocol/sdk/client/auth.js';
import type { OAuthClientMetadata, OAuthClientInformation, OAuthClientInformationFull, OAuthTokens as MCPOAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { MCPOAuthConfig } from './oauth-types.js';
/**
 * Adapter that bridges Mastra's OAuth configuration with MCP SDK's OAuthClientProvider interface
 * This maintains backward compatibility while leveraging SDK's OAuth capabilities
 */
export declare class MastraOAuthClientProvider implements OAuthClientProvider {
    private config;
    private storage;
    private serverId;
    private mcpClientId;
    private _codeVerifier;
    private _state;
    private callbackServer?;
    constructor(config: MCPOAuthConfig, serverId: string, mcpClientId: string);
    private validateConfig;
    private initializeTokenStorage;
    get redirectUrl(): string | URL;
    get clientMetadata(): OAuthClientMetadata;
    state?(): string | Promise<string>;
    clientInformation(): Promise<OAuthClientInformation | undefined>;
    saveClientInformation?(clientInformation: OAuthClientInformationFull): Promise<void>;
    /**
     * Retrieve saved client information from Dynamic Client Registration
     */
    private getSavedClientInformation;
    tokens(): Promise<MCPOAuthTokens | undefined>;
    saveTokens(tokens: MCPOAuthTokens): Promise<void>;
    redirectToAuthorization(authorizationUrl: URL): Promise<void>;
    saveCodeVerifier(codeVerifier: string): Promise<void>;
    codeVerifier(): Promise<string>;
    invalidateCredentials?(scope: 'all' | 'client' | 'tokens' | 'verifier'): Promise<void>;
}
//# sourceMappingURL=oauth-adapter.d.ts.map