/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope, $ionicModal, $timeout,$rootScope) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};

    $scope.parentobj = {};
    $scope.parentobj.cartSize = $rootScope.cart.cartSize;

});