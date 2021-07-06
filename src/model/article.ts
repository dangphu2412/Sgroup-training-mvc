import {model, Schema, Types} from 'mongoose';
import {updateHook} from './hooks/updateHook';

export interface IArticle {
    title: string
    content: string
    slug: string
    thumbnail: string,
    user: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

const ArticleSchema = new Schema<IArticle>({
    title: String,
    content: String,
    slug: String,
    thumbnail: String,
    user: {
        ref: 'users',
        type: Types.ObjectId
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});
ArticleSchema.pre('save', updateHook);

const ArticleModel = model('articles', ArticleSchema);

export default ArticleModel;
