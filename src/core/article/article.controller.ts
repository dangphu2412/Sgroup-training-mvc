import {Request, Response} from 'express';
import Article from '../../model/article';
import {AuthenticatedRequest} from '../auth/guard/jwtAutheticator.guard';
import {ArticleServiceImpl} from './article.service';
import {ArticleService} from './api/articleService';
import {NewArticleDto} from './dto/newArticle.dto';

class Controller {
    private service: ArticleService;

    constructor(service: ArticleService) {
        this.service = service;
    }

    getAll = async (req: Request, res: Response) => {
        const data = await this.service.getAll(req.query)
        return res.render('pages/home.pug', {
            articles: data
        });
    }

    create = async (req: Request, res: Response) => {
        try {
            await this.service.createOne(
                (req as AuthenticatedRequest)['user']['_id'],
                NewArticleDto(req.body)
            )
            return res.status(203).json();
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                stack: error.stack
            })
        }
    }

    updateBySlug = async (req: Request, res: Response) => {
        const {slug} = req.params;

        const article = await Article.findOne({slug});

        if (!article) {
            return res.render('pages/error.pug', {
                error: `This article with title ${slug} is not exist`
            });
        }

        try {
            await Article.updateOne({slug}, req.body);
        } catch (error) {
            console.log(error);
            return res.render('pages/error.pug', {
                error: `This article with title ${req.body.title} has been existed`
            });
        }

        return res.redirect('/');
    }

    deleteBySlug = async (req: Request, res: Response) => {
        const {slug} = req.params;

        const article = await Article.findOne({slug});

        if (!article) {
            return res.render('pages/error.pug', {
                error: `This article with title ${slug} is not exist`
            });
        }

        try {
            await Article.deleteOne({slug});
        } catch (error) {
            console.log(error);
            return res.render('pages/error.pug', {
                error: `This article with title ${req.body.title} has been deleted`
            });
        }

        return res.redirect('/');
    }
}

export const ArticleController = new Controller(ArticleServiceImpl);
