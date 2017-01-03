


mobileApp.controller('RegisterCtrl', function($scope,$rootScope,$http,$ionicPopup,$state,$stateParams,$auth,constants,$log) {
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
            	"type": 'internal',
                "appId":data.appId,
                "registeredUser": res.data.user.sub
            };
            		localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
            		$log.debug(localStorage.getItem('appLocalStorageUser'));
                if($stateParams.item == 'delivery'){
                    $state.go('tab.cart');
                }else{
                    $state.go('tab.category');
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
                    $state.go('tab.cart');
                }else{
                    $state.go('tab.category');
                }
            }else{
                alert(provider+' Login error');
            }
        },function(err){
            alert(provider+' Login error');
        });
    };

    // back to login in view function
    $scope.backToLogin = function () {
        $state.go("tab.login");
    }

});