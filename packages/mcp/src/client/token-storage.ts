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
    return await this.getItem('__tokens') as OAuthTokens
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    await this.setItem('__tokens', tokens);
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

  async setItem(key: string, value: any): Promise<void> {
    // For FileTokenStorage, we store generic data alongside tokens
    // This implementation stores both tokens and data in the same file structure
    try {
      const currentData = await this.readStorageFile();
      const updatedData = {
        ...currentData,
        [key]: value,
      };
      await this.writeStorageFile(updatedData);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // File doesn't exist, create with just this data item
        await this.writeStorageFile({ [key]: value });
      } else {
        throw new Error(`Failed to set item ${key}: ${error}`);
      }
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const data = await this.readStorageFile();
      return data[key] || null;
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
 * Shared token storage across all servers - provides simple proxy to base storage
 */
export class MultiServerTokenStorage implements TokenStorage {
  private baseStorage: TokenStorage;
  private serverId: string;

  constructor(baseStorage: TokenStorage, serverId: string) {
    this.baseStorage = baseStorage;
    this.serverId = serverId;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    const tokensJson = await this.baseStorage.getItem(`tokens__${this.serverId}`);
    if (!tokensJson) {
      return null;
    }
    try {
      return JSON.parse(tokensJson);
    } catch (error) {
      throw new Error(`Failed to parse tokens for server ${this.serverId}: ${error}`);
    }
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    const tokensJson = JSON.stringify(tokens);
    await this.baseStorage.setItem(`tokens__${this.serverId}`, tokensJson);
  }

  async clearTokens(): Promise<void> {
    await this.baseStorage.setItem(`tokens__${this.serverId}`, '');
  }

  async setItem(key: string, value: string): Promise<void> {
    return this.baseStorage.setItem(`${this.serverId}__${key}`, value);
  }

  async getItem(key: string): Promise<string | null> {
    return this.baseStorage.getItem(`${this.serverId}__${key}`);
  }
}



/**
 * Factory for creating appropriate token storage instances
 */
export class TokenStorageFactory {
  /**
   * Create default token storage that shares tokens across all servers
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