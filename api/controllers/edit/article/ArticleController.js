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
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    getArticles : function(req,res){

        var appId = req.param('appId');
        var searchQuery = {
            appId : appId
        };

        Article.find(searchQuery).exec(function(err,result) {
            if (err) return done(err);
            res.send(result);
        });
    },
    /**
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    getCategoryList : function(req,res){

        var appId = req.param('appId');
        var searchQuery = {
            appId : appId
        };

        ArticleCategory.find(searchQuery).exec(function(err,result) {
            if (err) return done(err);
            res.send(result);
        });
    },

    /**
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    addCategory : function(req,res){

        var appId = req.param('appId');
        var data = req.body;
        data.appId = appId;

        ArticleCategory.create(data).exec(function(err,result) {
            if (err) return done(err);
            res.send(result);
        });
    },
    /**
     * delete collection of article category given Id
     *
     * @param req Id
     * @param res result
     */
    deleteCategory : function(req,res){

        var id = req.body.id;
        var deleteQuery = {
            id : id
        };
        ArticleCategory.destroy(deleteQuery).exec(function(err,result) {
           if (err) return res.send(err);
            res.send(result);
        });
    },
    editCategory : function(req,res){
        var editQuery = {
            appId : req.body.appId,
            id:req.body.id
        };
        ArticleCategory.update(editQuery,{"name":req.body.name}).exec(function(err,result) {
            if (err) return done(err);
            res.send(result);
        });
    },

    updateCategoryImage : function(req,res){

        var filePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/category/'+ req.body.imageUrl;
        var desPath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/category/';

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

            console.log("req.body.imageUrl " + req.body.imageUrl);

            fs.rename(uploadedFiles[0].fd, desPath+req.body.imageUrl, function (err) {
                if (err) return res.send(err);
                res.json({ok:true});
            });
        });
    },

    /**
     *
     * @param req : AppId, file , userId, article-title , article-desc
     * @param res
     */
    publishArticle : function(req,res){
        
        var article = req.body;
        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/article/';

        if(article.isNewArticle == 'true'){
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
                    res.send({categoryId : article.categoryId});
                });
            });
        }else if(article.isImageUpdate == 'false'){
            var updateQuery = { id : article.id};
            var data = article;
            Article.update(updateQuery,data).exec(function(err, result) {
                if (err) res.send(err);
                //console.log(result);
                res.send({categoryId : article.categoryId});
            });

        }else if(article.isImageUpdate == 'true'){
            req.file('file').upload({
                dirname: require('path').resolve(dePath)
            },function (err, uploadedFiles) {
                if (err) return res.send(500, err);

                var newFileName=Date.now()+'.png';
                fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                    if (err) return res.send(err);
                });

                article.imageUrl = newFileName;
                var updateQuery = { id : article.id};
                var data = article;
                Article.update(updateQuery,data).exec(function(err, result) {
                    if (err) res.send(err);
                    //console.log(result);
                    res.send({categoryId : article.categoryId});
                });
            });
        }
    },

    /**
     * Delete article collection given Id
     * Remove article related image inside of 'img/article' of template directory
     *
     * @param req : article Id , AppId, imageUrl
     * @param res :
     */
    deleteArticle : function(req,res){

        var appId = req.body.appId;
        var imageUrl = req.body.imageUrl;
        var deleteQuery = {
             id : req.body.id
        }

        Article.destroy(deleteQuery).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);
            var filePath = config.ME_SERVER + req.userId + '/templates/' + appId+ '/img/article/'+ imageUrl;
            fs.unlink(filePath, function (err) {
                if (err) return callback("Error while deleting " + err.message);
                res.send(200,{message:'Deleted Article'});
            });
        });
    }
};

