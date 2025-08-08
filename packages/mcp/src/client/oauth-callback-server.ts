import { createServer, IncomingMessage, ServerResponse } from 'http';
import { URL, URLSearchParams } from 'url';
import { AuthorizationError } from './oauth-types';

export interface CallbackServerConfig {
  /** Port to listen on (0 for random available port) */
  port?: number;
  /** Host to bind to (default: localhost) */
  host?: string;
  /** Timeout in milliseconds to wait for callback (default: 300000ms = 5 minutes) */
  timeout?: number;
}

export interface CallbackResult {
  /** Authorization code from OAuth provider */
  code: string;
  /** State parameter for CSRF protection */
  state: string;
  /** Additional parameters from callback */
  additionalParams?: Record<string, string>;
}

/**
 * Ephemeral HTTP server for handling OAuth callbacks
 * Creates a temporary server that listens for the OAuth redirect
 */
export class OAuthCallbackServer {
  private config: CallbackServerConfig;
  private server: ReturnType<typeof createServer> | null = null;
  private callbackPromise: Promise<CallbackResult> | null = null;
  private callbackResolve: ((result: CallbackResult) => void) | null = null;
  private callbackReject: ((error: Error) => void) | null = null;
  private timeoutHandle: NodeJS.Timeout | null = null;

  constructor(config: CallbackServerConfig = {}) {
    this.config = {
      port: config.port || 0, // Use 0 for random available port
      host: config.host || 'localhost',
      timeout: config.timeout || 300000, // 5 minutes default
    };
  }

  /**
   * Start the callback server and return the callback URL
   */
  async start(): Promise<string> {
    if (this.server) {
      throw new Error('Callback server is already running');
    }

    return new Promise((resolve, reject) => {
      this.server = createServer(this.handleRequest.bind(this));

      this.server.on('error', reject);

      this.server.listen(this.config.port, this.config.host, () => {
        const address = this.server!.address();
        if (!address || typeof address === 'string') {
          reject(new Error('Failed to get server address'));
          return;
        }

        const callbackUrl = `http://${this.config.host}:${address.port}/oauth/callback`;
        resolve(callbackUrl);
      });
    });
  }

  /**
   * Wait for OAuth callback
   */
  async waitForCallback(): Promise<CallbackResult> {
    if (!this.server) {
      throw new Error('Callback server is not running');
    }

    if (this.callbackPromise) {
      return this.callbackPromise;
    }

    this.callbackPromise = new Promise<CallbackResult>((resolve, reject) => {
      this.callbackResolve = resolve;
      this.callbackReject = reject;

      // Set timeout
      this.timeoutHandle = setTimeout(() => {
        this.cleanup();
        reject(new Error('OAuth callback timeout'));
      }, this.config.timeout!);
    });

    return this.callbackPromise;
  }

  /**
   * Stop the callback server
   */
  async stop(): Promise<void> {
    if (!this.server) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      this.cleanup();
      
      this.server!.close((error) => {
        this.server = null;
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Get the callback URL if server is running
   */
  getCallbackUrl(): string | null {
    if (!this.server) {
      return null;
    }

    const address = this.server.address();
    if (!address || typeof address === 'string') {
      return null;
    }

    return `http://${this.config.host}:${address.port}/oauth/callback`;
  }

  /**
   * Handle incoming HTTP requests
   */
  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    // Set CORS headers for security
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Parse URL
    const reqUrl = new URL(req.url!, `http://${req.headers.host}`);
    
    // Only handle OAuth callback path
    if (reqUrl.pathname !== '/oauth/callback') {
      this.sendErrorResponse(res, 404, 'Not Found');
      return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
      this.sendErrorResponse(res, 405, 'Method Not Allowed');
      return;
    }

    try {
      this.handleOAuthCallback(reqUrl.searchParams, res);
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      this.sendErrorResponse(res, 500, 'Internal Server Error');
      
      if (this.callbackReject) {
        this.callbackReject(error instanceof Error ? error : new Error('Unknown error'));
      }
    }
  }

  /**
   * Handle OAuth callback with query parameters
   */
  private handleOAuthCallback(params: URLSearchParams, res: ServerResponse): void {
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    const errorDescription = params.get('error_description');

    // Check for OAuth error response
    if (error) {
      const authError = new AuthorizationError(error, errorDescription || undefined);
      this.sendErrorResponse(res, 400, `OAuth Error: ${error}`);
      
      if (this.callbackReject) {
        this.callbackReject(authError);
      }
      return;
    }

    // Validate required parameters
    if (!code) {
      const authError = new AuthorizationError('invalid_request', 'Missing authorization code');
      this.sendErrorResponse(res, 400, 'Missing authorization code');
      
      if (this.callbackReject) {
        this.callbackReject(authError);
      }
      return;
    }

    if (!state) {
      const authError = new AuthorizationError('invalid_request', 'Missing state parameter');
      this.sendErrorResponse(res, 400, 'Missing state parameter');
      
      if (this.callbackReject) {
        this.callbackReject(authError);
      }
      return;
    }

    // Send success response to user
    this.sendSuccessResponse(res);

    // Collect additional parameters
    const additionalParams: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      if (key !== 'code' && key !== 'state') {
        additionalParams[key] = value;
      }
    }

    // Resolve the callback promise
    if (this.callbackResolve) {
      this.callbackResolve({
        code,
        state,
        additionalParams: Object.keys(additionalParams).length > 0 ? additionalParams : undefined,
      });
    }
  }

  /**
   * Send success response to browser
   */
  private sendSuccessResponse(res: ServerResponse): void {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>OAuth Authorization Complete</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
               text-align: center; padding: 50px; background-color: #f5f5f5; }
        .container { background: white; padding: 40px; border-radius: 8px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; 
                    margin: 0 auto; }
        .success { color: #28a745; font-size: 24px; margin-bottom: 20px; }
        .message { color: #6c757d; font-size: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅ Authorization Complete</div>
        <div class="message">
            You can now close this window and return to your application.
        </div>
    </div>
    <script>
        // Auto-close window after 3 seconds if opened in popup
        if (window.opener) {
            setTimeout(() => window.close(), 3000);
        }
    </script>
</body>
</html>`;

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(html),
    });
    res.end(html);
  }

  /**
   * Send error response to browser
   */
  private sendErrorResponse(res: ServerResponse, statusCode: number, message: string): void {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>OAuth Authorization Error</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
               text-align: center; padding: 50px; background-color: #f5f5f5; }
        .container { background: white; padding: 40px; border-radius: 8px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; 
                    margin: 0 auto; }
        .error { color: #dc3545; font-size: 24px; margin-bottom: 20px; }
        .message { color: #6c757d; font-size: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="error">❌ Authorization Error</div>
        <div class="message">${this.escapeHtml(message)}</div>
    </div>
</body>
</html>`;

    res.writeHead(statusCode, {
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(html),
    });
    res.end(html);
  }

  /**
   * Escape HTML characters to prevent XSS
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }

    this.callbackPromise = null;
    this.callbackResolve = null;
    this.callbackReject = null;
  }
}