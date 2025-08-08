/**
 * OAuth 2.1 authentication types for MCP client
 */

export interface MCPOAuthConfig {
  /** OAuth client identifier */
  clientId: string;
  /** Authorization server URL */
  authorizationServer: string;
  /** Requested OAuth scopes */
  scopes: string[];
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

export interface OAuthTokens {
  /** Access token for API requests */
  access_token: string;
  /** Optional refresh token */
  refresh_token?: string;
  /** Token expiration time in seconds */
  expires_in?: number;
  /** Token type (usually 'Bearer') */
  token_type: string;
  /** Space-separated list of granted scopes */
  scope?: string;
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
}

export interface PKCEChallenge {
  /** Code verifier for PKCE */
  codeVerifier: string;
  /** Code challenge for PKCE */
  codeChallenge: string;
  /** Code challenge method (always S256) */
  codeChallengeMethod: 'S256';
}

export interface AuthorizationParams {
  /** Response type (always 'code') */
  response_type: 'code';
  /** Client identifier */
  client_id: string;
  /** Redirect URI */
  redirect_uri: string;
  /** Space-separated scopes */
  scope: string;
  /** State parameter for CSRF protection */
  state: string;
  /** Code challenge for PKCE */
  code_challenge: string;
  /** Code challenge method for PKCE */
  code_challenge_method: 'S256';
}

export interface TokenExchangeParams {
  /** Grant type (always 'authorization_code') */
  grant_type: 'authorization_code';
  /** Authorization code from callback */
  code: string;
  /** Redirect URI used in authorization request */
  redirect_uri: string;
  /** Client identifier */
  client_id: string;
  /** Code verifier for PKCE */
  code_verifier: string;
}

export interface RefreshTokenParams {
  /** Grant type (always 'refresh_token') */
  grant_type: 'refresh_token';
  /** Refresh token */
  refresh_token: string;
  /** Client identifier */
  client_id: string;
}

/**
 * OAuth-specific error types
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