import {SocialCase} from '../../../enum/socialCase.enum';
import {ILoginDto} from '../dto/login.dto';
import { IUserInfo } from '../dto/userInfo.dto';

export interface AuthService {
    loginUserCase<T>(body: T, type: SocialCase): Promise<{info: IUserInfo, accessToken: string}>;
    loginDefault(loginDto: ILoginDto): Promise<string | null>;
    loginWithoutSession(loginDto: ILoginDto): Promise<IUserInfo>;
    register(loginDto: ILoginDto): Promise<void>;
}
