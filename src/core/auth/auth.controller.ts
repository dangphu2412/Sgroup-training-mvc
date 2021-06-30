import {Request, Response} from 'express';

import {envConfig} from '../../env';
import {AuthServiceImpl} from './auth.service';
import {AuthService} from './api/authService';
import {LoginDto} from './dto/login.dto';
import { SocialCase } from 'src/enum/socialCase.enum';

/**
 * Lam nhiem vu phan tich data tu request
 * Dieu huong traffic (routing)
 */
class Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    /**
     * @deprecated This function is no longer using
     */
    login = async (req: Request, res: Response) => {
        try {
            const sessionId = await this.authService.loginDefault(LoginDto(req.body));

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

    loginWithoutSession = async (req: Request, res: Response) => {
        const loginCase = req.query.case as SocialCase;
        const data = await this.authService.loginUserCase(LoginDto(req.body), loginCase);

        try {
            return res.status(200).json({
                data
            });
        } catch (error) {
            return res.status(error.status).json({
                message: error.message,
                trace: error.stack
            })
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
