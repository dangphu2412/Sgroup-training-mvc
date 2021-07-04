import {Types} from 'mongoose';
import {IArticle} from '../../../model/article';
import {INewArticle} from '../dto/newArticle.dto';

export interface ArticleMapper {
    toArticleDoc(dto: INewArticle, userId: Types.ObjectId, slug: string): IArticle;
}
