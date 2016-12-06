/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope,  $ionicModal, $timeout,$rootScope, $ionicPopover, $http, constants, $state, $stateParams) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};

    $scope.parentobj = {};
    $scope.parentobj.cartSize = $rootScope.cart.cartSize;

    // show & hide menu icon button
    $scope.showMenu = true;
    $scope.$on('hideMenu', function(){
        $scope.showMenu = false;
    });
    $scope.$on('$stateChangeStart', function(){
        $scope.showMenu = true;
    });


    // Cart Functions Start
      $ionicPopover.fromTemplateUrl('templates/cart.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.cart = popover;
      });
      $scope.openPopover = function($event) {
        $scope.cart.show($event);
      };
      $scope.closePopover = function() {
        $scope.cart.hide();
      };

    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    $http.get(constants.SERVER_URL+"/edit/getAllCountry")
        .then(function(res){
            $scope.countries = res.data;
        });

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
        $scope.taxTotal = total * $scope.tax/100;
        if(tax > 0){
            //total = total + tax;
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
            $scope.cart.hide();
            $state.go('app.deliverDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'delivery'
            $scope.cart.hide();
            $state.go('app.login',{item:$scope.status});
        }
    }
    $scope.pickupDetails = function (deliverItems) {
        if(localStorage.getItem('appLocalStorageUser')!==null){
            $scope.cart.hide();
            $state.go('app.pickupDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'pickUp'
            $scope.cart.hide();
            $state.go('app.login',{item:$scope.status});
        }
    }
    $scope.pickUp = function (details) {
        $state.go('app.pickup',{
            item:$stateParams.item,
            deliverDetails:details,
            amount: $scope.amount
        });
    };

    //get the currency
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
        $scope.currency = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });


    $scope.amount = $scope.getTotal();



    // Cart Functions End



    //start login functions

    // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.loginModel = modal;
      });


      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.loginModel.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.loginModel.show();
      };

    //End login functions


    //Start Register functions

    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
        }).then(function(modal) {
        $scope.modal = modal;
        });

    $scope.register = function() {
     $scope.modal.show();
    };

    // Triggered in the login modal to close it
    $scope.closeRegister = function() {
     $scope.modal.hide();
    };


     $scope.data = {};


        $http.get(constants.SERVER_URL+"/edit/getAllCountry")
            .then(function(res){
                $scope.countries = res.data;
            });
        $scope.signUp = function() {
            $scope.appLocalStorageUser  = JSON.parse(localStorage.getItem('appLocalStorageUser'));
            var data = {
                firstName: $scope.data.fname,
                lastName: $scope.data.lname,
                email : $scope.data.email,
                password : $scope.data.password,
                streetNumber: $scope.data.streetNumber,
                streetName: $scope.data.streetName,
                city: $scope.data.city,
                zip: $scope.data.zip,
                country: $scope.data.country,
                phone: $scope.data.phone,
                appId: $rootScope.appId
            };
            $http.post(constants.SERVER_URL+"/templatesAuth/register",data)
                .then(function(res){
                        var requestParams = {
                            "token": res.data.token,
                            "email": data.email,
                            "name": data.firstName,
                            "phone": data.phoneNumber,
                            "streetNumber": data.streetNumber,
                            "streetName": data.streetName,
                            "country": data.country,
                            "city": data.city,
                            "zip": data.zip,
                            "type": 'internal',
                            "appId":data.appId
                        };
                        localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
                        if($stateParams.item == 'delivery'){
                            $state.go('app.cart');
                        }else{
                            $scope.closeRegister();
                            $state.go('app.category');
                        }
                    },
                    function(err){
                        $ionicPopup.alert({
                            title: 'Registration failed!',
                            template: 'Please check your credentials!'
                        });
                    });
        }

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(res){
                if(typeof res.data.token != 'undefined'){
                    if($stateParams.item == 'delivery'){
                        $state.go('app.cart');
                    }else{
                        $state.go('app.category');
                    }
                }else{
                    alert(provider+' Login error');
                }
            },function(err){
                alert(provider+' Login error');
            });
        };


});