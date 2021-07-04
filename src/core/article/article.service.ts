import slugify from 'slugify';
import ArticleModel from '../../model/article';
import UserModel from '../../model/user';
import {ArticleMapper} from './api/articleMapper';
import {ArticleService} from './api/articleService';
import {INewArticle} from './dto/newArticle.dto';
import {ArticleMapperImpl} from './mapper/article.mapper';

class Service implements ArticleService {
    private mapper: ArticleMapper;

    constructor(mapper: ArticleMapper) {
        this.mapper = mapper;
    }

    async createOne(userId :string, dto: INewArticle): Promise<void> {
        const article = await ArticleModel.findOne({title: dto.title});

        if (!article) {
            throw new Error(`Article with title: ${dto.title} has been existed`);
        }

        const user = await UserModel.findOne({
            _id: userId
        })

        if (!user) {
            throw new Error('User is not acceptable');
        }

        await ArticleModel.create(
            this.mapper.toArticleDoc(dto, user._id, slugify(dto.title))
        );
    }

}

export const ArticleServiceImpl = new Service(ArticleMapperImpl);
