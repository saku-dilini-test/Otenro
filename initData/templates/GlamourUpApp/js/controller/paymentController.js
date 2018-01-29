/**
 * Created by amila on 4/5/16.
 */
/**
 * Edited by Shashan on 01/11/16.
 */

mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams,$http, constants, $ionicPopup, $state,PaypalService,$log,$ionicHistory) {

    $scope.$emit('hideMenu',{});

    $ionicHistory.nextViewOptions({
        disableBack: true
    });

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
        $scope.payHere = data.payHereEnable;
        $scope.payHereMID = data.payHereMerchantId;
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
                telNumber : $stateParams.item.delivery.phone,
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
                telNumber : $stateParams.deliverDetails.phone,
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
                telNumber : $stateParams.item.delivery.phone,
                tax :   $stateParams.item.taxTotal,
                shippingCost :   $stateParams.item.shippingCost,
                shippingOpt : $stateParams.item.shipping.shippingOption,
                email: $stateParams.item.userEmail,
                currency: $rootScope.currency,
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
                telNumber : $stateParams.item.deliverDetails.phone,
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
                if($stateParams.item.delivery.method == "Delivery"){
                    $scope.details ={

                        appId : $rootScope.appId,
                        item : $stateParams.item.cart,
                        amount : $stateParams.item.amount,
                        registeredUser: $scope.user.registeredUser,
                        customerName : $scope.user.name,
                        deliverName : $stateParams.item.delivery.name,
                        deliveryNo : $stateParams.item.delivery.streetNumber,
                        deliveryStreet : $stateParams.item.delivery.streetName,
                        deliveryCity : $stateParams.item.delivery.city,
                        deliveryCountry : $stateParams.item.delivery.country,
                        deliveryZip : $stateParams.item.delivery.zip,
                        telNumber : $stateParams.item.delivery.phone,
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
                        item : $stateParams.item.cart,
                        amount : $stateParams.item.amount,
                        customerName : $stateParams.item.deliverDetails.name,
                        registeredUser: $scope.user.registeredUser,
                        telNumber : $stateParams.item.deliverDetails.phone,
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
                            item : $stateParams.item.cart,
                            amount : $stateParams.item.amount,
                            registeredUser: $scope.user.registeredUser,
                            customerName : $scope.user.name,
                            deliverName : $stateParams.item.delivery.name,
                            deliveryNo : $stateParams.item.delivery.streetNumber,
                            deliveryStreet : $stateParams.item.delivery.streetName,
                            deliveryCity : $stateParams.item.delivery.city,
                            deliveryCountry : $stateParams.item.delivery.country,
                            deliveryZip : $stateParams.item.delivery.zip,
                            telNumber : $stateParams.item.delivery.phone,
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
                            item : $stateParams.item.cart,
                            registeredUser: $scope.user.registeredUser,
                            amount : $stateParams.item.amount,
                            customerName : $stateParams.item.deliverDetails.name,
                            telNumber : $stateParams.item.deliverDetails.phone,
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

    $scope.openAppBrowser = function() {

        if($stateParams.item.delivery.method == "Delivery"){
            $scope.details ={

                appId : $rootScope.appId,
                item : $stateParams.item.cart,
                amount : $stateParams.item.amount,
                registeredUser: $scope.user.registeredUser,
                customerName : $scope.user.name,
                deliverName : $stateParams.item.delivery.name,
                deliveryNo : $stateParams.item.delivery.streetNumber,
                deliveryStreet : $stateParams.item.delivery.streetName,
                deliveryCity : $stateParams.item.delivery.city,
                deliveryCountry : $stateParams.item.delivery.country,
                deliveryZip : $stateParams.item.delivery.zip,
                telNumber : $stateParams.item.delivery.phone,
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
                item : $stateParams.item.cart,
                registeredUser: $scope.user.registeredUser,
                amount : $stateParams.item.amount,
                customerName : $stateParams.item.deliverDetails.name,
                telNumber : $stateParams.item.deliverDetails.phone,
                tax :   $stateParams.item.taxTotal,
                shippingCost :   $stateParams.item.shippingCost,
                pickupId: $stateParams.item.pickupId,
                email: $stateParams.item.userEmail,
                promotionCode: $stateParams.item.promotionCode
            }
        }

        $http.post(constants.SERVER_URL+"/templatesOrder/savePendingOrder",$scope.details)
            .then(function(orderRes){

                    $http.post(constants.SERVER_URL+"/templatesInventory/updateInventory",$stateParams.item.cart)
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



                                // $scope.details.id = $rootScope.cart.cartItems[0].id;

                                showHelp(constants.SERVER_URL+'/mobile/getPayHereForm/?name='+
                                    $scope.details.customerName+"&amount="+
                                    $scope.details.amount+"&currency="+
                                    $rootScope.symbol+"&email="+
                                    $scope.details.email+"&telNumber="+
                                    $scope.details.telNumber+"&item="+
                                    $scope.details.item[0].name+"&address="+
                                    $scope.details.deliveryNo + " "+ $scope.details.deliveryStreet  + "&city="+
                                    $scope.details.deliveryCity+"&appId="+orderRes.data.orderData.appId+
                                    "&orderId="+orderRes.data.orderData.orderId+"&payHereMerchantId=" +$scope.payHereMID);


                                /*var alertPopup = $ionicPopup.alert({
                                    title: 'Thank You',
                                    subTitle: 'Your Order has been successfully processed',
                                    cssClass: 'ionicPopUp',
                                    buttons:[
                                        {text:'OK',
                                            type:'button-positive'},
                                    ]
                                });*/
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


        var inAppBrowserRef;

        function showHelp(url) {

            var target = "_blank";

            var options = "location=yes,hidden=yes";

            inAppBrowserRef = window.open (url, target, options);

            inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

            inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

            inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

        }

        function loadStartCallBack() {

            $('#status-message').text("loading please wait ...");

        }

        function loadStopCallBack() {

            if (inAppBrowserRef != undefined) {

                inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });

                $('#status-message').text("");

                inAppBrowserRef.show();
            }

        }

        function loadErrorCallBack(params) {

            $('#status-message').text("");

            var scriptErrorMesssage =
                "alert('Sorry we cannot open that page. Message from the server is : "
                + params.message + "');"

            inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

            inAppBrowserRef.close();

            inAppBrowserRef = undefined;

        }

        function executeScriptCallBack(params) {

            if (params[0] == null) {

                $('#status-message').text(
                    "Sorry we couldn't open that page. Message from the server is : '"
                    + params.message + "'");
            }

        }

    };
});