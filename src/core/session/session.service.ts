import { Query } from "mongoose";
import { envConfig } from "../../env";
import SessionModel, { ISessionSchema, SessionPayload } from "../../model/session";
import { SessionService } from "./api/sessionService";

class Service implements SessionService {
    create(user: SessionPayload) {
        return SessionModel.create({
            user,
            expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
            renewTime: Date.now() + envConfig.get('SESSION_RENEW')
        });
    }
    findByUserId(userId: string): Query<ISessionSchema | null, ISessionSchema, {}> {
        return SessionModel.findOne({
            'user._id': userId
        })
    }
    async delete(userId: string): Promise<void> {
        await SessionModel.deleteOne({
            'user._id': userId
        });
    }
}

// Singleton design pattern
export const SessionServiceImpl = new Service();
