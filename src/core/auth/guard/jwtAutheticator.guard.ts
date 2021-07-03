import {NextFunction, Request, Response} from 'express-serve-static-core';
import {JwtPayload} from 'jsonwebtoken';
import {Authenticator} from '../api/authenticator';
import jwt from 'jsonwebtoken';

export interface JwtAuthContext extends JwtPayload {
    _id: string;
    roles: Array<string>
}

export interface AuthenticatedRequest extends Request {
    user: JwtAuthContext
}

export class JwtAuthenticator implements Authenticator {
    private static PREFIX_BEARER_TOKEN = 'Bearer ';

    private static instance: JwtAuthenticator;

    public static getInstance() {
        if (!JwtAuthenticator.instance) {
            JwtAuthenticator.instance = new JwtAuthenticator();
        }
        return JwtAuthenticator.instance;
    }

    private extractAuthContext(req: Request): JwtAuthContext {
        const jwtBody: string | undefined = req.headers['authorization'];

        if (!jwtBody || !jwtBody.startsWith(JwtAuthenticator.PREFIX_BEARER_TOKEN)) {
            throw new Error(`In correct format of token. Bearer token should starts with ${JwtAuthenticator.PREFIX_BEARER_TOKEN}`)
        }
        const jwtAuthContext = jwt.decode(jwtBody.substr(
            JwtAuthenticator.PREFIX_BEARER_TOKEN.length
        )) as JwtAuthContext | null;

        if (!jwtAuthContext) {
            throw new Error('Can not decode jwt because content is not valid')
        }

        return jwtAuthContext;
    }

    public getAuthenticator = (req: Request, res: Response, next: NextFunction) => {
        if (this.authenticate(req)) {
            return next();
        }

        return res.status(401).json({
            message: 'Your token is not valid',
            code: 'UNAUTHORIZED'
        });
    }

    public authenticate(req: Request): boolean {
        try {
            (req as AuthenticatedRequest)['user'] = this.extractAuthContext(req);
        } catch (error) {
            return false;
        }
        return true;
    }

}
