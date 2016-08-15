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
		'routesConfig',
		function (categoriesSvc, $ionicLoading,$rootScope,$timeout,routesConfig,readMadeEasy) {
			'use strict';

			var vm = this;
			vm.appName = $rootScope.appName;

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			function setCategories(categories) {

				if (typeof $rootScope.appId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appId = data.appId;
					});
				}

				if (typeof $rootScope.userId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.userId = data.userId;
					});
				}
				if (typeof $rootScope.appName === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appName = data.name;
					});
				}


				vm.imageUrl =
					routesConfig.wpUrl.SERVER_URL()
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
