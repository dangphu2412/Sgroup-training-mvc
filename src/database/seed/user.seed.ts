import {Collection} from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../../model/user';

export default class UserSeed {
    static async run(connection: Collection) {
        const DEFAULT_PWD = bcrypt.hashSync('123456', 10);
        await UserModel.insertMany([
            {
                username: 'dangphu241299@gmail.com',
                password: DEFAULT_PWD
            },
            {
                username: 'phungu@gmail.com',
                password: DEFAULT_PWD
            }
        ]);
    }
}
