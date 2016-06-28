/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,$ionicPopup,constants) {
    $scope.buyQuantity=0;
    $rootScope.timestamp = new Date().getTime();
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = constants.SERVER_URL
                +"/templates/viewImages?userId="
                +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    $http.get(constants.SERVER_URL + '/templates/getProductsByCatId?appId='+$scope.appId+'&childId='+$stateParams.categoryId).success(function(data) {
    $scope.foods = data;
        for(var i=0; i<data.length; i++){
            if(data[i].discount){
            $scope.foods[i].price = data[i].discount;
            }
        }
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });
    
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
        $scope.currency = data;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });
    

    if($stateParams.foodId){
        $http.get(constants.SERVER_URL + '/templates/getProductById?productId='+$stateParams.foodId)
             .success(function(data) {
                $scope.foodInfo = data;

                 $scope.productVariants=data.variants;

                 var count = 0;
                 for (var i=0; i< data.variants.length; i++) {
                      count = count + data.variants[i].quantity;
                 }
                 if (count <= 0){
                     $scope.foodInfo.buy = "disable";
                 }else {
                     $scope.foodInfo.buy = "enable";
                 }

                if(data.discount){
                    $scope.foodInfo.price = $scope.foodInfo.discount;
                }

            }).error(function(err) {
                 alert('warning', "Unable to get Product", err.message);
          });
    }

    $scope.menuName = $stateParams.categoryName;


    $scope.addToCart = function() {
        var quantity = 0;
        var price = 0;
        var total = 0;
        var totalQuantity = 0;

        for (var i=0; i< $scope.productVariants.length; i++) {
            if (typeof $scope.productVariants[i].buyQuantity == 'undefined'){
                totalQuantity = totalQuantity + 0;
            }else {
                totalQuantity = totalQuantity + $scope.productVariants[i].buyQuantity;
                quantity = $scope.productVariants[i].buyQuantity;
                price = $scope.productVariants[i].price;
                total =  total + (quantity * price);
            }
        }

        if(totalQuantity == 0){
             var alertPopup = $ionicPopup.alert({
                 title: 'Please enter a quantity',
                 template: 'Warning!!!',
                 cssClass: 'ionicPopUp'
             });
         }
         else{
             $scope.foodInfo.price = price;
             $rootScope.cart.cartItems.push({
                 id: $scope.foodInfo.id,
                 name: $scope.foodInfo.name,
                 qty: totalQuantity,
                 price: $scope.foodInfo.price,
                 total : total
             });
             $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
             $scope.parentobj.cartSize = $rootScope.cart.cartSize;
             $state.go('app.cart');
        }
    }

});