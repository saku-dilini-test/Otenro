/**
 * Created by amila on 4/5/16.
 */
/**
 * Edited by Shashan on 01/11/16.
 */

mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams,$http, constants, $ionicPopup, $state,PaypalService,$log) {



    WePay.set_endpoint("stage");
    $scope.$emit('hideMenu',{});
    //getting the user's registered name and address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'));

    //setting Order Purchase History
    var orderHistory = [];
    $scope.history  = JSON.parse(localStorage.getItem('history'));

    // --/-- Here start retrieving the currency --/--//
    $scope.userId = $rootScope.userId;
    $scope.appId = $rootScope.appId;
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
        $rootScope.currency = data.sign;
        $rootScope.symbol = data.symbol;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    $http.get(constants.SERVER_URL + '/edit/getIPGInfo?appId='+$scope.appId).success(function(data) {
        $scope.paymentData = data;
        $log.debug($scope.paymentData);
        if($stateParams.item.delivery.method == "Delivery") {
            $scope.deliveryShow = data.cashOnDeliveryEnable;
            $scope.pickupShow = false;
        }else{
            $scope.deliveryShow = false;
            $scope.pickupShow = data.cashOnPickupEnable;
        }
        $scope.paypalShow = data.paypalEnable;
        $scope.stripeShow = data.stripeEnable;
        $scope.braintreeShow = data.braintreeEnable;
        $scope.authorizeNet = data.authorizeNetEnable;
        $scope.wepayShow = data.wepayEnable;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    // --/-- Here ends retrieving the currency --/--//

    // --/-- Here start Card Payment Function --/--
    $log.debug($stateParams.item.amount);
    // Config Cart payment
    $scope.cardType = {};
    $scope.card = {
        amount : $stateParams.item.amount
    };


    $scope.makeStripePayment = makeStripePayment;
    $scope.authorizeCreditCard = authorizeCreditCard;

    $scope.wepayPayment = function (wepayData) {
        console.log("$stateParams.item.delivery "+JSON.stringify($stateParams.item.delivery));
        console.log("$$stateParams.item.userEmail "+JSON.stringify($stateParams.item.userEmail));

        response = WePay.credit_card.create({
            "client_id":        2593,
            "user_name":        $stateParams.item.delivery.name,
            "email":            $stateParams.item.userEmail,
            "cc_number":        wepayData.number,
            "cvv":              wepayData.cvv,
            "expiration_month": wepayData.month,
            "expiration_year":  wepayData.year,
            "address": {
                "country": "US",
                "postal_code": "94025"
            }

        }, function(data) {
            if (data.error) {
                console.log(data);
                // handle error response
            } else {
                $http.get(constants.SERVER_URL +
                    '/templates/createPayment?credit_card_id='+data.credit_card_id+
                    "&currency=" +$rootScope.symbol + "&amount="+ $stateParams.item.amount ).success(function(data) {
                    if(data.state=='new'){
                        $scope.orderProcess();
                    }
                }).error(function(err) {
                    alert('warning', "Unable to get Products Selected Category", err.message);
                });

            }
        });
    }

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
                currency: $rootScope.currency.symbol,
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
                $log.debug(JSON.stringify(response, null, 2));
                // TODO : This alert for only testing
                alert(JSON.stringify(response, null, 2));
                if(response.error){
                    alert("Error");
                    // TODO : Error handle here
                }else{
                    alert("Payment Success");
                    $scope.orderProcess();
                }

            },
            function(response) {
                alert(JSON.stringify(response));
                alert("Error");
            }   // error handler
        );
    }
    // --/-- Here start Card Payment with AuthorizeNet Function --/--
    function authorizeCreditCard(card) {
          card.appId = $scope.appId
          $http.post(constants.SERVER_URL+"/templateController/authorizeNetPay",card)
          .then(function(res){
            var alertPopup = $ionicPopup.alert({
                subTitle: res.data.data,
                cssClass: 'ionicPopUp',
                buttons:[
                    {text:'OK',
                    type:'made-easy-button-setting'},
                ]
            });
            if(res.data.status == 'ok'){
              $scope.orderProcess();
            }
          },function(err){
            $log.debug(err);
          })
    }

    $scope.orderProcess = function(){
      $log.debug("orderProcess");
      if($stateParams.item.delivery.method == "Delivery"){
          $log.debug($scope.user.registeredUser);
          $scope.details ={
              appId : $rootScope.appId,
              registeredUser: $scope.user.registeredUser,
              item : $stateParams.item.cart,
              amount : $stateParams.item.amount,
              customerName : $scope.user.name,
              deliverName : $stateParams.item.delivery.name,
              deliveryNo : $stateParams.item.delivery.streetNumber,
              deliveryStreet : $stateParams.item.delivery.streetName,
              deliveryCity : $stateParams.item.delivery.city,
              deliveryCountry : $stateParams.item.delivery.country,
              deliveryZip : $stateParams.item.delivery.zip,
              telNumber : $stateParams.item.delivery.number,
              tax :   $stateParams.item.taxTotal,
              shippingCost :   $stateParams.item.shippingCost,
              shippingOpt : $stateParams.item.shipping.shippingOption,
              email: $stateParams.item.userEmail,
              promotionCode: $stateParams.item.promotionCode
          };
      }
      else{
          $log.debug($scope.user.registeredUser);
          $scope.details ={
              appId : $rootScope.appId,
              registeredUser: $scope.user.registeredUser,
              item : $stateParams.item.cart,
              amount : $stateParams.item.amount,
              customerName : $stateParams.deliverDetails.name,
              telNumber : $stateParams.deliverDetails.number,
              tax :   $stateParams.item.taxTotal,
              shippingCost :   $stateParams.item.shippingCost,
              pickupId: $stateParams.item.pickupId,
              email: $stateParams.item.userEmail,
              promotionCode: $stateParams.item.promotionCode
          }
      }
      $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
         .then(function(res){
          $scope.details.id = $rootScope.cart.cartItems[0].id;
          $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
              .then(function(res){
                  $rootScope.cart.cartItems = [];
                  $rootScope.cart.cartSize = 0;
                  $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                  $rootScope.cart.totalPrice = 0;
                  $rootScope.cart.totalQuantity = 0;

                 //Pushing into order purchase history
                 if(angular.fromJson(localStorage.getItem('history')) != null){
                 orderHistory = angular.fromJson(localStorage.getItem('history'));
                 }
                  orderHistory.push({
                      orderHistoryKey : $rootScope.appId,
                      createdDate: new Date(),
                      item :   $stateParams.item.cart,
                      amount :  $stateParams.item.amount,
                  });
                  localStorage.setItem('history', JSON.stringify(orderHistory));

                  var alertPopup = $ionicPopup.alert({
                      title: 'Thank You',
                      subTitle: 'Your Order has been successfully processed',
                      cssClass: 'ionicPopUp',
                      buttons:[
                          {text:'OK',
                              type:'made-easy-button-setting'},
                      ]
                  });
                  // TODO : Currently back to cart
                  //back to Main Menu
                  $state.go('app.category');
              },
              function(err){
                  $log.debug(err);
              });
      },
      function(err){
          $log.debug(err);
      });
    }
    // --/-- Here end Card Payment Function --/--
    // --/-- Here start Cash Payment Function --/--

    $scope.confirmCashPayment = function(){
        if($stateParams.item.delivery.method == "Delivery"){
            $scope.details ={
                appId : $rootScope.appId,
                registeredUser: $scope.user.registeredUser,
                item : $stateParams.item.cart,
                amount : $stateParams.item.amount,
                customerName : $scope.user.name,
                deliverName : $stateParams.item.delivery.name,
                deliveryNo : $stateParams.item.delivery.streetNumber,
                deliveryStreet : $stateParams.item.delivery.streetName,
                deliveryCity : $stateParams.item.delivery.city,
                deliveryCountry : $stateParams.item.delivery.country,
                deliveryZip : $stateParams.item.delivery.zip,
                telNumber : $stateParams.item.delivery.number,
                tax :   $stateParams.item.taxTotal,
                shippingCost :   $stateParams.item.shippingCost,
                shippingOpt : $stateParams.item.shipping.shippingOption,
                email: $stateParams.item.userEmail,
                currency:$rootScope.currency,
                promotionCode: $stateParams.item.promotionCode
            };
        }
        else{
            $scope.details ={
                appId : $rootScope.appId,
                registeredUser: $scope.user.registeredUser,
                item : $stateParams.item.cart,
                amount : $stateParams.item.amount,
                customerName : $stateParams.item.deliverDetails.name,
                telNumber : $stateParams.item.deliverDetails.number,
                tax :   $stateParams.item.taxTotal,
                shippingCost :   $stateParams.item.shippingCost,
                pickupId: $stateParams.item.pickupId,
                email: $stateParams.item.userEmail,
                currency:$rootScope.currency,
                promotionCode: $stateParams.item.promotionCode
            }
        }

        $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
            .then(function(res){
                    $scope.details.id = $rootScope.cart.cartItems[0].id;
                    $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                        .then(function(res){
                                $rootScope.cart.cartItems = [];
                                $rootScope.cart.cartSize = 0;
                                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                $rootScope.cart.totalPrice = 0;
                                $rootScope.cart.totalQuantity = 0;

                                //Pushing into order purchase history
                                  if(angular.fromJson(localStorage.getItem('history')) != null){
                                  orderHistory = angular.fromJson(localStorage.getItem('history'));
                                  }
                                orderHistory.push({
                                    orderHistoryKey : $rootScope.appId,
                                    createdDate: new Date(),
                                    item :   $stateParams.item.cart,
                                    amount :  $stateParams.item.amount,
                                });
                                localStorage.setItem('history', JSON.stringify(orderHistory));

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
                                $log.debug(err);
                            });
                },
                function(err){
                    $log.debug(err);
                });
    }
    // --/-- Here end cash Payment Function --/--



    // Buy With PayPal
    $scope.buyWithPayPal = function () {
        PaypalService.initPaymentUI().then(function () {
            PaypalService.makePayment($stateParams.item.amount, "Total Amount").then(function (response) {
                if($stateParams.item.delivery.method == "Delivery"){
                    $scope.details ={

                        appId : $rootScope.appId,
                        registeredUser: $scope.user.registeredUser,
                        item : $stateParams.item.cart,
                        amount : $stateParams.item.amount,
                        customerName : $scope.user.name,
                        deliverName : $stateParams.item.delivery.name,
                        deliveryNo : $stateParams.item.delivery.streetNumber,
                        deliveryStreet : $stateParams.item.delivery.streetName,
                        deliveryCity : $stateParams.item.delivery.city,
                        deliveryCountry : $stateParams.item.delivery.country,
                        deliveryZip : $stateParams.item.delivery.zip,
                        telNumber : $stateParams.item.delivery.number,
                        tax :   $stateParams.item.taxTotal,
                        shippingCost :   $stateParams.item.shippingCost,
                        shippingOpt : $stateParams.item.shipping.shippingOption,
                        email: $stateParams.item.userEmail,
                        currency:$rootScope.currency,
                        promotionCode: $stateParams.item.promotionCode
                    };
                }
                else{
                    $scope.details ={
                        appId : $rootScope.appId,
                        registeredUser: $scope.user.registeredUser,
                        item : $stateParams.item.cart,
                        amount : $stateParams.item.amount,
                        customerName : $stateParams.item.deliverDetails.name,
                        telNumber : $stateParams.item.deliverDetails.number,
                        tax :   $stateParams.item.taxTotal,
                        shippingCost :   $stateParams.item.shippingCost,
                        pickupId: $stateParams.item.pickupId,
                        email: $stateParams.item.userEmail,
                        currency:$rootScope.currency,
                        promotionCode: $stateParams.item.promotionCode
                    }
                }
                $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
                    .then(function(res){
                            $scope.details.id = $rootScope.cart.cartItems[0].id;
                            $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                                .then(function(res){
                                        $rootScope.cart.cartItems = [];
                                        $rootScope.cart.cartSize = 0;
                                        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                        $rootScope.cart.totalPrice = 0;
                                        $rootScope.cart.totalQuantity = 0;

                                        //Pushing into order purchase history
                                        if(angular.fromJson(localStorage.getItem('history')) != null){
                                        orderHistory = angular.fromJson(localStorage.getItem('history'));
                                        }
                                        orderHistory.push({
                                            orderHistoryKey : $rootScope.appId,
                                            createdDate: new Date(),
                                            item :   $stateParams.item.cart,
                                            amount :  $stateParams.item.amount,
                                        });
                                        localStorage.setItem('history', JSON.stringify(orderHistory));

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
                                        $log.debug(err);
                                    });
                        },
                        function(err){
                            $log.debug(err);
                        });
            }, function (error) {
                alert("Transaction Canceled");
            });
        });
    }

   
   /* if ($scope.braintreeShow){*/


   

        $scope.step = 'signup';
        $scope.customerId = false;
        $scope.paymentMethodToken = false;
        $scope.amount = 0;
        $scope.ready = false;
        $scope.step = 'verification';
        $scope.ready = true;

        var braintreeClient;
        $http
            .get(constants.SERVER_URL + '/edit/getClientToken?customerId=dsjdfsjdfjshdfjshjfhsjfhsdjkfhsdjkfhsjdkfhk')
            .then(function(response) {
                if (response.status === 200 && response.data !== undefined) {
                    braintreeClient = new braintree.api.Client({clientToken: response.data, enableCORS: true});
                    $scope.ready = true;
                }
                throw 'Invalid response';
            });

        /**
         * Save card
         */
        $scope.saveCard = function(card) {
            braintreeClient.tokenizeCard({
                number: card.number,
                cardholderName: card.cardholder,
                expirationMonth: card.expiration_month,
                expirationYear: card.expiration_year,
                cvv: card.cvv
                // billingAddress: {}
            }, function(err, nonce) {
                if (err) {
                    throw err;
                }

                var postData = {
                    paymentMethod: {
                        customerId: "dsjdfsjdfjshdfjshjfhsjfhsdjkfhsdjkfhsjdkfhk",
                        paymentMethodNonce: nonce
                    }
                };
                return $http
                    .post(constants.SERVER_URL + '/edit/paymentMethods', postData)
                    .then(function(response) {
                        if (response.status === 200 && response.data !== undefined) {
                            $log.debug('paymentMethodToken ' + response.data);
                            $scope.paymentMethodToken = response.data;
                            $scope.step = 'checkout';
                            $scope.amount = $stateParams.item.amount;
                        }
                    });
            })
        };

        $scope.pay = function() {
            var postData = {
                transaction: {
                    amount: $stateParams.item.amount,
                    paymentMethodToken : $scope.paymentMethodToken
                }
            };

            return $http
                .post(constants.SERVER_URL + '/edit/sale', postData)
                .then(function(response) {
                    if (response.status === 200 && response.data.transaction.id) {
                        $scope.step = 'done';
                        $scope.transactionId = response.data.transaction.id;
                        if($stateParams.item.delivery.method == "Delivery"){
                            $scope.details ={

                                appId : $rootScope.appId,
                                registeredUser: $scope.user.registeredUser,
                                item : $stateParams.item.cart,
                                amount : $stateParams.item.amount,
                                customerName : $scope.user.name,
                                deliverName : $stateParams.item.delivery.name,
                                deliveryNo : $stateParams.item.delivery.streetNumber,
                                deliveryStreet : $stateParams.item.delivery.streetName,
                                deliveryCity : $stateParams.item.delivery.city,
                                deliveryCountry : $stateParams.item.delivery.country,
                                deliveryZip : $stateParams.item.delivery.zip,
                                telNumber : $stateParams.item.delivery.number,
                                tax :   $stateParams.item.taxTotal,
                                shippingCost :   $stateParams.item.shippingCost,
                                shippingOpt : $stateParams.item.shipping.shippingOption,
                                email: $stateParams.item.userEmail,
                                promotionCode: $stateParams.item.promotionCode
                            };
                        }
                        else{
                            $scope.details ={
                                appId : $rootScope.appId,
                                registeredUser: $scope.user.registeredUser,
                                item : $stateParams.item.cart,
                                amount : $stateParams.item.amount,
                                customerName : $stateParams.item.deliverDetails.name,
                                telNumber : $stateParams.item.deliverDetails.number,
                                tax :   $stateParams.item.taxTotal,
                                shippingCost :   $stateParams.item.shippingCost,
                                pickupId: $stateParams.item.pickupId,
                                email: $stateParams.item.userEmail,
                                promotionCode: $stateParams.item.promotionCode
                            }
                        }
                        $http.post(constants.SERVER_URL+"/templatesOrder/saveOrder",$scope.details)
                            .then(function(res){
                                    $scope.details.id = $rootScope.cart.cartItems[0].id;
                                    $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                                        .then(function(res){
                                                $rootScope.cart.cartItems = [];
                                                $rootScope.cart.cartSize = 0;
                                                $scope.parentobj.cartSize = $rootScope.cart.cartSize;
                                                $rootScope.cart.totalPrice = 0;
                                                $rootScope.cart.totalQuantity = 0;

                                                //Pushing into order purchase history
                                                if(angular.fromJson(localStorage.getItem('history')) != null){
                                                    orderHistory = angular.fromJson(localStorage.getItem('history'));
                                                }
                                                orderHistory.push({
                                                    orderHistoryKey : $rootScope.appId,
                                                    createdDate: new Date(),
                                                    item :   $stateParams.item.cart,
                                                    amount :  $stateParams.item.amount,
                                                });
                                                localStorage.setItem('history', JSON.stringify(orderHistory));

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
                                                $log.debug(err);
                                            });
                                },
                                function(err){
                                    $log.debug(err);
                                });
                    }
                },function (error) {
                    alert("Transaction Canceled");
                });
        };
  /*  }*/


    
});