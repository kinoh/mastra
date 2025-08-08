import { promises as fs } from 'fs';
import { createHash, createCipher, createDecipher, randomBytes } from 'crypto';
import { dirname } from 'path';
import type { TokenStorage, OAuthTokens } from './oauth-types';

/**
 * File-based token storage with optional encryption
 */
export class FileTokenStorage implements TokenStorage {
  private filePath: string;
  private encryptionKey?: string;

  constructor(filePath: string, encryptionKey?: string) {
    this.filePath = filePath;
    this.encryptionKey = encryptionKey;
  }

  async getTokens(): Promise<OAuthTokens | null> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsed = this.encryptionKey ? this.decrypt(data) : data;
      return JSON.parse(parsed);
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
      const finalData = this.encryptionKey ? this.encrypt(data) : data;
      
      await fs.writeFile(this.filePath, finalData, 'utf8');
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

  private encrypt(data: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not provided');
    }
    
    const algorithm = 'aes-256-cbc';
    const key = createHash('sha256').update(this.encryptionKey).digest();
    const iv = randomBytes(16);
    
    const cipher = createCipher(algorithm, key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(encryptedData: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not provided');
    }
    
    const algorithm = 'aes-256-cbc';
    const key = createHash('sha256').update(this.encryptionKey).digest();
    
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = createDecipher(algorithm, key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
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
 * Secure file-based token storage with automatic cleanup
 */
export class SecureFileTokenStorage extends FileTokenStorage {
  private maxAge: number; // Maximum age in milliseconds
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    filePath: string, 
    encryptionKey?: string,
    options: {
      maxAge?: number; // Default: 30 days
      autoCleanup?: boolean; // Default: true
    } = {}
  ) {
    super(filePath, encryptionKey);
    this.maxAge = options.maxAge || 30 * 24 * 60 * 60 * 1000; // 30 days
    
    if (options.autoCleanup !== false) {
      this.startCleanupTimer();
    }
  }

  async getTokens(): Promise<OAuthTokens | null> {
    const tokens = await super.getTokens();
    
    if (tokens && this.isExpiredByAge(tokens)) {
      await this.clearTokens();
      return null;
    }
    
    return tokens;
  }

  async setTokens(tokens: OAuthTokens): Promise<void> {
    // Add storage timestamp
    const timestampedTokens = {
      ...tokens,
      _stored_at: Date.now(),
    };
    
    await super.setTokens(timestampedTokens as OAuthTokens);
  }

  private isExpiredByAge(tokens: OAuthTokens & { _stored_at?: number }): boolean {
    if (!tokens._stored_at) {
      return false; // No timestamp, assume valid
    }
    
    return Date.now() - tokens._stored_at > this.maxAge;
  }

  private startCleanupTimer(): void {
    // Run cleanup every 6 hours
    this.cleanupInterval = setInterval(async () => {
      try {
        const tokens = await super.getTokens();
        if (tokens && this.isExpiredByAge(tokens as OAuthTokens & { _stored_at?: number })) {
          await this.clearTokens();
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    }, 6 * 60 * 60 * 1000);
  }

  async destroy(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    await this.clearTokens();
  }
}

/**
 * Factory for creating appropriate token storage instances
 */
export class TokenStorageFactory {
  /**
   * Create default token storage for a server
   */
  static createDefault(serverId: string): TokenStorage {
    const os = require('os');
    const path = require('path');
    
    const tokensDir = path.join(os.homedir(), '.mastra', 'tokens');
    const tokenFile = path.join(tokensDir, `${serverId}.json`);
    
    const baseStorage = new SecureFileTokenStorage(tokenFile);
    return new MultiServerTokenStorage(baseStorage, serverId);
  }

  /**
   * Create encrypted token storage for a server
   */
  static createEncrypted(serverId: string, encryptionKey: string): TokenStorage {
    const os = require('os');
    const path = require('path');
    
    const tokensDir = path.join(os.homedir(), '.mastra', 'tokens');
    const tokenFile = path.join(tokensDir, `${serverId}.enc`);
    
    const baseStorage = new SecureFileTokenStorage(tokenFile, encryptionKey);
    return new MultiServerTokenStorage(baseStorage, serverId);
  }

  /**
   * Create custom file-based storage
   */
  static createFile(
    filePath: string, 
    serverId: string,
    options: {
      encrypted?: boolean;
      encryptionKey?: string;
      maxAge?: number;
      autoCleanup?: boolean;
    } = {}
  ): TokenStorage {
    const baseStorage = options.encrypted 
      ? new SecureFileTokenStorage(filePath, options.encryptionKey, {
          maxAge: options.maxAge,
          autoCleanup: options.autoCleanup,
        })
      : new FileTokenStorage(filePath);
      
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