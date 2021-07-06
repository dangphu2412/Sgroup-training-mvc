import mongoose from 'mongoose';
import {envConfig} from '../env';
import {join} from 'path';
import {sync} from 'glob';
import {serial} from '../utils/serial';

const COLLEC_INSTANCE_PATH = join(process.cwd(), 'src', 'database', 'seed/*.seed.ts')

async function runSeed() {
    try {

        await mongoose.connect(envConfig.get('DB_CONNECTION'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const paths = sync(COLLEC_INSTANCE_PATH);
        const seedInstances = await Promise.all(paths.map(path => import(path)));

        await serial(seedInstances, (task: any) => task.default.run(mongoose.connection));

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runSeed()
    .then(() => {console.log('Seeding success')})
    .finally(() => {process.exit(0)})
