import { Query } from "mongoose";
import { ISessionSchema, SessionPayload } from "../../../model/session";

export interface SessionService {
    findByUserId(userId: string): Query<ISessionSchema | null, ISessionSchema, {}>;
    create(user: SessionPayload):  any;
    delete(userId: string): Promise<void>;
}