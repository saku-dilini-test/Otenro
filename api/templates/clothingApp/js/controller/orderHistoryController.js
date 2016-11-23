/**
 * Created by Shashan on 11/23/16.
 */

mobileApp.controller('orderHistoryCtrl', function($scope) {


    $scope.temp = [];
    $scope.history  = JSON.parse(localStorage.getItem('history'));

    $scope.temp.push({
        name :   'shashan',
        amount : '12'
    });

    localStorage.setItem('history', JSON.stringify(temp));


   $scope.temp = angular.fromJson(localStorage.getItem('history'));

});