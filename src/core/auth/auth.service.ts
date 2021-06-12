import UserModel from "../../model/user";
import { ILoginDto } from "./dto/login.dto";
import bcrypt from 'bcrypt';
import { SessionPayload } from "../../dto/sessionPayload";
import { AuthService } from "./api/authService";
import { SessionService } from "../session/api/sessionService";
import { SessionServiceImpl } from "../session/session.service";

class Service implements AuthService {
    private sessionService: SessionService;

    constructor(sessionService: SessionService) {
        this.sessionService = sessionService;
    }

    async loginDefault(loginDto: ILoginDto) {
        const user = await UserModel.findOne({
            username: loginDto.email
        });

        if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
            throw new Error('Email not found to login')
        }

        const currentUserSession = await this.sessionService.findByUserId(user._id);

        const userInfomation: SessionPayload = {
            _id: user._id,
            username: user.username
        }

        console.log("====== Current session ============");
        console.log(currentUserSession);

        if (!currentUserSession) {
            console.log('New session');
        } else if (Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime > 0) {
            
            await this.sessionService.deleteByUserId(user._id);

            console.log(`Deleting session with user id: ${user._id}`);
        }
        return (await this.sessionService.createWithSessionPayload(userInfomation))._id;

    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);