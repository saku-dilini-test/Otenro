
(function () {
    "use strict";

angular.module('animateApp')
	.controller('locationCtrl', function($scope, $http,SERVER_URL,DataService,$location) {
		$scope.deliveryOption = "pickUp";
		$scope.cart = DataService.cart;
		$scope.isPassedDate = false;
		$scope.isOutOfHours = false;

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
			$scope.setPickUpDate = '';
			$scope.setPickUpTime = '';
			$scope.setDeliveryDate = '';
			$scope.setDeliveryTime = '';
			$scope.isPassedDate = false;
			$scope.isOutOfHours = false;
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
			$scope.cart.saveEmail(address.email);
		}

		$scope.savePickUpDate = function(date){
			var pickDate = date.getDate() + ' - ' + ( date.getMonth() + 1 ) + ' - ' + date.getFullYear();
			$scope.setPickUpDate = pickDate;
			$scope.cart.savePickUpDate(pickDate);

			var pickTime = formatAMPM(date);
			$scope.setPickUpTime = pickTime;
			$scope.cart.savePickUpTime(pickTime);

			var currentDate = new Date();
			$scope.isOutOfHours = false;
			if(date < currentDate){
				$scope.isPassedDate = true;
			}else{
				$scope.isPassedDate = false;
				var hours = date.getHours();
				if(8 <= hours && hours < 22){
					var minutes = date.getMinutes();
					if(hours == 21 && minutes == 30){
						$scope.isOutOfHours = true;
					}
				}else{
					$scope.isOutOfHours = true;
				}
			}
		}
		// save Delivery Date and Time
		$scope.saveDeliveryDate = function(date){
			var deliveryDate = date.getDate() + ' - ' + ( date.getMonth() + 1 ) + ' - ' + date.getFullYear();
			$scope.setDeliveryDate = deliveryDate;
			$scope.cart.saveDeliveryDate(deliveryDate);

			var deliveryTime = formatAMPM(date);
			$scope.setDeliveryTime = deliveryTime;
			$scope.cart.saveDeliveryTime(deliveryTime);

			var currentDate = new Date();
			$scope.isOutOfHours = false;
			if(date < currentDate){
				$scope.isPassedDate = true;
			}else{
				$scope.isPassedDate = false;
				var hours = date.getHours();
				if(10 <= hours && hours < 21){
					var minutes = date.getMinutes();
					if(hours == 20 && minutes == 30){
						$scope.isOutOfHours = true;
					}
				}else{
					$scope.isOutOfHours = true;
				}
			}
		};

		function formatAMPM(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
			return strTime;
		}

		$scope.minDate = new Date(2016, 8, 22);


		$scope.saveComment = function(comment){
			$scope.comment = comment;
			$scope.cart.saveComment(comment);
		}
		$scope.goShoppingCart = function () {
			$location.path('/shoppingCart');
		};


	});	
})();
