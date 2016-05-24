/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,constants) {

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
    console.log(localStorage.getItem('appLocalStorageUser'));
    if(localStorage.getItem('appLocalStorageUser')!==null){
        $scope.saved 				= localStorage.getItem('appLocalStorageUser');
    	$scope.appLocalStorageUser 	= JSON.parse($scope.saved);
         var data = {
                    appId : $rootScope.appId,
                    customerName : $scope.appLocalStorageUser.name,
                    item : deliverItems,
                    amount : $scope.amount,
                    deliveryAddress : $scope.appLocalStorageUser.address,
                    telNumber : $scope.appLocalStorageUser.phone
         }
         $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",data)
         .then(function(res){
             data.id = $rootScope.cart.cartItems[0].id;
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
    else{
        $state.go('app.login');
    }
    }

});