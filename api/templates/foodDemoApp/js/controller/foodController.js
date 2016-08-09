/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,$ionicPopup,constants) {

    $scope.$emit('hideMenu',{});

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

    $scope.sliderOptions = {
          initialSlide: 0,
          direction: 'horizontal', //or vertical
          speed: 300 //0.3s transition
        };
    $scope.sliderDelegate = null;
    if($stateParams.foodId){
        $http.get(constants.SERVER_URL + '/templates/getProductById?productId='+$stateParams.foodId)
             .success(function(data) {
                $scope.foodInfo = data;
                $scope.images = $scope.foodInfo.tempImageArray;
                $scope.productVariants = data.variants;

                if(data.variants.length > 0){
                    $scope.selectedVariant = data.variants[0];
                    if($scope.selectedVariant.quantity > 0 ){
                        $scope.isBuyBtnDisable = false;
                    }else{
                        $scope.isBuyBtnDisable = true;
                    }
                }

            }).error(function(err) {
                 alert('warning', "Unable to get Product", err.message);
          });
    }
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
          };

    $scope.menuName = $stateParams.categoryName;

    $scope.changeVariant = function(variant){
        $scope.selectedVariant = variant;
        if(variant.quantity > 0 ){
            $scope.isBuyBtnDisable = false;
        }else{
            $scope.isBuyBtnDisable = true;
        }
    };

    $scope.addToCart = function() {
        if($scope.selectedVariant.buyQuantity == null){
            $ionicPopup.alert({
                title: 'Please enter a quantity',
                template: 'Warning!!!',
                cssClass: 'ionicPopUp'
            });
        }else{
            $rootScope.cart.cartItems.push({
                id: $scope.selectedVariant.id,
                productId: $scope.selectedVariant.productId,
                name: $scope.foodInfo.name,
                qty: $scope.selectedVariant.buyQuantity,
                price: $scope.selectedVariant.price,
                total : $scope.selectedVariant.buyQuantity*$scope.selectedVariant.price
            });
            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
            $state.go('app.cart');
        }
    }

});