import { randomBytes, createHash } from 'crypto';
import { URL, URLSearchParams } from 'url';
import type {
  MCPOAuthConfig,
  OAuthTokens,
  PKCEChallenge,
  AuthorizationParams,
  TokenExchangeParams,
  RefreshTokenParams,
  TokenStorage,
  OAuthError,
  TokenExpiredError,
  InvalidTokenError,
  RefreshFailedError,
  AuthorizationError,
} from './oauth-types';
import {
  OAuthError as OAuthErrorClass,
  TokenExpiredError as TokenExpiredErrorClass,
  InvalidTokenError as InvalidTokenErrorClass,
  RefreshFailedError as RefreshFailedErrorClass,
  AuthorizationError as AuthorizationErrorClass,
} from './oauth-types';
import { OAuthCallbackServer, type CallbackServerConfig, type CallbackServerResult } from './oauth-callback-server';
import { TokenStorageFactory } from './token-storage';

/**
 * Default token storage using memory (not persistent)
 * For production use, implement a file-based or database storage
 */
class MemoryTokenStorage implements TokenStorage {
  private tokens: OAuthTokens | null = null;

  async getTokens(): Promise<OAuthTokens | null> {
    return this.tokens;
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    this.tokens = tokens;
  }

  async clearTokens(): Promise<void> {
    this.tokens = null;
  }
}

/**
 * OAuth Client Manager for MCP servers
 * Handles OAuth 2.1 flow with PKCE, token management, and automatic refresh
 */
export class OAuthClientManager {
  private config: MCPOAuthConfig;
  private storage: TokenStorage;
  private currentTokens: OAuthTokens | null = null;
  private refreshPromise: Promise<OAuthTokens> | null = null;
  private readonly DEFAULT_REDIRECT_URI = 'http://localhost:3000/oauth/callback';
  private serverId: string;

  constructor(config: MCPOAuthConfig, serverId?: string) {
    this.config = config;
    this.serverId = serverId || this.generateServerId();
    this.storage = this.initializeTokenStorage();
    
    // Validate configuration
    this.validateConfig();
  }

  private generateServerId(): string {
    // Generate a unique server ID based on client ID and auth server
    const hash = createHash('sha256');
    hash.update(`${this.config.clientId}:${this.config.authorizationServer}`);
    return hash.digest('hex').substring(0, 16);
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
        return TokenStorageFactory.createFile(options.filePath, this.serverId, {
          encrypted: options.encrypted,
          encryptionKey: options.encryptionKey,
          maxAge: options.maxAge,
          autoCleanup: options.autoCleanup,
        });
      }
      
