import {Types} from 'mongoose';
import {IArticle} from '../../../model/article';
import {ArticleMapper} from '../api/articleMapper';
import {INewArticle} from '../dto/newArticle.dto';

class Mapper implements ArticleMapper {
    toArticleDoc(dto: INewArticle, userId: Types.ObjectId, slug: string): IArticle {
        return {
            title: dto.title,
            slug,
            content: dto.content,
            user: userId
        }
    }

}

export const ArticleMapperImpl = new Mapper();
