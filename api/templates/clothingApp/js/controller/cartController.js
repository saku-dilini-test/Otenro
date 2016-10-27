/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants) {

     // -- Config --
                $scope.userId = $rootScope.userId;
                $scope.appId = $rootScope.appId;
                $scope.cartItems = $rootScope.cart.cartItems;
                // default : tax info hide
                $scope.isShowTaxInfo = false;

    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    $http.get(constants.SERVER_URL + '/edit/getTaxInfo?appId='+$rootScope.appId).success(function(data) {
        if(data == ''){
            $scope.hide = true;
            $scope.tax = 0;
        }else{
            $scope.tax = data[0].taxAmount;
            $scope.hide = false;
        }
    })
    $scope.getTotal = function(){
        var total = 0;
        var amount = 0;
        var tax = 0;
        for(var i = 0; i < $scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            amount = product.total;
            total += (amount);
        }
        tax = total * $scope.tax/100;
        if(tax > 0){
            total = total + tax;
            $rootScope.cart.totalPrice = total;
            return total;
        }else{
            $rootScope.cart.totalPrice = total;
            return total;
        }
    };

    $scope.getTotalQuantity = function(){
        var quantity = 0;
        for(var i =0; i<$scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            quantity += product.qty;
        }
        $rootScope.cart.totalQuantity = quantity;
        return quantity;
    };

    $scope.removeItem = function(index){
        $scope.cartItems.splice(index, 1);
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $scope.parentobj.cartSize = $rootScope.cart.cartSize;
    };

    $scope.delivery = function(deliverItems){

            if(localStorage.getItem('appLocalStorageUser')!==null){
                 $state.go('app.deliverDetails',{item:deliverItems});
            }
            else{
                $scope.status = 'delivery'
                $state.go('app.login',{item:$scope.status});
            }
    }
    $scope.pickup = function () {
        if(localStorage.getItem('appLocalStorageUser')!==null){
            $state.go('app.pickup');
        }
        else{
            $state.go('app.login');
        }
    }
    $scope.pickup = function () {
        if(localStorage.getItem('appLocalStorageUser')!==null){
            $state.go('app.pickup');
        }
        else{
            $state.go('app.login');
        }
    };


    // get the shipping options
    $http.get(constants.SERVER_URL + "/edit/getShippingInfo?appId="+$rootScope.appId)
            .success(function (data) {
                    $scope.shippingData=data;
                },
                function (err) {
                    $ionicPopup.alert({
                        title: 'Policies Data loading error!',
                        template: 'Please check your connection!'
                    });
                });

    $scope.deliver = function(deliverDetails){
                $scope.amount = $scope.getTotal();

                $scope.shipping={};
                var SelectShippingOptions = $ionicPopup.alert({
                       templateUrl: 'templates/shippingOpt.html',
                       title: 'Shipping Options',
                       subTitle: 'Choose a Delivery Option you wish.',
                       cssClass: 'ionicPopUp',
                       scope: $scope,
                       buttons:[
                           {text:'Back'},
                           {text: 'Deliver',
                            type: 'button-balanced',
                            onTap: function(e) {
                                  if (!$scope.shipping.opt || $rootScope.cart.cartSize == 0) {
                                    //don't allow the user to close unless he selects an option
                                    e.preventDefault();
                                  } else {
                                    $scope.details ={
                                            appId : $rootScope.appId,
                                            item : $stateParams.item,
                                            amount : $scope.amount,
                                            customerName : deliverDetails.name,
                                            deliveryAddress : deliverDetails.address,
                                            telNumber : deliverDetails.number,
                                            tax :   $scope.tax,
                                            shippingOpt : $scope.shipping.opt
                                    };

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
                                    },
                                    function(err){
                                       console.log(err);
                                    });
                                },
                                function(err){
                                   console.log(err);
                                });
                                 }
                            }
                           }
                       ]
                });
        }

    // --/-- Here start Card Payment Function --/--

    // --/-- Goto Card Payment function
    $scope.gotoCartPayment = function(){
        $state.go('app.cardPayment');
    };

    // Config Cart payment
    $scope.cardType = {};
    $scope.card = {
        amount : $scope.getTotal()
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
                    // TODO : Currently back to cart
                    $state.go('app.cart');
                }

            },
            function(response) {
                alert(JSON.stringify(response));
                alert("Error");
            }   // error handler
        );
    }
    // --/-- Here end Card Payment Function --/--
});