/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope, $ionicModal, $timeout,$rootScope,$http,constants,$state,$ionicSideMenuDelegate) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};
    $rootScope.isUserLoggedIn = {check:false};

    if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId) == null){
            $rootScope.isUserLoggedIn.check = false;
    }else{
            $rootScope.isUserLoggedIn.check = true;
    }


    $scope.parentobj = {};
    $scope.parentobj.cartSize = $rootScope.cart.cartSize;
    $scope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
    // show & hide menu icon button
    $scope.showMenu = true;
    $scope.$on('hideMenu', function(){
        $scope.showMenu = false;
    });
    $scope.$on('$stateChangeStart', function(){
        $scope.showMenu = true;
    });

    $scope.logout = function(){
        localStorage.removeItem('appLocalStorageUser'+$rootScope.appId);
        $rootScope.isUserLoggedIn.check = false;
        $scope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
         $ionicSideMenuDelegate.toggleLeft();
    }

    //get the user name
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));

});