
(function () {
    "use strict";

angular.module('animateApp')
	.controller('locationCtrl',['$scope','$http','SERVER_URL','DataService',function($scope, $http,SERVER_URL,DataService) {
		$scope.deliveryOption = "pickUp";
		$scope.isSubmitButtonDisableValue = 'true';
		$scope.cart = DataService.cart;
		var i = 0;

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
			$scope.isSubmitButtonDisableValue = $scope.cart.isSubmitButtonDisable();
		}

		$scope.saveBranchName = function(name){
			$scope.cart.saveBranchName(name);			
			$scope.selectedBranch = $scope.cart.getBranchName();				
			$scope.isSubmitButtonDisableValue = $scope.cart.isSubmitButtonDisable();
			i = i +1;
			if(i == 1) {
				$scope.isSubmitButtonDisableValue = false;
			}
		}

		$scope.saveLocationName = function(location){
			if(!location){
				$scope.cart.saveLocationName('');
				$scope.cart.saveDeliveryCharges(0);

			}else{
				$scope.cart.saveLocationName(location.locationName);
				$scope.cart.saveDeliveryCharges(location.deliveryCharge);
			}
			$scope.isSubmitButtonDisableValue = $scope.cart.isSubmitButtonDisable();
		}

		$scope.saveDeliveryAddress = function(address){
			var tempAddresss = address.line01 +''+ address.line02;
			var tempCity = address.city;
			var tempContactNumber = address.contactNumber;
			$scope.cart.saveDeliveryAddress(tempAddresss);
			$scope.cart.saveCurrentCity(tempCity);
			$scope.cart.saveCurrentContactNumber(tempContactNumber);
			$scope.isSubmitButtonDisableValue = $scope.cart.isSubmitButtonDisable();

		}


	}]);
})();
