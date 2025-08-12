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
      setItem: vi.fn(),
      getItem: vi.fn(),
    };
  });

  const mockTokens: OAuthTokens = {
    access_token: 'test-token',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  it('should proxy all token operations to base storage', async () => {
    const storage = new MultiServerTokenStorage(baseStorage, 'server1');

    baseStorage.getTokens.mockResolvedValue(mockTokens);
    
    // Test getTokens
    const result = await storage.getTokens();
    expect(result).toEqual(mockTokens);
    expect(baseStorage.getTokens).toHaveBeenCalled();

    // Test setTokens
    await storage.setTokens(mockTokens);
    expect(baseStorage.setTokens).toHaveBeenCalledWith(mockTokens);

    // Test clearTokens
    await storage.clearTokens();
    expect(baseStorage.clearTokens).toHaveBeenCalled();
  });

  it('should proxy setItem/getItem operations to base storage', async () => {
    const storage = new MultiServerTokenStorage(baseStorage, 'server1');

    baseStorage.getItem.mockResolvedValue('test-value');
    
    // Test getItem
    const result = await storage.getItem('test-key');
    expect(result).toBe('test-value');
    expect(baseStorage.getItem).toHaveBeenCalledWith('test-key');

    // Test setItem
    await storage.setItem('test-key', 'test-value');
    expect(baseStorage.setItem).toHaveBeenCalledWith('test-key', 'test-value');
  });

  it('should share tokens across all server instances', async () => {
    const storage1 = new MultiServerTokenStorage(baseStorage, 'server1');
    const storage2 = new MultiServerTokenStorage(baseStorage, 'server2');

    baseStorage.getTokens.mockResolvedValue(mockTokens);

    // Both storages should return the same tokens
    const result1 = await storage1.getTokens();
    const result2 = await storage2.getTokens();
    
    expect(result1).toEqual(mockTokens);
    expect(result2).toEqual(mockTokens);
    expect(baseStorage.getTokens).toHaveBeenCalledTimes(2);
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