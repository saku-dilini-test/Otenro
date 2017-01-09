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
		'readMadeEasy',
		'$scope',
		function (categoriesSvc, $ionicLoading,$rootScope,$timeout,routesConfig,readMadeEasy,$scope) {
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

				readMadeEasy.readFile().success(function(data){
					$scope.userId = data.userId;
					$scope.appId = data.appId;
				vm.imageUrl =
					routesConfig.wpUrl.SERVER_URL()
					+"/templates/viewImages?userId="
					+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category";
				});
				vm.categories = categories;
			}

			function goToGetCategories() {
				readMadeEasy.readFile().success(function(data){
				categoriesSvc.getCategories(data.appId)
					.then(setCategories)
					.finally(function(){
						$ionicLoading.hide();
					});
					});
			}
			$timeout(function () {
				goToGetCategories();
			}, 1000);

		}
	]);

})(window.angular);