      if (options.encrypted) {
        if (!options.encryptionKey) {
          throw new Error('Encryption key is required when using encrypted token storage');
        }
        return TokenStorageFactory.createEncrypted(this.serverId, options.encryptionKey);
      }
    }

    // Default to secure file storage
    return TokenStorageFactory.createDefault(this.serverId);
  }

  private validateConfig(): void {
    if (!this.config.clientId) {
      throw new Error('OAuth configuration requires clientId');
    }
    if (!this.config.authorizationServer) {
      throw new Error('OAuth configuration requires authorizationServer');
    }
    if (!this.config.scopes || this.config.scopes.length === 0) {
      throw new Error('OAuth configuration requires at least one scope');
    }
    if (!this.config.onAuthURL) {
      throw new Error('OAuth configuration requires onAuthURL callback');
    }

    // Validate authorization server URL
    try {
      new URL(this.config.authorizationServer);
    } catch (error) {
      throw new Error(`Invalid authorization server URL: ${this.config.authorizationServer}`);
    }
  }

  /**
   * Generate PKCE challenge and verifier
   */
  private generatePKCEChallenge(): PKCEChallenge {
    const codeVerifier = randomBytes(32).toString('base64url');
    const codeChallenge = createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    return {
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
    };
  }

  /**
   * Generate cryptographically secure state parameter
   */
  private generateState(): string {
    return randomBytes(16).toString('base64url');
  }

  /**
   * Build authorization URL with PKCE parameters
   */
  private buildAuthorizationUrl(
    pkceChallenge: PKCEChallenge,
    state: string,
    redirectUri: string,
  ): string {
    const authUrl = new URL('/oauth/authorize', this.config.authorizationServer);
    
    const params: AuthorizationParams = {
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: redirectUri,
      scope: this.config.scopes.join(' '),
      state,
      code_challenge: pkceChallenge.codeChallenge,
      code_challenge_method: pkceChallenge.codeChallengeMethod,
    };

    Object.entries(params).forEach(([key, value]) => {
      authUrl.searchParams.set(key, value);
    });

    return authUrl.toString();
  }

  /**
   * Exchange authorization code for tokens
   */
  private async exchangeCodeForTokens(
    code: string,
    redirectUri: string,
    codeVerifier: string,
  ): Promise<OAuthTokens> {
    const tokenUrl = new URL('/oauth/token', this.config.authorizationServer);
    
    const params: TokenExchangeParams = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: this.config.clientId,
      code_verifier: codeVerifier,
    };

    const body = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      body.set(key, value);
    });

    const response = await fetch(tokenUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response);
      throw new AuthorizationErrorClass(
        errorData.error || 'token_exchange_failed',
        errorData.error_description || 'Failed to exchange authorization code for tokens',
      );
    }

    const tokens = await response.json() as OAuthTokens;
    
    // Add issued_at timestamp for expiration calculation
    tokens.issued_at = Math.floor(Date.now() / 1000);
    
    return tokens;
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(refreshToken: string): Promise<OAuthTokens> {
    const tokenUrl = new URL('/oauth/token', this.config.authorizationServer);
    
    const params: RefreshTokenParams = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.config.clientId,
    };

    const body = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      body.set(key, value);
    });

    const response = await fetch(tokenUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response);
      throw new RefreshFailedErrorClass(
        new Error(`Token refresh failed: ${errorData.error_description || errorData.error}`),
      );
    }

    const tokens = await response.json() as OAuthTokens;
    
    // Add issued_at timestamp
    tokens.issued_at = Math.floor(Date.now() / 1000);
    
    return tokens;
  }

  /**
   * Parse error response from OAuth server
   */
  private async parseErrorResponse(response: Response): Promise<{ error?: string; error_description?: string }> {
    try {
      return await response.json();
    } catch {
      return {
        error: 'unknown_error',
        error_description: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  }

  /**
   * Check if token is expired (with 5 minute buffer)
   */
  private isTokenExpired(tokens: OAuthTokens): boolean {
    if (!tokens.expires_in || !tokens.issued_at) {
      return false; // If no expiration info, assume valid
    }

    const expirationTime = tokens.issued_at + tokens.expires_in;
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = 5 * 60; // 5 minutes buffer

    return currentTime >= (expirationTime - bufferTime);
  }

  /**
   * Initialize OAuth flow
   * Returns a promise that resolves when the OAuth flow is complete
   */
  async initializeOAuthFlow(): Promise<OAuthTokens> {
    // Check if we have valid tokens in storage
    const storedTokens = await this.storage.getTokens();
    if (storedTokens && !this.isTokenExpired(storedTokens)) {
      this.currentTokens = storedTokens;
      return storedTokens;
    }

    // If we have expired tokens but have a refresh token, try refreshing
    if (storedTokens && storedTokens.refresh_token) {
      try {
        const refreshedTokens = await this.refreshAccessToken(storedTokens.refresh_token);
        await this.storage.setTokens(refreshedTokens);
        this.currentTokens = refreshedTokens;
        
        if (this.config.onTokenReceived) {
          await this.config.onTokenReceived(refreshedTokens);
        }
        
        return refreshedTokens;
      } catch (error) {
        // Refresh failed, fall through to new OAuth flow
        await this.storage.clearTokens();
      }
    }

    // Start new OAuth flow
    return this.startNewOAuthFlow();
  }

  /**
   * Start a new OAuth authorization flow
   */
  private async startNewOAuthFlow(): Promise<OAuthTokens> {
    const pkceChallenge = this.generatePKCEChallenge();
    const state = this.generateState();
    
    // Create and start callback server
    const callbackServer = new OAuthCallbackServer();
    
    try {
      // Start server and get callback URL with promise
      const { url: callbackUrl, promise: callbackPromise } = await callbackServer.start();
      const redirectUri = this.config.redirectUri || callbackUrl;
      
      const authUrl = this.buildAuthorizationUrl(pkceChallenge, state, redirectUri);

      // Present auth URL to user
      await this.config.onAuthURL(authUrl, state);

      // Wait for OAuth callback using the integrated promise
      const callbackResult = await callbackPromise;

      // Handle the callback
      return await this.handleCallback(
        callbackResult.code,
        state,
        callbackResult.state,
        pkceChallenge.codeVerifier,
        redirectUri,
      );
    } finally {
      // Always stop the callback server
      await callbackServer.stop();
    }
  }

  /**
   * Handle OAuth callback (to be implemented with callback server)
   */
  async handleCallback(
    code: string,
    state: string,
    receivedState: string,
    codeVerifier: string,
    redirectUri: string,
  ): Promise<OAuthTokens> {
    // Validate state parameter
    if (state !== receivedState) {
      throw new AuthorizationErrorClass('invalid_state', 'State parameter mismatch');
    }

    // Exchange code for tokens
    const tokens = await this.exchangeCodeForTokens(code, redirectUri, codeVerifier);
    
    // Store tokens
    await this.storage.setTokens(tokens);
    this.currentTokens = tokens;

    // Notify user of token receipt
    if (this.config.onTokenReceived) {
      await this.config.onTokenReceived(tokens);
    }

    return tokens;
  }

  /**
   * Get valid access token, refreshing if necessary
   */
  async getValidAccessToken(): Promise<string> {
    // Ensure we have tokens
    if (!this.currentTokens) {
      await this.initializeOAuthFlow();
    }

    if (!this.currentTokens) {
      throw new InvalidTokenErrorClass();
    }

    // Check if token is expired
    if (this.isTokenExpired(this.currentTokens)) {
      if (!this.currentTokens.refresh_token) {
        throw new TokenExpiredErrorClass();
      }

      // Use existing refresh promise or create new one
      if (!this.refreshPromise) {
        this.refreshPromise = this.refreshAccessToken(this.currentTokens.refresh_token)
          .then(async (tokens) => {
            await this.storage.setTokens(tokens);
            this.currentTokens = tokens;
            
            if (this.config.onTokenReceived) {
              await this.config.onTokenReceived(tokens);
            }
            
            return tokens;
          })
          .finally(() => {
            this.refreshPromise = null;
          });
      }

      const refreshedTokens = await this.refreshPromise;
      return refreshedTokens.access_token;
    }

    return this.currentTokens.access_token;
  }

  /**
   * Clear stored tokens and reset state
   */
  async clearTokens(): Promise<void> {
    await this.storage.clearTokens();
    this.currentTokens = null;
    this.refreshPromise = null;
  }

  /**
   * Get current tokens (may be null or expired)
   */
  getCurrentTokens(): OAuthTokens | null {
    return this.currentTokens;
  }

  /**
   * Check if currently authenticated
   */
  isAuthenticated(): boolean {
    return this.currentTokens !== null && !this.isTokenExpired(this.currentTokens);
  }
}