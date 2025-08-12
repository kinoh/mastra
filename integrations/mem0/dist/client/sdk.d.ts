import type { Message, MemoryOptions, SearchOptions } from 'mem0ai';
import type { Mem0Config } from '../types.js';
export declare class Mem0AIClient {
    private client;
    private mem0Config;
    constructor(config: Mem0Config);
    createMemory(messages: Message[] | string, options?: MemoryOptions): Promise<string>;
    searchMemory(query: string, options?: SearchOptions): Promise<string>;
}
//# sourceMappingURL=sdk.d.ts.map