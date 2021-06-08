import { Request, Response } from "express";
import slug from 'slugify';
import Article from '../../model/article';

class Controller {
    getOne = (req: Request, res: Response) => {
    }

    create = async (req: Request, res: Response) => {
        let createSuccess = true;
        const articleExisted = await Article.findOne({title: req.body.title});

        if (articleExisted) {
            return res.render('pages/error.pug');
        }

        req.body.slug = slug(req.body.title);

        try {
            await Article.create(req.body);
        } catch (error) {
            console.log(error);
            createSuccess = false
        }

        return createSuccess ? res.redirect('/') : res.render('pages/error.pug', {
            error: `This article with title ${req.body.title} has been existed`
        });
    }

    updateBySlug = async (req: Request, res: Response) => {
        const {slug} = req.params;

        const article = await Article.findOne({ slug });

        if (!article) {
            return res.render('pages/error.pug', {
                error: `This article with title ${slug} is not exist`
            });
        }
        
        try {
            await Article.updateOne({ slug }, req.body);
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

        const article = await Article.findOne({ slug });

        if (!article) {
            return res.render('pages/error.pug', {
                error: `This article with title ${slug} is not exist`
            });
        }
        
        try {
            await Article.deleteOne({slug });
        } catch (error) {
            console.log(error);
            return res.render('pages/error.pug', {
                error: `This article with title ${req.body.title} has been deleted`
            });
        }

        return res.redirect('/');
    }
}

export const ArticleController = new Controller();