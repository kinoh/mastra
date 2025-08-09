import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { OAuthCallbackServer, type CallbackServerConfig } from './oauth-callback-server';
import { AuthorizationError } from './oauth-types';

describe('OAuthCallbackServer', () => {
  let server: OAuthCallbackServer;

  beforeEach(async () => {
    server = new OAuthCallbackServer({ port: 30000 });
  });

  afterEach(async () => {
    if (server) {
      await server.stop();
    }
  });

  describe('server lifecycle', () => {
    it('should start and stop server', async () => {
      const { url } = await server.start();
      expect(url).toBe('http://localhost:30000/oauth/callback');
      
      await server.stop();
    });

    it('should generate different ports for concurrent servers', async () => {
      const server1 = new OAuthCallbackServer({ port: 30001 });
      const server2 = new OAuthCallbackServer({ port: 30002 });
      
      try {
        const { url: url1 } = await server1.start();
        const { url: url2 } = await server2.start();
        
        expect(url1).not.toEqual(url2);
      } finally {
        await server1.stop();
        await server2.stop();
      }
    });

    it('should throw error when starting already running server', async () => {
      await server.start();
      
      await expect(server.start()).rejects.toThrow('Callback server is already running');
    });

    it('should handle multiple stop calls gracefully', async () => {
      await server.start();
      await server.stop();
      await server.stop(); // Should not throw
    });
  });

  describe('callback handling', () => {
    it('should handle valid OAuth callback', async () => {
      const { url: callbackUrl, promise: callbackPromise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);

      // Simulate OAuth callback
      const response = await fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state`);
      
      expect(response.ok).toBe(true);
      expect(response.headers.get('content-type')).toMatch(/text\/html/);
      
      const result = await callbackPromise;
      expect(result).toEqual({
        code: 'test-code',
        state: 'test-state',
        additionalParams: undefined,
      });
    });

    it('should handle OAuth callback with additional parameters', async () => {
      const { url: callbackUrl, promise: callbackPromise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state&custom=value`);
      expect(response.ok).toBe(true);
      
      const result = await callbackPromise;
      expect(result).toEqual({
        code: 'test-code',
        state: 'test-state',
        additionalParams: {
          custom: 'value',
        },
      });
    });

    it('should handle OAuth error callback', async () => {
      const errorServer = new OAuthCallbackServer({ port: 30006 });
      
      try {
        const { url: callbackUrl, promise: callbackPromise } = await errorServer.start();
        
        const response = await fetch(`${callbackUrl}?error=access_denied&error_description=User+denied`);

        expect(response.status).toBe(400);
        
        await expect(callbackPromise).rejects.toThrow(AuthorizationError);
      } finally {
        await errorServer.stop();
      }
    });

    it('should reject callback with missing code', async () => {
      const { url: callbackUrl, promise: callbackPromise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);

      const response = await fetch(`http://localhost:${port}/oauth/callback?state=test-state`);

      expect(response.status).toBe(400);

      await expect(callbackPromise).rejects.toThrow(AuthorizationError);
    });

    it('should reject callback with missing state', async () => {
      const { url: callbackUrl, promise: callbackPromise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/oauth/callback?code=test-code`);

      expect(response.status).toBe(400);

      await expect(callbackPromise).rejects.toThrow(AuthorizationError);
    });

    it('should reject non-GET requests', async () => {
      const { url: callbackUrl, promise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/oauth/callback`, {
        method: 'POST',
      });
      expect(response.status).toBe(405);

      await expect(promise).rejects.toThrow();
    });

    it('should reject requests to wrong path', async () => {
      const { url: callbackUrl, promise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/wrong/path`);
      expect(response.status).toBe(404);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('timeout handling', () => {
    it('should timeout if no callback received', async () => {
      const shortTimeoutServer = new OAuthCallbackServer({ port: 30003, timeout: 100 });
      
      try {
        const { promise: callbackPromise } = await shortTimeoutServer.start();
        
        await expect(callbackPromise).rejects.toThrow('OAuth callback timeout');
      } finally {
        await shortTimeoutServer.stop();
      }
    });

    it('should not timeout if callback received in time', async () => {
      const shortTimeoutServer = new OAuthCallbackServer({ port: 30004, timeout: 1000 });
      
      try {
        const { url: callbackUrl, promise: callbackPromise } = await shortTimeoutServer.start();
        const url = new URL(callbackUrl);
        const port = parseInt(url.port);
        
        // Send callback quickly
        setTimeout(async () => {
          await fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state`);
        }, 10);
        
        const result = await callbackPromise;
        expect(result.code).toBe('test-code');
      } finally {
        await shortTimeoutServer.stop();
      }
    });
  });

  describe('configuration', () => {
    it('should use custom port', async () => {
      const customServer = new OAuthCallbackServer({ port: 9999 });
      
      try {
        const { url: callbackUrl } = await customServer.start();
        expect(callbackUrl).toBe('http://localhost:9999/oauth/callback');
      } finally {
        await customServer.stop();
      }
    });

    it('should use custom host', async () => {
      const customServer = new OAuthCallbackServer({ port: 30005, host: '127.0.0.1' });
      
      try {
        const { url: callbackUrl } = await customServer.start();
        expect(callbackUrl).toBe('http://127.0.0.1:30005/oauth/callback');
      } finally {
        await customServer.stop();
      }
    });
  });

  describe('HTML responses', () => {
    it('should return success HTML for valid callback', async () => {
      const { url: callbackUrl, promise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state`);
      const html = await response.text();
      
      expect(html).toContain('Authorization Complete');
      expect(html).toContain('✅');
      expect(response.headers.get('content-type')).toMatch(/text\/html/);

      await expect(promise).resolves.toBeDefined();
    });

    it('should return error HTML for invalid callback', async () => {
      const { url: callbackUrl, promise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);
      
      const response = await fetch(`http://localhost:${port}/oauth/callback?error=access_denied`);
      const html = await response.text();
      
      expect(html).toContain('Authorization Error');
      expect(html).toContain('❌');
      expect(response.status).toBe(400);

      await expect(promise).rejects.toThrow();
    });

    it('should escape HTML in error messages', async () => {
      const escapeServer = new OAuthCallbackServer({ port: 30007 });
      
      try {
        const { url: callbackUrl, promise } = await escapeServer.start();

        const response = await fetch(`${callbackUrl}?error=%3Cscript%3Ealert(1)%3C/script%3E`);
        const html = await response.text();
        
        expect(html).not.toContain('<script>');
        expect(html).toContain('&lt;script&gt;');

      await expect(promise).rejects.toThrow();
      } finally {
        await escapeServer.stop();
      }
    });
  });
});