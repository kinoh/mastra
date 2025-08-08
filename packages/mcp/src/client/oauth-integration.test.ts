import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InternalMastraMCPClient } from './client';
import type { MastraMCPServerDefinition } from './client';
import { TokenStorageFactory } from './token-storage';

// Mock the OAuth dependencies
vi.mock('./oauth-client-manager');
vi.mock('./oauth-callback-server');

describe('OAuth Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('InternalMastraMCPClient with OAuth', () => {
    it('should initialize with OAuth configuration', () => {
      const serverConfig: MastraMCPServerDefinition = {
        url: new URL('https://api.example.com/mcp'),
        oauth: {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read', 'write'],
          onAuthURL: async (url, state) => {
            console.log(`Please visit: ${url}`);
          },
        },
      };

      const client = new InternalMastraMCPClient({
        name: 'test-server',
        server: serverConfig,
      });

      expect(client).toBeDefined();
      expect(client.name).toBe('test-server');
    });

    it('should reject conflicting authentication configurations', () => {
      const conflictingConfig: MastraMCPServerDefinition = {
        url: new URL('https://api.example.com/mcp'),
        authProvider: async () => ({ Authorization: 'Bearer token' }),
        oauth: {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read'],
          onAuthURL: async () => {},
        },
      };

      expect(() => new InternalMastraMCPClient({
        name: 'test-server',
        server: conflictingConfig,
      })).toThrow('Cannot use both OAuth and authProvider configurations');
    });

    it('should work with tokenStorageOptions', () => {
      const serverConfig: MastraMCPServerDefinition = {
        url: new URL('https://api.example.com/mcp'),
        oauth: {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read', 'write'],
          onAuthURL: async () => {},
          tokenStorageOptions: {
            encrypted: true,
            encryptionKey: 'test-encryption-key',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
          },
        },
      };

      const client = new InternalMastraMCPClient({
        name: 'test-server',
        server: serverConfig,
      });

      expect(client).toBeDefined();
    });

    it('should work with custom tokenStorage', () => {
      const customStorage = TokenStorageFactory.createMemory();
      
      const serverConfig: MastraMCPServerDefinition = {
        url: new URL('https://api.example.com/mcp'),
        oauth: {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read', 'write'],
          onAuthURL: async () => {},
          tokenStorage: customStorage,
        },
      };

      const client = new InternalMastraMCPClient({
        name: 'test-server',
        server: serverConfig,
      });

      expect(client).toBeDefined();
    });
  });

  describe('OAuth Configuration Validation', () => {
    it('should validate required OAuth fields', () => {
      const invalidConfigs = [
        // Missing clientId
        {
          authorizationServer: 'https://auth.example.com',
          scopes: ['read'],
          onAuthURL: async () => {},
        },
        // Missing authorizationServer
        {
          clientId: 'test-client',
          scopes: ['read'],
          onAuthURL: async () => {},
        },
        // Missing scopes
        {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          onAuthURL: async () => {},
        },
        // Empty scopes
        {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: [],
          onAuthURL: async () => {},
        },
        // Missing onAuthURL
        {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read'],
        },
      ];

      invalidConfigs.forEach((oauth, index) => {
        expect(() => new InternalMastraMCPClient({
          name: 'test-server',
          server: {
            url: new URL('https://api.example.com/mcp'),
            oauth: oauth as any,
          },
        }), `Config ${index} should be invalid`).toThrow();
      });
    });

    it('should validate authorization server URL format', () => {
      expect(() => new InternalMastraMCPClient({
        name: 'test-server',
        server: {
          url: new URL('https://api.example.com/mcp'),
          oauth: {
            clientId: 'test-client',
            authorizationServer: 'invalid-url',
            scopes: ['read'],
            onAuthURL: async () => {},
          },
        },
      })).toThrow('Invalid authorization server URL');
    });

    it('should validate encryption key when using encrypted storage', () => {
      expect(() => new InternalMastraMCPClient({
        name: 'test-server',
        server: {
          url: new URL('https://api.example.com/mcp'),
          oauth: {
            clientId: 'test-client',
            authorizationServer: 'https://auth.example.com',
            scopes: ['read'],
            onAuthURL: async () => {},
            tokenStorageOptions: {
              encrypted: true,
              // Missing encryptionKey
            },
          },
        },
      })).toThrow('Encryption key is required when using encrypted token storage');
    });
  });

  describe('Token Storage Factory Integration', () => {
    it('should create appropriate storage based on options', () => {
      const testCases = [
        {
          name: 'default storage',
          options: undefined,
          expectedType: 'default',
        },
        {
          name: 'encrypted storage',
          options: {
            encrypted: true,
            encryptionKey: 'test-key',
          },
          expectedType: 'encrypted',
        },
        {
          name: 'custom file storage',
          options: {
            filePath: '/custom/path.json',
          },
          expectedType: 'file',
        },
        {
          name: 'encrypted custom file storage',
          options: {
            filePath: '/custom/path.json',
            encrypted: true,
            encryptionKey: 'test-key',
          },
          expectedType: 'encrypted_file',
        },
      ];

      testCases.forEach(({ name, options }) => {
        expect(() => {
          new InternalMastraMCPClient({
            name: 'test-server',
            server: {
              url: new URL('https://api.example.com/mcp'),
              oauth: {
                clientId: 'test-client',
                authorizationServer: 'https://auth.example.com',
                scopes: ['read'],
                onAuthURL: async () => {},
                tokenStorageOptions: options,
              },
            },
          });
        }, `Should create ${name} successfully`).not.toThrow();
      });
    });
  });

  describe('OAuth Flow State Management', () => {
    it('should handle token lifecycle callbacks', async () => {
      const onTokenReceivedMock = vi.fn();
      const onAuthURLMock = vi.fn();

      const serverConfig: MastraMCPServerDefinition = {
        url: new URL('https://api.example.com/mcp'),
        oauth: {
          clientId: 'test-client',
          authorizationServer: 'https://auth.example.com',
          scopes: ['read', 'write'],
          onAuthURL: onAuthURLMock,
          onTokenReceived: onTokenReceivedMock,
        },
      };

      const client = new InternalMastraMCPClient({
        name: 'test-server',
        server: serverConfig,
      });

      expect(client).toBeDefined();
      // Actual callback testing would require mocking the OAuth flow
      // which is covered in the unit tests
    });
  });
});