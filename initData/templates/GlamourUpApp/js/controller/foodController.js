/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,$ionicPopup,constants, $ionicModal) {

    $scope.$emit('hideMenu',{});

    $scope.buyQuantity=0;
    $rootScope.timestamp = new Date().getTime();
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    $ionicModal.fromTemplateUrl('templates/food.html', {
        scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
     $scope.modal = modal;
    });
    $scope.openItem = function(food) {
        $scope.modal.show();
        $scope.foodInfo = food;
        $scope.images = food.tempImageArray;

        if(food.variants.length > 0){
                $scope.selectedVariant = food.variants[0];
                $scope.selection = [];
                for(var i=0;i <$scope.foodInfo.variants.length;i++){
                        $scope.selection.push({'vType':food.variants[i].selection[0].vType});
                }
                if($scope.selectedVariant.quantity > 0 ){
                    $scope.isBuyBtnDisable = false;
                }else{
                    $scope.isBuyBtnDisable = true;
                }
          }
    };
    $scope.closeItem = function() {
        $scope.modal.hide();
    };


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


    $scope.menuName = $stateParams.categoryName;

    $scope.lockBuyButton = true;
    $scope.changeVariant = function(variant){
      $scope.selection1 =[];
      $scope.selectedVariant1  =variant.vType;
      $scope.selectedVariant.buyQuantity = '';

      $scope.lockBuyButton = true;

        if($scope.foodInfo.selection.length==1){
          for(var i=0;i<$scope.foodInfo.variants.length;i++){
            if($scope.foodInfo.variants[i].selection[0].vType == $scope.selectedVariant1){
                $scope.selectedVariant = $scope.foodInfo.variants[i];
                $scope.lockBuyButton = false;
            }
          }
        }else{
            for(var i=0;i <$scope.foodInfo.variants.length;i++){
                if($scope.foodInfo.variants[i].selection[0].vType == variant.vType){
                    $scope.selection1.push({'vType':$scope.foodInfo.variants[i].selection[1].vType});
                }
            }
        }

    };

    $scope.changeVariant2 = function(variant){
      $scope.selection2 =[];
      if(variant){
            $scope.selectedVariant2  =variant.vType;
            $scope.selectedVariant.buyQuantity = '';

      }
      $scope.lockBuyButton = true;

        if($scope.foodInfo.selection.length==2){
          for(var i=0;i<$scope.foodInfo.variants.length;i++){
            if($scope.foodInfo.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                $scope.foodInfo.variants[i].selection[1].vType == $scope.selectedVariant2){
                $scope.selectedVariant = $scope.foodInfo.variants[i];
                $scope.lockBuyButton = false;

            }
          }
        }else{
            for(var i=0;i <$scope.foodInfo.variants.length;i++){
                if($scope.foodInfo.variants[i].selection[1].vType == variant.vType){
                    $scope.selection2.push({'vType':$scope.foodInfo.variants[i].selection[2].vType});
                }
            }
        }

    };

    $scope.changeVariant3 = function(variant){
      $scope.selection3 =[];
      if(variant){
            $scope.selectedVariant3  =variant.vType;
            $scope.selectedVariant.buyQuantity = '';

      }
      $scope.lockBuyButton = true;

        if($scope.foodInfo.selection.length==3){
              for(var i=0;i<$scope.foodInfo.variants.length;i++){
                if($scope.foodInfo.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                    $scope.foodInfo.variants[i].selection[1].vType == $scope.selectedVariant2 &&
                    $scope.foodInfo.variants[i].selection[2].vType == $scope.selectedVariant3){
                    $scope.selectedVariant = $scope.foodInfo.variants[i];
                     $scope.lockBuyButton = false;

                }
              }
        }else{
            for(var i=0;i <$scope.foodInfo.variants.length;i++){
                if($scope.foodInfo.variants[i].selection[2].vType == variant.vType){
                    $scope.selection3.push({'vType':$scope.foodInfo.variants[i].selection[3].vType});
                }
            }
        }
    };
    $scope.changeVariant4 = function(variant){
        if(variant){
            $scope.selectedVariant4  =variant.vType;
            $scope.selectedVariant.buyQuantity = '';

        }

      for(var i=0;i<$scope.foodInfo.variants.length;i++){
            if($scope.foodInfo.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                $scope.foodInfo.variants[i].selection[1].vType == $scope.selectedVariant2 &&
                $scope.foodInfo.variants[i].selection[2].vType == $scope.selectedVariant3 &&
                $scope.foodInfo.variants[i].selection[3].vType == $scope.selectedVariant4){
                $scope.selectedVariant = $scope.foodInfo.variants[i];
                $scope.lockBuyButton = false;

            }
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

    // Products Add to cart
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
        }else{
            if($rootScope.cart.cartItems.length != 0){
                    var i=0;
                    while(i < $rootScope.cart.cartItems.length){
                        if($scope.foodInfo.id == $rootScope.cart.cartItems[i].id && $scope.selectedVariant.sku == $rootScope.cart.cartItems[i].sku){
                            $rootScope.cart.cartItems[i].totWeight += $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity;
                            $rootScope.cart.cartItems[i].qty += $scope.selectedVariant.buyQuantity;
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            $rootScope.parseWeight = $scope.selectedVariant.weight;

                            $scope.modal.hide();
                            break;
                        }
                        else if(i == ($rootScope.cart.cartItems.length -1)){
                            $rootScope.position2 = true;
                            $rootScope.cart.cartItems.push({
                                id: $scope.foodInfo.id,
                                name: $scope.foodInfo.name,
                                qty: $scope.selectedVariant.buyQuantity,
                                sku: $scope.selectedVariant.sku,
                                totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                                price: $scope.selectedVariant.price,
                                total : $scope.selectedVariant.price,
                                imgURL : $scope.images,
                                totalQty: $scope.selectedVariant.quantity,
                                weight: $scope.selectedVariant.weight  //(new) added weight of each product


                            });
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            $scope.modal.hide();
                            break;
                        }
                        i++;
                    }
            }
            else{
                $rootScope.cart.cartItems.push({
                    id: $scope.foodInfo.id,
                    name: $scope.foodInfo.name,
                    qty: $scope.selectedVariant.buyQuantity,
                    sku: $scope.selectedVariant.sku,
                    totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                    price: $scope.selectedVariant.price,
                    total : $scope.selectedVariant.price,
                    imgURL : $scope.images,
                    totalQty: $scope.selectedVariant.quantity,
                    weight: $scope.selectedVariant.weight //(new) added weight of each product

                });
                $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                $rootScope.parseWeight = $scope.selectedVariant.weight;
                $scope.modal.hide();
            }
        }

    };
    //get Sales and Promotions
    $http.get(constants.SERVER_URL + '/edit/getListOfSalesAndPromotions?appId='+$scope.appId).success(function(data) {
        $scope.salesandpromotion = data[0];
        console.log(data);
    }).error(function(err) {
        alert('warning', "Unable to get sales and Promotions ", err.message);
    });

});