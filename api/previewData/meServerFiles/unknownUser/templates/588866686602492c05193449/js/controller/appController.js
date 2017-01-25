/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope,  $ionicModal, $timeout,$rootScope, $ionicPopover, $http, constants, $state, $stateParams, readMadeEasy) {

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

if (typeof $rootScope.appId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appId = data.appId;
        });
    }

    if (typeof $rootScope.userId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.userId = data.userId;
        });
    }
    if (typeof $rootScope.appName === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appName = data.name;
        });
    }


    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    readMadeEasy.readFile().success(function(data){
        $scope.appId = data.appId;

        $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +data.userId+"&appId="+data.appId+"&"+new Date().getTime()+"&img=secondNavi";

        
      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
          $scope.categories = data;
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });

      $http.get(constants.SERVER_URL + "/app/getIconAllowance?appId="+$rootScope.appId)
        .success(function(data){
            if(data.allowPromote == true){
              $rootScope.allowOtenroToPromote = true;
              $rootScope.icon = data.icon;
            }
            else{
              $rootScope.allowOtenroToPromote = false;
              $rootScope.icon = null;
            }

        },function(err){
          $log.debug(err);
        })
    });

});