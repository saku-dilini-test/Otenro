/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('contactUsCtrl', function($scope,$rootScope,$http,constants,$state) {

    $scope.appId = $rootScope.appId;

    // $http.get( constants.SERVER_URL + '/templates/getContactUs?appId='+$scope.appId).success(function(data) {
    //     $scope.email = data.email;
    //     $scope.telPhone = data.telPhone;
    //     $scope.address = data.address;

    // }).error(function(err) {
    //     alert('warning', "Unable to get contact us info", err.message);
    // });

    $scope.email = "kapila@gmail.com";
    $scope.telPhone = "077 45658555";
    $scope.address = "No 488 , Kotte Road, Kotte";


    $scope.singUp = function(){
        $state.go('app.register');
    }
});