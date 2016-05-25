/**
 * Created by amila on 5/25/16.
 */


(function () {
    "use strict";

    angular.module('animateApp')
        .controller('mobilePaymentInfoCtrl', function($scope, $http,SERVER_URL,DataService) {
            $scope.deliveryOption = "pickUp"

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
            $http.post(SERVER_URL+"payment/saveShoppingCartWeb",shoppingCart)
                .then(function (response) {
                    if(response.data.result == 'success'){
                        $scope.cart.clearItems();
                        localStorage['deliveryOption'] = '';
                        localStorage['pickUpBranch'] = '';
                        localStorage['deliveryCharges'] = 0;
                        localStorage['deliveryLocation'] = '';
                        localStorage['deliveryAddress_01'] = '';
                        localStorage['deliveryAddress_02'] = '';
                        localStorage['name'] = '';
                        localStorage['city'] = '';
                        localStorage['telPhone'] = 0;
                    }
                });

            $scope.$destroy();

        });
})();