/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    $http.get(constants.SERVER_URL + '/edit/getTaxInfo?appId='+$rootScope.appId).success(function(data) {
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
        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
    };

    $scope.delivery = function(deliverItems){

            if(localStorage.getItem('appLocalStorageUser')!==null){
                 $state.go('app.deliverDetails',{item:deliverItems});
            }
            else{
                $scope.status = 'delivery'
                $state.go('app.login',{item:$scope.status});
            }
    }
    $scope.pickup = function () {
        if(localStorage.getItem('appLocalStorageUser')!==null){
            $state.go('app.pickup');
        }
        else{
            $state.go('app.login');
        }
    }

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

            $scope.shipping={};
            var SelectShippingOptions = $ionicPopup.alert({
                   templateUrl: 'templates/shippingOpt.html',
                   title: 'Shipping Options',
                   subTitle: 'Choose a Delivery Option you wish.',
                   cssClass: 'ionicPopUp',
                   scope: $scope,
                   buttons:[
                       {text:'Back'},
                       {text: 'Deliver',
                        type: 'button-balanced',
                        onTap: function(e) {
                              if (!$scope.shipping.opt || $rootScope.cart.cartSize == 0) {
                                //don't allow the user to close unless he selects an option
                                e.preventDefault();
                              } else {
                                $scope.details ={
                                        appId : $rootScope.appId,
                                        item : $stateParams.item,
                                        amount : $scope.amount,
                                        customerName : deliverDetails.name,
                                        deliveryLocation : deliverDetails.location,
                                        deliveryNo : deliverDetails.no,
                                        deliveryStreet : deliverDetails.street,
                                        deliveryCity : deliverDetails.city,
                                        deliveryCountry : deliverDetails.country,
                                        deliveryZip : deliverDetails.zip,
                                        telNumber : deliverDetails.number,
                                        tax :   $scope.taxTotal,
                                        shippingOpt : $scope.shipping.opt
                                };

                        $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
                            .then(function(res){
                                $scope.details.id = $rootScope.cart.cartItems[0].id;
                                $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item)
                                .then(function(res){
                                    $rootScope.cart.cartItems = [];
                                    $rootScope.cart.cartSize = 0;
                                    $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                    $rootScope.cart.totalPrice = 0;
                                    $rootScope.cart.totalQuantity = 0;

                                    $rootScope.amount = $scope.amount;
                                    $state.go('app.cardPayment');
                                },
                                function(err){
                                   console.log(err);
                                });
                            },
                            function(err){
                               console.log(err);
                            });
                             }
                        }
                       }
                   ]
            });
    }

});