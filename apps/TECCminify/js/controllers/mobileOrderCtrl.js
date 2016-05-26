/**
 * Created by amila on 5/24/16.
 */


(function () {
    "use strict";

    angular.module('animateApp')
        .controller('mobileOrderCtrl',['$scope', '$http','$routeParams','SERVER_URL','DataService','$location', function($scope, $http,$routeParams,SERVER_URL,DataService,$location) {
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
            }else{
                $scope.cart.saveName(cartInfo.userInfo.name);
                $scope.cart.saveTelPhone(cartInfo.userInfo.contactNo);
                $scope.cart.saveLocationName(cartInfo.userInfo.location.locationName);
                $scope.cart.saveDeliveryAddress_01(cartInfo.userInfo.address);
            }
            console.log($scope.cart);
            $scope.conform = function(){
                $scope.cart.checkout('PayPal','Mobile');
            }

        }]);
})();