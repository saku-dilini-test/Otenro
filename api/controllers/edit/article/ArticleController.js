/**
 * edit/article/ArticleController
 *
 * @description :: Server-side logic for managing edit/article/articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-extra'),
    config = require('../../../services/config');

module.exports = {


    publishArticle : function(req,res){

        /**
         * TODO : Image update part should integrate
         * @type {req.body|{}}
         */
        var article = req.body;
            Article.create(article).exec(function(err, result) {
                if (err) res.send(err);
                res.send('ok');
            });
    }
};

