import {SocialCase} from '../../../enum/socialCase.enum';
import {ILoginDto} from '../dto/login.dto';

export interface AuthService {
    loginUserCase<T>(body: T, type: SocialCase): Promise<string | null>;
    loginDefault(loginDto: ILoginDto): Promise<string | null>;
    register(loginDto: ILoginDto): Promise<void>;
}
