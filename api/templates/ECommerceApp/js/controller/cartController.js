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


            $scope.userId = $rootScope.userId;
            $scope.appId = $rootScope.appId;

            $scope.cartItems = $rootScope.cart.cartItems;

            $scope.getTotal = function () {
                var total = 0;
                var amount = 0;
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    var product = $scope.cartItems[i];
                    amount = product.total;
                    total += (amount);
                }
                $rootScope.cart.totalPrice = total;
                return total;
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
                    $state.go('login');
                }
            }

             $scope.pickup = function () {
                 if(localStorage.getItem('appLocalStorageUser')!==null){
                     $state.go('pickup');
                 }
                 else{
                     $state.go('login');
                 }
             }


            $scope.deliver = function (deliverDetails) {
                $scope.amount = $scope.getTotal();

                $scope.details = {
                    appId: $rootScope.appId,
                    item: $stateParams.item,
                    amount: $scope.amount,
                    customerName: deliverDetails.name,
                    deliveryAddress: deliverDetails.address,
                    telNumber: deliverDetails.number
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
                                    title: 'Order complete',
                                    template: 'Success',
                                    cssClass: 'ionicPopUp'
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

        });

//})();