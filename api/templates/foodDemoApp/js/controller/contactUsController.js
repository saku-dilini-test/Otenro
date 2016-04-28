/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('contactUsCtrl', function($scope,$state) {

    $scope.email = "onbit@gmail.com";
    $scope.telPhone = '011 45254765';
    $scope.address = 'No 488,Kotte Road';

    $scope.singUp = function(){
        $state.go('app.register');
    }
});