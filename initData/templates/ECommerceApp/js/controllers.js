angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope, $ionicSideMenuDelegate) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};
    $rootScope.isUserLoggedIn = {check:false};

    if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId) == null){
            $rootScope.isUserLoggedIn.check = false;
    }else{
            $rootScope.isUserLoggedIn.check = true;
    }


    $rootScope.parentobj = {};
    $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
    $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;

     function toggleLeft() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      // show & hide menu icon button
      $scope.showMenu = true;
      $scope.$on('hideMenu', function(){
          $scope.showMenu = false;
      });
      $scope.$on('$stateChangeStart', function(){
          $scope.showMenu = true;
      });

    $scope.logout = function(){
        localStorage.removeItem('appLocalStorageUser'+$rootScope.appId);
        $rootScope.cart.cartSize = 0;
        $rootScope.cart.cartItems = [];
        $rootScope.parentobj.cartSize = 0;
        $rootScope.isUserLoggedIn.check = false;
        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
        $ionicSideMenuDelegate.toggleLeft();
    }


})

.controller('MenuCtrl', function($scope,appServices,readMadeEasy,constants,$http,$rootScope) {

    // get all menu by app Id
    readMadeEasy.readFile().success(function(appData){
        appServices.getAllMenuByAppId(appData.appId)
            .success(function (imageData) {
                var image = [];
                //$scope.categoryList = data;
                for(i=0;i<(imageData.length);i++){
                    getData(i)
                }

            function getData(i){

                appServices.imageLoading(appData.userId,appData.appId,"secondNavi/",imageData[i].imageUrl)
                .success(function(Data) {
                    image.splice(i, 0, {img:Data.imageSrc});
                    replaceByValue(imageData,imageData[i].imageUrl,image[i].img)
               }).error(function(err) {
                    alert('warning', "Unable to get categories", err.message);
               });

            }
            function replaceByValue(imageData,equalImage,image) {
              //console.log(imageData[0].imageUrl)

              //console.log(image)

                for( var k = 0; k < imageData.length; k++ ) {
                    if( equalImage == imageData[k].imageUrl ) {

                      //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                      //console.log('dsadsadsadasdadsad'+image)

                        imageData[k].imageUrl = image ;
                        console.log(imageData)
                         $scope.categoryList = imageData;
                    }
                }

            }
            }).error(function (err) {
                alert('Menu Loading error');
        });

        // defined second navigation image path
/*        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+appData.userId+
                          "&appId="+appData.appId+"&"+new Date().getTime()+"&img=secondNavi";*/
        $http.get(constants.server_url + "cmd=getIconAllowance&appId="+$rootScope.appId)
            .success(function(data){
                if(data.allowPromote == true){
                  $rootScope.allowOtenroToPromote = true;
                  $rootScope.icon = data.icon;
                }
                else{
                  $rootScope.allowOtenroToPromote = false;
                  $rootScope.icon = null;
                }

            },function(err){
              console.log(err);
            })
    });
})

.controller('ItemsCtrl', function($scope,$stateParams,$state,appServices,readMadeEasy,constants) {

    $scope.$emit('hideMenu',{});


    $scope.$emit('hideMenu',{});
    // get currency by appId
    readMadeEasy.readFile().success(function(appData){
        appServices.getCurrencyByAppId(appData.appId)
            .success(function(data){
                $scope.currency = data;
            }).error(function(err){
            alert('Currency Loading error');
        })
    });
    // set select Menu Name
    $scope.menuName = $stateParams.menuName;
    // set select Menu Id
    var menuId = $stateParams.menuId;
    var image = [];
    // get all item by menu Id
    readMadeEasy.readFile().success(function(appData){
        appServices.getAllItemsByMenuId(menuId,appData.appId)
            .success(function (data) {
                //$scope.itemList = data;
                //console.log(JSON.stringify(data))
                for(var i=0; i<data.length; i++){
                    //console.log(data[i].imageUrl)
                    getData(i);

                }

                function getData(i){

                appServices.imageLoading(appData.userId,appData.appId,"thirdNavi/",data[i].imageUrl)
                    .success(function(Data) {
                        console.log(Data)
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(data,data[i].imageUrl,image[i].img)
                    }).error(function(err) {
                        alert('warning', "Unable to get categories", err.message);
                    });
                    //console.log(data[i].imageUrl)

                }
                function replaceByValue(imageData,equalImage,image) {
                  //console.log(imageData[0].imageUrl)

                  //console.log(image)

                    for( var k = 0; k < imageData.length; k++ ) {
                        if( equalImage == imageData[k].imageUrl ) {

                            imageData[k].imageUrl = image ;
                            imageData[k].tempImageArray[0].img = image;
                            console.log(imageData)
                            $scope.itemList = imageData;

                        }
                    }

                }

            }).error(function (err) {
                alert('Items Loading error');
        });

        // defined third navigation image path
/*        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+ appData.userId +
            "&appId="+appData.appId+"&"+new Date().getTime()+"&img=thirdNavi";*/
    });

    $scope.navigateFood = function(item){
        $state.go('tab.item',{item:item})
    }

    // ionic slider options
     $scope.options = {
                 nextButton: '.swiper-button-next',
                 prevButton: '.swiper-button-prev',
                 pagination: '.swiper-pagination',
                 paginationType: 'fraction',
                 effect: 'coverflow',
                 centeredSlides: true,
                 coverflow: {
                             rotate: 50,
                             stretch: 0,
                             depth: 100,
                             modifier: 1,
                             slideShadows : true
                         }
             }

})

