# MCP OAuth Authentication Example

This example demonstrates how to use OAuth 2.1 authentication with MCP (Model Context Protocol) servers in Mastra.

## OAuth Configuration Features

This example demonstrates:

- **Dynamic Client Registration** (RFC 7591) - No pre-registered `clientId` required
- **OAuth 2.1 with PKCE** - Enhanced security for public clients
- **Automatic Authorization Server Discovery** - Uses MCP specification's 401/WWW-Authenticate header parsing
- **Token Persistence** - Automatic token storage and retrieval across sessions

## Setup

1. Build Mastra:

```bash
pnpm -w run build
```

2. Install dependencies:

```bash
pnpm install --ignore-workspace
```

3. **Update the MCP Server URL**:
   Edit `src/mastra/index.ts` and replace `https://example.com/mcp` with your actual MCP server URL.

4. Set up environment variables:

```bash
export OPENAI_API_KEY="your-openai-api-key"
```

## Example MCP Server Configurations

### GitHub MCP Server

**Authentication Method**: Static Client Registration  
**Requirements**: Pre-registered GitHub App or OAuth App

**Setup Steps:**

1. Create a GitHub App or OAuth App (see [github-mcp-server](https://github.com/github/github-mcp-server))
2. Obtain your `client_id`
3. Configure the client:

```typescript
github: {
  url: new URL('https://api.githubcopilot.com/mcp/'),
  oauth: {
    clientId: 'your_github_app_client_id', // Required for GitHub
    onAuthURL: async (authUrl, state) => { /* ... */ },
    // ... other config
  }
}
```

⚠️ **Known Issue**: JSON parsing issue (see [typescript-sdk#759](https://github.com/modelcontextprotocol/typescript-sdk/issues/759))

### Notion MCP Server

**Authentication Method**: Dynamic Client Registration  
**Requirements**: None (client credentials automatically registered)

```typescript
notion: {
  url: new URL('YOUR_NOTION_MCP_SERVER_URL'),
  oauth: {
    // No clientId needed - uses Dynamic Client Registration
    onAuthURL: async (authUrl, state) => { /* ... */ },
    // ... other config
  }
}
```

### Custom MCP Server

Check your MCP server documentation for the supported OAuth authentication method and configure accordingly.

## OAuth Authentication Methods

### Dynamic Client Registration

- Client credentials are automatically registered during OAuth flow
- No manual application setup required

```typescript
oauth: {
  // No clientId specified - automatic registration
  onAuthURL: async (authUrl, state) => {
    /* ... */
  };
}
```

### Static Client Registration

- Application must be manually registered with the OAuth provider
- Requires obtaining a `clientId` before use

```typescript
oauth: {
  clientId: 'your_pre_registered_client_id',
  onAuthURL: async (authUrl, state) => { /* ... */ }
}
```

## Authentication Flow

1. **First Run**: The application will display an OAuth authorization URL in the console
2. **Browser Authorization**: Copy and paste the URL into your browser to authorize the application
3. **Automatic Connection**: Return to the terminal - the application will automatically connect after authorization
4. **Token Storage**: Authentication tokens are saved to `./token-storage.json`
5. **Subsequent Runs**: Saved tokens are automatically used for re-authentication

### Reset Authentication

To re-authenticate with a different account, delete the token storage file:

```bash
rm ./token-storage.json
```

## Usage

Run the example:

```bash
pnpm start
```

## Troubleshooting

### Common Issues

**Authentication URL not working?**

- Ensure the MCP server URL is correct and accessible
- Check that the server supports OAuth 2.1 with Dynamic Client Registration
- Verify the server implements MCP specification auth discovery

**Connection fails after OAuth?**

- Delete `./token-storage.json` and try again
- Check OpenAI API key is valid
- Review console logs for detailed error messages

**GitHub Copilot OAuth fails?**

- This is a known issue in the MCP TypeScript SDK ([#759](https://github.com/modelcontextprotocol/typescript-sdk/issues/759))
- Try with a different MCP server until the SDK issue is resolved

### Debug Mode

Enable detailed logging by checking the console output during OAuth flow. The example includes comprehensive logging of the authentication process.
