const {model, Schema} = require('mongoose');

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

module.exports = SessionModel;