const express = require('express');
const {join} = require('path');

const database = require('./config/database');
const Article = require('./model/article');

const PORT = 3000;
const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

database();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(express.static(PUBLIC_PATH));

// Pages
app.get('/', async (req, res, next) => {
    const articles = await Article.find();
    return res.render('pages/home.pug', {
        articles
    });
})

app.get('/articles/new', (req, res, next) => {
    return res.render('pages/newArticle.pug');
})


// Rest APIs
app.post('/articles', (req, res, next) => {
    return res.json({
        message: 'Hello world'
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});