import { MCPClient } from '@mastra/mcp';
import chalk from 'chalk';

console.log(chalk.blue('Creating MCPClient with OAuth configuration'));

export const mcp = new MCPClient({
  servers: {
    notion: {
      // TODO: Replace with your actual MCP server URL and configure authentication
      url: new URL('https://example.com/mcp'),
      enableServerLogs: true,
      logger: logMessage => {
        console.log(`[${logMessage.level.toUpperCase()}] ${logMessage.message}`, logMessage.details);
      },
      oauth: {
        onAuthURL: async (authUrl: string, state: string) => {
          console.log(chalk.green('\n🔐 OAuth Authentication Required'));
          console.log(chalk.yellow('Please visit the following URL to authorize the application:'));
          console.log(chalk.cyan(`\n${authUrl}\n`));
          console.log(chalk.gray(`State: ${state}`));
          console.log(chalk.yellow('Waiting for authorization callback...'));
        },
        onTokenReceived: async tokens => {
          console.log(chalk.green('✅ Authentication successful!'));
          console.log(chalk.gray(`Access token expires in: ${tokens.expires_in} seconds`));
        },
        tokenStorageOptions: {
          filePath: './token-storage.json',
        },
      },
    },
  },
});
