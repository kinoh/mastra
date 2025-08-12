import { Integration } from '@mastra/core/integration';
import type { Message, MemoryOptions, SearchOptions } from 'mem0ai';
import { Mem0AIClient } from './client/index.js';
import type { Mem0Config } from './types.js';
export declare class Mem0Integration extends Integration {
    readonly name = "MEM0";
    readonly logoUrl = "";
    config: Mem0Config;
    client: Mem0AIClient;
    categories: string[];
    description: string;
    constructor({ config }: {
        config: Mem0Config;
    });
    createMemory(messages: Message[] | string, options?: MemoryOptions): Promise<string>;
    searchMemory(query: string, options?: SearchOptions): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map