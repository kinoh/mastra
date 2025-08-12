import type { JwtPayload } from '@mastra/auth';
import type { MastraAuthProviderOptions } from '@mastra/core/server';
import { MastraAuthProvider } from '@mastra/core/server';
import { WorkOS } from '@workos-inc/node';
type WorkosUser = JwtPayload;
interface MastraAuthWorkosOptions extends MastraAuthProviderOptions<WorkosUser> {
    apiKey?: string;
    clientId?: string;
}
export declare class MastraAuthWorkos extends MastraAuthProvider<WorkosUser> {
    protected workos: WorkOS;
    constructor(options?: MastraAuthWorkosOptions);
    authenticateToken(token: string): Promise<WorkosUser | null>;
    authorizeUser(user: WorkosUser): Promise<boolean>;
}
export {};
//# sourceMappingURL=index.d.ts.map