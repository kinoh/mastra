import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { OAuthTokens } from './oauth-types';
import { 
  FileTokenStorage, 
  MCPClientTokenStorage, 
  TokenStorageFactory 
} from './token-storage';

describe('FileTokenStorage', () => {
  let tempDir: string;
  let tempFile: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(join(tmpdir(), 'token-test-'));
    tempFile = join(tempDir, 'tokens.json');
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should read hierarchical data structure', async () => {
    const mockData = {
      'client-a': {
        tokens: { github: { access_token: 'token-a', token_type: 'bearer' } },
        data: { github: { client_information: 'info-a' } }
      }
    };

    // Write test data to file
    await fs.writeFile(tempFile, JSON.stringify(mockData), 'utf8');

    const storage = new FileTokenStorage(tempFile);
    const result = await storage.readData();
    expect(result).toEqual(mockData);
  });

  it('should return empty object when file does not exist', async () => {
    const nonExistentFile = join(tempDir, 'nonexistent.json');
    const storage = new FileTokenStorage(nonExistentFile);

    const result = await storage.readData();
    expect(result).toEqual({});
  });

  it('should write hierarchical data structure', async () => {
    const mockData = {
      'client-a': {
        tokens: { github: { access_token: 'token-a', token_type: 'bearer' } },
        data: { github: { client_information: 'info-a' } }
      }
    };

    const storage = new FileTokenStorage(tempFile);
    await storage.writeData(mockData);

    // Verify data was written correctly
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual(mockData);
  });

  it('should clear storage by deleting file', async () => {
    const mockData = { 'client-a': { tokens: {}, data: {} } };
    await fs.writeFile(tempFile, JSON.stringify(mockData), 'utf8');

    const storage = new FileTokenStorage(tempFile);
    await storage.clear();

    // Verify file was deleted
    try {
      await fs.access(tempFile);
      expect.fail('File should have been deleted');
    } catch (error: any) {
      expect(error.code).toBe('ENOENT');
    }
  });

  it('should ignore ENOENT error when clearing non-existent file', async () => {
    const nonExistentFile = join(tempDir, 'nonexistent.json');
    const storage = new FileTokenStorage(nonExistentFile);

    // Should not throw
    await storage.clear();
  });
});

