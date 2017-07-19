/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants,PaypalService,$log,$ionicNavBarDelegate,$location) {

    $scope.$emit('hideMenu',{});
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;


       var path = $location.path();
       if (path.indexOf('app/cart') != -1){
         $ionicNavBarDelegate.showBackButton(false);
       }
       else{
         $ionicNavBarDelegate.showBackButton(true);
       }
       $scope.$on('$stateChangeStart', function () {
          $ionicNavBarDelegate.showBackButton(true);
        });

       $scope.doSomething = function(){
            $state.go('app.category');
       }


    $scope.buttonDisable = function(qty,totalQty){
            if(qty > totalQty && totalQty > 1){
                  $scope.buyButtonDisable = true;
            }else{
                  $scope.buyButtonDisable = false;
            }
        }

    $http.get(constants.server_url+"cmd=getAllCountry")
        .success(function(res){
            $scope.countries = res.data;
        });

    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    $http.get(constants.server_url + 'cmd=getTaxInfo&appId='+$rootScope.appId).success(function(data) {
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
            total += (amount*product.qty);
        }
        tax = total * $scope.tax/100;
        $scope.taxTotal = total * $scope.tax/100;
        if(tax > 0){
            //total = total + tax;
            $rootScope.cart.totalPrice = total;
            return total;
        }else{
            $rootScope.cart.totalPrice = total;
            return total;
        }
    };

    $scope.getTotalQuantity = function(){
        var quantity = 0;
        for(var i =0; i<$scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            quantity += product.qty;
        }
        $rootScope.cart.totalQuantity = quantity;
        return quantity;
    };

    $scope.removeItem = function(index){
        $scope.cartItems.splice(index, 1);
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
    };

    $scope.delivery = function(deliverItems){

        if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId)!==null){
            $state.go('app.deliverDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'delivery'
            $state.go('app.login',{item:$scope.status});
        }
    }
    $scope.pickupDetails = function (deliverItems) {
        if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId)!==null){
            $state.go('app.pickupDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'pickUp'
            $state.go('app.login',{item:$scope.status});
        }
    }
    $scope.pickUp = function (details) {
        $state.go('app.pickup',{
            item:$stateParams.item,
            deliverDetails:details,
            amount: $scope.amount
        });
    };

    //get the currency
    $http.get(constants.server_url + 'cmd=getCurrency&appId='+$scope.appId).success(function(data) {
        $scope.currency = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

    // get the shipping options
    $http.get(constants.server_url + "cmd=getShippingInfo&appId="+$rootScope.appId)
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
                $state.go('app.login')
            }
            else{
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
        $state.go('app.shipping',{item:deliverDetails});
    }

});