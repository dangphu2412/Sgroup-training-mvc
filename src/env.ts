import 'dotenv/config';

class EnvConfig {
    private config = {} as any;
    set(key: string, value?: string, defaultVal?: any): void {
        if (defaultVal) {
            this.config[key] = value || defaultVal;
        } else {
            this.config[key] = value;
        }
    }
    get(key: string): string {
        if (!this.config[key]) {
            throw new Error(`Can not get key ${key} from environment`);
        }
        return this.config[key];
    }
}

const envConfig = new EnvConfig();

envConfig.set('PORT', process.env.PORT, 3000);
envConfig.set('DB_CONNECTION', process.env.DB_CONNECTION);
envConfig.set('COOKIE_SECRET', process.env.COOKIE_SECRET);
envConfig.set('SESSION_EXPIRED', process.env.SESSION_EXPIRED, 1000 * 60 * 2);
envConfig.set('SESSION_RENEW', process.env.SESSION_RENEW, 1000 * 30);

export { envConfig };