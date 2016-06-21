/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    $scope.cartItems = $rootScope.cart.cartItems;

    $scope.getTotal = function(){
        var total = 0;
        var amount = 0;
        for(var i = 0; i < $scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            amount = product.price * product.qty;
            total += (amount);
        }
        $rootScope.cart.totalPrice = total;
        return total;
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
                $state.go('app.login');
            }
    }
    $scope.deliver = function(deliverDetails){
            $scope.amount = $scope.getTotal();

//    if(localStorage.getItem('appLocalStorageUser')!==null){
//        $scope.saved 				= localStorage.getItem('appLocalStorageUser');
//    	$scope.appLocalStorageUser 	= JSON.parse($scope.saved);
         var data = {
                    appId : $rootScope.appId,
                    customerName : deliverDetails.name,
                    item : $stateParams.item,
                    amount : $scope.amount,
                    deliveryAddress : deliverDetails.address,
                    telNumber : deliverDetails.phone
         }
         $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",data)
         .then(function(res){
             data.id = $rootScope.cart.cartItems[0].id;
             $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item)
             .then(function(res){
                 $rootScope.cart.cartItems = [];
                 $rootScope.cart.cartSize = 0;
                 $rootScope.cart.totalPrice = 0;
                 $rootScope.cart.totalQuantity = 0;
                 var alertPopup = $ionicPopup.alert({
                   title: 'Order complete',
                   template: 'Success',
                   cssClass: 'ionicPopUp'
                 });
             },
             function(err){
                console.log(err);
             });
         },
         function(err){
            console.log(err);
         });
//    }
//    else{
//        $state.go('app.login');
//    }
    }

});