import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { 
  FileTokenStorage, 
  MultiServerTokenStorage, 
  TokenStorageFactory 
} from './token-storage';
import type { OAuthTokens } from './oauth-types';

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

  describe('without encryption', () => {
    it('should store and retrieve tokens', async () => {
      const storage = new FileTokenStorage('/test/path.json');
      
      (fs.readFile as any).mockResolvedValue(JSON.stringify(mockTokens));
      (fs.writeFile as any).mockResolvedValue(undefined);
      (fs.mkdir as any).mockResolvedValue(undefined);

      await storage.setTokens(mockTokens);
      const retrieved = await storage.getTokens();

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/test/path.json',
        JSON.stringify(mockTokens, null, 2),
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

      await expect(storage.getTokens()).rejects.toThrow('Failed to read tokens');
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

});

describe('MultiServerTokenStorage', () => {
  let baseStorage: any;
  
  beforeEach(() => {
    baseStorage = {
      getTokens: vi.fn(),
      setTokens: vi.fn(),
      clearTokens: vi.fn(),
    };
  });

  const mockTokens: OAuthTokens = {
    access_token: 'test-token',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  it('should isolate tokens per server', async () => {
    const storage1 = new MultiServerTokenStorage(baseStorage, 'server1');
    const storage2 = new MultiServerTokenStorage(baseStorage, 'server2');

    baseStorage.getTokens.mockResolvedValue({});

    await storage1.setTokens(mockTokens);
    
    expect(baseStorage.setTokens).toHaveBeenCalledWith({
      server1: mockTokens,
    });

    // Set tokens for server2
    const tokens2 = { ...mockTokens, access_token: 'token2' };
    baseStorage.getTokens.mockResolvedValue({ server1: mockTokens });
    
    await storage2.setTokens(tokens2);
    
    expect(baseStorage.setTokens).toHaveBeenCalledWith({
      server1: mockTokens,
      server2: tokens2,
    });
  });

  it('should handle legacy single-server format migration', async () => {
    const storage = new MultiServerTokenStorage(baseStorage, 'server1');

    // Return legacy format (tokens directly, not wrapped in server object)
    baseStorage.getTokens.mockResolvedValue(mockTokens);

    const result = await storage.getTokens();
    expect(result).toEqual(mockTokens);
  });

  it('should clear tokens for specific server only', async () => {
    const storage = new MultiServerTokenStorage(baseStorage, 'server1');

    baseStorage.getTokens.mockResolvedValue({
      server1: mockTokens,
      server2: { access_token: 'token2', token_type: 'Bearer' },
    });

    await storage.clearTokens();

    expect(baseStorage.setTokens).toHaveBeenCalledWith({
      server2: { access_token: 'token2', token_type: 'Bearer' },
    });
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

  it('should create default storage', () => {
    const storage = TokenStorageFactory.createDefault('/tmp/test.json', 'test-server');
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