describe('MCPClientTokenStorage', () => {
  let tempDir: string;
  let tempFile: string;
  let fileStorage: FileTokenStorage;
  
  beforeEach(async () => {
    tempDir = await fs.mkdtemp(join(tmpdir(), 'token-test-'));
    tempFile = join(tempDir, 'tokens.json');
    fileStorage = new FileTokenStorage(tempFile);
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  const mockTokens: OAuthTokens = {
    access_token: 'test-token',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  it('should use hierarchical token storage for MCP clients', async () => {
    const storage = new MCPClientTokenStorage(fileStorage, 'server1', 'client1');

    // Set tokens
    await storage.setTokens(mockTokens);

    // Verify tokens can be retrieved
    const result = await storage.getTokens();
    expect(result).toEqual(mockTokens);

    // Verify the hierarchical structure in file
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client1': {
        tokens: { 'server1': mockTokens },
        data: {} // data is initialized empty, serverId entries created on setItem()
      }
    });

    // Test clearTokens
    await storage.clearTokens();

    const emptyResult = await storage.getTokens();
    expect(emptyResult).toBeNull();

    // Verify tokens were cleared in file
    const clearedContent = await fs.readFile(tempFile, 'utf8');
    const clearedData = JSON.parse(clearedContent);
    expect(clearedData).toEqual({
      'client1': {
        tokens: {}, // empty tokens after clearing
        data: {} // data remains as initialized
      }
    });
  });

  it('should separate tokens among server instances', async () => {
    const storage1 = TokenStorageFactory.createDefault(tempFile, 'server1', 'client1');
    const storage2 = TokenStorageFactory.createDefault(tempFile, 'server2', 'client1');

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

    // Set tokens for both servers
    await storage1.setTokens(tokens1);
    await storage2.setTokens(tokens2);

    // Verify both can retrieve their own tokens
    const result1 = await storage1.getTokens();
    const result2 = await storage2.getTokens();
    
    expect(result1).toEqual(tokens1);
    expect(result2).toEqual(tokens2);

    // Verify file structure contains both
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client1': {
        tokens: { 
          'server1': tokens1,
          'server2': tokens2 
        },
        data: {} // data initialized empty by setTokens()
      }
    });

    // Clear only server1 tokens
    await storage1.clearTokens();

    // Verify server1 tokens are gone but server2 remain
    const result3 = await storage1.getTokens();
    const result4 = await storage2.getTokens();
    
    expect(result3).toBeNull();
    expect(result4).toEqual(tokens2);

    // Verify file structure after clear
    const clearedContent = await fs.readFile(tempFile, 'utf8');
    const clearedData = JSON.parse(clearedContent);
    expect(clearedData).toEqual({
      'client1': {
        tokens: { 
          'server2': tokens2  // only server2 tokens remain
        },
        data: {} // data remains as initialized
      }
    });
  });

  it('should separate data items among server instances', async () => {
    const storage1 = TokenStorageFactory.createDefault(tempFile, 'server1', 'client1');
    const storage2 = TokenStorageFactory.createDefault(tempFile, 'server2', 'client1');

    // Set data items for both servers
    await storage1.setItem('config', 'server1-config');
    await storage2.setItem('config', 'server2-config');

    // Verify both can retrieve their own data
    const result1 = await storage1.getItem('config');
    const result2 = await storage2.getItem('config');
    
    expect(result1).toBe('server1-config');
    expect(result2).toBe('server2-config');

    // Verify file structure
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client1': {
        tokens: {},
        data: {
          'server1': { 'config': 'server1-config' },
          'server2': { 'config': 'server2-config' }
        }
      }
    });
  });

  it('should separate tokens by mcpClientId', async () => {
    const storageClientA = TokenStorageFactory.createDefault(tempFile, 'github', 'client-a');
    const storageClientB = TokenStorageFactory.createDefault(tempFile, 'github', 'client-b');

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

    // Set tokens for both clients
    await storageClientA.setTokens(tokensA);
    await storageClientB.setTokens(tokensB);

    // Each client should have its own tokens
    const resultA = await storageClientA.getTokens();
    const resultB = await storageClientB.getTokens();
    
    expect(resultA).toEqual(tokensA);
    expect(resultB).toEqual(tokensB);

    // Verify file structure separates clients
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client-a': {
        tokens: { 'github': tokensA },
        data: {} // data initialized empty by setTokens()
      },
      'client-b': {
        tokens: { 'github': tokensB },
        data: {} // data initialized empty by setTokens()
      }
    });
  });

  it('should separate key-value storage by mcpClientId', async () => {
    const storageClientA = TokenStorageFactory.createDefault(tempFile, 'github', 'client-a');  
    const storageClientB = TokenStorageFactory.createDefault(tempFile, 'github', 'client-b');

    // Set data for both clients
    await storageClientA.setItem('client_information', 'client-a-info');
    await storageClientB.setItem('client_information', 'client-b-info');

    // Each client should have its own stored information
    const resultA = await storageClientA.getItem('client_information');
    const resultB = await storageClientB.getItem('client_information');
    
    expect(resultA).toBe('client-a-info');
    expect(resultB).toBe('client-b-info');

    // Verify file structure separates client data
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client-a': {
        tokens: {},
        data: { 'github': { 'client_information': 'client-a-info' } }
      },
      'client-b': {
        tokens: {},
        data: { 'github': { 'client_information': 'client-b-info' } }
      }
    });
  });

  it('should clear tokens only for specific mcpClientId', async () => {
    const storageClientA = TokenStorageFactory.createDefault(tempFile, 'github', 'client-a');
    const storageClientB = TokenStorageFactory.createDefault(tempFile, 'github', 'client-b');

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

    // Set tokens for both clients
    await storageClientA.setTokens(tokensA);
    await storageClientB.setTokens(tokensB);

    // Verify both have tokens initially
    let resultA = await storageClientA.getTokens();
    let resultB = await storageClientB.getTokens();
    expect(resultA).toEqual(tokensA);
    expect(resultB).toEqual(tokensB);

    // Clear only client-a's tokens
    await storageClientA.clearTokens();

    // Only client-a's tokens should be cleared
    resultA = await storageClientA.getTokens();
    resultB = await storageClientB.getTokens();
    
    expect(resultA).toBeNull();
    expect(resultB).toEqual(tokensB);

    // Verify file structure after clear
    const fileContent = await fs.readFile(tempFile, 'utf8');
    const parsedData = JSON.parse(fileContent);
    expect(parsedData).toEqual({
      'client-a': {
        tokens: {},  // client-a's tokens cleared
        data: {} // data remains as initialized
      },
      'client-b': {
        tokens: { 'github': tokensB },  // client-b's tokens remain
        data: {} // data remains as initialized
      }
    });
  });
});


describe('TokenStorageFactory', () => {
  let tempDir: string;
  let tempFile: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(join(tmpdir(), 'token-test-'));
    tempFile = join(tempDir, 'tokens.json');
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should create default storage as MCPClientTokenStorage', () => {
    const storage = TokenStorageFactory.createDefault(tempFile, 'test-server', 'test-client');
    expect(storage).toBeInstanceOf(MCPClientTokenStorage);
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