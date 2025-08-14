import { promises as fs } from 'fs';
import { dirname } from 'path';
import type { TokenStorage, OAuthTokens } from './oauth-types';

/**
 * Hierarchical storage structure for MCP client data
 */
interface ClientStorageData {
  [clientId: string]: {
    tokens: {
      [serverId: string]: OAuthTokens;
    };
    data: {
      [serverId: string]: {
        [key: string]: string;
      };
    };
  };
}

/**
 * Simple file-based storage for hierarchical MCP client data
 */
export class FileTokenStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async readData(): Promise<ClientStorageData> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {}; // File doesn't exist, return empty structure
      }
      throw new Error(`Failed to read storage file: ${error}`);
    }
  }

  async writeData(data: ClientStorageData): Promise<void> {
    try {
      // Ensure directory exists
      await fs.mkdir(dirname(this.filePath), { recursive: true });
      
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf8');
    } catch (error) {
      throw new Error(`Failed to write storage file: ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw new Error(`Failed to clear storage file: ${error}`);
      }
    }
  }
}

/**
 * MCP Client token storage - manages hierarchical storage for MCP clients
 * Provides isolation between different MCPClient instances and their servers
 */
export class MCPClientTokenStorage implements TokenStorage {
  private fileStorage: FileTokenStorage;
  private serverId: string;
  private mcpClientId: string;

  constructor(fileStorage: FileTokenStorage, serverId: string, mcpClientId: string) {
    this.fileStorage = fileStorage;
    this.serverId = serverId;
    this.mcpClientId = mcpClientId;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    const data = await this.fileStorage.readData();
    return data[this.mcpClientId]?.tokens?.[this.serverId] || null;
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    const data = await this.fileStorage.readData();
    
    (data[this.mcpClientId] ??= { tokens: {}, data: {} })
      .tokens[this.serverId] = tokens;

    await this.fileStorage.writeData(data);
  }

  async clearTokens(): Promise<void> {
    const data = await this.fileStorage.readData();
    const clientData = data[this.mcpClientId];

    if (clientData?.tokens?.[this.serverId]) {
      delete clientData.tokens[this.serverId];
      await this.fileStorage.writeData(data);
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    const data = await this.fileStorage.readData();
    
    (
      (data[this.mcpClientId] ??= { tokens: {}, data: {} })
      .data[this.serverId] ??= {}
    )[key] = value;

    await this.fileStorage.writeData(data);
  }

  async getItem(key: string): Promise<string | null> {
    const data = await this.fileStorage.readData();
    return data[this.mcpClientId]?.data?.[this.serverId]?.[key] || null;
  }
}

/**
 * Factory for creating MCP Client token storage instances
 */
export class TokenStorageFactory {
  /**
   * Create default hierarchical token storage for MCP clients
   */
  static createDefault(filePath: string, serverId: string, mcpClientId: string): TokenStorage {
    const fileStorage = new FileTokenStorage(filePath);
    return new MCPClientTokenStorage(fileStorage, serverId, mcpClientId);
  }

  /**
   * Create memory-only storage (for testing)
   */
  static createMemory(): TokenStorage {
    // For memory storage, we simulate single client behavior
    const clientId = 'memory-client';
    const serverId = 'memory-server';

    return new (class implements TokenStorage {
      private storageData: ClientStorageData = {};

      async getTokens(): Promise<OAuthTokens | null> {
        return this.storageData[clientId]?.tokens?.[serverId] || null;
      }

      async setTokens(tokens: OAuthTokens): Promise<void> {
        if (!this.storageData[clientId]) {
          this.storageData[clientId] = { tokens: {}, data: {} };
        }
        this.storageData[clientId].tokens[serverId] = tokens;
      }

      async clearTokens(): Promise<void> {
        if (this.storageData[clientId]?.tokens?.[serverId]) {
          delete this.storageData[clientId].tokens[serverId];
        }
      }

      async setItem(key: string, value: string): Promise<void> {
        if (!this.storageData[clientId]) {
          this.storageData[clientId] = { tokens: {}, data: {} };
        }
        if (!this.storageData[clientId].data[serverId]) {
          this.storageData[clientId].data[serverId] = {};
        }
        this.storageData[clientId].data[serverId][key] = value;
      }

      async getItem(key: string): Promise<string | null> {
        return this.storageData[clientId]?.data?.[serverId]?.[key] || null;
      }
    })();
  }
}