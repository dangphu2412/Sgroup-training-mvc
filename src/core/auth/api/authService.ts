import { ILoginDto } from "../dto/login.dto";

export interface AuthService {
    loginDefault(loginDto: ILoginDto): Promise<string>;
}