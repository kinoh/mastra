import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import chalk from 'chalk';
import { mcp } from './mastra/index';

console.log(chalk.blue('🚀 Starting MCP OAuth Example'));

async function main() {
  try {
    // Create an agent
    console.log(chalk.blue('Creating MCP agent'));
    const mcpAgent = new Agent({
      name: 'MCP Assistant',
      instructions: `
        You are a helpful assistant that can interact with MCP servers.
      `,
      model: openai('gpt-4o-mini'),
    });

    // Initialize OAuth flow and get toolsets
    console.log(chalk.blue('Initializing OAuth authentication...'));
    const toolsets = await mcp.getToolsets();

    console.log(chalk.green('✅ OAuth authentication completed successfully!'));
    console.log(chalk.gray(`Available toolsets: ${Object.keys(toolsets).join(', ')}`));

    // Example interaction with the authenticated MCP server
    const prompt = `List the tools available`;

    console.log(chalk.yellow(`\nSending prompt: "${prompt}"\n`));

    const response = await mcpAgent.stream(prompt, {
      toolsets,
    });

    // Stream the response
    for await (const part of response.fullStream) {
      switch (part.type) {
        case 'error':
          console.error(chalk.red('❌ Error:'), part.error);
          break;
        case 'text-delta':
          process.stdout.write(chalk.green(part.textDelta));
          break;
        case 'tool-call':
          console.log(chalk.blue(`\n🔧 Calling tool: ${part.toolName}`));
          console.log(chalk.gray(`Arguments: ${JSON.stringify(part.args, null, 2)}`));
          break;
        case 'tool-result':
          console.log(chalk.cyan(`\n📋 Tool result: ${JSON.stringify(part.result, null, 2)}`));
          break;
      }
    }

    console.log(chalk.green('\n\n✅ Example completed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error occurred:'), error);

    if (error instanceof Error) {
      console.error(chalk.red('Error message:'), error.message);
      console.error(chalk.gray('Stack trace:'), error.stack);
    }

    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n👋 Shutting down gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n👋 Shutting down gracefully...'));
  process.exit(0);
});

// Run the example
main().catch(error => {
  console.error(chalk.red('💥 Unhandled error:'), error);
  process.exit(1);
});
