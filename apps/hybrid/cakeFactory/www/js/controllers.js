angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope,$rootScope) {
    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};
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
  function ($scope,SERVER_URL,categoryProductResources, $stateParams,$state,$rootScope) {
    $scope.SERVER_URL = SERVER_URL;

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
      if(value == 1){
        Price = $scope.product.qty * $scope.product.price;
      }
      else{
        Price = $scope.product.qty * $scope.product.perSlicePrice;
      }
      $rootScope.cart.cartItems.push({
        name: $scope.product.name,
        pieces: $scope.product.qty,
        price:Price
      });
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
      $state.go('tab.cart')
    }
})

.controller('AboutCtrl', function ($scope) {})

.controller('CartCtrl', function ($scope,$rootScope) {
    $scope.cartItems = $rootScope.cart.cartItems;

    $scope.getTotal = function(){
      var total = 0;
      for(var i = 0; i < $scope.cartItems.length; i++){
          var product = $scope.cartItems[i];
          total += (product.price);
      }
      $rootScope.cart.totalPrice = total;
      return total;
    };

    $scope.removeItem = function(index){
      $scope.cartItems.splice(index, 1);
      $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
    }
})

.controller('ContactCtrl', function ($scope) {})

.controller('DeliveryCtrl', function ($scope,$rootScope,PaypalService,paymentResources,$state,initialData) {
        var totalAmountUSD = initialData.totalAmount.data.usd;
        var oneUSD = initialData.oneUSD.data.result;
        $scope.isVisibleAddress = false;
        $scope.addDeliveryFee = function(amount){
          $scope.delivery.usdAmountWithDeliveryFee = totalAmountUSD + (amount / oneUSD );
          $scope.isVisibleAddress = true;
          if(typeof amount == 'undefined'){
            $scope.isVisibleAddress = false;
          }
        }
        $scope.delivery = {usdAmount:totalAmountUSD};
        $scope.deliveryLocations = initialData.deliveryLocations.data.result;
        $scope.payNow = function(){

        PaypalService.initPaymentUI().then(function () {
            PaypalService.makePayment($scope.delivery.usdAmountWithDeliveryFee,"Total Amount").
                then(function (response) {
                    alert("Transaction is successful");
                    paymentResources.paymentDetails({
                        deliveryDetails:$scope.delivery,
                        response:response.response,
                        client:response.client,
                        response_type:response.response_type,
                        shoppingCart:$rootScope.cart.cartItems
                    }).then(function(response){
                      if(response.data.status == 'Success') {
                        var cartArrayLength = $rootScope.cart.cartItems.length;
                        $rootScope.cart.cartItems.splice(0,cartArrayLength);
                        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                        $state.go("orderConfirmation", {orderId: response.data.result.response.id});
                      }else{
                        alert("Transaction error");
                      }
                    },function(error){
                      alert("Transaction error");
                    });
                }, function (error) {
                    alert("Transaction Canceled");
                });
      });
    }
  })
  .controller('PickupCtrl', function ($scope,$rootScope,PaypalService,paymentResources,$state,initialData) {
    var totalAmountUSD = initialData.totalAmount.data.usd;
    $scope.pickup = {usdAmount:totalAmountUSD};
    $scope.branchLocations = initialData.branchLocations.data.result;
    $scope.payNow = function(){
      PaypalService.initPaymentUI().then(function () {
        PaypalService.makePayment(totalAmountUSD,"Total Amount").
          then(function (response) {
            alert("Transaction is successful");
            paymentResources.pickupPaymentDetails({
              pickupDetails:$scope.pickup,
              response:response.response,
              client:response.client,
              response_type:response.response_type,
              shoppingCart:$rootScope.cart.cartItems
            }).then(function(response){
                if(response.data.status == 'Success') {
                  var cartArrayLength = $rootScope.cart.cartItems.length;
                  $rootScope.cart.cartItems.splice(0,cartArrayLength);
                  $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
                  $state.go("orderConfirmation", {orderId: response.data.result.response.id});
                }else{
                  alert("Transaction error");
                }
            },function(error){
              alert("Transaction error");
            });
          }, function (error) {
            alert("Transaction Canceled");
          });
      });
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


