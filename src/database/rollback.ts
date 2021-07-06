import mongoose from 'mongoose';
import {envConfig} from '../env';

async function runRollback() {
    try {

        await mongoose.connect(envConfig.get('DB_CONNECTION'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await mongoose.connection.dropDatabase()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runRollback()
    .then(() => {console.log('Rollback database')})
    .finally(() => {process.exit(0)})
