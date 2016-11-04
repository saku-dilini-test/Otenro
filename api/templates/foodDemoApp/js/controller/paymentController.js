/**
 * Created by amila on 4/5/16.
 */
 /**
 * Edited by Shashan on 02/11/16.
 */

mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams,$http, constants, $ionicPopup, $state) {

  //getting the user's registered name and address
  $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'));

   // --/-- Here start Card Payment Function --/--

      // Config Cart payment
      $scope.cardType = {};
      $scope.card = {
          amount : $stateParams.amount
      };


      $scope.makeStripePayment = makeStripePayment;

      /**
       Make Payment Function
       */
      function makeStripePayment(_cardInformation) {

          if (!window.stripe) {
              alert("stripe plugin not installed");
              return;
          }

          if (!_cardInformation) {
              alert("Invalid Card Data");
              return;
          }
          stripe.charges.create({
                  // amount is in cents so * 100
                  amount: _cardInformation.amount * 100,
                  currency: 'usd',
                  card: {
                      "number": _cardInformation.number,
                      "exp_month": _cardInformation.exp_month,
                      "exp_year": _cardInformation.exp_year,
                      "cvc": _cardInformation.cvc,
                      "name": _cardInformation.userName
                  },
                  description: $rootScope.appName
              },
              function(response) {
                  console.log(JSON.stringify(response, null, 2));
                  // TODO : This alert for only testing
                  alert(JSON.stringify(response, null, 2));
                  if(response.error){
                      alert("Error");
                      // TODO : Error handle here
                  }else{
                      alert("Payment Success");
                      if($stateParams.pickupId == null){
                          $scope.details ={
                              appId : $rootScope.appId,
                              item : $stateParams.item,
                              amount : $stateParams.amount,
                              registeredName : $scope.user.name,
                              customerName : $stateParams.deliverDetails.name,
                              deliveryLocation : $stateParams.deliverDetails.location,
                              deliveryNo : $stateParams.deliverDetails.no,
                              deliveryStreet : $stateParams.deliverDetails.street,
                              deliveryCity : $stateParams.deliverDetails.city,
                              deliveryCountry : $stateParams.deliverDetails.country,
                              deliveryZip : $stateParams.deliverDetails.zip,
                              telNumber : $stateParams.deliverDetails.number,
                              tax :   $scope.tax,
                              shippingOpt : $stateParams.shippingOpt,
                              pickupId: $stateParams.pickupId
                           };
                       }
                       else{
                          $scope.details ={
                             appId : $rootScope.appId,
                             item : $stateParams.item,
                             amount : $stateParams.amount,
                             customerName : $stateParams.deliverDetails.name,
                             telNumber : $stateParams.deliverDetails.number,
                             tax :   $scope.tax,
                             pickupId: $stateParams.pickupId
                          }
                        }
                        $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
                         .then(function(res){
                          $scope.details.id = $rootScope.cart.cartItems[0].id;
                          $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item)
                             .then(function(res){
                                $rootScope.cart.cartItems = [];
                                $rootScope.cart.cartSize = 0;
                                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                $rootScope.cart.totalPrice = 0;
                                $rootScope.cart.totalQuantity = 0;
                                var alertPopup = $ionicPopup.alert({
                                  title: 'Thank You',
                                  subTitle: 'Your Order has been successfully processed',
                                  cssClass: 'ionicPopUp',
                                  buttons:[
                                   {text:'OK',
                                    type:'button-positive'},
                                  ]
                                });
                                // TODO : Currently back to cart
                                //back to Main Menu
                               $state.go('app.category');
                              },
                        function(err){
                          console.log(err);
                        });
                        },
                  function(err){
                      console.log(err);
                     });
                  }

              },
              function(response) {
                  alert(JSON.stringify(response));
                  alert("Error");
              }   // error handler
          );
      }
      // --/-- Here end Card Payment Function --/--

      // --/-- Here start Cash Payment Function --/--

      $scope.confirmCashPayment = function(){
        if($stateParams.pickupId == null){
           $scope.details ={
               appId : $rootScope.appId,
               item : $stateParams.item,
               amount : $stateParams.amount,
               customerName : $scope.user.name,
               deliverName : $stateParams.deliverDetails.name,
               deliveryLocation : $stateParams.deliverDetails.location,
               deliveryNo : $stateParams.deliverDetails.no,
               deliveryStreet : $stateParams.deliverDetails.street,
               deliveryCity : $stateParams.deliverDetails.city,
               deliveryCountry : $stateParams.deliverDetails.country,
               deliveryZip : $stateParams.deliverDetails.zip,
               telNumber : $stateParams.deliverDetails.number,
               tax :   $scope.tax,
               shippingOpt : $stateParams.shippingOpt,
               pickupId: $stateParams.pickupId
            };
        }
        else{
           $scope.details ={
              appId : $rootScope.appId,
              item : $stateParams.item,
              amount : $stateParams.amount,
              customerName : $stateParams.deliverDetails.name,
              telNumber : $stateParams.deliverDetails.number,
              tax :   $scope.tax,
              pickupId: $stateParams.pickupId
           }
         }
        $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
            .then(function(res){
                $scope.details.id = $rootScope.cart.cartItems[0].id;
                $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item)
                   .then(function(res){
                      $rootScope.cart.cartItems = [];
                      $rootScope.cart.cartSize = 0;
                      $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                      $rootScope.cart.totalPrice = 0;
                      $rootScope.cart.totalQuantity = 0;
                      var alertPopup = $ionicPopup.alert({
                        title: 'Thank You',
                        subTitle: 'Your Order has been successfully processed',
                        cssClass: 'ionicPopUp',
                        buttons:[
                         {text:'OK',
                          type:'button-positive'},
                        ]
                      });
                      // TODO : Currently back to cart
                      //back to Main Menu
                     $state.go('app.category');
                   },
                    function(err){
                        console.log(err);
                    });
            },
        function(err){
         console.log(err);
        });
      }
      // --/-- Here end cash Payment Function --/--
});