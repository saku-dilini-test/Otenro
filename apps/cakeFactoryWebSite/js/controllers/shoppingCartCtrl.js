(function () {
    "use strict";

angular.module('animateApp')
    .controller('shoppingCartCtrl', function($scope, $http,$routeParams,SERVER_URL,DataService,$q) {
        $scope.SERVER_URL = SERVER_URL;
        $scope.cart = DataService.cart;
        console.log(DataService.cart);

        $http.get(SERVER_URL+"products/oneUSD")
            .then(function (response) {
                $scope.oneDoller = response.data.result;
                $scope.cart.saveOneDoller($scope.oneDoller);
        });


        $scope.load = function(){

/*            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){
                var promise = $scope.loader();
                promise.then(function(resolve) {
                    if(resolve == 'ok'){
                         $scope.saveCartInServer();
                         setTimeout(function() {
                            $scope.cart.checkout('PayPal');
                         }, 1000);
                    }
                });

            }else{*/
                $scope.loader();
                $scope.saveCartInServer();
/*                $scope.cart.checkout('PayPal');
            }*/
        }

         $scope.loader = function() {
          // perform some asynchronous operation, resolve or reject the promise when appropriate.
          return $q(function(resolve, reject) {
                   $(' <div class=" loader"></div>').prependTo(document.body);
                   $(' <div class="loading-overlay"></div>').prependTo(document.body)
                   resolve ('ok');
          });
        }


        // before redirect to PayPal, Cart info send to server to save

        $scope.saveCartInServer = function () {
            console.log("data" + $scope.cart.getShoppingCart())
            $scope.deliveryOption = "pickUp";
            $scope.isSubmitButtonDisableValue = 'true';
            $scope.cart = DataService.cart;
            var data = $scope.cart.getShoppingCart();
            var shoppingCart = {
                'oneDoller' : $scope.cart.getOneDoller()
            }
            for(var i=0; i < data.length; i++){
                shoppingCart[i] = data[i];
            }

            shoppingCart['cartLength']   = data.length;
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
            shoppingCart['email'] = $scope.cart.getEmail();
            shoppingCart['deliveryDate'] = $scope.cart.getDeliveryDate();
            shoppingCart['deliveryTime'] = $scope.cart.getDeliveryTime();
            shoppingCart['paymentStatus'] = 'Pending';
            //cart info save api
            $http.post(SERVER_URL+"payment/saveShoppingCartWeb",shoppingCart)
                .then(function (response) {
                      setTimeout(function() {
                            $scope.cart.checkout('PayPal');
                      }, 1000);
                },function(error){
                    console.log(error)
                });

               localStorage.clear();
        }

        $scope.clearCart = function(){
            console.log("cart is clear");
            localStorage.clear();
        }

    });
})();