.controller('ItemCtrl', function($scope,$rootScope,$stateParams,$state,appServices,readMadeEasy,constants,$ionicPopup) {

    // config
    $scope.selectedVariant = {};
        if($stateParams.item){
            $scope.foodInfo = $stateParams.item;
        };
    $scope.$emit('hideMenu',{});

    // get currency by appId
    readMadeEasy.readFile().success(function(appData){
        appServices.getCurrencyByAppId(appData.appId)
            .success(function(data){
                $scope.currency = data;
            }).error(function(err){
            alert('Currency Loading error');
        })
        $scope.appData = appData;

/*        // defined third navigation image path
        $scope.imageURL = constants.SERVER_URL+"/templates/viewImages?"+"userId="+ appData.userId +
            "&appId="+appData.appId+"&"+new Date().getTime()+"&img=thirdNavi";*/
    });

    // set select Item Name
        $scope.itemName = $stateParams.itemName;
        $scope.sliderOptions = {
          initialSlide: 0,
          direction: 'horizontal', //or vertical
          speed: 300, //0.3s transition
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          centeredSlides: true
        };
        $scope.sliderDelegate = null;
    // set select Menu Id
    var itemId = $stateParams.item._id;

    // get item by Id
    appServices.getItemById(itemId)
        .success(function (data) {
            $scope.item = data;
            getImage(data);
            //$scope.images = data.tempImageArray;
            $scope.productVariants = data.variants;
            if(data.variants.length > 0){
                $scope.selectedVariant = data.variants[0];
                $scope.selection = [];
                for(var i=0;i <$scope.item.variants.length;i++){
                        $scope.selection.push({'vType':$scope.item.variants[i].selection[0].vType});
                }
                if($scope.selectedVariant.quantity > 0 ){
                    $scope.isBuyBtnDisable = false;
                }else{
                    $scope.isBuyBtnDisable = true;
                }
            }
        }).error(function (err) {
            alert('Item Loading error');
        });

    function getImage(data){
        var image = [];
        //console.log(JSON.stringify(data))
         appServices.imageLoading($scope.appData.userId,$scope.appData.appId,'thirdNavi/',data.imageUrl)
                .success(function (Data) {
                    data.imageUrl = Data.imageSrc;
                    data.tempImageArray[0].img = Data.imageSrc;
                    $scope.images = data.tempImageArray;
                }).error(function (err) {
                 alert('Item Loading error');
                });
    }

    $scope.lockBuyButton = true;
    $scope.changeVariant = function(variant){
      $scope.selection1 =[];
      $scope.selectedVariant1  =variant.vType;
      $scope.lockBuyButton = true;

        if($scope.item.selection.length==1){
          for(var i=0;i<$scope.item.variants.length;i++){
            if($scope.item.variants[i].selection[0].vType == $scope.selectedVariant1){
                $scope.selectedVariant = $scope.item.variants[i];
                $scope.lockBuyButton = false;
            }
          }
        }else{
            for(var i=0;i <$scope.item.variants.length;i++){
                if($scope.item.variants[i].selection[0].vType == variant.vType){
                    $scope.selection1.push({'vType':$scope.item.variants[i].selection[1].vType});
                }
            }
        }

    };

    $scope.changeVariant2 = function(variant){
      $scope.selection2 =[];
      $scope.selectedVariant2  =variant.vType;
      $scope.lockBuyButton = true;

        if($scope.item.selection.length==2){
          for(var i=0;i<$scope.item.variants.length;i++){
            if($scope.item.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                $scope.item.variants[i].selection[1].vType == $scope.selectedVariant2){
                $scope.selectedVariant = $scope.item.variants[i];
                $scope.lockBuyButton = false;

            }
          }
        }else{
            for(var i=0;i <$scope.item.variants.length;i++){
                if($scope.item.variants[i].selection[1].vType == variant.vType){
                    $scope.selection2.push({'vType':$scope.item.variants[i].selection[2].vType});
                }
            }
        }

    };

    $scope.changeVariant3 = function(variant){
      $scope.selection3 =[];
      $scope.selectedVariant3  =variant.vType;
      $scope.lockBuyButton = true;

        if($scope.item.selection.length==3){
              for(var i=0;i<$scope.item.variants.length;i++){
                if($scope.item.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                    $scope.item.variants[i].selection[1].vType == $scope.selectedVariant2 &&
                    $scope.item.variants[i].selection[2].vType == $scope.selectedVariant3){
                    $scope.selectedVariant = $scope.item.variants[i];
                     $scope.lockBuyButton = false;

                }
              }
        }else{
            for(var i=0;i <$scope.item.variants.length;i++){
                if($scope.item.variants[i].selection[2].vType == variant.vType){
                    $scope.selection3.push({'vType':$scope.item.variants[i].selection[3].vType});
                }
            }
        }
    };
    $scope.changeVariant4 = function(variant){
      $scope.selectedVariant4  =variant.vType;

      for(var i=0;i<$scope.item.variants.length;i++){
            if($scope.item.variants[i].selection[0].vType == $scope.selectedVariant1 &&
                $scope.item.variants[i].selection[1].vType == $scope.selectedVariant2 &&
                $scope.item.variants[i].selection[2].vType == $scope.selectedVariant3 &&
                $scope.item.variants[i].selection[3].vType == $scope.selectedVariant4){
                $scope.selectedVariant = $scope.item.variants[i];
                $scope.lockBuyButton = false;

            }
      }
      console.log($scope.selectedVariant)
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

    // item add function for cart
 $scope.addToCart = function() {
        if($scope.selectedVariant.buyQuantity == null){
            $ionicPopup.alert({
                title: 'Please enter a quantity',
                template: 'Warning!!!',
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
                        if($scope.item._id == $rootScope.cart.cartItems[i]._id && $scope.selectedVariant.sku == $rootScope.cart.cartItems[i].sku){
                            $rootScope.cart.cartItems[i].qty += $scope.selectedVariant.buyQuantity;
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            $state.go('tab.menu');
                            break;
                        }
                        else if(i == ($rootScope.cart.cartItems.length -1)){
                            $rootScope.cart.cartItems.push({
                                id: $scope.item._id,
                                name: $scope.item.name,
                                qty: $scope.selectedVariant.buyQuantity,
                                sku: $scope.selectedVariant.sku,
                                totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                                price: $scope.selectedVariant.price,
                                total : $scope.selectedVariant.price,
                                imgURL : $stateParams.item.tempImageArray,
                                totalQty: $scope.selectedVariant.quantity
                            });
                            $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                            $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                            $state.go('tab.menu');
                            break;
                        }
                        i++;
                    }
            }
            else{
                $rootScope.cart.cartItems.push({
                    id: $scope.item._id,
                    name: $scope.item.name,
                    qty: $scope.selectedVariant.buyQuantity,
                    sku: $scope.selectedVariant.sku,
                    totWeight: $scope.selectedVariant.weight*$scope.selectedVariant.buyQuantity,
                    price: $scope.selectedVariant.price,
                    total : $scope.selectedVariant.price,
                    imgURL : $stateParams.item.tempImageArray,
                    totalQty: $scope.selectedVariant.quantity
                });
                $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                $state.go('tab.menu');
            }

        }
    };

})

.controller('OurStoresCtrl', function($scope, $http, $rootScope, $ionicPopup, constants) {

    $http.get(constants.server_url + "cmd=getAboutUs&appId="+$rootScope.appId)
            .success(function (data) {
                $scope.header = data.header;
                $scope.content = data.content;
            },function (err) {
                $ionicPopup.alert({
                    title: 'About us Data loading error!',
                    template: 'Please check your connection!'
                });
            });

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