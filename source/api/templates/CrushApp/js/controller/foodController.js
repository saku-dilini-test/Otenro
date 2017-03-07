/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,$ionicPopup,constants,$log) {

    $scope.$emit('hideMenu',{});

    $scope.buyQuantity=0;
    $rootScope.timestamp = new Date().getTime();
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";
    $scope.selectedVariant = {};

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

    $scope.navigateFood = function(food){
        $state.go('app.food',{item:food})
    }

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
    if($stateParams.item){
        $scope.foodInfo = $stateParams.item;
        $scope.images = $stateParams.item.tempImageArray;

          if($stateParams.item.variants.length > 0){
                $scope.selectedVariant = $stateParams.item.variants[0];
                if($scope.selectedVariant.quantity > 0 ){
                    $scope.isBuyBtnDisable = false;
                }else{
                    $scope.isBuyBtnDisable = true;
                }
          }
    }

    $scope.menuName = $stateParams.categoryName;

    $scope.changeVariant = function(variant){
        $log.debug(variant)
        $scope.selectedVariant = variant;
        if(variant.quantity > 0 ){
            $scope.isBuyBtnDisable = false;
        }else{
            $scope.isBuyBtnDisable = true;
        }
    };

    // Check buyQty input value.
    // If buyQty value is less than or equal Selected-Variant-Qty, Buy Button Enable
    $scope.changeBuyQuantity = function (buyQty) {

        // default : Buy button set as Disable
        $scope.isBuyBtnDisable = true;

        // if buyQty value greater than 0
        if(buyQty > 0){
            // Get Selected-Variant-Qty value
            var selectVariantAvailableQty = $scope.selectedVariant.quantity;
            //If quantity is unlimited enable buy button
            if($scope.selectedVariant.unlimited == true){
                $scope.isBuyBtnDisable = false;
            }
            else if(typeof selectVariantAvailableQty != 'undefined'){
                // If buyQty less than or equal Selected-Variant-Qty, buy button enable
                if(buyQty <= selectVariantAvailableQty ){
                    $scope.isBuyBtnDisable = false;
                }
            }
        }
    };

    $scope.addToCart = function() {
        if($scope.selectedVariant.buyQuantity == null){
            $ionicPopup.alert({
                title: 'Warning !!!',
                subTitle: 'Please enter a quantity',
                cssClass: 'ionicPopUp',
                buttons:[
                    {text:'OK',
                     type:'made-easy-button-setting'},
                ]
            });
        }

        else  {

            if($scope.selectedVariant.quantity == "null"){
                $scope.isBuyBtnDisable = false;
            }
            else{
            $rootScope.cart.cartItems.push({
                id: $scope.foodInfo.id,
                name: $scope.foodInfo.name,
                qty: $scope.selectedVariant.buyQuantity,
                sku: $scope.selectedVariant.sku,
                totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                price: $scope.selectedVariant.price,
                total : $scope.selectedVariant.buyQuantity*$scope.selectedVariant.price,
                imgURL : $stateParams.item.tempImageArray
            });
            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
            $state.go('app.category');
        }
    }

    //get Sales and Promotions
    $http.get(constants.SERVER_URL + '/edit/getListOfSalesAndPromotions?appId='+$scope.appId).success(function(data) {
        $scope.salesandpromotion = data[0];
        console.log(data);
    }).error(function(err) {
        alert('warning', "Unable to get sales and Promotions ", err.message);
    });
}});