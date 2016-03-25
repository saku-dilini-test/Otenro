(function () {
    "use strict";

angular.module('animateApp')
	.controller('paymentInfoCtrl', function($scope, $http,SERVER_URL,DataService) {
		$scope.deliveryOption = "pickUp"
		$scope.isSubmitButtonDisableValue = 'true';		
		$scope.cart = DataService.cart;
		var data = $scope.cart.getShoppingCart();
		var shoppingCart = {
			'oneDoller' : $scope.cart.getOneDoller()			
		}
		for(var i=0; i < data.length; i++){
			shoppingCart[i] = data[i];
		}

		shoppingCart['cartLength']	 = data.length;
		shoppingCart['pickUpBranch'] = $scope.cart.getBranchName();
		shoppingCart['deliveryCharge'] = $scope.cart.getDeliveryCharges();
		shoppingCart['deliveryLocation'] = $scope.cart.getLocationName();
		shoppingCart['deliveryAddress'] = $scope.cart.getDeliveryAddress();
				
		$http.post(SERVER_URL+"payment/saveShoppingCartWeb",shoppingCart)
			.then(function (response) { 
				if(response.data.result == 'success'){					
					$scope.cart.clearItems();
					localStorage['deliveryOption'] = '';
					localStorage['branchName'] = '';
			        localStorage['locationName'] = '';
			        localStorage['deliveryAddress'] = '';
			        localStorage['deliveryCharges'] = 0;
				}				
          	});
    
	});	
})();