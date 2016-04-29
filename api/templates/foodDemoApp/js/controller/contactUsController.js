/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('contactUsCtrl', function($scope,$rootScope,$http,constants,$state) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.SERVER_URL + '/templates/getContactUs?appId='+$scope.appId).success(function(data) {
        $scope.email = data.email;
        $scope.telPhone = data.telPhone;
        $scope.address = data.address;

    }).error(function(err) {
        alert('warning', "Unable to get contact us info", err.message);
    });


    $scope.singUp = function(){
        $state.go('app.register');
    }
});