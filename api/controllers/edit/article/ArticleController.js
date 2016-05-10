/**
 * edit/article/ArticleController
 *
 * @description :: Server-side logic for managing edit/article/articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-extra'),
    config = require('../../../services/config');

module.exports = {


    /**
     *
     * @param req : AppId, file , userId, article-title , article-desc
     * @param res
     */
    publishArticle : function(req,res){
        
        var article = req.body;
        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/article/';
        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName=Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
            });
            var article =req.body;
            article.imageUrl = newFileName;
            Article.create(article).exec(function(err, result) {
                if (err) res.send(err);
                res.send('ok');
            });
        });
    }
};

