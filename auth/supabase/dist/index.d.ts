import type { MastraAuthProviderOptions } from '@mastra/core/server';
import { MastraAuthProvider } from '@mastra/core/server';
import type { SupabaseClient, User } from '@supabase/supabase-js';
interface MastraAuthSupabaseOptions extends MastraAuthProviderOptions<User> {
    url?: string;
    anonKey?: string;
}
export declare class MastraAuthSupabase extends MastraAuthProvider<User> {
    protected supabase: SupabaseClient;
    constructor(options?: MastraAuthSupabaseOptions);
    authenticateToken(token: string): Promise<User | null>;
    authorizeUser(user: User): Promise<any>;
}
export {};
//# sourceMappingURL=index.d.ts.map