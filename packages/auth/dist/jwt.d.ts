import { MastraAuthProvider } from '@mastra/core/server';
import type { MastraAuthProviderOptions } from '@mastra/core/server';
import jwt from 'jsonwebtoken';
type JwtUser = jwt.JwtPayload;
interface MastraJwtAuthOptions extends MastraAuthProviderOptions<JwtUser> {
    secret?: string;
}
export declare class MastraJwtAuth extends MastraAuthProvider<JwtUser> {
    protected secret: string;
    constructor(options?: MastraJwtAuthOptions);
    authenticateToken(token: string): Promise<JwtUser>;
    authorizeUser(user: JwtUser): Promise<boolean>;
}
export {};
//# sourceMappingURL=jwt.d.ts.map