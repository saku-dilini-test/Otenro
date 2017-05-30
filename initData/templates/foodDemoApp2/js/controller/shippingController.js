/**
 * Created by Madhuranga on 15/11/16.
 */

mobileApp.controller('shippingCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants,PaypalService,$log) {

    $scope.$emit('hideMenu',{});
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;



    $log.debug($stateParams.item);
    $log.debug(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
    var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

    if(localData == null){
        $state.go('app.login')
    }
    else{
        if($stateParams.item.location == "old"){
            $scope.country = localData.country;
        }else{
            $scope.country = $stateParams.item.country;
        }
    }
    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    var param = {
        'appId':$scope.appId,
        'country': $scope.country
    };
    $http.post(constants.server_url + 'cmd=getTaxInfoByCountry&appId='+$scope.appId+'&country='+$scope.country).success(function(data) {
        if(data == ''){
            $scope.hide = true;
            $scope.tax = 0;
        }else{
            $scope.tax = data[0].taxAmount;
            $scope.hide = false;
        }
    })
    $scope.getTotal = function(){
        var total = 0;
        var amount = 0;
        var tax = 0;
        for(var i = 0; i < $scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            amount = product.total;
            total += (amount);
        }
        tax = total * $scope.tax/100;
        $scope.taxTotal = total * $scope.tax/100;
        if(tax > 0){
            total = total + tax;
            $rootScope.cart.totalPrice = total;
            return total;
        }else{
            $rootScope.cart.totalPrice = total;
            return total;
        }
    };



    //get the currency
    $http.get(constants.server_url + 'cmd=getCurrency&appId='+$scope.appId).success(function(data) {
        $scope.currency = data;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

    // get the shipping options
    var param = {
        'appId':$scope.appId,
        'country': $scope.country
    };
    $http.post(constants.server_url + "cmd=getShippingInfoByCountry&appId="+$scope.appId+"&country="+$scope.country)
        .success(function (data) {
                $scope.shippingData=data;
                $log.debug($scope.shippingData);
                for(var i = 0; i < $scope.shippingData.length; i++){
                    if($scope.shippingData[i].shippingOption == "Pick up"){
                        $scope.shippingData.splice([i],1);
                    }
                }
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
            });


    $scope.amount = $scope.getTotal();
    $scope.details = {};
    $scope.addShipping = function(shippingDetails){

        var total= 0;
        var totalWeight= 0;
        var shippingCost = 0;

        for(var i = 0; i < $rootScope.cart.cartItems.length; i++){
            var product = $rootScope.cart.cartItems[i];
            total = product.totWeight;
            totalWeight += (total);
        }

        if(shippingDetails.shipping.shippingOption == "Flat Rate"){

            var shippingCostPreOrderFee = shippingDetails.shipping.preOrderFee;
            var shippingCostFeePerItem = shippingDetails.shipping.feePerItem * $rootScope.cart.cartItems.length;
            shippingCost = shippingCostPreOrderFee + shippingCostFeePerItem;

        }else if(shippingDetails.shipping.shippingOption == "Weight Based"){
            shippingDetails.overWeight = false;
            shippingDetails.underWeight = false;
            $log.debug(shippingDetails.shipping.weightRanges);
            for(var i = 0; i < shippingDetails.shipping.weightRanges.length; i++){
                var weightRange = shippingDetails.shipping.weightRanges[i];
                if(weightRange.startWeight <= totalWeight && weightRange.endWeight >= totalWeight){
                    shippingCost = shippingDetails.shipping.weightRanges[i].cost;
                }
            }
            if(shippingDetails.shipping.weightRanges[0].startWeight>totalWeight){
                shippingDetails.underWeight = true;
            }
            if(shippingDetails.shipping.weightRanges[shippingDetails.shipping.weightRanges.length-1].endWeight<totalWeight){
                shippingDetails.overWeight = true;
            }

        }else{

            shippingCost = shippingDetails.shipping.cost;

        }

        shippingDetails.delivery = $stateParams.item;
        shippingDetails.shippingCost = shippingCost;
        $log.debug(totalWeight);
        $log.debug(shippingCost);
        $log.debug(shippingDetails.shipping);
        $log.debug($rootScope.cart.cartItems);
        $state.go('app.checkout',{item:shippingDetails});
    }


});