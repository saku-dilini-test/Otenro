/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = constants.SERVER_URL
                +"/templates/viewImages?userId="
                +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    $http.get(constants.SERVER_URL + '/templates/getProductsByCatId?appId='+$scope.appId+'&childId='+$stateParams.categoryId).success(function(data) {
    $scope.foods = data;
        for(i=0; i<data.length; i++){
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
                if(data.discount){
                    $scope.foodInfo.price = $scope.foodInfo.discount;
                }
            }).error(function(err) {
                 alert('warning', "Unable to get Product", err.message);
          });
    }

    $scope.menuName = $stateParams.categoryName;

    $scope.addToCart = function(quantity){
            if($scope.foodInfo.discount){
                $scope.foodInfo.price = $scope.foodInfo.discount;
            }
        $rootScope.cart.cartItems.push({
            id: $scope.foodInfo.id,
            name: $scope.foodInfo.name,
            qty: quantity,
            price: $scope.foodInfo.price
        });
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
        $state.go('app.cart');
    }

});