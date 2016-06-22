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
			wpMenu: siteURL + 'templates/getArticleCategoryByAppId?appId=',  // OK
			wpComments: siteURL + 'wp-json/wp/v2/comments',
			wpCategories: siteURL + 'templates/getArticleCategoryByAppId?appId=', // OK
			wpCategoriesById: siteURL + 'templates/getArticleCategoryById?categoryId=', // OK
			wpItems: siteURL + 'wp-json/wp/v2/posts',
			wpPages: siteURL + 'wp-json/wp/v2/pages'
		};

		var routesConfig = {
			wpMenus: {
				byAppId: function (id) {
					return rootRoutesConfig.wpMenu + id;
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
					return rootRoutesConfig.wpCategories + appId;
				},
				single: function (id) {
					return rootRoutesConfig.wpCategoriesById + id;
				}
			},
			wpItems: {
				all: function (params) {
					return rootRoutesConfig.wpItems + params;
				},
				single: function (id) {
					return rootRoutesConfig.wpItems + '/' + id;
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
