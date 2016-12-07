/**
 * Created by amila on 4/5/16.
 */
/**
 * Edited by Shashan on 01/11/16.
 */

mobileApp.controller('paymentCtrl', function($scope,$rootScope, $stateParams,$http, constants, $ionicPopup, $state,PaypalService) {

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
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    $http.get(constants.SERVER_URL + '/edit/getIPGInfo?appId='+$scope.appId).success(function(data) {
        $scope.paymentData = data;
        console.log($scope.paymentData);
        if($stateParams.item.delivery.method == "Delivery") {
            $scope.deliveryShow = data.cashOnDeliveryEnable;
            $scope.pickupShow = false;
        }else{
            $scope.deliveryShow = false;
            $scope.pickupShow = data.cashOnPickupEnable;
        }
        $scope.paypalShow = data.paypalEnable;
        $scope.stripeShow = data.stripeEnable;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    // --/-- Here ends retrieving the currency --/--//

    // --/-- Here start Card Payment Function --/--
    console.log($stateParams.item.amount);
    // Config Cart payment
    $scope.cardType = {};
    $scope.card = {
        amount : $stateParams.item.amount
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
                console.log(JSON.stringify(response, null, 2));
                // TODO : This alert for only testing
                alert(JSON.stringify(response, null, 2));
                if(response.error){
                    alert("Error");
                    // TODO : Error handle here
                }else{
                    alert("Payment Success");
                    if($stateParams.item.delivery.method == "Delivery"){
                        $scope.details ={
                            appId : $rootScope.appId,
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
                            shippingOpt : $stateParams.shipping.shippingOption,
                            email: $stateParams.item.userEmail,
                            currency:$rootScope.currency
                        };
                    }
                    else{
                        $scope.details ={
                            appId : $rootScope.appId,
                            item : $stateParams.item.cart,
                            amount : $stateParams.item.amount,
                            customerName : $stateParams.deliverDetails.name,
                            telNumber : $stateParams.deliverDetails.number,
                            tax :   $stateParams.item.taxTotal,
                            shippingCost :   $stateParams.item.shippingCost,
                            pickupId: $stateParams.item.pickupId,
                            email: $stateParams.item.userEmail,
                            currency:$rootScope.currency
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
        if($stateParams.item.delivery.method == "Delivery"){
            $scope.details ={
                appId : $rootScope.appId,
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
                currency:$rootScope.currency
            };
        }
        else{
            $scope.details ={
                appId : $rootScope.appId,
                item : $stateParams.item.cart,
                amount : $stateParams.item.amount,
                customerName : $stateParams.item.deliverDetails.name,
                telNumber : $stateParams.item.deliverDetails.number,
                tax :   $stateParams.item.taxTotal,
                shippingCost :   $stateParams.item.shippingCost,
                pickupId: $stateParams.item.pickupId,
                email: $stateParams.item.userEmail,
                currency:$rootScope.currency
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
                                console.log(err);
                            });
                },
                function(err){
                    console.log(err);
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
                        currency:$rootScope.currency
                    };
                }
                else{
                    $scope.details ={
                        appId : $rootScope.appId,
                        item : $stateParams.item.cart,
                        amount : $stateParams.item.amount,
                        customerName : $stateParams.item.deliverDetails.name,
                        telNumber : $stateParams.item.deliverDetails.number,
                        tax :   $stateParams.item.taxTotal,
                        shippingCost :   $stateParams.item.shippingCost,
                        pickupId: $stateParams.item.pickupId,
                        email: $stateParams.item.userEmail,
                        currency:$rootScope.currency
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
                                        console.log(err);
                                    });
                        },
                        function(err){
                            console.log(err);
                        });
            }, function (error) {
                alert("Transaction Canceled");
            });
        });
    }
});