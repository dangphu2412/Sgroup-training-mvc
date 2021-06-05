import express from 'express';
import slug from 'slugify';
const router = express.Router();

import Article from '../../model/article';


router.post('/', async (req, res) => {
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
})

router.put('/:slug', async (req, res) => {
    const {slug} = req.params;

    const article = await Article.findOne({ slug });

    if (!article) {
        return res.render('pages/error.pug', {
            error: `This article with title ${slug} is not exist`
        });
    }
    
    try {
        await Article.updateOne({slug }, req.body);
    } catch (error) {
        console.log(error);
        return res.render('pages/error.pug', {
            error: `This article with title ${req.body.title} has been existed`
        });
    }

    return res.redirect('/');
})

router.delete('/:slug', async (req, res) => {
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
})

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