import {Document, model, Schema} from 'mongoose';

export interface SessionPayload {
	_id: string;
	username: string;
}

export interface ISessionSchema extends Document {
    user: SessionPayload,
    expired: number, // Use logout when expired comes
    renewTime: number
}

const SessionSchema = new Schema<ISessionSchema>({
    user: {
        _id: String,
        username: String
    },
    expired: Number, // Use logout when expired comes
    renewTime: Number // Check if user is no longer working in that session
});

const SessionModel = model<ISessionSchema>('sessions', SessionSchema);

export default SessionModel;
