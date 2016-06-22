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
		'constants',
		function (categoriesSvc, $ionicLoading,$rootScope,$timeout,constants) {
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

				vm.imageUrl =
					constants.SERVER_URL
					+"/templates/viewImages?userId="
					+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=category";

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
