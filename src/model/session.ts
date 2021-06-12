import { Document, model, Schema } from 'mongoose';

export interface ISessionSchema extends Document {
    user: {
        _id: string,
        username: string
    },
    expired: number,
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