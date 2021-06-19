import { SocialCase } from "../../enum/socialCase.enum";
import UserModel from "../../model/user";
import { AuthService } from "./api/authService";
import { ILoginDto, LoginDto } from "./dto/login.dto";
import bcrypt from 'bcrypt';
import { SessionService } from "../session/api/sessionService";
import { SessionServiceImpl } from "../session/session.service";
import { SessionPayload } from "../../model/session";

class Service implements AuthService {
    private sessionService: SessionService;

    constructor(sessionService: SessionService) {
        this.sessionService = sessionService;
    }
    async register(loginDto: ILoginDto): Promise<void> {
        const user = await UserModel.findOne({
            username: loginDto.username
        });

        if (user) {
            throw new Error('This account has been used');
        }

        loginDto.password = bcrypt.hashSync(loginDto.password, 10);

        await UserModel.create(loginDto);
        return;
    }

    loginUserCase(body: any,type: SocialCase): Promise<string | null> {
        switch (type) {
            case SocialCase.DEFAULT:
                return this.loginDefault(body);
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            case SocialCase.TWITTER:
            default:
                throw new Error("Method not supported.");

        }
    }

    async loginDefault(loginDto: ILoginDto): Promise<string | null> {
        const user = await UserModel.findOne({
            username: loginDto.username
        });

        if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
            throw new Error('Email or password is not correct');
        }

        const userInfomation: SessionPayload = {
            _id: user._id,
            username: user.username
        }

        const currentUserSession = await this.sessionService.findByUserId(user.id);

        // Tao moi 1 session cho minh
        if (!currentUserSession) {
            console.log("Creating new session");
            
            const session = await this.sessionService.create(userInfomation);
            return session._id;
        }

        // Session cua user khac da het han
        if (Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime > 0) {
            // Xoa phien dang nhap cua user do
            await this.sessionService.delete(user._id);
            console.log(`Deleting session with user id: ${user._id}`);

            // Tao moi phien dang nhap cho minh
            const session = await this.sessionService.create(userInfomation);
            return session._id;
        }

        return null;
    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);
