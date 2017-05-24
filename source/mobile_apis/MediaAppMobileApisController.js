/**
 * Created by kalani on 03/31/17.
 */
/**
 * MediaAppMobileApisController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;

module.exports = function(option) {

    var seneca = this;
    var MongoClient = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/appBuilder';

    MongoClient.connect(url, function(err, db){

       seneca.add( {cmd:'getArticleCategoryByAppId' }, getArticleCategoryByAppId );
       seneca.add( {cmd:'getArticles' }, getArticles );
       seneca.add( {cmd:'getArticleByCategoryId' }, getArticleByCategoryId );
       seneca.add( {cmd:'getArticleById' }, getArticleById );
       seneca.add( {cmd:'getCommentsDummy' }, getCommentsDummy );


    function getArticleCategoryByAppId (req,Done){

            var collection = db.collection('articlecategory');
            collection.findOne({appId:req.appId}, function(err, data) {
                console.log('getArticleCategoryByAppId'+JSON.stringify(data));

                Done( null, { ArticleData:data} );
            });

    }

    function getArticles (req,Done){

            var collections = db.collection('article');
            console.log('dadada'+req.categoryId);
            console.log('dadada'+req.appId);

            collections.findOne({appId:req.appId,categoryId:req.categoryId}, function(err, data) {
            console.log('getArticle'+JSON.stringify(data));
                var result={
                    'appId':data.appId,
                    'title':data.title,
                    'imageUrl':data.imageUrl,
                    'categoryId':data.categoryId
                }
                Done( null, { data:result} );
            });

    }


    /**
         * Return Article Collection for given category ID
         * @param req
         * @param res
         */



    function getArticleByCategoryId (req,Done){

            var collection = db.collection('article');
            collection.findOne({categoryId:req.categoryId}, function(err, data) {

                console.log('dadada'+req.categoryId);
                Done( null, { result:data} );
            });

    }

    function getArticleById (req,Done){

            var obj_id = new ObjectID(req.articleId);
            var collection = db.collection('article');
            collection.findOne({_id:obj_id}, function(err, data) {

                console.log('dadada'+req.categoryId);
                Done( null, { data:data} );
            });

    }



    function getArticleCategoryById (req,Done){

            var obj_id = new ObjectID(req.articleId);
            var collection = db.collection('articlecategory');
            collection.findOne({_id:obj_id}, function(err, data) {
                console.log("id"+_id)
                console.log('dadada'+req.categoryId);
                Done( null, { result:data} );
            });

    }


    /**
         * return two dummy comments json object for every request
         *
         * @param req
         * @param res
         */

    function getCommentsDummy (req,Done){

        var response = [
            {
                author : {
                    avatar : 'img/comments/M9.png',
                    name : 'M9 Train'
                },
                description : 'The Alstom Prima or the Class M9 '
            },
            {
                author : {
                    avatar : 'img/comments/S12.png',
                    name : 'S12 Train'
                },
                description : 'There will be two S12 (Luxury) sets '
            }
        ];
        Done( null, { result:response} );
    }

    })



}

