import {Request, Response} from 'express';

import express from 'express';
import {authRequired, authNotRequired} from '../middleware/auth.middleware';
import Article from '../model/article';

const router = express.Router();

import articleRouter from './article/article.router';
import authRouter from './auth/auth.router';

// DEFAULT PAGE
router.get('/', authRequired, async (req: Request, res: Response) => {
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
})

router.use('/articles', articleRouter);
router.use('/auth', authNotRequired, authRouter);

export default router;
