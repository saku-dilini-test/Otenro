/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    $scope.cartItems = $rootScope.cart.cartItems;

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            total += (product.price);
        }
        $rootScope.cart.totalPrice = total;
        return total;
    };

    $scope.removeItem = function(index){
        $scope.cartItems.splice(index, 1);
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
    };

    $scope.deliver = function(deliverItems){

    $scope.amount = $scope.getTotal();
         var data = {
                    appId : $rootScope.appId,
                    customerName : "Thilini",
                    item : deliverItems,
                    amount : $scope.amount
         }
         $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",data)
         .then(function(res){
             data.id = $rootScope.cart.cartItems[0].id;

              console.log("cartItems "+deliverItems);
             $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",deliverItems)
             .then(function(res){
                 console.log("updating "+res);
             },
             function(err){
                console.log(err);
             });
         },
         function(err){
            console.log(err);
         });
    }

});