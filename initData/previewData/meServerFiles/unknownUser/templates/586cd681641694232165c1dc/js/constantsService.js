/**
 * Routes Configuration
 *
 * constantsServer js content replace by routsConfigApp content
 *
 */
(function(angular, undefined) {
    angular
        .module('invisionApp')

        .constant('routesConfig', (function () {
            'use strict';

            var siteURL = 'http://localhost:1337';

            var rootRoutesConfig = {
                wpMenuByAppId: siteURL + '/templates/getArticleCategoryByAppId?appId=',  // OK
                wpComments: siteURL + '/templates/getCommentsDummy', // This part still discussion mode, but get dummy from server
                wpCategoriesByAppId: siteURL + '/templates/getArticleCategoryByAppId?appId=', // OK
                wpCategoriesById: siteURL + '/templates/getArticleCategoryById?categoryId=', // OK
                wpItemsByCatId : siteURL + '/templates/getArticleByCategoryId?categoryId=', // OK
                wpItemById : siteURL + '/templates/getArticleById?articleId=', // OK
                wpAboutUs : siteURL + '/edit/getAboutUsData?appId=', // OK
                wpContactUs : siteURL + '/templates/getContactUs?appId=', // OK
                wpPages: siteURL + '', // This part discussion mode yet,
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
