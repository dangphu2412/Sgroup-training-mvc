const express = require('express');
const Article = require('../model/article');

const router = express.Router();

const articleRouter = require('./article');
const authRouter = require('./auth');

// DEFAULT PAGE
router.get('/', async (req, res) => {
    console.log(req.signedCookies);
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
})

router.use('/articles', articleRouter);
router.use('/auth', authRouter);

module.exports = router;