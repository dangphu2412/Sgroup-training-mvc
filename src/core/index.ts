import {Request, Response} from 'express';

import express from 'express';
import Article from '../model/article';

const router = express.Router();

import articleRouter from './article/article.router';
import authRouter from './auth/auth.router';
import mediaRouter from './document/media.router';

// DEFAULT PAGE
router.get('/', async (req: Request, res: Response) => {
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
})

router.use('/articles', articleRouter);
router.use('/auth', authRouter);
router.use('/media', mediaRouter);
export default router;
