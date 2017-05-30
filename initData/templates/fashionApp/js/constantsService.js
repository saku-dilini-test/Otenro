/**
 * Routes Configuration
 *
 * constantsServer js content replace by routsConfigApp content
 *
 */
(function(angular, undefined) {
    angular
        .module('

        .constant('routesConfig', (function () {
            'use strict';

            var siteURL = 'http://localhost:1337';
            var server_url= 'http://192.168.8.56:8080/act?';

            var rootRoutesConfig = {
                wpMenuByAppId: server_url + 'cmd=getArticleCategoryByAppId&appId=',  // OK
                wpComments: server_url + 'cmd=getCommentsDummy', // This part still discussion mode, but get dummy from server
                wpCategoriesByAppId: server_url + 'cmd=getArticleCategoryByAppId&appId=', // OK
                wpCategoriesById: server_url + 'cmd=getArticleCategoryById&categoryId=', // OK
                wpItemsByCatId : server_url + 'cmd=getArticleByCategoryId&categoryId=', // OK
                wpItemById : server_url + 'cmd=getArticleById&articleId=', // OK
                wpAboutUs : server_url + 'cmd=getAboutUsData&appId=', // OK
                wpContactUs : server_url + 'cmd=getContactUs&appId=', // OK
                wpPages: server_url + '', // This part discussion mode yet,
                wpServerUrl : siteURL
            };

            var routesConfig = {
                wpMenus: {
                    byAppId: function (id) {
                        return rootRoutesConfig.wpMenuByAppId + id;
                    }
                },
                wpComments: {
                    all: function () {
                        return rootRoutesConfig.wpComments;
                    }
                },
                wpAboutUs: {
                    aboutUs: function (appId) {
                        return rootRoutesConfig.wpAboutUs + appId;
                    }
                },
                wpContactUs: {
                    contactUs: function (appId) {
                        return rootRoutesConfig.wpContactUs + appId;
                    }
                },
                wpCategories: {
                    all: function (appId) {
                        return rootRoutesConfig.wpCategoriesByAppId + appId;
                    },
                    single: function (id) {
                        return rootRoutesConfig.wpCategoriesById + id;
                    }
                },
                wpItems: {
                    all: function (catId) {
                        return rootRoutesConfig.wpItemsByCatId + catId;
                    },
                    single: function (id) {
                        return rootRoutesConfig.wpItemById + id;
                    }
                },
                wpPages: {
                    all: function () {
                        return rootRoutesConfig.wpPages;
                    },
                    single: function (id) {
                        return rootRoutesConfig.wpPages + '/' + id;
                    }
                },
                wpUrl : {
                    SERVER_URL : function(){
                        return rootRoutesConfig.wpServerUrl;
                    }
                }
            };
            return routesConfig;
        })());

})(window.angular);


// This part is replace by another content
//(function(angular, undefined) {
//    angular
//        .module('invisionApp')
//
//        .constant('constants', {
//            SERVER_URL: 'http://localhost:1337'
//        })
//
//})(window.angular);
