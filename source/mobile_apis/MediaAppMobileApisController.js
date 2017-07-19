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
    var ObjectID = require('mongodb').ObjectID;

    var url = 'mongodb://localhost:27017/appBuilder';

    MongoClient.connect(url, function(err, db){

       seneca.add( {cmd:'getArticleCategoryByAppId' }, getArticleCategoryByAppId );
       seneca.add( {cmd:'getArticles' }, getArticles );
       seneca.add( {cmd:'getArticleByCategoryId' }, getArticleByCategoryId );
       seneca.add( {cmd:'getArticleById' }, getArticleById );
       seneca.add( {cmd:'getArticleCategoryById' }, getArticleCategoryById );
       seneca.add( {cmd:'getCommentsDummy' }, getCommentsDummy );

    function getArticleCategoryByAppId (req,Done){

            var collection = db.collection('articlecategory');
            collection.find({appId:req.appId}).toArray(function(err, data){
                console.log('getArticleCategoryByAppId'+JSON.stringify(data).replace('_id','id'));
                var Data = JSON.stringify(data).replace(/_id/g,'id');
                var Adata = JSON.parse(Data);
                Done( null, Adata );
            });

    }
    function getArticles (req,Done){

            var collections = db.collection('article');
            console.log('fdsfsf'+req.categoryId);
            console.log('dadeqewqeada'+req.appId);

            collections.find({appId:req.appId,categoryId:req.categoryId}).toArray(function(err, data) {
            console.log('getArticle'+JSON.stringify(data));
                var Data = JSON.stringify(data).replace(/_id/g,'id');
                var Adata = JSON.parse(Data);
                console.log('get articles result:::::'+JSON.stringify(Adata))
                Done( null, Adata );
            });

    }

    /**
         * Return Article Collection for given category ID
         * @param req
         * @param res
         */

    function getArticleByCategoryId (req,Done){

            var collection = db.collection('article');
            collection.find({categoryId:req.categoryId}).toArray(function(err, data) {

                console.log('getArticleByCategoryId'+JSON.stringify(data));
                Done( null, data );
            });
    }

    function getArticleById (req,Done){

            var obj_id = new ObjectID(req.articleId);
            console.log('obj_id'+obj_id);
            var collection = db.collection('article');
            collection.find({_id:obj_id}).toArray(function(err, data) {

                console.log('getArticleById'+JSON.stringify(data[0]));
                Done( null, data[0] );
            });

    }

    function getArticleCategoryById (req,Done){
    console.log('categoryId'+req.categoryId);

            var obj_id = new ObjectID(req.categoryId);
            var collection = db.collection('articlecategory');
            collection.findOne({_id:obj_id}, function(err, data) {
                //console.log("id"+data._id)
                console.log('getArticleCategoryById'+JSON.stringify(data));
                Done( null, data );
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
        Done( null, response );
    }

    })

}

