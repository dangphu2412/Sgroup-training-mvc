import { SessionPayload } from "../../dto/sessionPayload";
import { envConfig } from "../../env";
import SessionModel from "../../model/session";
import { SessionService } from "./api/sessionService";

class Service implements SessionService {
    findByUserId(userId: string) {
        return SessionModel.findOne({
            'user._id': userId
        });
    }

    createWithSessionPayload(user: SessionPayload) {
        return SessionModel.create({
            user: user,
            expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
            renewTime: Date.now() + envConfig.get('SESSION_RENEW')
        });
    }
    deleteByUserId(userId: string) {
        return SessionModel.deleteOne({
            'user._id': userId
        });
    }
}

export const SessionServiceImpl = new Service();
