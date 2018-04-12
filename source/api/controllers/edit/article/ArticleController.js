/**
 * edit/article/ArticleController1224
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
    getArticles: function (req, res) {

        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };


        Article.find(searchQuery).exec(function (err, result) {
            if (err) {
                sails.log.error("Article Collection find Error for given appId : " + appId);
                return done(err);
            }
            res.send(result);
        });
    },



    /**
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    getCategoryList: function (req, res) {

        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };

        ArticleCategory.find(searchQuery).exec(function (err, result) {
            if (err) {
                sails.log.error("Article Category Collection find Error for given appId : " + appId);
                return done(err);
            }
            res.send(result);
        });
    },

    /**
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    addCategory: function (req, res) {

        var data = req.body;
        var appId = req.param('appId');
        data.appId = appId;

        ArticleCategory.create(data).exec(function (err, result) {
            if (err) {
                sails.log.error("Article Category Create Error");
                return done(err);
            }
            res.send(result);
        });
    },

    /**
     * delete collection of article category given Id
     *
     * @param req Id
     * @param res result
     */
    deleteCategory: function (req, res) {

        console.log("deleted");
        var id = req.body.id;
        var deleteQuery = {
            id: id
        };
        ArticleCategory.find(deleteQuery).exec(function (err, main) {

            if (err) res.send(err);
            ArticleCategory.destroy(deleteQuery).exec(function (err, result) {
                if (err) {
                    sails.log.error("Article Category Delete Error");
                    return res.send(err);
                }

                var filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/';
                var filePathArticle = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/thirdNavi/';

                result.forEach(function (result) {
                    fs.unlink(filePath + result.imageUrl, function (err) {
                        if (err) return console.error(err);
                    });
                });
                Article.find({ categoryId: id }).exec(function (err, child) {
                    if (err) return callback("Error while deleting " + err.message);
                    if (child) {
                        child.forEach(function (product) {
                            Article.destroy({ categoryId: id }).exec(function (err, result) {
                                if (err) return callback("Error while deleting " + err.message);

                                result.forEach(function (results) {
                                    fs.unlink(filePathArticle + results.imageUrl, function (err) {
                                        if (err) return console.error(err);
                                    });
                                });

                            })
                        })
                    }

                })
                res.send(200, { message: ' Category deleted' });

            });
        });
    },

    /**
     * update article category name for given  app Id
     *
     * @param req appId, Article Category ID, Article Category Name
     * @param res result
     */
    editCategory: function (req, res) {
        var updateQuery = {
            appId: req.body.appId,
            id: req.body.id
        };

        ArticleCategory.update(updateQuery, req.body).exec(function (err, result) {
            if (err) {
                sails.log.error("Article Category Name Edit Error");
                return res.send(err);
            }
            res.send(result);
        });
    },

    /**
     * Update article category Image for given appID
     *
     * @param req
     * @param res
     */
    updateCategoryImage: function (req, res) {

        var isNew = req.body.isNew;

        var filePath;
        var fileDir;

        if (isNew == 'true' || isNew == true) {
            filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/' + req.body.imageUrl;
            fileDir = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/';
        } else {
            filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/category/' + req.body.imageUrl;
            fileDir = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/category/';
        }

        req.file('file').upload({
            dirname: require('path').resolve(fileDir)
        }, function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

            if (typeof req.body.imageUrl != "undefined") {
                // Create new img file name using date.now()
                var fileName = Date.now() + '.png';
                fs.rename(uploadedFiles[0].fd, fileDir + fileName, function (err) {
                    if (err) return res.send(err);
                    // New img file name send back to update to menu collection
                    res.json({ ok: true, imageUrl: fileName });
                });
            } else {
                res.json({ ok: true });
            }


        });
    },

    /**
     *
     * @param req : AppId, file , userId, article-title , article-desc
     * @param res
     */
    publishArticle: function (req, res) {

        var isNew = req.body.isNew;
        var randomstring = require("randomstring");
        var tmpImage = req.body.articleImages;
        var delImages = req.body.deleteImages;

        var article = req.body;
        console.log("**************");
        console.log(tmpImage.length);
        console.log(article);
        console.log(req.body.isNewArticle);
        console.log("**************");
        var fileDir;
        if(isNew == true || isNew == 'true'){
            fileDir= config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/thirdNavi/';
         }else{
            fileDir= config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/article/';
         }

        console.log(article.tempImageArray);
        if (typeof article.tempImageArray == 'undefined') {
            article.tempImageArray = [];
        }
        if(delImages.length > 0){
            for(var i = 0; i < delImages.length; i++){
                fs.unlink(fileDir + delImages[i].img, function (err) {
                    if (err) return console.error(err);
                });
            }
        }

        for (var i = 0; i < tmpImage.length; i++) {

            if(tmpImage[i].img){
                if (!tmpImage[i].img.match("http")) {
                    var imgeFileName = randomstring.generate() + ".png";
                    console.log("imgeFileName :  " + imgeFileName);
                    var data = tmpImage[i].img.replace(/^data:image\/\w+;base64,/, "");
                    var buf = new Buffer(data, 'base64');
                    // product images copy to app file server
                    if (isNew == 'true' || isNew == true) {
                        console.log(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                            req.body.appId + '/src/assets/images/thirdNavi/' + imgeFileName);
                        fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                            req.body.appId + '/src/assets/images/thirdNavi/' + imgeFileName, buf, function (err) {
                                if (err) {
                                    return res.send(err);
                                }
                            });
                    } else {
                        console.log("inside template ")
                        fs.writeFile(config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/article/' + imgeFileName, buf, function (err) {
                                if (err) {
                                    return res.send(err);
                                }
                            });
                    }
                    if(tmpImage[i].videoUrl){
                            article.tempImageArray.push({ img: imgeFileName,videoUrl: tmpImage[i].videoUrl, url : true});
                    }else{
                            article.tempImageArray.push({ img: imgeFileName, videoUrl: null, url:null});
                    }
                    article.imageUrl = imgeFileName;
                    finelImages = null;

              }else{
                   if(tmpImage[i].videoUrl){
                        article.tempImageArray[i].videoUrl = tmpImage[i].videoUrl;
                        article.tempImageArray[i].url = tmpImage[i].url;
                   }
              }
            }else if (!tmpImage[i].img && tmpImage[i].videoUrl){

                    if(tmpImage.length == article.tempImageArray.length){
                        article.tempImageArray[i].videoUrl = tmpImage[i].videoUrl;
                        article.tempImageArray[i].url = tmpImage[i].url;
                    }else{
                        article.tempImageArray.push({ img: null, videoUrl: tmpImage[i].videoUrl, url:tmpImage[i].url});
                    }


//                    for(var i =0: i < article.tempImageArray.length; i++){
//                        if(article.tempImageArray[i].){
//
//                        }
//                    }
//                     if(!article.tempImageArray[i].videoUrl){
//                            article.tempImageArray[i].videoUrl = tmpImage[i].videoUrl;
//                            article.tempImageArray[i].url = tmpImage[i].url;
//                      }else{
//                      }

            }
        }

        var searchQuery = {
            'id': req.body.id
        }

        if (req.body.isNewArticle == true || req.body.isNewArticle == 'true') {
                 Article.create(article).exec(function(err, result) {
                    if (err) res.send(err);
                    res.send({categoryId : article.categoryId});
                });
        }else{

                 Article.update(searchQuery,article).exec(function(err, result) {
                      if (err) res.send(err);
                      res.send({categoryId : article.categoryId});
                });
        }

        //
        //        if(article.isNewArticle == 'true'){
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        ////            req.file('file').upload({
        ////                dirname: require('path').resolve(fileDir)
        ////            },function (err, uploadedFiles) {
        ////                if (err) return res.send(500, err);
        ////
        ////                var newFileName=Date.now()+'.png';
        ////                fs.rename(uploadedFiles[0].fd, fileDir+'/'+newFileName, function (err) {
        ////                    if (err) return res.send(err);
        ////                });
        ////                var article =req.body;
        ////                article.imageUrl = newFileName;
        ////                Article.create(article).exec(function(err, result) {
        ////                    if (err) res.send(err);
        ////                    res.send({categoryId : article.categoryId});
        ////                });
        ////            });
        //
        //
        //
        //
        //        }else if(article.isImageUpdate == 'false'){
        //            var updateQuery = { id : article.id};
        //            var data = article;
        //            Article.update(updateQuery,data).exec(function(err, result) {
        //                if (err) res.send(err);
        //                //sails.log.info(result);
        //                res.send({categoryId : article.categoryId});
        //            });
        //
        //        }else if(article.isImageUpdate == 'true'){
        //            req.file('file').upload({
        //                dirname: require('path').resolve(fileDir)
        //            },function (err, uploadedFiles) {
        //                if (err) return res.send(500, err);
        //
        //                var newFileName=Date.now()+'.png';
        //
        //                fs.unlink(fileDir + article.oldImg, function (err) {
        //                    if (err) return console.error(err);
        //                });
        //
        //                fs.rename(uploadedFiles[0].fd, fileDir+'/'+newFileName, function (err) {
        //                    if (err) return res.send(err);
        //                });
        //
        //                article.imageUrl = newFileName;
        //                var updateQuery = { id : article.id};
        //                var data = article;
        //                Article.update(updateQuery,data).exec(function(err, result) {
        //                    if (err) res.send(err);
        //                    //sails.log.info(result);
        //                    res.send({categoryId : article.categoryId});
        //                });
        //            });
        //        }
    },

    /**
     * Delete article collection given Id
     * Remove article related image inside of 'img/article' of template directory
     *
     * @param req : article Id , AppId, imageUrl
     * @param res :
     */
    deleteArticle: function (req, res) {
        var isNew = req.body.isNew;
        var appId = req.body.appId;
        var imageUrl = req.body.imageUrl;
        var deleteQuery = {
            id: req.body.id
        }

        var filePath;

        if (isNew == true || isNew == 'true') {
            filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/thirdNavi/' + imageUrl;;
        } else {
            filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/article/' + imageUrl;
        }


        Article.destroy(deleteQuery).exec(function (err) {
            if (err) return res.send(err);
            fs.unlink(filePath, function (err) {
                res.send(200, { message: 'Deleted Article' });
            });
        });
    }
};

