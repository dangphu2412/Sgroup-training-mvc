const {model} = require('mongoose');

const ArticleModel = model('articles', {
    title: String,
    content: String
});

module.exports = ArticleModel;