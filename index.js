const express = require('express');
const {join} = require('path');

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

app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));

// Pages
app.get('/', 
// (req, res, next) => {
//     console.log("Go to middeware");
//     return res.status(400).send('Dung o day')
// },
async (req, res) => {
    const articles = await Article.find();
    return res.render('pages/home.pug', {
        articles
    });
})

app.get('/articles/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})

app.post('/articles', async (req, res) => {
    let createSuccess = true;
    const articleExisted = await Article.findOne({title: req.body.title}).exec();

    if (articleExisted) {
        return res.render('pages/error.pug');
    }

    try {
        await Article.create(req.body);
    } catch (error) {
        console.log(error);
        createSuccess = false
    }

    return createSuccess ? res.redirect('/') : res.render('pages/error.pug');
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});