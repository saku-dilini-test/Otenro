/**
 * Pages service
 */
(function(angular, undefined) {
	angular
		.module('invisionApp')

		.service('pagesService', [
			'$http',
			'routesConfig',
			function ($http, routesCfg) {
				'use strict';

				function _transformPageData(data) {
					return {
						id: data.id,
						title: data.title.rendered,
						date: data.date,
						description: data.content.rendered
					};
				}

				function getPageById(pageId) {
					return $http.get(routesCfg.wpPages.single(pageId))
						.then(function(page) {
							return _transformPageData(page.data);
						});
				}

				function getAboutUs(appId) {
					return $http.get(routesCfg.wpAboutUs.aboutUs(appId))
						.then(function(response) {
							return response.data;
						});
				}
				function getContactUs(appId) {
                	return $http.get(routesCfg.wpContactUs.contactUs(appId))
                		.then(function(response) {
                			return response.data;
                		});
                }

				return {
					getPageById: getPageById,
					getAboutUs: getAboutUs,
					getContactUs: getContactUs,
				};
			}
		]);

})(window.angular);
