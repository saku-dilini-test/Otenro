/**
 * Created by amila on 4/5/16.
 */


mobileApp.controller('orderCtrl', function($scope,$rootScope,$http,$state) {

    $scope.header = "Place an Order";

    $scope.appId = $rootScope.appId;
    $scope.cart = $rootScope.cart;
    $scope.orderInfo = {};

    $scope.saveOrder = function (order){

        var data = {
            appId : $scope.appId,
            customerName : order.customerName,
            telNumber : order.telNumber,
            deliveryAddress : order.deliveryAddress,
            cart : $scope.cart
        }

        $http.post(SERVER_URL+"/templatesOrder/saveOrder",data)
            .then(function(res){
                if(res.data == 'ok'){
                    $rootScope.cart.cartItems = [];
                    $rootScope.cart.cartSize = 0;
                    $rootScope.cart.totalPrice = 0;
                    $scope.parentobj.cartSize = 0;
                    $scope.orderInfo = {};
                    $state.go('app.category');
                }
            },
            function(err){

            });
    }
});