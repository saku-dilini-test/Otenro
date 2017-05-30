/**
 * Created by amila on 4/5/16.
 */

//(function() {
//    angular.module('starter', [])
mobileApp.controller('OrderCtrl', function ($scope, $rootScope, $http, $state, constants) {

            $scope.header = "Place an Order";

            $scope.appId = $rootScope.appId;
            $scope.cart = $rootScope.cart;
            $scope.orderInfo = {};

            $scope.saveOrder = function (order) {

                var data = {
                    appId: $scope.appId,
                    customerName: order.customerName,
                    telNumber: order.telNumber,
                    deliveryAddress: order.deliveryAddress,
                    cart: $scope.cart
                };

                $http.post(constants.server_url+"cmd=saveOrder&appId="+$scope.appId+"&customerName="+order.customerName+"&telNumber="+order.telNumber+"&deliveryAddress="+order.deliveryAddress+"&cart="+$scope.cart)
                    .then(function (res) {
                        if (res.data == 'ok') {
                            $rootScope.cart.cartItems = [];
                            $rootScope.cart.cartSize = 0;
                            $rootScope.cart.totalPrice = 0;
                            $rootScope.parentobj.cartSize = 0;
                            $scope.orderInfo = {};
                            $state.go('tab.menu');
                        }
                    },
                    function (err) {

                    });
            };

    //get Sales and Promotions
    $http.get(constants.SERVER_URL + '/edit/getListOfSalesAndPromotions?appId='+$scope.appId).success(function(data) {
        $scope.salesandpromotion = data[0];
        console.log(data);
    }).error(function(err) {
        alert('warning', "Unable to get sales and Promotions ", err.message);
    });
        });
//})();