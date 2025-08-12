import jwt from 'jsonwebtoken';
export type JwtPayload = jwt.JwtPayload;
export declare function decodeToken(accessToken: string): Promise<jwt.Jwt | null>;
export declare function getTokenIssuer(decoded: jwt.JwtPayload | null): any;
export declare function verifyHmac(accessToken: string, secret: string): Promise<jwt.JwtPayload>;
export declare function verifyJwks(accessToken: string, jwksUri: string): Promise<jwt.JwtPayload>;
//# sourceMappingURL=utils.d.ts.map