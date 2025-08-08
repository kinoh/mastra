import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OAuthClientManager } from './oauth-client-manager';
import { 
  OAuthError, 
  TokenExpiredError, 
  InvalidTokenError, 
  RefreshFailedError, 
  AuthorizationError,
  type MCPOAuthConfig,
  type OAuthTokens,
  type TokenStorage
} from './oauth-types';
import { TokenStorageFactory } from './token-storage';

// Mock fetch for testing token exchange
global.fetch = vi.fn();

// Mock TokenStorageFactory
vi.mock('./token-storage', () => ({
  TokenStorageFactory: {
    createDefault: vi.fn(),
    createEncrypted: vi.fn(),
    createMemory: vi.fn(),
  }
}));

// Mock OAuthCallbackServer
vi.mock('./oauth-callback-server', () => ({
  OAuthCallbackServer: vi.fn()
}));

describe('OAuthClientManager', () => {
  let mockTokenStorage: TokenStorage;
  let mockConfig: MCPOAuthConfig;
  let mockOnAuthURL: ReturnType<typeof vi.fn>;
  let mockCallbackServer: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    mockCallbackServer = {
      start: vi.fn().mockResolvedValue({
        url: 'http://localhost:12345/oauth/callback',
        promise: Promise.resolve({ code: 'test-code', state: 'test-state' })
      }),
      waitForCallback: vi.fn(),
      stop: vi.fn().mockResolvedValue(undefined),
    };
    
    const { OAuthCallbackServer } = await import('./oauth-callback-server');
    vi.mocked(OAuthCallbackServer).mockImplementation(() => mockCallbackServer);
    
    mockTokenStorage = {
      getTokens: vi.fn().mockResolvedValue(null),
      setTokens: vi.fn().mockResolvedValue(undefined),
      clearTokens: vi.fn().mockResolvedValue(undefined),
    };

    mockOnAuthURL = vi.fn().mockResolvedValue(undefined);

    mockConfig = {
      clientId: 'test-client-id',
      authorizationServer: 'https://auth.example.com',
      scopes: ['read', 'write'],
      onAuthURL: mockOnAuthURL,
      tokenStorage: mockTokenStorage,
    };

    (TokenStorageFactory.createDefault as any).mockReturnValue(mockTokenStorage);
  });

  describe('constructor', () => {
    it('should create manager with valid config', () => {
      const manager = new OAuthClientManager(mockConfig);
      expect(manager).toBeDefined();
    });

    it('should throw error for missing clientId', () => {
      const invalidConfig = { ...mockConfig, clientId: '' };
      expect(() => new OAuthClientManager(invalidConfig)).toThrow('OAuth configuration requires clientId');
    });

    it('should throw error for missing authorizationServer', () => {
      const invalidConfig = { ...mockConfig, authorizationServer: '' };
      expect(() => new OAuthClientManager(invalidConfig)).toThrow('OAuth configuration requires authorizationServer');
    });

    it('should throw error for empty scopes', () => {
      const invalidConfig = { ...mockConfig, scopes: [] };
      expect(() => new OAuthClientManager(invalidConfig)).toThrow('OAuth configuration requires at least one scope');
    });

    it('should throw error for missing onAuthURL callback', () => {
      const invalidConfig = { ...mockConfig, onAuthURL: undefined as any };
      expect(() => new OAuthClientManager(invalidConfig)).toThrow('OAuth configuration requires onAuthURL callback');
    });

    it('should throw error for invalid authorization server URL', () => {
      const invalidConfig = { ...mockConfig, authorizationServer: 'invalid-url' };
      expect(() => new OAuthClientManager(invalidConfig)).toThrow('Invalid authorization server URL');
    });
  });

  describe('token management', () => {
    let manager: OAuthClientManager;

    beforeEach(() => {
      manager = new OAuthClientManager(mockConfig);
    });

    describe('initializeOAuthFlow', () => {
      it('should return stored tokens if valid', async () => {
        const validTokens: OAuthTokens = {
          access_token: 'valid-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000), // Current time
        };

        (mockTokenStorage.getTokens as any).mockResolvedValue(validTokens);

        const result = await manager.initializeOAuthFlow();
        expect(result).toEqual(validTokens);
        expect(mockOnAuthURL).not.toHaveBeenCalled();
      });

      it('should refresh tokens if expired but refresh token exists', async () => {
        const expiredTokens: OAuthTokens = {
          access_token: 'expired-token',
          refresh_token: 'valid-refresh-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
        };

        const refreshedTokens: OAuthTokens = {
          access_token: 'new-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000),
        };

        (mockTokenStorage.getTokens as any).mockResolvedValue(expiredTokens);
        (global.fetch as any).mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(refreshedTokens),
        });

        const result = await manager.initializeOAuthFlow();
        expect(result.access_token).toBe('new-token');
        expect(mockTokenStorage.setTokens).toHaveBeenCalledWith(expect.objectContaining({
          access_token: 'new-token',
        }));
      });

      it('should start new OAuth flow if no valid tokens', async () => {
        (mockTokenStorage.getTokens as any).mockResolvedValue(null);

        // Mock successful OAuth flow
        const mockTokens: OAuthTokens = {
          access_token: 'new-access-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000),
        };

        // Create a promise that resolves with the callback result after auth URL is called
        const callbackPromise = new Promise(async (resolve) => {
          await new Promise(setImmediate); // Wait for auth URL to be called
          const authURLCall = mockOnAuthURL.mock.calls[0];
          const authURL = authURLCall[0];
          const actualState = new URL(authURL).searchParams.get('state');
          
          resolve({
            code: 'test-auth-code',
            state: actualState,
          });
        });
        
        mockCallbackServer.start.mockResolvedValue({
          url: 'http://localhost:12345/oauth/callback',
          promise: callbackPromise
        });

        (global.fetch as any).mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockTokens),
        });

        const result = await manager.initializeOAuthFlow();
        
        expect(result.access_token).toBe('new-access-token');
        expect(mockOnAuthURL).toHaveBeenCalled();
        expect(mockCallbackServer.start).toHaveBeenCalled();
        expect(mockCallbackServer.stop).toHaveBeenCalled();
      });
    });

    describe('getValidAccessToken', () => {
      it('should return valid access token', async () => {
        const validTokens: OAuthTokens = {
          access_token: 'valid-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000),
        };

        (mockTokenStorage.getTokens as any).mockResolvedValue(validTokens);
        
        const token = await manager.getValidAccessToken();
        expect(token).toBe('valid-token');
      });

      it('should refresh token if expired', async () => {
        const expiredTokens: OAuthTokens = {
          access_token: 'expired-token',
          refresh_token: 'valid-refresh-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
        };

        const refreshedTokens: OAuthTokens = {
          access_token: 'refreshed-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000),
        };

        // First call returns expired tokens, subsequent calls after refresh return null (since we set them)
        (mockTokenStorage.getTokens as any)
          .mockResolvedValueOnce(expiredTokens)
          .mockResolvedValue(null);

        (global.fetch as any).mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(refreshedTokens),
        });

        const token = await manager.getValidAccessToken();
        expect(token).toBe('refreshed-token');
      });

      it('should throw TokenExpiredError if no refresh token', async () => {
        const expiredTokens: OAuthTokens = {
          access_token: 'expired-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
          // refresh_token intentionally omitted
        };

        (mockTokenStorage.getTokens as any).mockResolvedValue(expiredTokens);
        
        await manager.initializeOAuthFlow().catch(() => {
          // Expected to fail since token is expired and no refresh token
        });
        (manager as any).currentTokens = expiredTokens;
        await expect(manager.getValidAccessToken()).rejects.toThrow(TokenExpiredError);
      });
    });

    describe('clearTokens', () => {
      it('should clear stored tokens', async () => {
        await manager.clearTokens();
        expect(mockTokenStorage.clearTokens).toHaveBeenCalled();
      });
    });

    describe('isAuthenticated', () => {
      it('should return false when no tokens', () => {
        expect(manager.isAuthenticated()).toBe(false);
      });

      it('should return false for expired tokens', async () => {
        const expiredTokens: OAuthTokens = {
          access_token: 'expired-token',
          token_type: 'Bearer',
          expires_in: 3600,
          issued_at: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
          // no refresh_token
        };

        (mockTokenStorage.getTokens as any).mockResolvedValue(expiredTokens);
        
        mockCallbackServer.waitForCallback.mockRejectedValue(new Error('User cancelled'));
        
        try {
          await manager.initializeOAuthFlow();
        } catch {
          // Expected to fail since token is expired and user cancelled
        }

        expect(manager.isAuthenticated()).toBe(false);
      });
    });
  });

  describe('PKCE', () => {
    it('should generate valid PKCE challenge', () => {
      const manager = new OAuthClientManager(mockConfig);
      
      // Access private method for testing
      const challenge = (manager as any).generatePKCEChallenge();
      
      expect(challenge.codeVerifier).toBeDefined();
      expect(challenge.codeChallenge).toBeDefined();
      expect(challenge.codeChallengeMethod).toBe('S256');
      expect(challenge.codeVerifier).toMatch(/^[A-Za-z0-9_-]{43}$/); // Base64url, 32 bytes = 43 chars
    });
  });

  describe('token refresh', () => {
    it('should handle refresh token rotation', async () => {
      const manager = new OAuthClientManager(mockConfig);
      
      const refreshedTokens: OAuthTokens = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(refreshedTokens),
      });

      const result = await (manager as any).refreshAccessToken('old-refresh-token');
      
      expect(result.access_token).toBe('new-access-token');
      expect(result.refresh_token).toBe('new-refresh-token');
      expect(result.issued_at).toBeDefined();
    });

    it('should handle refresh failures', async () => {
      const manager = new OAuthClientManager(mockConfig);

      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({
          error: 'invalid_grant',
          error_description: 'Refresh token expired',
        }),
      });

      await expect(
        (manager as any).refreshAccessToken('invalid-refresh-token')
      ).rejects.toThrow(RefreshFailedError);
    });
  });

  describe('error handling', () => {
    it('should handle network errors during token exchange', async () => {
      const manager = new OAuthClientManager(mockConfig);

      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      await expect(
        (manager as any).exchangeCodeForTokens('auth-code', 'http://localhost:3000', 'code-verifier')
      ).rejects.toThrow('Network error');
    });

    it('should parse OAuth error responses', async () => {
      const manager = new OAuthClientManager(mockConfig);

      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({
          error: 'invalid_request',
          error_description: 'Missing required parameter',
        }),
      });

      await expect(
        (manager as any).exchangeCodeForTokens('invalid-code', 'http://localhost:3000', 'code-verifier')
      ).rejects.toThrow(AuthorizationError);
    });
  });
});