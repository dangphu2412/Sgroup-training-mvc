import { ParsedQs } from 'qs';
import {INewArticle} from '../dto/newArticle.dto';

export interface ArticleService {
    createOne(userId: string, dto: INewArticle): Promise<void>;
    getAll(query: ParsedQs): Promise<any>
}
