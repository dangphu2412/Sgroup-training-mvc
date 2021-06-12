import { Request, Response } from "express";

import { envConfig } from '../../env';
import { ILoginDto, LoginDto } from "./dto/login.dto";
import { SocialCase } from "../../enum/socialCase.enum";
import { AuthServiceImpl } from './auth.service';
import { AuthService } from "./api/authService";

class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    login = async (req: Request, res: Response) => {
        if (typeof req.query.case !== 'string') return res.send('Case is not string');

        const loginCase = Number.parseInt(req.query.case);

        switch (loginCase) {
            case SocialCase.DEFAULT:
                {
                    const loginDto: ILoginDto = LoginDto(req);

                    const sessionId = await this.authService.loginDefault(loginDto);

                    if (!sessionId) {
                        return res.redirect('/auth/login');
                    }

                    res.cookie('sessionId', sessionId, {
                        httpOnly: true,
                        signed: true,
                        maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
                    });
                    return res.redirect('/');
                }
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            case SocialCase.TWITTER:
            default:
                break;
        }
        
    }
}

export const AuthController = new Controller(AuthServiceImpl);