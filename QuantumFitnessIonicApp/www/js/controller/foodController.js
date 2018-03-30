/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http,$state,$ionicPopup,constants,$log,$ionicLoading,$ImageCacheFactory,$filter) {

    var prodDescShortLength = 100;

    $scope.$emit('hideMenu',{});
    $scope.foods = [];
    $rootScope.parseWeight;
    $scope.buyQuantity=0;
    $rootScope.timestamp = new Date().getTime();
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.showMoreProductDesc=false;
    $scope.showMoreProductDescSection = false;
    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";
    $scope.selectedVariant = {};

    $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
    });

    $scope.onSuccessGetProductsByCatId = function(data){
        $scope.foods = data;
 
        for(var i=0; i<data.length; i++){
            if(data[i].discount){
            $scope.foods[i].price = data[i].discount;
            }
        }

        $scope.color = [];
        for ( var i=0; i<$scope.foods.length ; i++){
            $scope.color.push($scope.getRandomColor());
        }

        $ionicLoading.hide();
    };

    $scope.getShowMoreProductDescSection = function(){
        $scope.showMoreProductDescSection = !$scope.showMoreProductDescSection;
    }


    $http.get(constants.SERVER_URL + '/templates/getProductsByCatId?appId='+$scope.appId+'&childId='+$stateParams.categoryId).success(function(data) {
        // $http.get("http://192.168.8.156:1337" + '/templates/getProductsByCatId?appId=5aa7ad07a4b5b3577110d2c3'+'&childId='+$stateParams.categoryId).success(function(data) {


        var imagePathArray = [];

        data.forEach(function(item){
            item.fullImagePath = $scope.imageURL + "/" + item.imageUrl;
            imagePathArray.push(item.fullImagePath);
        });

        $ImageCacheFactory.Cache(imagePathArray).then(function(){
            console.log("Images done loading!");
            $scope.onSuccessGetProductsByCatId(data);
        },function(failed){
            console.log("An image filed: "+failed);
            $scope.onSuccessGetProductsByCatId(data);
        });

     var check ='background-color:#';
     var color = 'background-color:#';
     $scope.getRandomColor = function () {
        var letters = ["CFBDAC", "D0DDDE", "EEEEEE", "FFDE8B", "DEBBAF", "C6D3E4"];

        while(true){
            if(check !== color){
                check = color;
                return color;
            }else {
                color = 'background-color:#';
                color += letters[Math.floor(Math.random()*letters.length)];
            }
        }
    };


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
               //Keeping the formatting as it is in Category Description
        $scope.foodInfo.detailedDesc = $scope.foodInfo.detailedDesc.replace(/(\r\n|\n|\r|\↵)/gm, "\n");

        console.log("$scope.foodInfo.detailedDesc=>" + $scope.foodInfo.detailedDesc);

        var detailedDescLength = $scope.foodInfo.detailedDesc.length;
        var images = $stateParams.item.tempImageArray;
        $scope.images = $stateParams.item.tempImageArray;
        $scope.showMoreProductDesc = detailedDescLength && (detailedDescLength > prodDescShortLength);
        var shortProdDesc = $scope.foodInfo.detailedDesc;

        if($scope.showMoreProductDesc){
            shortProdDesc = $filter('limitTo')($scope.foodInfo.detailedDesc, prodDescShortLength, 0);
        }
        $scope.foodInfo.shortProdDesc = shortProdDesc;

        // var imagePathArray = [];

        // images.forEach(function(image){
        //     image.fullImagePath = $scope.imageURL + "/" + image.img;
        //     imagePathArray.push(image.fullImagePath);
        // });

        // $ImageCacheFactory.Cache(imagePathArray).then(function(){
        //     console.log("Images done loading!");
        //     $scope.images = images;
        // },function(failed){
        //     console.log("An image filed: "+failed);
        //     $scope.images = images;
        // });


          if($stateParams.item.variants.length > 0){
                 $scope.selectedVariant = $stateParams.item.variants[0];
                $scope.selection = [];
                for(var i=0;i <$scope.foodInfo.variants.length;i++){
                        $scope.selection.push({'vType':$scope.foodInfo.variants[i].selection[0].vType});
                }
                if($scope.selectedVariant.quantity > 0 ){
                    $scope.isBuyBtnDisable = false;
                }else{
                    $scope.isBuyBtnDisable = true;
                }
          }
    }

    $scope.menuName = $stateParams.categoryName;

    $scope.lockBuyButton = false;
    $scope.changeVariant = function(variant){
      $scope.selection1 =[];
      $scope.selectedVariant1  =variant.vType;

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

        if($scope.foodInfo.selection.length == 1 && $scope.selectedVariant1 == undefined){
            $scope.lockBuyButton = true;
        }else if($scope.foodInfo.selection.length == 2 && $scope.selectedVariant2 == undefined){
            $scope.lockBuyButton = true;
        }else if($scope.foodInfo.selection.length == 3 && $scope.selectedVariant3 == undefined){
            $scope.lockBuyButton = true;
        }else if($scope.foodInfo.selection.length == 4 && $scope.selectedVariant4 == undefined){
            $scope.lockBuyButton = true;
        }


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
      $scope.addToCart = function(type) {

        var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
        if(localData){
          $scope.parentobj.appUserId = localData.registeredUser;

        }else {
          $scope.parentobj.appUserId = "unknown";

        }

          if($scope.foodInfo.selection.length == 1 && $scope.selectedVariant1 == undefined){
              $scope.lockBuyButton = true;
          }else if($scope.foodInfo.selection.length == 2 && $scope.selectedVariant2 == undefined){
              $scope.lockBuyButton = true;
          }else if($scope.foodInfo.selection.length == 3 && $scope.selectedVariant3 == undefined){
              $scope.lockBuyButton = true;
          }else if($scope.foodInfo.selection.length == 4 && $scope.selectedVariant4 == undefined){
              $scope.lockBuyButton = true;
          }else if($scope.selectedVariant.buyQuantity == null){
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
                            $rootScope.position2 = false;
                            //increasing weight when we add same product again.
                            $rootScope.cart.cartItems[i].totWeight += $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity;
                            $rootScope.cart.cartItems[i].qty += $scope.selectedVariant.buyQuantity;
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            $rootScope.parseWeight = $scope.selectedVariant.weight;

                            if (type==='category'){
                              $state.go('app.category');
                            }else {
                              $state.go('app.cart');
                            }


                            break;
                        }
                        else if(i == ($rootScope.cart.cartItems.length -1)){
                            $rootScope.position2 = true;
                            $rootScope.cart.cartItems.push({
                                id: $scope.foodInfo.id,
                                name: $scope.foodInfo.name,
                                qty: $scope.selectedVariant.buyQuantity,
                                variant: $scope.selectedVariant.selection,
                                sku: $scope.selectedVariant.sku,
                                totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                                price: $scope.selectedVariant.price,
                                total : $scope.selectedVariant.price,
                                mainType: $scope.foodInfo.mainType,
                                imgURL : $stateParams.item.tempImageArray,
                                totalQty: $scope.selectedVariant.quantity,
                                weight: $scope.selectedVariant.weight  //(new) added weight of each product

                            });
                            // $rootScope.cart.cartItems[i].totWeight = $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity + $scope.insideWeight;
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            if (type==='category'){
                              $state.go('app.category');
                            }else {
                              $state.go('app.cart');
                            }
                            break;
                        }
                        i++;
                    }

                localStorage.setItem("cart",JSON.stringify($rootScope.cart)) ;

            }
            else{
                $rootScope.cart.cartItems.push({
                    id: $scope.foodInfo.id,
                    name: $scope.foodInfo.name,
                    qty: $scope.selectedVariant.buyQuantity,
                    variant: $scope.selectedVariant.selection,
                    sku: $scope.selectedVariant.sku,
                    totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                    price: $scope.selectedVariant.price,
                    mainType: $scope.foodInfo.mainType,
                    total : $scope.selectedVariant.price,
                    imgURL : $stateParams.item.tempImageArray,
                    totalQty: $scope.selectedVariant.quantity,
                    weight: $scope.selectedVariant.weight //(new) added weight of each product

                });
                $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                $rootScope.parseWeight = $scope.selectedVariant.weight;


                localStorage.setItem("cart",JSON.stringify($rootScope.cart)) ;


                if (type==='category'){
                  $state.go('app.category');
                }else {
                  $state.go('app.cart');
                }
            }
        }
    };

});
