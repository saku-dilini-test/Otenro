/**
 * Created by Madhuranga on 15/11/16.
 */

mobileApp.controller('checkoutCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants,PaypalService,$log) {

    $scope.$emit('hideMenu',{});
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.shippingCost = $stateParams.item.shippingCost;
    $scope.overWeight = $stateParams.item.overWeight;
    $scope.underWeight = $stateParams.item.underWeight;
    $scope.totalQuantity = $rootScope.cart.totalQuantity;
    $scope.hideShipping = true;
    if(typeof $scope.shippingCost == 'undefined'){
        $scope.hideShipping = false;
    }

    var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

    if($stateParams.item.delivery.location == "old" || $stateParams.item.delivery.location == "Pick up" ){
        $scope.country = localData.country;
    }else {
        $scope.country = $stateParams.item.delivery.country;
    }


    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    var param = {
        'appId':$scope.appId,
        'country': $scope.country
    };

    $http.post(constants.SERVER_URL + '/templatesOrder/getTaxInfoByCountry',param).success(function(data) {
        if(data == ''){
            $scope.hide = true;
            $scope.tax = 0;
            $scope.isApplyShippingCharge = false;
        }else {
            $scope.tax = data[0].taxAmount;
            $log.debug(data[0]);
            $scope.isApplyShippingCharge = data[0].isApplyShippingCharge;
            $scope.hide = false;
        }
            var total = 0;
            var amount = 0;
            var tax = 0;
            for(var i = 0; i < $scope.cartItems.length; i++){
                var product = $scope.cartItems[i];
                amount = product.total;
                total += (amount);
            }

            if($scope.isApplyShippingCharge == true && $stateParams.item.delivery.location != "Pick up"){

                var shipping = parseInt($scope.shippingCost);
                total = total + shipping;
                tax = total * $scope.tax / 100;
                $scope.taxTotal = total * $scope.tax / 100;
                if (tax > 0) {
                    total = total + tax;
                    $scope.totalPrice = total;
                } else {
                    $scope.cart.totalPrice = total;
                }
            }else {
                tax = total * $scope.tax / 100;
                $scope.taxTotal = total * $scope.tax / 100;
                if(typeof $scope.shippingCost == "undefined"){
                    $scope.shippingCost = 0;
                }
                if (tax > 0) {
                    total = total + tax;
                    $scope.totalPrice = total + $scope.shippingCost;
                } else {
                    $scope.totalPrice = total + $scope.shippingCost;
                }
            }

    });


    //get the currency
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
        $scope.currency = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));


    $scope.pay = function(promotionCode){

        var payInfo = $stateParams.item;
        payInfo.amount = $scope.totalPrice;
        payInfo.taxTotal = $scope.taxTotal;
        payInfo.cart = $rootScope.cart.cartItems;
        payInfo.userEmail = localData.email;
        payInfo.promotionCode = promotionCode;
        $state.go('app.payment',{item:payInfo});
    }


});