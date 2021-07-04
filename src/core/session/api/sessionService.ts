import {SessionPayload} from '../../../model/session';

export interface SessionService {
    findByUserId(userId: string): any;
    create(user: SessionPayload): any;
    delete(userId: string): Promise<void>;
}
