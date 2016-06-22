/**
 * Menus service
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.service('menusService', [
		'$http',
		'routesConfig',
		function ($http, routesCfg) {
			'use strict';

			function prepMenuData(data) {
				var preparedData = [];

				for (var index = 0, dLength = data.length; index < dLength; index++) {

					data[index].sref = 'app.category({categoryId:"'+ data[index].id +'"})';

					//if (data[index].object === 'page') {
					//	data[index].sref = 'app.page({pageId:' + data[index].object_id + '})';
					//}
                    //
					//if (data[index].object === 'custom') {
					//	data[index].sref = data[index].description;
					//}

					preparedData.push(data[index]);
				}

				return preparedData;
			}

			function getMenuByLocation(id) {
				return $http.get(routesCfg.wpMenus.byAppId(id))
					.then(function(response) {
						return prepMenuData(response.data);
					});
			}

			return {
				getMenuByLocation: getMenuByLocation
			};
		}
	]);

})(window.angular);
