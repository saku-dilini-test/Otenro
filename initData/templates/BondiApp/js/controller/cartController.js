/**
 * Created by amila on 4/5/16.
 */

//(function() {
//    angular.module('starter', [])
mobileApp.controller('CartCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicPopup, constants,readMadeEasy,PaypalService,$log,$ionicNavBarDelegate,$location) {

   var path = $location.path();
   if (path.indexOf('tab/cart') != -1){
     $ionicNavBarDelegate.showBackButton(false);
   }
   else{
     $ionicNavBarDelegate.showBackButton(true);
   }
   $scope.$on('$stateChangeStart', function () {
      $ionicNavBarDelegate.showBackButton(true);
    });

   $scope.doSomething = function(){
        $state.go('tab.menu');
   }



            $http.get(constants.SERVER_URL+"/edit/getAllCountry")
                    .then(function(res){
                        $scope.countries = res.data;
                    });


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

    $scope.buttonDisable = function(qty,totalQty,index){

        // Parsing index, changed quantity and the state shows whether value changed
        $rootScope.parseIndex = index;
        $rootScope.parseEnable = true;
        $rootScope.parseQty = qty;
        $rootScope.cart.cartItems[index].totWeight = $rootScope.cart.cartItems[index].weight *$rootScope.parseQty;
        //----------------------------------------------------------------------
                    if(qty > totalQty && totalQty > 1){
                          $scope.buyButtonDisable = true;
                    }else{
                          $scope.buyButtonDisable = false;
                    }
                }

            // Get Tax Information
            if (localStorage.getItem('appLocalStorageUser'+$rootScope.appId) !== null) {
                var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

                if(localData != null){
                    var param = {
                        'appId':$scope.appId,
                        'country': localData.country
                    };
                    // Get Tax Information
                    $http.post(constants.SERVER_URL + '/templatesOrder/getTaxInfoByCountry',param).success(function(data) {
                        if(data != ''){
                            $scope.tax = data[0].taxAmount;
                            $scope.taxDisplayName = data[0].taxName;
                            $scope.isShowTaxInfo = true;
                        }
                    });
                }

            }

           /* var taxInfoAPI_URL = constants.SERVER_URL + '/edit/getTaxInfo?appId='+$rootScope.appId;
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
                });*/

            // Calculate total amount function
            $scope.getTotal = function () {
                var total = 0;
                var amount = 0;
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    var product = $scope.cartItems[i];
                    amount = product.total;
                    total += (amount*product.qty);

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
                $rootScope.parseIndex = $rootScope.parseIndex -1;
                $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
            };

            $scope.delivery = function (deliverItems) {
                if (localStorage.getItem('appLocalStorageUser'+$rootScope.appId) !== null) {
                    $state.go('tab.deliverDetails', {item: deliverItems});
                }
                else {
                    $scope.status = 'delivery'
                    $state.go('tab.login',{item:$scope.status});
                }
            }

            $scope.pickupDetails = function (deliverItems) {
                if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId)!==null){
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
           $scope.currency = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

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
                var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
                if(localData == null){
                    $state.go('tab.login')
                }else{
                deliverDetails.name = localData.name;
                deliverDetails.streetNumber = localData.streetNumber;
                deliverDetails.streetName = localData.streetName;
                deliverDetails.country = localData.country;
                deliverDetails.city = localData.city;
                deliverDetails.zip = localData.zip;
                deliverDetails.phone = localData.phone;
                }
            }
            $log.debug(deliverDetails);
            deliverDetails.method = 'Delivery';
            $state.go('tab.shipping',{item:deliverDetails});
        }


});