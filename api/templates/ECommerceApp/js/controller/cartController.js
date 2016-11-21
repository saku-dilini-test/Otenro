/**
 * Created by amila on 4/5/16.
 */

//(function() {
//    angular.module('starter', [])
mobileApp.controller('CartCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicPopup, constants,readMadeEasy,PaypalService) {

            if (typeof $rootScope.appId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appId = data.appId;
                });
            }

            if (typeof $rootScope.userId === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.userId = data.userId;
                });
            }
            if (typeof $rootScope.appName === 'undefined'){

                readMadeEasy.readFile().success(function(data){
                    $rootScope.appName = data.name;
                });
            }

            // -- Config --
            $scope.userId = $rootScope.userId;
            $scope.appId = $rootScope.appId;
            $scope.cartItems = $rootScope.cart.cartItems;
            // default : tax info hide 
            $scope.isShowTaxInfo = false;

            // Get Tax Information       
            var taxInfoAPI_URL = constants.SERVER_URL + '/edit/getTaxInfo?appId='+$rootScope.appId;     
            $http.get(taxInfoAPI_URL)
                .success(function(data) {
                    var taxInfo = data;
                    // if null tax information
                    if(taxInfo == ''){
                        $scope.tax = 0;
                    }else{
                        // First tax collection Tax-Amount apply to Product
                        // ignore other 
                        $scope.tax = taxInfo[0].taxAmount;
                        $scope.isShowTaxInfo = true;
                    }
                });

            // Calculate total amount function
            $scope.getTotal = function () {
                var total = 0;
                var amount = 0;
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    var product = $scope.cartItems[i];
                    amount = product.total;
                    total += (amount);
                }
                var tax = total * $scope.tax/100;
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

            $scope.getTotalQuantity = function () {
                var quantity = 0;
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    var product = $scope.cartItems[i];
                    quantity += product.qty;
                }
                $rootScope.cart.totalQuantity = quantity;
                return quantity;
            };

            $scope.removeItem = function (index) {
                $scope.cartItems.splice(index, 1);
                $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
            };

            $scope.delivery = function (deliverItems) {
                if (localStorage.getItem('appLocalStorageUser') !== null) {
                    $state.go('tab.deliverDetails', {item: deliverItems});
                }
                else {
                    $scope.status = 'delivery'
                    $state.go('tab.login',{item:$scope.status});
                }
            }

            $scope.pickupDetails = function (deliverItems) {
                if(localStorage.getItem('appLocalStorageUser')!==null){
                    $state.go('tab.pickupDetails',{item:deliverItems});
                }
                else{
                    $scope.status = 'pickUp'
                    $state.go('tab.login',{item:$scope.status});
                }
            }
            $scope.pickUp = function (details) {
                $state.go('tab.pickup',{
                    item:$stateParams.item,
                    deliverDetails:details,
                    amount: $scope.amount
                });
            };

    //get the currency
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
            $scope.currency = data;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'));

    // get the shipping options
    $http.get(constants.SERVER_URL + "/edit/getShippingInfo?appId="+$rootScope.appId)
            .success(function (data) {
                    $scope.shippingData=data;
                },
                function (err) {
                    $ionicPopup.alert({
                        title: 'Policies Data loading error!',
                        template: 'Please check your connection!'
                    });
                });


    $scope.amount = $scope.getTotal();
    $scope.deliver = function(deliverDetails){


            if(typeof deliverDetails.country == 'undefined'){
                var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'));
                deliverDetails.name = localData.name;
                deliverDetails.streetNumber = localData.streetNumber;
                deliverDetails.streetName = localData.streetName;
                deliverDetails.country = localData.country;
                deliverDetails.city = localData.city;
            }
            console.log(deliverDetails);
            deliverDetails.method = 'Delivery';
            $state.go('tab.shipping',{item:deliverDetails});
        }


});