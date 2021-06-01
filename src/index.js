const express = require('express');
const {join} = require('path');
const slug = require('slugify');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');

const database = require('./config/database');
const Article = require('./model/article');
const {PORT, COOKIE_SECRET} = require('./env');
const router = require('./router');

const ROOT_DIR = process.cwd();
const PUBLIC_PATH = join(ROOT_DIR, 'public');
const VIEW_PATH = join(ROOT_DIR, 'views');
const app = express();

database();

app.set('view engine', 'pug');
app.set('views', VIEW_PATH);
app.use(cookieParser(COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))
app.use(express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000
}));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});