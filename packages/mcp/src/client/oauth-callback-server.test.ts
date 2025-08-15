import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { OAuthCallbackServer } from './oauth-callback-server';
import type { CallbackResult } from './oauth-callback-server';
import { AuthorizationError, OAuthError } from './oauth-types';

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
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.ok).toBe(true);

      expect(callbackResult.status).toBe('fulfilled');
      expect((callbackResult as PromiseFulfilledResult<CallbackResult>).value).toEqual({
        code: 'test-code',
        state: 'test-state',
        additionalParams: undefined,
      });
    });

    it('should handle OAuth callback with additional parameters', async () => {
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state&custom=value`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.ok).toBe(true);

      expect(callbackResult.status).toBe('fulfilled');
      expect((callbackResult as PromiseFulfilledResult<CallbackResult>).value).toEqual({
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
        const { url, promise } = await errorServer.start();

        const [fetchResult, callbackResult] = await Promise.allSettled([
          fetch(`${url}?error=access_denied&error_description=User+denied`),
          promise,
        ]);

        expect(fetchResult.status).toBe('fulfilled');
        expect((fetchResult as PromiseFulfilledResult<Response>).value.status).toBe(400);

        expect(callbackResult.status).toBe('rejected');
        expect((callbackResult as PromiseRejectedResult).reason).toBeInstanceOf(OAuthError);
      } finally {
        await errorServer.stop();
      }
    });

    it('should reject callback with missing code', async () => {
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?state=test-state`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.status).toBe(400);

      expect(callbackResult.status).toBe('rejected');
      expect((callbackResult as PromiseRejectedResult).reason).toBeInstanceOf(OAuthError);
    });

    it('should reject callback with missing state', async () => {
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?code=test-code`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.status).toBe(400);

      expect(callbackResult.status).toBe('rejected');
      expect((callbackResult as PromiseRejectedResult).reason).toBeInstanceOf(AuthorizationError);
    });

    it('should reject non-GET requests', async () => {
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback`, {
          method: 'POST',
        }),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.status).toBe(405);

      expect(callbackResult.status).toBe('rejected');
    });

    it('should reject requests to wrong path', async () => {
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/wrong/path`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      expect((fetchResult as PromiseFulfilledResult<Response>).value.status).toBe(404);

      expect(callbackResult.status).toBe('rejected');
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
      const { url, promise } = await server.start();
      const port = parseInt(new URL(url).port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?code=test-code&state=test-state`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      const response = (fetchResult as PromiseFulfilledResult<Response>).value;
      expect(response.status).toBe(200);

      const html = await response.text();
      expect(html).toContain('Authorization Complete');
      expect(html).toContain('✅');
      expect(response.headers.get('content-type')).toMatch(/text\/html/);

      expect(callbackResult.status).toBe('fulfilled');
      expect((callbackResult as PromiseFulfilledResult<CallbackResult>).value).toEqual({
        code: 'test-code',
        state: 'test-state',
      });
    });

    it('should return error HTML for invalid callback', async () => {
      const { url: callbackUrl, promise } = await server.start();
      const url = new URL(callbackUrl);
      const port = parseInt(url.port);

      const [fetchResult, callbackResult] = await Promise.allSettled([
        fetch(`http://localhost:${port}/oauth/callback?error=access_denied`),
        promise,
      ]);

      expect(fetchResult.status).toBe('fulfilled');
      const response = (fetchResult as PromiseFulfilledResult<Response>).value;
      const html = await response.text();

      expect(html).toContain('Authorization Error');
      expect(html).toContain('❌');
      expect(response.status).toBe(400);

      expect(callbackResult.status).toBe('rejected');
      expect((callbackResult as PromiseRejectedResult).reason).toBeInstanceOf(AuthorizationError) ;
    });

    it('should escape HTML in error messages', async () => {
      const escapeServer = new OAuthCallbackServer({ port: 30007 });
      
      try {
        const { url, promise } = await escapeServer.start();

        const [fetchResult, callbackResult] = await Promise.allSettled([
          fetch(`${url}?error=%3Cscript%3Ealert(1)%3C/script%3E`),
          promise,
        ]);

        const response = (fetchResult as PromiseFulfilledResult<Response>).value;
        const html = await response.text();
        
        expect(html).not.toContain('<script>');
        expect(html).toContain('&lt;script&gt;');

        expect(callbackResult.status).toBe('rejected');
        expect((callbackResult as PromiseRejectedResult).reason).toBeInstanceOf(AuthorizationError);
      } finally {
        await escapeServer.stop();
      }
    });
  });
});