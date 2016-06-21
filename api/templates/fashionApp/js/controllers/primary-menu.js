/**
 * Primary Menu controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('PrimaryMenuController', [
		'menusService',
		'appConfig',
		function (menusSvc, appConfig) {
			'use strict';

			var vm = this;

			menusSvc.getMenuByLocation(appConfig.menuLocation)
				.then(setMenu);

			function setMenu(menu) {
				vm.menu = menu;
			}

		}
	]);

})(window.angular);
