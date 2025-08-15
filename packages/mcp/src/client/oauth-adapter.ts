import { randomBytes } from 'crypto';
import type { OAuthClientProvider } from '@modelcontextprotocol/sdk/client/auth.js';
import type { OAuthClientMetadata, OAuthClientInformation, OAuthClientInformationFull, OAuthTokens as MCPOAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { OAuthCallbackServer } from './oauth-callback-server';
import type { MCPOAuthConfig, TokenStorage } from './oauth-types';
import { TokenStorageFactory } from './token-storage';

/**
 * Adapter that bridges Mastra's OAuth configuration with MCP SDK's OAuthClientProvider interface
 * This maintains backward compatibility while leveraging SDK's OAuth capabilities
 */
export class MastraOAuthClientProvider implements OAuthClientProvider {
  private config: MCPOAuthConfig;
  private storage: TokenStorage;
  private serverId: string;
  private mcpClientId: string;
  private _codeVerifier: string | null = null;
  private _state: string | null = null;
  private callbackServer?: OAuthCallbackServer;

  constructor(config: MCPOAuthConfig, serverId: string, mcpClientId: string) {
    this.config = config;
    this.serverId = serverId;
    this.mcpClientId = mcpClientId;
    
    // Validate configuration
    this.validateConfig();
    
    this.storage = this.initializeTokenStorage();
  }

  private validateConfig(): void {
    if (!this.config.onAuthURL) {
      throw new Error('OAuth configuration requires onAuthURL callback');
    }
  }

  private initializeTokenStorage(): TokenStorage {
    // Use custom storage if provided
    if (this.config.tokenStorage) {
      return this.config.tokenStorage;
    }

    // Use token storage options if provided
    if (this.config.tokenStorageOptions) {
      const options = this.config.tokenStorageOptions;
      
      if (options.filePath) {
        return TokenStorageFactory.createDefault(options.filePath, this.serverId, this.mcpClientId);
      }
    }

    // Default to file storage with default path
    const os = require('os');
    const path = require('path');
    const tokensDir = path.join(os.homedir(), '.mastra', 'tokens');
    const tokenFile = path.join(tokensDir, 'tokens.json');
    
    return TokenStorageFactory.createDefault(tokenFile, this.serverId, this.mcpClientId);
  }

  get redirectUrl(): string | URL {
    // Use explicit redirectUri if provided
    if (this.config.redirectUri) {
      return this.config.redirectUri;
    }
    
    // Use publicUrl from callbackServerConfig if provided
    if (this.config.callbackServerConfig?.publicUrl) {
      return this.config.callbackServerConfig.publicUrl;
    }
    
    // Default fallback
    return 'http://localhost:3000/oauth/callback';
  }

  get clientMetadata(): OAuthClientMetadata {
    return {
      redirect_uris: [this.redirectUrl.toString()],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      token_endpoint_auth_method: 'client_secret_post',
      scope: this.config.scopes?.join(' ') || 'mcp:tools',
    };
  }

  state?(): string | Promise<string> {
    if (!this._state) {
      this._state = randomBytes(16).toString('base64url');
    }
    return this._state;
  }

  async clientInformation(): Promise<OAuthClientInformation | undefined> {
    console.log(`[DEBUG] clientInformation() called`);
    
    // Check for saved client information from Dynamic Client Registration
    const savedClientInfo = await this.getSavedClientInformation();
    if (savedClientInfo) {
      console.log(`[DEBUG] Found saved client information: ${savedClientInfo.client_id}`);
      return savedClientInfo;
    }
    
    // If clientId is configured, use static client registration
    if (this.config.clientId) {
      console.log(`[DEBUG] Using static client ID: ${this.config.clientId}`);
      return {
        client_id: this.config.clientId,
        // No client_secret for PKCE flow
      };
    }
    
    // Use Dynamic Client Registration
    console.log(`[DEBUG] No client information found - will use Dynamic Client Registration`);
    return undefined;
  }

  async saveClientInformation?(clientInformation: OAuthClientInformationFull): Promise<void> {
    console.log(`[DEBUG] saveClientInformation() called with client_id: ${clientInformation.client_id}`);
    
    // Save the dynamically registered client information
    await this.storage.setItem('client_information', JSON.stringify(clientInformation));
    console.log(`[DEBUG] Saved client information to storage`);
  }

  /**
   * Retrieve saved client information from Dynamic Client Registration
   */
  private async getSavedClientInformation(): Promise<OAuthClientInformation | undefined> {
    try {
      const saved = await this.storage.getItem('client_information');
      if (saved) {
        return JSON.parse(saved) as OAuthClientInformation;
      }
    } catch (error) {
      console.log(`[DEBUG] Error retrieving saved client information: ${error}`);
    }
    
    return undefined;
  }

  async tokens(): Promise<MCPOAuthTokens | undefined> {
    console.log(`[DEBUG] tokens() called - checking for existing tokens`);
    const tokens = await this.storage.getTokens();
    if (!tokens) {
      console.log(`[DEBUG] No existing tokens found`);
      return undefined;
    }
    
    console.log(`[DEBUG] Found existing tokens - access_token: ${tokens.access_token?.substring(0, 10)}...`);
    // Convert our extended tokens to MCP SDK format
    const { issued_at, ...mcpTokens } = tokens;
    return mcpTokens;
  }

  async saveTokens(tokens: MCPOAuthTokens): Promise<void> {
    console.log(`[DEBUG] saveTokens() called - access_token: ${tokens.access_token?.substring(0, 10)}...`);
    
    // Create extended tokens with issued_at for our storage
    const extendedTokens = {
      ...tokens,
      issued_at: Math.floor(Date.now() / 1000)
    };
    
    await this.storage.setTokens(extendedTokens);
    console.log(`[DEBUG] Tokens saved to storage`);
    
    // Notify user of token receipt
    if (this.config.onTokenReceived) {
      await this.config.onTokenReceived(tokens);
      console.log(`[DEBUG] User onTokenReceived callback executed`);
    }
  }

  async redirectToAuthorization(authorizationUrl: URL): Promise<void> {
    console.log(`[DEBUG] redirectToAuthorization() called with URL: ${authorizationUrl.toString()}`);
    const state = typeof this.state === 'function' ? await this.state() : this.state || '';

    // Call user's callback to present the authorization URL
    // The SDK should handle the callback server and token exchange internally
    await this.config.onAuthURL(authorizationUrl.toString(), state);
    console.log(`[DEBUG] User onAuthURL callback executed`);
  }

  async saveCodeVerifier(codeVerifier: string): Promise<void> {
    this._codeVerifier = codeVerifier;
  }

  async codeVerifier(): Promise<string> {
    if (!this._codeVerifier) {
      // Generate PKCE code verifier
      this._codeVerifier = randomBytes(32).toString('base64url');
    }
    return this._codeVerifier;
  }

  async invalidateCredentials?(scope: 'all' | 'client' | 'tokens' | 'verifier'): Promise<void> {
    switch (scope) {
      case 'all':
        await this.storage.clearTokens();
        this._codeVerifier = null;
        this._state = null;
        break;
      case 'tokens':
        await this.storage.clearTokens();
        break;
      case 'verifier':
        this._codeVerifier = null;
        break;
      case 'client':
        // For public clients, nothing to invalidate
        break;
    }
  }

}