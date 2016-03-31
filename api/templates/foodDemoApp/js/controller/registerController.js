/**
 * Created by amila on 3/31/16.
 */


mobileApp.controller('registerCtrl', function($scope,$http,$ionicPopup,$state) {
    $scope.data = {};
    $scope.singUp = function() {
        var data = {
            email : $scope.data.email,
            password : $scope.data.password
        };
        $http.post("http://localhost:1337/templatesAuth/register",data)
            .then(function(res){
                $state.go('app.foods');
            },
            function(err){
                $ionicPopup.alert({
                    title: 'Registration failed!',
                    template: 'Please check your credentials!'
                });
            });
    }
});