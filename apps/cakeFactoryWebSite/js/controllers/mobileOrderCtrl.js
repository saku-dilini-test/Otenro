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
            console.log("email = " + cartInfo.userInfo.email);

            if(cartInfo.deliveryCharge == 0){
                $scope.cart.saveBranchName(cartInfo.userInfo.branch);
                $scope.cart.saveName(cartInfo.userInfo.name);
                $scope.cart.saveTelPhone(cartInfo.userInfo.contactNo);
                $scope.cart.saveComment(cartInfo.userInfo.comment);
                $scope.cart.savePickUpDate(cartInfo.userInfo.date);
                $scope.cart.savePickUpTime(cartInfo.userInfo.time);
                $scope.cart.saveEmail(cartInfo.userInfo.email);
            }else{
                $scope.cart.saveName(cartInfo.userInfo.name);
                $scope.cart.saveTelPhone(cartInfo.userInfo.contactNo);
                $scope.cart.saveLocationName(cartInfo.userInfo.location.locationName);
                $scope.cart.saveDeliveryAddress_01(cartInfo.userInfo.address);
                $scope.cart.saveComment(cartInfo.userInfo.comment);
                $scope.cart.saveDeliveryDate(cartInfo.userInfo.date);
                $scope.cart.saveDeliveryTime(cartInfo.userInfo.time);
                $scope.cart.saveEmail(cartInfo.userInfo.email);
            }

            $scope.conform = function(){
                $scope.cart.checkout('PayPal','Mobile');
            };

            // before redirect to PayPal, Cart info send to server to save
            $scope.saveCartInServer = function () {
                var data = cartInfo.cart;
                var shoppingCart = {
                    'oneDoller' : cartInfo.oneDoller
                };
                for(var i=0; i < data.length; i++){
                    shoppingCart[i] = data[i];
                }

                shoppingCart['cartLength']	 = data.length;
                shoppingCart['deliveryCharge'] = cartInfo.deliveryCharge;
                if(cartInfo.deliveryCharge == 0){
                    shoppingCart['pickUpBranch'] = cartInfo.userInfo.branch;
                    shoppingCart['pickUpDate'] = cartInfo.userInfo.date;
                    shoppingCart['pickUpTime'] = cartInfo.userInfo.time;
                }else{
                    shoppingCart['deliveryLocation'] = cartInfo.userInfo.location.locationName;
                    shoppingCart['deliveryAddress_01'] = cartInfo.userInfo.address;
                    shoppingCart['deliveryDate'] = cartInfo.userInfo.date;
                    shoppingCart['deliveryTime'] = cartInfo.userInfo.time;

                }
                shoppingCart['deliveryAddress_02'] = '';
                shoppingCart['name'] = cartInfo.userInfo.name;
                shoppingCart['city'] = '';
                shoppingCart['telPhone'] = cartInfo.userInfo.contactNo;
                shoppingCart['comment'] = '';
                shoppingCart['email'] = cartInfo.userInfo.email;
                console.log(cartInfo.userInfo.email);
                if(typeof cartInfo.userInfo.comment != 'undefined'){
                    shoppingCart['comment'] = cartInfo.userInfo.comment;
                }
                shoppingCart['paymentStatus'] = 'Pending';

                console.log(shoppingCart);
                //cart info save api
                $http.post(SERVER_URL+"payment/saveShoppingCartWeb",shoppingCart)
                    .then(function (response) {
                        console.log(response);
                    });

            }

        });
})();