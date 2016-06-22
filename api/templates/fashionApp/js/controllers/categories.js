/**
 * Categories controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('CategoriesController', [
		'categoriesService',
		'$ionicLoading',
		'$rootScope',
		'$timeout',
		function (categoriesSvc, $ionicLoading,$rootScope,$timeout) {
			'use strict';

			var vm = this;

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			function setCategories(categories) {
				vm.categories = categories;
			}

			function goToGetCategories() {
				categoriesSvc.getCategories($rootScope.appId)
					.then(setCategories)
					.finally(function(){
						$ionicLoading.hide();
					});
			}
			$timeout(function () {
				goToGetCategories();
			}, 1000);

		}
	]);

})(window.angular);
