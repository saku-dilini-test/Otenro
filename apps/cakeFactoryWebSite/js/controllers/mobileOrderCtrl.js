/**
 * Created by amila on 5/24/16.
 */


(function () {
    "use strict";

    angular.module('animateApp')
        .controller('mobileOrderCtrl', function($scope, $http,$routeParams,SERVER_URL,DataService,$location) {
            $scope.SERVER_URL = SERVER_URL;
            $scope.cart = DataService.cart;
            var cartInfo = JSON.parse($location.search().cartInfo);
            $scope.cart.items = cartInfo.cart;
            $scope.cart.saveDeliveryCharges(cartInfo.deliveryCharge);
            $scope.cart.setOneDoller(cartInfo.oneDoller);
            if(cartInfo.deliveryCharge == 0){
                $scope.cart.saveBranchName(cartInfo.userInfo.branch);
                $scope.cart.saveName(cartInfo.userInfo.name);
                $scope.cart.saveTelPhone(cartInfo.userInfo.contactNo);
                $scope.cart.saveComment(cartInfo.userInfo.comment);
                $scope.cart.savePickUpDate(cartInfo.userInfo.date);
                $scope.cart.savePickUpTime(cartInfo.userInfo.time);
            }else{
                $scope.cart.saveName(cartInfo.userInfo.name);
                $scope.cart.saveTelPhone(cartInfo.userInfo.contactNo);
                $scope.cart.saveLocationName(cartInfo.userInfo.location.locationName);
                $scope.cart.saveDeliveryAddress_01(cartInfo.userInfo.address);
                $scope.cart.saveComment(cartInfo.userInfo.comment);
            }
            $scope.conform = function(){
                $scope.cart.checkout('PayPal','Mobile');
            };

            // before redirect to PayPal, Cart info send to server to save
            $scope.saveCartInServer = function () {

                $scope.deliveryOption = "pickUp";
                $scope.isSubmitButtonDisableValue = 'true';
                $scope.cart = DataService.cart;
                var data = $scope.cart.getShoppingCart();
                var shoppingCart = {
                    'oneDoller' : $scope.cart.getOneDoller()
                };
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