import { NextFunction, Request, Response } from "express";

import SessionModel from "../model/session";

interface SessionPayload {
	_id: string;
	username: string;
}

interface ExtendedRequestWithUser extends Request {
	user?: SessionPayload
};

export const authRequired =  async (req: Request, res: Response, next: NextFunction) => {
	const { sessionId } = req.signedCookies;

	if (!sessionId) {
		return res.redirect('/auth/login');
	}

	const currentUserSession = await SessionModel.findById(sessionId);
	
	if (!currentUserSession) {
		return res.redirect('/auth/login');
	}

	if (Date.now() - currentUserSession.expired > 0) {
		res.clearCookie('sessionId');
		return res.redirect('/auth/login');
	}

	(req as ExtendedRequestWithUser).user = currentUserSession.user

	return next();
};

export const authNotRequired = (req: Request, res: Response, next: NextFunction) => {
        const { sessionId } = req.signedCookies;

        if (sessionId) return res.redirect('/');

        return next();
}