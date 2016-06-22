/**
 * Primary Menu controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('PrimaryMenuController', [
		'menusService',
		'appConfig',
		'$timeout',
		'$rootScope',
		function (menusSvc, appConfig,$timeout,$rootScope) {
			'use strict';

			var vm = this;

			function goToGetCategories() {
				menusSvc.getMenuByLocation($rootScope.appId)
					.then(setMenu);
			}
			$timeout(function () {
				goToGetCategories();
			}, 1000);

			function setMenu(menu) {
				vm.menu = menu;
			}

		}
	]);

})(window.angular);
