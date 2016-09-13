angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};

    $scope.parentobj = {};
    $scope.parentobj.cartSize = $rootScope.cart.cartSize;

})

.controller('HomeCtrl', function($scope,$timeout,$ionicLoading,appServices,readMadeEasy,constants) {

    $ionicLoading.show({
        template: '<ion-spinner icon="lines"  class="spinner-energized" ></ion-spinner>'
    });

    // After 1000 ms execute
    $timeout(function () {
        getAllItemByAppId();
    }, 1000);

    // get all items function
    function getAllItemByAppId() {
        readMadeEasy.readFile().success(function(appData){
        appServices.getAllItemByAppId(appData.appId)
            .success(function (data) {
                $ionicLoading.hide();
                /**  Swipe Function Configuration  **/
                $scope.itemList = data;
                $scope.startIndex = 0;
                $scope.leftIndex = 0;
                $scope.rightIndex = $scope.itemList.length-1;
                $scope.isEnableLeftButton = false;
                $scope.isEnableRightButton = true;
                if($scope.rightIndex == -1){
                    $scope.isEnableRightButton = false;
                }
                // initial set as 0 index
                $scope.setItem(0);
            }).error(function (err) {
                $ionicLoading.hide();
                alert('Items Loading error');
            });
            
            // defined third navigation image path
            $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+ appData.userId +
                              "&appId="+appData.appId+"&"+new Date().getTime()+"&img=thirdNavi";
        });
    }

    /* ----- Swipe Function start ----- */
    // Configuration
        /** Configuration has inside getAllItemByAppId function  **/

    // view item 
    $scope.item = {};  
    // item set function     
    $scope.setItem = function(id){    
        if($scope.leftIndex <= id && id <= $scope.rightIndex){            
            $scope.item = $scope.itemList[id];
        }        
    }

    // left swipe function 
    $scope.onSwipeLeft = function(){        
        if($scope.startIndex > $scope.leftIndex)
            $scope.startIndex = $scope.startIndex - 1;        
        $scope.isEnableRightButton = true;
        $scope.setItem($scope.startIndex);
        if($scope.startIndex == $scope.leftIndex){
            $scope.isEnableLeftButton = false;
        }    
    };
    // Right swipe function 
    $scope.onSwipeRight = function(){        
        if($scope.startIndex < $scope.rightIndex)
            $scope.startIndex = $scope.startIndex + 1;
        $scope.setItem($scope.startIndex);
        $scope.isEnableLeftButton = true;
        if($scope.startIndex == $scope.rightIndex){
            $scope.isEnableRightButton = false;
        }                    
    };
    /* ----- Eng Swipe Fucntion  ----- */
})

.controller('MenuCtrl', function($scope,appServices,readMadeEasy,constants) {

    // get all menu by app Id
    readMadeEasy.readFile().success(function(appData){
        appServices.getAllMenuByAppId(appData.appId)
            .success(function (data) {
                $scope.categoryList = data;
            }).error(function (err) {
                alert('Menu Loading error');
        });

        // defined second navigation image path
        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+appData.userId+
                          "&appId="+appData.appId+"&"+new Date().getTime()+"&img=secondNavi";
    });
})

.controller('ItemsCtrl', function($scope,$stateParams,$state,appServices,readMadeEasy,constants) {

    // set select Menu Name
    $scope.menuName = $stateParams.menuName;

    // set select Menu Id
    var menuId = $stateParams.menuId;
    // get all item by menu Id
    readMadeEasy.readFile().success(function(appData){
        appServices.getAllItemsByMenuId(menuId,appData.appId)
            .success(function (data) {
                $scope.itemList = data;
            }).error(function (err) {
                alert('Items Loading error');
        });

        // defined third navigation image path
        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+ appData.userId +
            "&appId="+appData.appId+"&"+new Date().getTime()+"&img=thirdNavi";
    });

    $scope.navigateFood = function(item){
        $state.go('tab.item',{item:item})
    }
})

.controller('ItemCtrl', function($scope,$rootScope,$stateParams,$state,appServices,readMadeEasy,constants) {

    // config
    $scope.selectedVariant = {};
    
    // get currency by appId
    readMadeEasy.readFile().success(function(appData){
        appServices.getCurrencyByAppId(appData.appId)
            .success(function(data){
                $scope.currency = data;
            }).error(function(err){
            alert('Currency Loading error');
        })

        // defined third navigation image path
        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+ appData.userId +
            "&appId="+appData.appId+"&"+new Date().getTime()+"&img=thirdNavi";
    });

    // set select Item Name
        $scope.itemName = $stateParams.itemName;
        $scope.sliderOptions = {
          initialSlide: 0,
          direction: 'horizontal', //or vertical
          speed: 300 //0.3s transition
        };
        $scope.sliderDelegate = null;
    // set select Menu Id
    var itemId = $stateParams.item.id;
    // get item by Id
    appServices.getItemById(itemId)
        .success(function (data) {
            $scope.item = data;
            $scope.images = data.tempImageArray;
            $scope.productVariants = data.variants;
            if(data.variants.length > 0){
                $scope.selectedVariant = data.variants[0];
                if($scope.selectedVariant.quantity > 0 ){
                    $scope.isBuyBtnDisable = false;
                }else{
                    $scope.isBuyBtnDisable = true;
                }
            }
        }).error(function (err) {
            alert('Item Loading error');
        });

    // variant change function
    $scope.changeVariant = function(variant){
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
            if(typeof selectVariantAvailableQty != 'undefined'){
                // If buyQty less than or equal Selected-Variant-Qty, buy button enable
                if(buyQty <= selectVariantAvailableQty){
                    $scope.isBuyBtnDisable = false;
                }
            }
        }
    };

    // item add function for cart
    $scope.addToCart = function() {
        if($scope.selectedVariant.buyQuantity == null){
            $ionicPopup.alert({
                title: 'Please enter a quantity',
                template: 'Warning!!!',
                cssClass: 'ionicPopUp'
            });
        }else{
        $rootScope.cart.cartItems.push({
            id: $scope.item.id,
            name: $scope.item.name,
            qty:$scope.selectedVariant.buyQuantity,
            sku: $scope.selectedVariant.sku,
            price: $scope.selectedVariant.price,
            total : $scope.selectedVariant.buyQuantity*$scope.selectedVariant.price

        });
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
        $state.go('tab.cart');
        }
    }

})

.controller('OurStoresCtrl', function($scope) {
    
    // This is dummy data, should come from db
    $scope.stores = [
        {
            name : 'Colombo Store',
            address : 'No 488, Kotte Road, Nugegoda'
        },
        {
            name : 'Nugegoda Store',
            address : 'No 884, Nugegoda Road, Kotte'
        }
    ]
})

.controller('ContactUsCtrl', function($scope,appServices,readMadeEasy) {

    // get item by Id
    readMadeEasy.readFile().success(function(appData){
        appServices.getContactUsByAppId(appData.appId)
            .success(function (data) {
                $scope.address = data.address;
                $scope.telPhone = data.telPhone;
                $scope.email = data.email;
                $scope.webSite = data.webSite;
            }).error(function (err) {
            alert('Contact Us Loading error');
        });
    });
});