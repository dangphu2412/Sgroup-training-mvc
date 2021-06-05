import { model, Schema } from 'mongoose';

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String
    },
    lock: {
        type: Boolean
    }
});

const SessionModel = model('sessions', SessionSchema);

export default SessionModel;