/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope, $ionicModal, $timeout,$rootScope,$http,constants) {

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

    //get the user name
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'));

});