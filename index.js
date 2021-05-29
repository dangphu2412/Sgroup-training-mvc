const express = require('express');
const {join} = require('path');
const slug = require('slugify');
const methodOverride = require('method-override')

const database = require('./config/database');
const Article = require('./model/article');
const {PORT} = require('./env');

const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

database();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));

// Pages
app.get('/', async (req, res) => {
    const articles = await Article.find().sort('-createdAt');
    return res.render('pages/home.pug', {
        articles
    });
})

app.get('/articles/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})

app.get('/articles/:slug/update', async (req, res, next) => {
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

app.get('/articles/:slug', async (req, res) => {
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

// APIs
app.post('/articles', async (req, res) => {
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

app.put('/articles/:slug', async (req, res) => {
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

app.delete('/articles/:slug', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});