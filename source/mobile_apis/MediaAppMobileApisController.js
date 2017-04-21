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


module.exports = {

    getArticleCategoryByAppId : function(req,res) {
    sails.log.debug("getArticleCategoryByAppId loading..");

    var appId = req.param('appId');
    var searchApp = {
        appId: appId,
    };
        ArticleCategory.find().where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            res.json(result);
    });
},

    getArticleById : function(req,res) {
         sails.log.debug("getArticleById loading..");
        var id = req.param('articleId');
        var searchApp = {
            id : id
        };
        Article.findOne().where(searchApp).exec(function (err, artilce) {
            if (err) return done(err);
            res.json(artilce);
        });
},

    getArticles : function(req,res) {
        sails.log.debug("getArticles loading..");
        var appId = req.param('appId');
        var categoryId = req.param('categoryId');
        //sails.log.info(appId);
        var searchApp = {
            appId: appId,
            categoryId : categoryId
        };
        Article.find({ select: ['appId','title','imageUrl','categoryId']}).where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            //sails.log.info(result);
            res.json(result);
        });
    },


    getArticleCategoryById : function(req,res) {
         sails.log.debug("getArticleCategoryById loading..");
        var id = req.param('categoryId');
        var searchApp = {
            id : id
        };
        ArticleCategory.findOne().where(searchApp).exec(function (err, artilce) {
            if (err) return done(err);
            res.json(artilce);
        });
    },

    /**
     * Return Article Collection for given category ID
     * @param req
     * @param res
     */
    getArticleByCategoryId : function(req,res) {
        sails.log.debug("getArticleByCategoryId loading..");
        var categoryId = req.param('categoryId');
        var searchApp = {
            categoryId : categoryId
        };
        Article.find().where(searchApp).exec(function (err, result) {
            if (err) return done(err);
            res.json(result);
        });
    },
    /**
     * return two dummy comments json object for every request
     *
     * @param req
     * @param res
     */
    getCommentsDummy : function(req,res) {

         sails.log.debug("getCommentsDummy loading..");
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
        res.json(response);
    }



}