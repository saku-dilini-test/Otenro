/**
 * Created by amila on 3/31/16.
 */


mobileApp.controller('registerCtrl', function($scope,$http,$ionicPopup,$state,constants) {
    $scope.data = {};
    $scope.singUp = function() {
        var data = {
            email : $scope.data.email,
            password : $scope.data.password
        };
        $http.post(constants.SERVER_URL+"/templatesAuth/register",data)
            .then(function(res){
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