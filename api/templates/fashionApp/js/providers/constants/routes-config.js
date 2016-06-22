/**
 * Routes Configuration
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.constant('routesConfig', (function () {
		'use strict';

		var siteURL = 'http://localhost:1337/';

		var rootRoutesConfig = {
			wpMenuByAppId: siteURL + 'templates/getArticleCategoryByAppId?appId=',  // OK
			wpComments: siteURL + 'wp-json/wp/v2/comments',
			wpCategoriesByAppId: siteURL + 'templates/getArticleCategoryByAppId?appId=', // OK
			wpCategoriesById: siteURL + 'templates/getArticleCategoryById?categoryId=', // OK
			wpItemsByCatId : siteURL + 'templates/getArticleByCategoryId?categoryId=', // OK
			wpItemById : siteURL + 'templates/getArticleById?articleId=', // OK
			wpPages: siteURL + 'wp-json/wp/v2/pages'
		};

		var routesConfig = {
			wpMenus: {
				byAppId: function (id) {
					return rootRoutesConfig.wpMenuByAppId + id;
				}
			},
			wpComments: {
				all: function (params) {
					return rootRoutesConfig.wpComments + params;
				},
				single: function (id) {
					return rootRoutesConfig.wpComments + '/' + id;
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
			}
		}

		return routesConfig;
	})());

})(window.angular);
