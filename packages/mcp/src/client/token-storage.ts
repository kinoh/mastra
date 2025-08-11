import { promises as fs } from 'fs';
import { dirname } from 'path';
import type { TokenStorage, OAuthTokens } from './oauth-types';

/**
 * Simple file-based token storage
 */
export class FileTokenStorage implements TokenStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return null; // File doesn't exist
      }
      throw new Error(`Failed to read tokens: ${error}`);
    }
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    try {
      // Ensure directory exists
      await fs.mkdir(dirname(this.filePath), { recursive: true });
      
      const data = JSON.stringify(tokens, null, 2);
      
      await fs.writeFile(this.filePath, data, 'utf8');
    } catch (error) {
      throw new Error(`Failed to write tokens: ${error}`);
    }
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

}

/**
 * Multi-server token storage that isolates tokens per server
 */
export class MultiServerTokenStorage implements TokenStorage {
  private baseStorage: TokenStorage;
  private serverId: string;

  constructor(baseStorage: TokenStorage, serverId: string) {
    this.baseStorage = baseStorage;
    this.serverId = serverId;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    const allTokens = await this.getAllTokens();
    return allTokens[this.serverId] || null;
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    const allTokens = await this.getAllTokens();
    allTokens[this.serverId] = tokens;
    await this.setAllTokens(allTokens);
  }

  async clearTokens(): Promise<void> {
    const allTokens = await this.getAllTokens();
    delete allTokens[this.serverId];
    await this.setAllTokens(allTokens);
  }

  private async getAllTokens(): Promise<Record<string, OAuthTokens>> {
    const stored = await this.baseStorage.getTokens();
    if (!stored) {
      return {};
    }
    
    // Check if stored data is multi-server format
    if (stored.access_token) {
      // Legacy single-server format, migrate to multi-server
      return { [this.serverId]: stored };
    }
    
    // Multi-server format
    return stored as unknown as Record<string, OAuthTokens>;
  }

  private async setAllTokens(allTokens: Record<string, OAuthTokens>): Promise<void> {
    await this.baseStorage.setTokens(allTokens as unknown as OAuthTokens);
  }
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

      async getTokens(): Promise<OAuthTokens | null> {
        return this.tokens;
      }

      async setTokens(tokens: OAuthTokens): Promise<void> {
        this.tokens = tokens;
      }

      async clearTokens(): Promise<void> {
        this.tokens = null;
      }
    })();
  }
}