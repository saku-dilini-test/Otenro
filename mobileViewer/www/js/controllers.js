angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.username = AuthService.username();

    $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
      var alertPopup = $ionicPopup.alert({
        title: 'Unauthorized!',
        template: 'You are not allowed to access this resource.'
      });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });

    $scope.setCurrentUsername = function(name) {
      $scope.username = name;
    };
  })

  .controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {

    // Start Test Line ---------------------------
        //var userData = {
        //  email: 'admin@gmail.com',
        //  password: 'admin'
        //};
    // End Test Line ---------------------------

    // --- login function ------------------------------------------------------------
    $scope.login = function(data) {

      AuthService.login(data.username, data.password).then(function(authenticated) {
      //AuthService.login('admin@gmail.com', 'admin').then(function(authenticated) {
        console.log(authenticated);
        $state.go('main.dash', {}, {reload: true});
        $scope.setCurrentUsername(data.username);
      }, function(err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });

    };
  })

  .controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService,dashBoardService,meServerUrl,allApps) {

    var meServerURL = meServerUrl.data.meServerUrl;
    $scope.appList = allApps.data;
    setInterval(function() {
      dashBoardService.getAllApps().success(function (data) {
          $scope.appList = data;
      })
    },10000);

    $scope.getAllApps = function(){
      dashBoardService.getAllApps().success(function (data) {
        console.log(data);
        $scope.appList = data;
      });
    };

    $scope.openApp = function(userID,appId){
      var url = meServerURL+'/temp/'+userID+'/templates/'+appId+'/#/';
      var ref = window.open(url, '_blank', 'location=no');
      setTimeout(function() {
        //ref.close();
      }, 10000)
    };

    // --- logout function ------------------------------------------------------------
    $scope.logout = function () {
      $scope.appList ='';
      AuthService.logout();
      $state.go('login');
    };

  })

  .controller('userCtrl', function($scope,$state, AuthService, dashBoardService,totalApps) {

    $scope.userName = 'Amila Sampath';
    $scope.userEmail = 'admin@gmail.com';

    // Total Apps View
    $scope.totalApps = totalApps.data.length;
    setInterval(function() {
      var tempTotal = $scope.totalApps;
      dashBoardService.getAllApps().success(function (data) {
        if(tempTotal != data.length){
          $scope.totalApps = data.length ;
        }
        })
      },10000)

    // --- logout function ------------------------------------------------------------
    $scope.logout = function () {
      AuthService.logout();
      $state.go('login');
    };

  });

