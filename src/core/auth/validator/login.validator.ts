import { NextFunction, Request, Response } from "express";
import { ILoginDto } from "../dto/login.dto";

export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const body: ILoginDto = req.body;

    if (typeof req.query.case !== 'string') {
        return res.send('Case is not formatted correctly');
    }

    if (!body.email || !body?.email.match(/\S+@\S+\.\S+/)) {
        return res.send('Email is not formatted correctly');
    }

    if (!body.password || !body?.password.match(/^(?=.*[A-Za-z1-9])(?=.*\d)[A-Za-z\d]{6,}$/)) {
        return res.send('Wrong password format');
    }

    return next()

    // try {
    //     const err = await Promise.all([
    //         validate(body.email, /\S+@\S+\.\S+/, 'Email is not formatted correctly'),
    //         validate(body.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Wrong password format')
    //     ])
    //     return res.send(err)
    
    // } catch(err) {
    //     return next();

    // }
}