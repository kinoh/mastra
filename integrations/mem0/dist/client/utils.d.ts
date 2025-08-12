import type { Memory } from "mem0ai";
export declare class Mem0Utils {
    private static readonly MEM0_CLIENT_CONFIG_OPTIONS;
    static convertCamelCaseToSnakeCase: (str: string) => string;
    static convertStringToMessages: (str: string) => {
        readonly role: "user";
        readonly content: string;
    }[];
    static getMemoryString: (memory: Memory[]) => string;
}
//# sourceMappingURL=utils.d.ts.map