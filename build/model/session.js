"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SessionSchema = new mongoose_1.Schema({
    user: {
        _id: String,
        username: String
    },
    lock: {
        type: Boolean
    }
});
var SessionModel = mongoose_1.model('sessions', SessionSchema);
exports.default = SessionModel;
