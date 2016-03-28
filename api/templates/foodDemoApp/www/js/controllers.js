angular.module('foodDemoApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  // $scope.loginData = {};

  // Perform the login action when the user submits the login form

  // $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system

    // $timeout(function() {
      // $scope.closeLogin();
    // }, 1000);
  // };

})

.controller('FoodsCtrl', function($scope) {
  $scope.foods = [
    { title: 'food 1', description: 'description 1', id: 1 },
    { title: 'food 2', description: 'description 2', id: 2 },
    { title: 'food 3', description: 'description 3', id: 3 },
    { title: 'food 4', description: 'description 4', id: 4 },
    { title: 'food 5', description: 'description 5', id: 5 },
    { title: 'food 6', description: 'description 6', id: 6 }
  ];
})

.controller('FoodCtrl', function($scope, $stateParams) {
  $scope.foodInfo = $stateParams.foodId;
});
