import { promises as fs } from 'fs';
import { dirname } from 'path';
import type { TokenStorage, OAuthTokens } from './oauth-types';

/**
 * Simple file-based token storage with generic key-value support
 */
export class FileTokenStorage implements TokenStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    try {
      const data = await this.readStorageFile();
      
      // Check if it's legacy format (direct tokens object)
      if (data.access_token) {
        return data as OAuthTokens;
      }
      
      // New format - should not happen for FileTokenStorage directly
      return data as OAuthTokens;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null; // File doesn't exist
      }
      throw new Error(`Failed to read tokens: ${error}`);
    }
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    await this.writeStorageFile(tokens);
  }

  async clearTokens(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw new Error(`Failed to clear tokens: ${error}`);
      }
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    // For FileTokenStorage, we store generic data alongside tokens
    // This implementation stores both tokens and data in the same file structure
    try {
      const currentData = await this.readStorageFile();
      const updatedData = {
        ...currentData,
        [`_data_${key}`]: value // Prefix to avoid conflicts with token fields
      };
      await this.writeStorageFile(updatedData);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // File doesn't exist, create with just this data item
        await this.writeStorageFile({ [`_data_${key}`]: value });
      } else {
        throw new Error(`Failed to set item ${key}: ${error}`);
      }
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const data = await this.readStorageFile();
      return data[`_data_${key}`] || null;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null; // File doesn't exist
      }
      throw new Error(`Failed to get item ${key}: ${error}`);
    }
  }

  private async readStorageFile(): Promise<any> {
    const data = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  private async writeStorageFile(data: any): Promise<void> {
    try {
      // Ensure directory exists
      await fs.mkdir(dirname(this.filePath), { recursive: true });
      
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf8');
    } catch (error) {
      throw new Error(`Failed to write storage file: ${error}`);
    }
  }

}

/**
 * Multi-server token storage that isolates tokens and data per server
 */
export class MultiServerTokenStorage implements TokenStorage {
  private baseStorage: TokenStorage;
  private serverId: string;

  constructor(baseStorage: TokenStorage, serverId: string) {
    this.baseStorage = baseStorage;
    this.serverId = serverId;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    const allData = await this.getAllData();
    return allData.servers?.[this.serverId]?.tokens || null;
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    const allData = await this.getAllData();
    if (!allData.servers) {
      allData.servers = {};
    }
    if (!allData.servers[this.serverId]) {
      allData.servers[this.serverId] = {};
    }
    const serverData = allData.servers[this.serverId];
    if (serverData) {
      serverData.tokens = tokens;
    }
    await this.setAllData(allData);
  }

  async clearTokens(): Promise<void> {
    const allData = await this.getAllData();
    const serverData = allData.servers?.[this.serverId];
    if (serverData) {
      delete serverData.tokens;
      // If no data left for this server, remove the server entry
      if (Object.keys(serverData).length === 0) {
        delete allData.servers[this.serverId];
      }
    }
    await this.setAllData(allData);
  }

  async setItem(key: string, value: string): Promise<void> {
    const allData = await this.getAllData();
    if (!allData.servers) {
      allData.servers = {};
    }
    if (!allData.servers[this.serverId]) {
      allData.servers[this.serverId] = {};
    }
    const serverData = allData.servers[this.serverId];
    if (serverData) {
      if (!serverData.data) {
        serverData.data = {};
      }
      serverData.data[key] = value;
    }
    await this.setAllData(allData);
  }

  async getItem(key: string): Promise<string | null> {
    const allData = await this.getAllData();
    return allData.servers?.[this.serverId]?.data?.[key] || null;
  }

  private async getAllData(): Promise<MultiServerData> {
    const stored = await this.baseStorage.getTokens();
    if (!stored) {
      return { servers: {} };
    }
    
    // Check if stored data is legacy format (direct tokens object)
    if (stored.access_token) {
      // Legacy single-server format, migrate to multi-server
      return {
        servers: {
          [this.serverId]: {
            tokens: stored
          }
        }
      };
    }
    
    // Check if it's old multi-server format (flat server structure)
    if (typeof stored === 'object' && !('servers' in stored)) {
      // Old multi-server format: { serverId: tokens, ... }
      const servers: Record<string, any> = {};
      for (const [id, tokens] of Object.entries(stored)) {
        if (typeof tokens === 'object' && tokens && 'access_token' in tokens) {
          servers[id] = { tokens };
        }
      }
      return { servers };
    }
    
    // New multi-server format
    return stored as unknown as MultiServerData;
  }

  private async setAllData(allData: MultiServerData): Promise<void> {
    await this.baseStorage.setTokens(allData as unknown as OAuthTokens);
  }
}

/**
 * Data structure for multi-server storage
 */
interface MultiServerData {
  servers: Record<string, {
    tokens?: OAuthTokens;
    data?: Record<string, string>;
  }>;
}


/**
 * Factory for creating appropriate token storage instances
 */
export class TokenStorageFactory {
  /**
   * Create default token storage for a server
   */
  static createDefault(filePath: string, serverId: string): TokenStorage {
    const baseStorage = new FileTokenStorage(filePath);
    return new MultiServerTokenStorage(baseStorage, serverId);
  }



  /**
   * Create memory-only storage (for testing)
   */
  static createMemory(): TokenStorage {
    return new (class implements TokenStorage {
      private tokens: OAuthTokens | null = null;
      private data: Record<string, string> = {};

      async getTokens(): Promise<OAuthTokens | null> {
        return this.tokens;
      }

      async setTokens(tokens: OAuthTokens): Promise<void> {
        this.tokens = tokens;
      }

      async clearTokens(): Promise<void> {
        this.tokens = null;
      }

      async setItem(key: string, value: string): Promise<void> {
        this.data[key] = value;
      }

      async getItem(key: string): Promise<string | null> {
        return this.data[key] || null;
      }
    })();
  }
}