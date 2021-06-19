export interface ILoginDto {
    username: string;
    password: string
}

export function LoginDto(body: any): ILoginDto {
    return {
        username: body.username,
        password: body.password
    }
}