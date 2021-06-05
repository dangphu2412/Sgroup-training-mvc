"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var updateHook_1 = require("./hooks/updateHook");
var ArticleSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    slug: String,
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});
ArticleSchema.pre('save', updateHook_1.updateHook);
var ArticleModel = mongoose_1.model('articles', ArticleSchema);
exports.default = ArticleModel;
