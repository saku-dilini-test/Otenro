angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope,$rootScope,initialData) {
    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0,oneDoller:initialData.oneUSD.data.result};

})

.controller('MenuCtrl', function ($scope, SERVER_URL,initialData) {
  $scope.SERVER_URL = SERVER_URL;
  $scope.categories = initialData.categories.data.result;
})

.controller('CategoryProductsCtrl',
  function ($scope,SERVER_URL, $stateParams,categoryProductResources) {
    $scope.SERVER_URL = SERVER_URL;
    $scope.categoryProducts = categoryProductResources.getProductsByCategory($stateParams.categoryCode)
      .success(function (data) {
        $scope.categoryProducts = data.result;
      })
      .error(function (err) {
        console.log(err);
      })
})

.controller('ProductDetailCtrl',
  function ($scope,SERVER_URL,categoryProductResources, $stateParams,$state,$rootScope,DataService) {
    $scope.SERVER_URL = SERVER_URL;
    $scope.paypalCart = DataService.cart;
    $scope.product =  categoryProductResources.productsDetails($stateParams.productId)
      .success(function (data) {
        $scope.product = data.result;
        $scope.product.qty = 1;
      })
      .error(function (err) {
        console.log(err);
      });
    $scope.choice =[
      {text: "Cake", value: "1", price:$scope.product.price},
      {text: "Slice", value:"2", price:$scope.product.perSlicePrice}
    ];
    $scope.data = {
      choice:"1"
    };
    $scope.buy = function(data){
      var value = data;
      var usdPrice,Price;
      if(value == 1){
        Price = $scope.product.qty * $scope.product.price;
        usdPrice = $scope.product.price;
      }
      else{
        Price = $scope.product.qty * $scope.product.perSlicePrice;
        usdPrice = $scope.product.perSlicePrice;
      }
      $rootScope.cart.cartItems.push({
        name: $scope.product.name,
        pieces: $scope.product.qty,
        price:Price,
        itemCode:$scope.product.itemCode
      });
      if($scope.product.qty == 0){
        $scope.paypalCart.addItem($scope.product.itemCode, $scope.product.name, usdPrice, -1000);
      }
      $scope.paypalCart.addItem($scope.product.itemCode, $scope.product.name,usdPrice, $scope.product.qty);

      $scope.paypalCart.saveItems();
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;

      $state.go('tab.cart')
    }
})

.controller('AboutCtrl', function ($scope) {})

.controller('CartCtrl', function ($scope,$rootScope,DataService) {
    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.paypalCart = DataService.cart;

    $scope.getTotal = function(){
      var total = 0;
      for(var i = 0; i < $scope.cartItems.length; i++){
          var product = $scope.cartItems[i];
          total += (product.price);
      }
      $rootScope.cart.totalPrice = total;
      return total;
    };

    $scope.removeItem = function(index,cartItem){

      $scope.cartItems.splice(index, 1);
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
      $scope.paypalCart.addItem(cartItem.itemCode, cartItem.name, cartItem.price, -1000);

    }
})

.controller('ContactCtrl', function ($scope,$interval) {

  })

.controller('DeliveryCtrl', function ($scope,$rootScope,paymentResources,$state,initialData,DataService,$location,$timeout,ORDER_URL) {
        var totalAmountUSD = initialData.totalAmount.data.usd;
        var oneUSD = initialData.oneUSD.data.result;
        $scope.isVisibleAddress = false;
        $scope.paypalCart = DataService.cart;

        $scope.cart = DataService.cart;
        $scope.addDeliveryFee = function(amount){
          $scope.delivery.usdAmountWithDeliveryFee = totalAmountUSD + (amount / oneUSD );
          $scope.paypalCart.saveDeliveryCharges(amount);
          $scope.isVisibleAddress = true;
          if(typeof amount == 'undefined'){
            $scope.isVisibleAddress = false;
          }
        };
        $scope.delivery = {usdAmount:totalAmountUSD};
        $scope.deliveryLocations = initialData.deliveryLocations.data.result;
        $scope.payNow = function(){
          $scope.cartInfo = $scope.cart.getCartInfo();
          $scope.cartInfo.oneDoller = $rootScope.cart.oneDoller;
          $scope.cartInfo.userInfo = $scope.delivery;
          console.log($scope.cartInfo);
          var cartInfo = JSON.stringify($scope.cartInfo);
          {
            // Open in external browser
            window.open(ORDER_URL+'cartInfo='+cartInfo,'_system');
          };
          $scope.changePath = function(){
            $scope.cart.clearItems();
            for(var i = 0; i < $rootScope.cart.cartSize ; i++ ){
              $rootScope.cart.cartItems.splice(i,1);
            }
            $rootScope.cart.cartSize = 0;
            $scope.delivery = {};
            $location.path('/');
          }

          $timeout( function(){
            $scope.changePath();
          }, 3000);
        }
  })
  .controller('PickupCtrl', function ($scope,$rootScope,paymentResources,$state,initialData,DataService,$location,$timeout,ORDER_URL) {
    var totalAmountUSD = initialData.totalAmount.data.usd;
    $scope.pickup = {usdAmount:totalAmountUSD};
    $scope.cart = DataService.cart;

    console.log($scope.cart.oneDoller);
    $scope.branchLocations = initialData.branchLocations.data.result;
    $scope.payNow = function(){
      //$scope.cart.checkoutPayPal('PayPal');
      $scope.cartInfo = $scope.cart.getCartInfo();
      $scope.cartInfo.oneDoller = $rootScope.cart.oneDoller;
      $scope.cartInfo.userInfo = $scope.pickup;
        console.log($scope.cartInfo);
      var cartInfo = JSON.stringify($scope.cartInfo);
      window.open(ORDER_URL+'cartInfo='+cartInfo,'_system','location=no');
      $scope.changePath = function(){
        $scope.cart.clearItems();
        for(var i = 0; i < $rootScope.cart.cartSize ; i++ ){
          $rootScope.cart.cartItems.splice(i,1);
        }
        $rootScope.cart.cartSize = 0;
        $scope.pickup = {};
        $location.path('/');
      }

      $timeout( function(){
        $scope.changePath();
      }, 3000);


    }
  })

  .controller('orderConfirmationCtrl', function ($scope,$rootScope,initialData) {
    var summary  = initialData.orderSummary.data.result.pickupDetails;
    $scope.isBranch = true;
    if(typeof summary == 'undefined'){
      summary  = initialData.orderSummary.data.result.deliveryDetails;
      $scope.isBranch = false;
    }
    var ProcessedTime = initialData.orderSummary.data.result.order_proccessed_Time;
    var ProcessedId = initialData.orderSummary.data.result.response.id;

    $scope.totalAmount = summary.usdAmount+"$";
    $scope.customerName = summary.name;
    $scope.customerContactNo = summary.contactNo;
    $scope.pickupBranch = summary.branch;
    $scope.deliveryAddress = summary.address;
    $scope.orderProcessedTime = ProcessedTime;
    $scope.orderProcessedId = ProcessedId;

  })

  .controller('PromosCtrl', function ($scope,promotionResources) {

    $scope.promotionList = promotionResources.getPromotionList()
      .success(function (data) {

        $scope.promotionList = data.result[0];
      })
      .error(function (err) {
        console.log(err);
      })
  })

  .controller('TabCtrl',function($scope,$rootScope){
    $scope.itemsSize = $rootScope.cart.cartSize;
    $scope.$watch(function() {
      return $rootScope.cart.cartSize;
    }, function() {
      $scope.itemsSize = $rootScope.cart.cartSize;
    }, true);
  });


