/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope,  $ionicModal, $timeout,$rootScope, $ionicPopover, $http, constants, $state, $stateParams,$ionicSideMenuDelegate) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};
    $rootScope.isUserLoggedIn = {check:false};
    $scope.passwordRegularExpression = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";

    if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId) == null){
            $rootScope.isUserLoggedIn.check = false;
    }else{
            $rootScope.isUserLoggedIn.check = true;
    }


    $rootScope.parentobj = {};
    $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
    $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
    // show & hide menu icon button
    $scope.showMenu = true;
    $scope.$on('hideMenu', function(){
        $scope.showMenu = false;
    });
    $scope.$on('$stateChangeStart', function(){
        $scope.showMenu = true;
    });



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
         $scope.loginModelCon = true;
      };

    //End login functions


    //Start Register functions

    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
        }).then(function(modal) {
        $scope.modal = modal;
        });

    $scope.register = function() {
        if( $scope.loginModelCon = true){
            $scope.loginModel.hide();
        }
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
            $scope.appLocalStorageUser  = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
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
                            "phone": data.phone,
                            "streetNumber": data.streetNumber,
                            "streetName": data.streetName,
                            "country": data.country,
                            "city": data.city,
                            "zip": data.zip,
                            "type": 'internal',
                            "appId":data.appId
                        };
                        localStorage.setItem('appLocalStorageUser'+$rootScope.appId, JSON.stringify(requestParams));
                        $rootScope.isUserLoggedIn.check = true;
                        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
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

    $scope.logout = function(){
        localStorage.removeItem('appLocalStorageUser'+$rootScope.appId);
        $rootScope.cart.cartSize = 0;
        $rootScope.cart.cartItems = [];
        $rootScope.parentobj.cartSize = 0;
        $rootScope.isUserLoggedIn.check = false;
        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
        $ionicSideMenuDelegate.toggleLeft();
    }

});