export interface IUserInfo {
    _id: string;
    fullName: string;
}

export function UserInfo(data: any): IUserInfo {
    return {
        _id: data._id,
        fullName: data.fullName
    }
}
