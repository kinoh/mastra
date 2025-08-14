import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { 
  FileTokenStorage, 
  MultiServerTokenStorage, 
  TokenStorageFactory 
} from './token-storage';
import type { OAuthTokens, TokenStorage } from './oauth-types';

// Mock fs for some tests
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    promises: {
      ...((actual as any).promises),
      readFile: vi.fn(),
      writeFile: vi.fn(),
      mkdir: vi.fn(),
      unlink: vi.fn(),
    },
  };
});

describe('FileTokenStorage', () => {
  const mockTokens: OAuthTokens = {
    access_token: 'test-token',
    refresh_token: 'test-refresh',
    token_type: 'Bearer',
    expires_in: 3600,
    issued_at: Date.now(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should store and retrieve tokens', async () => {
    const storage = new FileTokenStorage('/test/path.json');
    const data = {'__tokens': mockTokens};

    (fs.readFile as any).mockResolvedValue(JSON.stringify(data));
    (fs.writeFile as any).mockResolvedValue(undefined);
    (fs.mkdir as any).mockResolvedValue(undefined);

    await storage.setTokens(mockTokens);
    const retrieved = await storage.getTokens();

    expect(fs.writeFile).toHaveBeenCalledWith(
      '/test/path.json',
      JSON.stringify(data, null, 2),
      'utf8'
    );
    expect(retrieved).toEqual(mockTokens);
  });

  it('should return null when file does not exist', async () => {
    const storage = new FileTokenStorage('/test/path.json');
    
    const error = new Error('File not found') as NodeJS.ErrnoException;
    error.code = 'ENOENT';
    (fs.readFile as any).mockRejectedValue(error);

    const result = await storage.getTokens();
    expect(result).toBeNull();
  });

  it('should throw error for other file read errors', async () => {
    const storage = new FileTokenStorage('/test/path.json');
    
    (fs.readFile as any).mockRejectedValue(new Error('Permission denied'));

    await expect(storage.getTokens()).rejects.toThrow('Failed to get item __tokens: Error: Permission denied');
  });

  it('should clear tokens by deleting file', async () => {
    const storage = new FileTokenStorage('/test/path.json');
    
    (fs.unlink as any).mockResolvedValue(undefined);

    await storage.clearTokens();
    expect(fs.unlink).toHaveBeenCalledWith('/test/path.json');
  });

  it('should ignore ENOENT error when clearing non-existent file', async () => {
    const storage = new FileTokenStorage('/test/path.json');
    
    const error = new Error('File not found') as NodeJS.ErrnoException;
    error.code = 'ENOENT';
    (fs.unlink as any).mockRejectedValue(error);

    await storage.clearTokens(); // Should not throw
  });
});

