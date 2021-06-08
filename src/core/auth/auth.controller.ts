import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { envConfig } from '../../env';
import { SessionPayload } from '../../dto/sessionPayload';
import UserModel from '../../model/user';
import SessionModel from '../../model/session';
import { ILoginDto, LoginDto } from "./dto/login.dto";
import { SocialCase } from "../../enum/socialCase.enum";

class Controller {
    login = async (req: Request, res: Response) => {
        if (typeof req.query.case !== 'string') return res.send('Case is not string');

        const loginCase = Number.parseInt(req.query.case);
        switch (loginCase) {
            case SocialCase.DEFAULT:
                {
                    const loginDto: ILoginDto = LoginDto(req);

                    let sessionId;
                    const user = await UserModel.findOne({
                        username: loginDto.email
                    });
                    
                    if (!user || !bcrypt.compareSync(loginDto.password, loginDto.password)) {
                        return res.render('pages/error.pug', {
                            error: `Email not found to login`
                        });
                    }

                    const currentUserSession = await SessionModel.findOne({
                        'user._id': user._id
                    });

                    const userInfomation: SessionPayload = {
                        _id: user._id,
                        username: user.username
                    }
                    console.log("======Current session ============");
                    console.log(currentUserSession);

                    if (!currentUserSession) {
                        console.log('New session');
                        
                        const session = await SessionModel.create({
                            user: userInfomation,
                            expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
                            renewTime: Date.now() + envConfig.get('SESSION_RENEW')
                        });
                        sessionId = session._id;
                    } else {
                        if (Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime > 0) {
                            await SessionModel.deleteOne({
                                'user._id': user._id 
                            })
                            console.log(`Deleting session with user id: ${user._id}`);
                            
                            const session = await SessionModel.create({
                                user: userInfomation,
                                expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
                                renewTime: Date.now() + envConfig.get('SESSION_RENEW')
                            });
                            sessionId = session._id;
                        } else {
                            return res.redirect('/auth/login');
                        }
                    }

                    res.cookie('sessionId', sessionId, {
                        httpOnly: true,
                        signed: true,
                        maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
                    });
                    return res.redirect('/');
                }
                break;
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            case SocialCase.TWITTER:
            default:
                break;
        }
        
    }
}

export const AuthController = new Controller();