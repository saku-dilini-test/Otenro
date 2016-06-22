/**
 * Items controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('CategoryController', [
		'$q',
		'$stateParams',
		'itemsService',
		'categoriesService',
		'$scope',
		'$rootScope',
		'appConfig',
		'constants',
		function ($q, $stateParams, itemsSvc, categoriesSvc, $scope, $rootScope, appConfig,constants) {
			'use strict';

			var vm = this;
			vm.noMoreItemsAvailable = false;


			vm.items = [];
			vm.loadData = loadData;

			vm.imageUrl =
				constants.SERVER_URL
				+"/templates/viewImages?userId="
				+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=article";

			function loadData() {
				//itemsSvc.getItems({
				//	'filters': {'cat': parseInt($stateParams.categoryId, 10)},
				//	'params': {'offset': vm.items.length, 'per_page': appConfig.maxItemsPaging}
				//}).then(setItems);
				itemsSvc.getItems($stateParams.categoryId).then(setItems);
			}

			categoriesSvc.getCategory($stateParams.categoryId).then(setCategory);

			function setCategory(response) {
				vm.category = response;
			}

			function setItems(response) {
				if (response.length === 0) {
					vm.noMoreItemsAvailable = true;
				} else {
					//vm.items = vm.items.concat(response);
					vm.noMoreItemsAvailable = true;
					vm.items = response;
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
		}
	]);

})(window.angular);
