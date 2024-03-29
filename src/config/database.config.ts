/* eslint-disable max-len */
import mongoose from 'mongoose';
import {envConfig} from '../env';

export default async () => {
    try {
        await mongoose.connect(envConfig.get('DB_CONNECTION'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to mongodb')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
