import { Query } from "mongoose";
import { SessionPayload } from "src/dto/sessionPayload";
import { ISessionSchema } from "src/model/session";

export interface SessionService {
    findByUserId(userId: string): Query<ISessionSchema | null, ISessionSchema, {}>;

    createWithSessionPayload(sessionPayload: SessionPayload): Promise<ISessionSchema>;

    deleteByUserId(userId: string): any;
}
