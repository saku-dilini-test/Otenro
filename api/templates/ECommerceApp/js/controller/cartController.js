/**
 * Created by amila on 4/5/16.
 */

//(function() {
//    angular.module('starter', [])
mobileApp.controller('CartCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicPopup, constants,readMadeEasy) {

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

             $scope.pickup = function () {
                 if(localStorage.getItem('appLocalStorageUser')!==null){
                     $state.go('tab.pickup');
                 }
                 else{
                     $state.go('tab.login');
                 }
             }


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

            $scope.deliver = function (deliverDetails) {
                $scope.amount = $scope.getTotal();

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
                                                $scope.details = {
                                                    appId: $rootScope.appId,
                                                    item: $stateParams.item,
                                                    amount: $scope.amount,
                                                    customerName: deliverDetails.name,
                                                    deliveryAddress: deliverDetails.address,
                                                    telNumber: deliverDetails.number,
                                                    tax :   $scope.tax
                                                };

                                                $http.post(constants.SERVER_URL + "/templatesOrder/saveOrder", $scope.details)
                                                    .then(function (res) {
                                                        $scope.details.id = $rootScope.cart.cartItems[0].id;
                                                        $http.post(constants.SERVER_URL + "/templatesInventory/updateInventory", $stateParams.item)
                                                            .then(function (res) {
                                                                $rootScope.cart.cartItems = [];
                                //                                $rootScope.cart.cartSize = 0;
                                //                                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                                                $rootScope.cart.totalPrice = 0;
                                                                $rootScope.cart.totalQuantity = 0;
                                                                $ionicPopup.alert({
                                                                   title: 'Thank You',
                                                                   subTitle: 'Your Order has been successfully processed',
                                                                   cssClass: 'ionicPopUp',
                                                                   buttons:[
                                                                    {text:'OK',
                                                                     type:'button-positive'},
                                                                   ]
                                                                });

                                                                    $scope.details = null;
                                                            },
                                                            function (err) {
                                                                console.log(err);
                                                            });
                                                    },
                                                    function (err) {
                                                        console.log(err);
                                                    });
                                                     }
                                                }
                                               }
                                           ]
                                    });
            }

        });

//})();