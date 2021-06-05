"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var updateHook_1 = require("./hooks/updateHook");
var UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});
UserSchema.pre('save', updateHook_1.updateHook);
var UserModel = mongoose_1.model('users', UserSchema);
exports.default = UserModel;
