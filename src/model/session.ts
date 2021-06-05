import { model, Schema } from 'mongoose';

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String
    },
    expired: Number,
    renewTime: Number
});

const SessionModel = model('sessions', SessionSchema);

export default SessionModel;