import { NextFunction, Request, Response } from "express";

import SessionModel from "../model/session";

export const authRequired =  async (req: Request, res: Response, next: NextFunction) => {
        const { user: sessionId } = req.signedCookies;
        console.log(sessionId);

        if (!sessionId) return res.redirect('/auth/login');

        const session = await SessionModel.findById(sessionId);

        if (session.lock) return res.redirect('/auth/login');

        return next();
};

export const authNotRequired = (req: Request, res: Response, next: NextFunction) => {
        const { user } = req.signedCookies;

        if (user) return res.redirect('/');

        return next();
}