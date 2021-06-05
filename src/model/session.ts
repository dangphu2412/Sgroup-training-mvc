import { model, Schema } from 'mongoose';

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String
    },
    expired: Number, // Use logout when expired comes
    renewTime: Number // Check if user is no longer working in that session
});

const SessionModel = model('sessions', SessionSchema);

export default SessionModel;