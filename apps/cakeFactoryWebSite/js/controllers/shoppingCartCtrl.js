(function () {
    "use strict";

angular.module('animateApp')
    .controller('shoppingCartCtrl', function($scope, $http,$routeParams,SERVER_URL,DataService) { 		
        $scope.SERVER_URL = SERVER_URL;
        $scope.cart = DataService.cart;
     
        $http.get(SERVER_URL+"products/oneUSD")
            .then(function (response) {
                $scope.oneDoller = response.data.result;  
                $scope.cart.saveOneDoller($scope.oneDoller);                
        });       

        // before redirect to PayPal, Cart info send to server to save
        $scope.saveCartInServer = function () {

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
            shoppingCart['deliveryAddress_01'] = $scope.cart.getDeliveryAddress_01();
            shoppingCart['deliveryAddress_02'] = $scope.cart.getDeliveryAddress_02();
            shoppingCart['name'] = $scope.cart.getName();
            shoppingCart['city'] = $scope.cart.getCity();
            shoppingCart['telPhone'] = $scope.cart.getTelPhone();
            shoppingCart['comment'] = $scope.cart.getComment();
            shoppingCart['pickUpDate'] = $scope.cart.getPickUpDate();
            shoppingCart['pickUpTime'] = $scope.cart.getPickUpTime();
            shoppingCart['paymentStatus'] = 'Pending';
            //cart info save api
            $http.post(SERVER_URL+"payment/saveShoppingCartWeb",shoppingCart)
                .then(function (response) {
                });
        }

    });
})();

