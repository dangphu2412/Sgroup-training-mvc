import {Request, Response} from 'express';
import slug from 'slugify';
import Article from '../../model/article';
import {AuthenticatedRequest} from '../auth/guard/jwtAutheticator.guard';
import UserModel from '../../model/user';
import {Types} from 'mongoose';

class Controller {
    create = async (req: Request, res: Response) => {
        const articleExisted = await Article.findOne({title: req.body.title});

        try {
            if (articleExisted) {
                throw Error('This article existed');
            }

            req.body.slug = slug(req.body.title);

            const user = await UserModel.findOne({
                _id: (req as AuthenticatedRequest)['user']['_id']
            })

            if (!user) {
                throw new Error('User is not acceptable')
            }

            req.body.user = user._id;

            await Article.create(req.body);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                stack: error.stack
            })
        }


        return res.status(201).json({
            message: 'Ok create success'
        })
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

export const ArticleController = new Controller();