describe('MultiServerTokenStorage', () => {
  let baseStorage: TokenStorage;
  
  beforeEach(() => {
    baseStorage = TokenStorageFactory.createMemory();
  });

  const mockTokens: OAuthTokens = {
    access_token: 'test-token',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  it('should use server-specific token storage through base storage setItem/getItem', async () => {
    const storage = new MultiServerTokenStorage(baseStorage, 'server1', 'client1');

    await storage.setTokens(mockTokens);

    // Test getTokens
    const result = await storage.getTokens();
    expect(result).toEqual(mockTokens);

    // Test clearTokens
    await storage.clearTokens();

    const emptyResult = await storage.getTokens();
    expect(emptyResult).toBeNull();
  });

  it('should separate tokens among server instances', async () => {
    const memory = TokenStorageFactory.createMemory();
    const storage1 = new MultiServerTokenStorage(memory, 'server1', 'client1');
    const storage2 = new MultiServerTokenStorage(memory, 'server2', 'client1');

    const tokens1: OAuthTokens = {
      access_token: 'test-token-1',
      token_type: 'Bearer',
      expires_in: 3600,
    };
    const tokens2: OAuthTokens = {
      access_token: 'test-token-2',
      token_type: 'Bearer',
      expires_in: 3600,
    };

    await storage1.setTokens(tokens1);
    await storage2.setTokens(tokens2);

    const result1 = await storage1.getTokens();
    const result2 = await storage2.getTokens();
    
    expect(result1).toEqual(tokens1);
    expect(result2).toEqual(tokens2);

    await storage1.clearTokens();

    const result3 = await storage1.getTokens();
    const result4 = await storage2.getTokens();
    
    expect(result3).toBeNull();
    expect(result4).toEqual(tokens2);
  });

  it('should separate data items among server instances', async () => {
    const memory = TokenStorageFactory.createMemory();
    const storage1 = new MultiServerTokenStorage(memory, 'server1', 'client1');
    const storage2 = new MultiServerTokenStorage(memory, 'server2', 'client1');

    await storage1.setItem('config', 'server1-config');
    await storage2.setItem('config', 'server2-config');

    const result1 = await storage1.getItem('config');
    const result2 = await storage2.getItem('config');
    
    expect(result1).toBe('server1-config');
    expect(result2).toBe('server2-config');
  });

  it('should separate tokens by mcpClientId', async () => {
    const memory = TokenStorageFactory.createMemory();
    const storageClientA = new MultiServerTokenStorage(memory, 'github', 'client-a');
    const storageClientB = new MultiServerTokenStorage(memory, 'github', 'client-b');

    const tokensA: OAuthTokens = {
      access_token: 'token-a',
      token_type: 'Bearer',
      expires_in: 3600,
    };
    const tokensB: OAuthTokens = {
      access_token: 'token-b',
      token_type: 'Bearer',
      expires_in: 3600,
    };

    await storageClientA.setTokens(tokensA);
    await storageClientB.setTokens(tokensB);

    // Each client should have its own tokens
    const resultA = await storageClientA.getTokens();
    const resultB = await storageClientB.getTokens();
    
    expect(resultA).toEqual(tokensA);
    expect(resultB).toEqual(tokensB);
  });

  it('should separate key-value storage by mcpClientId', async () => {
    const memory = TokenStorageFactory.createMemory();
    const storageClientA = new MultiServerTokenStorage(memory, 'github', 'client-a');  
    const storageClientB = new MultiServerTokenStorage(memory, 'github', 'client-b');

    await storageClientA.setItem('client_information', 'client-a-info');
    await storageClientB.setItem('client_information', 'client-b-info');

    // Each client should have its own stored information
    const resultA = await storageClientA.getItem('client_information');
    const resultB = await storageClientB.getItem('client_information');
    
    expect(resultA).toBe('client-a-info');
    expect(resultB).toBe('client-b-info');
  });

  it('should clear tokens only for specific mcpClientId', async () => {
    const memory = TokenStorageFactory.createMemory();
    const storageClientA = new MultiServerTokenStorage(memory, 'github', 'client-a');
    const storageClientB = new MultiServerTokenStorage(memory, 'github', 'client-b');

    const tokensA: OAuthTokens = {
      access_token: 'token-a',
      token_type: 'Bearer',
      expires_in: 3600,
    };
    const tokensB: OAuthTokens = {
      access_token: 'token-b',
      token_type: 'Bearer',
      expires_in: 3600,
    };

    await storageClientA.setTokens(tokensA);
    await storageClientB.setTokens(tokensB);

    // Clear only client-a's tokens
    await storageClientA.clearTokens();

    // Only client-a's tokens should be cleared
    const resultA = await storageClientA.getTokens();
    const resultB = await storageClientB.getTokens();
    
    expect(resultA).toBeNull();
    expect(resultB).toEqual(tokensB);
  });
});


describe('TokenStorageFactory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock os and path modules
    vi.doMock('os', () => ({
      homedir: () => '/home/user',
    }));
    
    vi.doMock('path', () => ({
      join: (...args: string[]) => args.join('/'),
    }));
  });

  it('should create default storage as MultiServerTokenStorage', () => {
    const storage = TokenStorageFactory.createDefault('/tmp/test.json', 'test-server', 'test-client');
    expect(storage).toBeInstanceOf(MultiServerTokenStorage);
  });


  it('should create memory storage', () => {
    const storage = TokenStorageFactory.createMemory();
    expect(storage).toBeDefined();
    
    // Test basic functionality
    expect(async () => {
      await storage.setTokens({ access_token: 'test', token_type: 'Bearer' });
      const tokens = await storage.getTokens();
      expect(tokens?.access_token).toBe('test');
      await storage.clearTokens();
      const clearedTokens = await storage.getTokens();
      expect(clearedTokens).toBeNull();
    }).not.toThrow();
  });
});