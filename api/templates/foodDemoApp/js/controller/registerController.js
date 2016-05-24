/**
 * Created by amila on 3/31/16.
 */


mobileApp.controller('registerCtrl', function($scope,$http,$ionicPopup,$state,constants) {
    $scope.data = {};
    $scope.singUp = function() {
    $scope.appLocalStorageUser  = JSON.parse(localStorage.getItem('appLocalStorageUser'));
        var data = {
            name: $scope.data.name,
            email : $scope.data.email,
            password : $scope.data.password,
            address: $scope.data.address,
            phone: $scope.data.phone
        };
        $http.post(constants.SERVER_URL+"/templatesAuth/register",data)
            .then(function(res){
            var requestParams = {
            	"token": res.data.token,
            	"email": data.email,
            	"password": data.password,
            	"name": data.name,
            	"phone": data.phoneNumber,
            	"address": data.address,
            	"type": 'internal'
            };
            		localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
            		console.log(localStorage.getItem('appLocalStorageUser'));
                $state.go('app.category');
            },
            function(err){
                $ionicPopup.alert({
                    title: 'Registration failed!',
                    template: 'Please check your credentials!'
                });
            });
    }
});