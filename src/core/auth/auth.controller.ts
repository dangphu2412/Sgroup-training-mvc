import { Request, Response } from "express";

import { envConfig } from '../../env';
import { AuthServiceImpl } from "./auth.service";
import { AuthService } from "./api/authService";
import { LoginDto } from "./dto/login.dto";

/**
 * Lam nhiem vu phan tich data tu request
 * Dieu huong traffic (routing)
 */
class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: Request, res: Response) => {
        const loginCase = Number.parseInt(req.query.case as string);

        try {
            const sessionId = await this.authService.loginUserCase(LoginDto(req.body), loginCase);

            // Phien dang nhap nguoi khac dang hop le
            if (!sessionId) {
                return res.render('pages/error.pug', {
                    error: 'Dang co nguoi khac dang nhap roi'
                });
            }

            // Minh da dang nhap
            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                signed: true,
                maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
            });
            return res.redirect('/');
        } catch (error) {
            return res.render('pages/error.pug', {
                error: error.message
            });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            await this.authService.register(LoginDto(req.body));
        } catch (error) {
            return res.status(409).json({
                message: error
            });
        }

        return res.status(200).json({
            message: 'Register success'
        })
    }
}

export const AuthController = new Controller(AuthServiceImpl);