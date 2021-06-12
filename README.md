## Interface
### Prefix I..
- Example:
```
interface ILoginDto {
    email: string;
    password: string;
}
```
- Represent for datatype
### without I
- Example:
```
interface AuthService {
    login(loginDto: ILoginDto): string
}
```
- API of application