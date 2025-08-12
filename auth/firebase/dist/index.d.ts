import type { MastraAuthProviderOptions } from '@mastra/core/server';
import { MastraAuthProvider } from '@mastra/core/server';
import admin from 'firebase-admin';
type FirebaseUser = admin.auth.DecodedIdToken;
interface MastraAuthFirebaseOptions extends MastraAuthProviderOptions<FirebaseUser> {
    databaseId?: string;
    serviceAccount?: string;
}
export declare class MastraAuthFirebase extends MastraAuthProvider<FirebaseUser> {
    private serviceAccount;
    private databaseId;
    constructor(options?: MastraAuthFirebaseOptions);
    authenticateToken(token: string): Promise<FirebaseUser | null>;
    authorizeUser(user: FirebaseUser): Promise<boolean>;
}
export {};
//# sourceMappingURL=index.d.ts.map