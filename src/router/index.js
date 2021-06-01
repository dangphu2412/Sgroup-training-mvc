const express = require('express');
const { authRequired, authNotRequired } = require('../middleware/auth.middleware');
const Article = require('../model/article');

const router = express.Router();

const articleRouter = require('./article');
const authRouter = require('./auth');

// DEFAULT PAGE
router.get('/', authRequired, async (req, res) => {
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
})

router.use('/articles', articleRouter);
router.use('/auth', authNotRequired, authRouter);

module.exports = router;