import {INewArticle} from '../dto/newArticle.dto';

export interface ArticleService {
    createOne(userId: string, dto: INewArticle): Promise<void>;
}
