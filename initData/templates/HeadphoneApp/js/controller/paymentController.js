/**
 * Created by amila on 4/5/16.
 */
/**
 * Edited by Shashan on 01/11/16.
 */
/**
 * Edited by kalani on 7/20/17.
 */
mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams,$http, constants, $ionicPopup, $state,PaypalService,$log) {

    $scope.$emit('hideMenu',{});

    if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId) == null){
        $state.go('app.login')
    }
    //getting the user's registered name and address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

    //setting Order Purchase History
    var orderHistory = [];
    $scope.history  = JSON.parse(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser));

    // --/-- Here start retrieving the currency --/--//
    $scope.userId = $rootScope.userId;
    $scope.appId = $rootScope.appId;
    $http.get(constants.server_url + 'cmd=getCurrency&appId='+$scope.appId).success(function(data) {
        $rootScope.currency = data.sign;
        $rootScope.symbol = data.symbol;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    $http.get(constants.server_url + 'cmd=getIPGInfo&appId='+$scope.appId).success(function(data) {
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

    /**
     Make Payment Function
     */
    function makeStripePayment(cardInformation) {
        cardInformation.appId = $rootScope.appId;
        cardInformation.userId = $rootScope.userId;

        $http.post(constants.SERVER_URL+'/templates/makeStripePayment',cardInformation)

            .then(function(res){

                if(res.data.status == 'succeeded'){
                    $scope.orderProcess();
                }else {
                    var alertPopup = $ionicPopup.alert({
                        subTitle: 'payment failed',
                        cssClass: 'ionicPopUp',
                        buttons:[
                            {text:'OK',
                                type:'made-easy-button-setting'},
                        ]
                    });
                }
            },function(err){
                var alertPopup = $ionicPopup.alert({
                    subTitle: 'payment failed',
                    cssClass: 'ionicPopUp',
                    buttons:[
                        {text:'Error',
                            type:'made-easy-button-setting'},
                    ]
                });
            })

    };
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
        var url;

        for(var i=0;i<$stateParams.item.cart.length;i++){
            $stateParams.item.cart[i].imgURL = $stateParams.item.cart[i].imgURL[1].oldImage;
        }
        console.log($stateParams.item.cart)
        var object = JSON.stringify($stateParams.item.cart, function( key, value ){

        if( key === "$$hashKey" ) {
           return undefined;
        }
        return value;


        })

        if($stateParams.item.delivery.method == "Delivery"){

              url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$scope.user.name+'&deliverName='+$stateParams.item.delivery.name+'&deliveryNo='+$stateParams.item.delivery.streetNumber+ '&deliveryStreet='+$stateParams.item.delivery.streetName+'&deliveryCity='+$stateParams.item.delivery.city+'&deliveryCountry='+$stateParams.item.delivery.country+ '&deliveryZip='+$stateParams.item.delivery.zip+'&telNumber='+ $stateParams.item.delivery.number+'&tax='+$stateParams.item.taxTotal  +'&shippingCost='+$stateParams.item.shippingCost+'&shippingOpt='+ $stateParams.item.shipping.shippingOption+'&email='+ $stateParams.item.userEmail+'&currency='+$rootScope.currency  +'&promotionCode='+$stateParams.item.promotionCode
        }
        else{

            url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$stateParams.item.deliverDetails.name+'&telNumber='+$stateParams.item.deliverDetails.number+'&tax='+$stateParams.item.taxTotal+'&shippingCost='+$stateParams.item.shippingCost+'&pickupId='+$stateParams.item.pickupId+'&email='+$stateParams.item.userEmail+'&currency='+$rootScope.currency+'&promotionCode='+$stateParams.item.promotionCode
        }
        $http.post(constants.server_url+ url)
            .then(function(res){
                    //$scope.details.id = $rootScope.cart.cartItems[0].id;
                    $http.post(constants.server_url+'cmd=updateInventory&id='+$stateParams.item.cart[0].id+'&sku='+$stateParams.item.cart[0].sku+'&qty='+$stateParams.item.cart[0].qty)
                    //$http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                        .then(function(res){
                                $rootScope.cart.cartItems = [];
                                $rootScope.cart.cartSize = 0;
                                $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
                                $rootScope.cart.totalPrice = 0;
                                $rootScope.cart.totalQuantity = 0;

                                //Pushing into order purchase history
                                if(angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser)) != null){
                                    orderHistory = angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser));
                                }
                                orderHistory.push({
                                    orderHistoryKey : $rootScope.appId,
                                    createdDate: new Date(),
                                    item :   $stateParams.item.cart,
                                    amount :  $stateParams.item.amount,
                                });
                                localStorage.setItem("history"+$rootScope.appId+$scope.user.registeredUser, JSON.stringify(orderHistory));

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

    console.log('$stateParams.item.delivery.method'+$stateParams.item.delivery.method)
        var url;

        for(var i=0;i<$stateParams.item.cart.length;i++){
            $stateParams.item.cart[i].imgURL = $stateParams.item.cart[i].imgURL[1].oldImage;
        }
        console.log($stateParams.item.cart)
        var object = JSON.stringify($stateParams.item.cart, function( key, value ){

        if( key === "$$hashKey" ) {
           return undefined;
        }
        return value;


        })

        if($stateParams.item.delivery.method == "Delivery"){

              url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$scope.user.name+'&deliverName='+$stateParams.item.delivery.name+'&deliveryNo='+$stateParams.item.delivery.streetNumber+ '&deliveryStreet='+$stateParams.item.delivery.streetName+'&deliveryCity='+$stateParams.item.delivery.city+'&deliveryCountry='+$stateParams.item.delivery.country+ '&deliveryZip='+$stateParams.item.delivery.zip+'&telNumber='+ $stateParams.item.delivery.number+'&tax='+$stateParams.item.taxTotal  +'&shippingCost='+$stateParams.item.shippingCost+'&shippingOpt='+ $stateParams.item.shipping.shippingOption+'&email='+ $stateParams.item.userEmail+'&currency='+$rootScope.currency  +'&promotionCode='+$stateParams.item.promotionCode
        }
        else{

            url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$stateParams.item.deliverDetails.name+'&telNumber='+$stateParams.item.deliverDetails.number+'&tax='+$stateParams.item.taxTotal+'&shippingCost='+$stateParams.item.shippingCost+'&pickupId='+$stateParams.item.pickupId+'&email='+$stateParams.item.userEmail+'&currency='+$rootScope.currency+'&promotionCode='+$stateParams.item.promotionCode
        }
        $http.post(constants.server_url+ url)
            .then(function(res){
                    //$scope.details.id = $rootScope.cart.cartItems[0].id;
                    $http.post(constants.server_url+'cmd=updateInventory&id='+$stateParams.item.cart[0].id+'&sku='+$stateParams.item.cart[0].sku+'&qty='+$stateParams.item.cart[0].qty)
                    //$http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                        .then(function(res){
                                $rootScope.cart.cartItems = [];
                                $rootScope.cart.cartSize = 0;
                                $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
                                $rootScope.cart.totalPrice = 0;
                                $rootScope.cart.totalQuantity = 0;

                                //Pushing into order purchase history
                                if(angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser)) != null){
                                    orderHistory = angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser));
                                }
                                orderHistory.push({
                                    orderHistoryKey : $rootScope.appId,
                                    createdDate: new Date(),
                                    item :   $stateParams.item.cart,
                                    amount :  $stateParams.item.amount,
                                });

                                localStorage.setItem("history"+$rootScope.appId+$scope.user.registeredUser, JSON.stringify(orderHistory));

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
            var url;

            for(var i=0;i<$stateParams.item.cart.length;i++){
                $stateParams.item.cart[i].imgURL = $stateParams.item.cart[i].imgURL[1].oldImage;
            }
            console.log($stateParams.item.cart)
            var object = JSON.stringify($stateParams.item.cart, function( key, value ){

            if( key === "$$hashKey" ) {
               return undefined;
            }
            return value;


            })

            if($stateParams.item.delivery.method == "Delivery"){

                  url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$scope.user.name+'&deliverName='+$stateParams.item.delivery.name+'&deliveryNo='+$stateParams.item.delivery.streetNumber+ '&deliveryStreet='+$stateParams.item.delivery.streetName+'&deliveryCity='+$stateParams.item.delivery.city+'&deliveryCountry='+$stateParams.item.delivery.country+ '&deliveryZip='+$stateParams.item.delivery.zip+'&telNumber='+ $stateParams.item.delivery.number+'&tax='+$stateParams.item.taxTotal  +'&shippingCost='+$stateParams.item.shippingCost+'&shippingOpt='+ $stateParams.item.shipping.shippingOption+'&email='+ $stateParams.item.userEmail+'&currency='+$rootScope.currency  +'&promotionCode='+$stateParams.item.promotionCode
            }
            else{

                url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$stateParams.item.deliverDetails.name+'&telNumber='+$stateParams.item.deliverDetails.number+'&tax='+$stateParams.item.taxTotal+'&shippingCost='+$stateParams.item.shippingCost+'&pickupId='+$stateParams.item.pickupId+'&email='+$stateParams.item.userEmail+'&currency='+$rootScope.currency+'&promotionCode='+$stateParams.item.promotionCode
            }
            $http.post(constants.server_url+ url)
                    .then(function(res){
                            //$scope.details.id = $rootScope.cart.cartItems[0].id;
                            $http.post(constants.server_url+'cmd=updateInventory&id='+$stateParams.item.cart[0].id+'&sku='+$stateParams.item.cart[0].sku+'&qty='+$stateParams.item.cart[0].qty)
                            //$http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                                .then(function(res){
                                        $rootScope.cart.cartItems = [];
                                        $rootScope.cart.cartSize = 0;
                                        $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
                                        $rootScope.cart.totalPrice = 0;
                                        $rootScope.cart.totalQuantity = 0;

                                        //Pushing into order purchase history
                                        if(angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser)) != null){
                                            orderHistory = angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser));
                                        }
                                        orderHistory.push({
                                            orderHistoryKey : $rootScope.appId,
                                            createdDate: new Date(),
                                            item :   $stateParams.item.cart,
                                            amount :  $stateParams.item.amount,
                                        });
                                        localStorage.setItem("history"+$rootScope.appId+$scope.user.registeredUser, JSON.stringify(orderHistory));

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



    $scope.step = 'signup';
    $scope.customerId = false;
    $scope.paymentMethodToken = false;
    $scope.amount = 0;
    $scope.ready = false;
    $scope.step = 'verification';
    $scope.ready = true;

    var braintreeClient;
    $http
        .get(constants.server_url + 'cmd=getClientToken&customerId=dsjdfsjdfjshdfjshjfhsjfhsdjkfhsdjkfhsjdkfhk')
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
                    var url;

                    for(var i=0;i<$stateParams.item.cart.length;i++){
                        $stateParams.item.cart[i].imgURL = $stateParams.item.cart[i].imgURL[1].oldImage;
                    }
                    console.log($stateParams.item.cart)
                    for(var i=0;1<$stateParams.item.cart.length;i++){
                        $stateParams.item.cart[i].imgURL = $stateParams.item.cart[i].imgURL[1].oldImage;
                    }
                    var object = JSON.stringify($stateParams.item.cart, function( key, value ){

                    if( key === "$$hashKey" ) {
                       return undefined;
                    }
                    return value;


                    })

                    if($stateParams.item.delivery.method == "Delivery"){

                          url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$scope.user.name+'&deliverName='+$stateParams.item.delivery.name+'&deliveryNo='+$stateParams.item.delivery.streetNumber+ '&deliveryStreet='+$stateParams.item.delivery.streetName+'&deliveryCity='+$stateParams.item.delivery.city+'&deliveryCountry='+$stateParams.item.delivery.country+ '&deliveryZip='+$stateParams.item.delivery.zip+'&telNumber='+ $stateParams.item.delivery.number+'&tax='+$stateParams.item.taxTotal  +'&shippingCost='+$stateParams.item.shippingCost+'&shippingOpt='+ $stateParams.item.shipping.shippingOption+'&email='+ $stateParams.item.userEmail+'&currency='+$rootScope.currency  +'&promotionCode='+$stateParams.item.promotionCode
                    }
                    else{

                        url = 'cmd=saveOrder&appId='+$rootScope.appId+'&registeredUser='+$scope.user.registeredUser+'&item='+encodeURIComponent(object)+'&amount='+$stateParams.item.amount+'&customerName='+$stateParams.item.deliverDetails.name+'&telNumber='+$stateParams.item.deliverDetails.number+'&tax='+$stateParams.item.taxTotal+'&shippingCost='+$stateParams.item.shippingCost+'&pickupId='+$stateParams.item.pickupId+'&email='+$stateParams.item.userEmail+'&currency='+$rootScope.currency+'&promotionCode='+$stateParams.item.promotionCode
                    }
                    $http.post(constants.server_url+ url)
                        .then(function(res){
                                //$scope.details.id = $rootScope.cart.cartItems[0].id;
                                $http.post(constants.server_url+'cmd=updateInventory&id='+$stateParams.item.cart[0].id+'&sku='+$stateParams.item.cart[0].sku+'&qty='+$stateParams.item.cart[0].qty)
                                //$http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
                                    .then(function(res){
                                            $rootScope.cart.cartItems = [];
                                            $rootScope.cart.cartSize = 0;
                                            $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
                                            $rootScope.cart.totalPrice = 0;
                                            $rootScope.cart.totalQuantity = 0;

                                            //Pushing into order purchase history
                                            if(angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser)) != null){
                                                orderHistory = angular.fromJson(localStorage.getItem("history"+$rootScope.appId+$scope.user.registeredUser));
                                            }
                                            orderHistory.push({
                                                orderHistoryKey : $rootScope.appId,
                                                createdDate: new Date(),
                                                item :   $stateParams.item.cart,
                                                amount :  $stateParams.item.amount,
                                            });
                                            localStorage.setItem("history"+$rootScope.appId+$scope.user.registeredUser, JSON.stringify(orderHistory));

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
});