/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('appCtrl', function($scope,$rootScope, $state,$ionicSideMenuDelegate) {

    $rootScope.cart = {cartItems:[],cartSize:0,totalPrice:0};
    $rootScope.isUserLoggedIn = {check:false};
    $rootScope.loggedInUserName = "";
    var appLocalStorageUser = localStorage.getItem('appLocalStorageUser'+$rootScope.appId);

    if(appLocalStorageUser == null){
            $rootScope.isUserLoggedIn.check = false;
    }else{
            $rootScope.isUserLoggedIn.check = true;
             var appLocalStorageUserObj = JSON.parse(appLocalStorageUser);

            if(appLocalStorageUserObj.name){
                $rootScope.loggedInUserName = appLocalStorageUserObj.name;
            }

            if(localStorage.getItem('cart') !== null){
              $rootScope.cart = JSON.parse(localStorage.getItem('cart'));
            }
    }

    // console.log("in appCtrl => " + appLocalStorageUser);

  $rootScope.parentobj = {};
    $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
    $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
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
        /*$rootScope.cart.cartSize = 0;
        $rootScope.cart.cartItems = [];
        $rootScope.parentobj.cartSize = 0;*/
        $rootScope.isUserLoggedIn.check = false;
        $rootScope.loggedInUserName = "";
        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
        $ionicSideMenuDelegate.toggleLeft();
        localStorage.removeItem("cart");
    }

});
