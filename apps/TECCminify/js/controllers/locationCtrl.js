
(function () {
	"use strict";

	angular.module('animateApp')
		.controller('locationCtrl', function($scope, $http,SERVER_URL,DataService,$location) {
			$scope.deliveryOption = "pickUp"
			$scope.cart = DataService.cart;

			$http.get(SERVER_URL+"locations/getBranchLocations")
				.then(function (response) {
					$scope.branchLocations = response.data.result;
				});

			$http.get(SERVER_URL+"locations/getDeliveryLocations")
				.then(function (response) {
					$scope.deliveryLocations = response.data.result;
				});

			$scope.selectDeliveryOption = function(option){
				$scope.cart.selectDeliveryOption(option);
			}

			$scope.saveBranchName = function(name){
				$scope.cart.saveBranchName(name);
				$scope.selectedBranch = $scope.cart.getBranchName();
			}

			$scope.saveLocationName = function(location){
				if(!location){
					$scope.cart.saveLocationName('');
					$scope.cart.saveDeliveryCharges(0);

				}else{
					$scope.cart.saveLocationName(location.locationName);
					$scope.cart.saveDeliveryCharges(location.deliveryCharge);
				}
			}

			$scope.saveDeliveryAddress = function(address){
				$scope.cart.saveDeliveryAddress_01(address.line01);
				$scope.cart.saveDeliveryAddress_02(address.line02);
				$scope.cart.saveName(address.name);
				$scope.cart.saveCity(address.city);
				$scope.cart.saveTelPhone(address.contactNumber);

			}

			$scope.goShoppingCart = function () {
				$location.path('/shoppingCart');
			};


		});
})();
