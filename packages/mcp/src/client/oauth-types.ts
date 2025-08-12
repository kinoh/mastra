/**
 * OAuth 2.1 authentication types for MCP client
 * Compatible with @modelcontextprotocol/sdk OAuthClientProvider interface
 */

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
  /** Optional custom token storage implementation */
  tokenStorage?: TokenStorage;
  /** Token storage configuration options */
  tokenStorageOptions?: {
    /** Use encrypted storage (default: false) */
    encrypted?: boolean;
    /** Encryption key for encrypted storage */
    encryptionKey?: string;
    /** Custom file path for token storage */
    filePath?: string;
    /** Maximum age for stored tokens in milliseconds (default: 30 days) */
    maxAge?: number;
    /** Enable automatic cleanup of expired tokens (default: true) */
    autoCleanup?: boolean;
  };
}

// Use MCP SDK OAuthTokens as base, extend with our fields
import type { OAuthTokens as MCPOAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';

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

// Internal types - these are no longer needed as they're handled by the SDK
// Keeping for potential future use or backwards compatibility

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
export class OAuthError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly description?: string,
  ) {
    super(message);
    this.name = 'OAuthError';
  }
}

export class TokenExpiredError extends OAuthError {
  constructor() {
    super('Access token has expired', 'token_expired', 'The access token has expired and needs to be refreshed');
  }
}

export class InvalidTokenError extends OAuthError {
  constructor() {
    super('Invalid access token', 'invalid_token', 'The access token is invalid or malformed');
  }
}

export class RefreshFailedError extends OAuthError {
  constructor(cause?: Error) {
    super('Failed to refresh access token', 'refresh_failed', 'Token refresh request failed');
    if (cause) {
      this.cause = cause;
    }
  }
}

export class AuthorizationError extends OAuthError {
  constructor(error: string, description?: string) {
    super(`Authorization failed: ${error}`, error, description);
  }
}