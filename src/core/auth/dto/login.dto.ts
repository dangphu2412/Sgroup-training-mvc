import { Request } from "express";

export interface ILoginDto {
    email: string;
    password: string
}

export function LoginDto(req: Request): ILoginDto {
    return {
        email: req.body.email,
        password: req.body.password
    }
}