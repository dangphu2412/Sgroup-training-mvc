import express from 'express';
import Article from '../../model/article';
import { ArticleController } from './article.controller';

const router = express.Router();

router.post('/', ArticleController.create);

router.put('/:slug', ArticleController.updateBySlug);

router.delete('/:slug', ArticleController.deleteBySlug)

// Pages
router.get('/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})

router.get('/:slug/update', async (req, res, next) => {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    if (!article) {
        return res.render('pages/error.pug', {
            error: 'Not found article with title ' + slug
        });
    }
    return res.render('pages/updateArticle.pug', {
        article
    });
})

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    if (!article) {
        return res.render('pages/error.pug', {
            error: 'Not found article with title ' + slug
        });
    }
    return res.render('pages/detail.pug', {
        article
    });
})


export default router;