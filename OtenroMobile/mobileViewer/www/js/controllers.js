angular.module('starter.controllers', [])

  /** --/-- App Ctrl ------------------- **/
  .controller('AppCtrl', function($scope, AuthService, $state) {

    // Still not use
    $scope.username = AuthService.username();
     // --- logout function --------
        $scope.logout = function () {
          AuthService.logout();
          $state.go('app.login');
        };

  })

  /** --/-- Login Ctrl ------------------- **/
  .controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {

$scope.status = "";

    // Check user already login
    // If login true, move to dashboard
    if(AuthService.isAuthenticated){
      $state.go('app.dash', {}, {reload: true});
    }

    // Login Function
    $scope.login = function(data) {

      // Call Auth Service
      AuthService.login(data.username, data.password)
        .then(function(authenticated) {
          // If success move to dashboard
          $state.go('app.dash', {}, {reload: true});
        }, function(err) {
          // Login failed give alert
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
    };
  })

  /** --/-- Dash-board Ctrl ------------------- **/
   .controller('DashCtrl', function($scope,$ionicLoading,
     dashBoardService,meServerUrl,fileServerUrl,allApps,$state,$interval,$ionicSideMenuDelegate) {

      $scope.menuToggle = function() {
         $ionicSideMenuDelegate.toggleLeft();
       };

    // Set me Server URL
    var meServerURL = meServerUrl.data.meServerUrl;
    $scope.fileUrl = fileServerUrl.data.fileServerUrl;
    $scope.date = new Date().getTime();



    // Set mobile application list
    $scope.appList = allApps.data;
     console.log($scope.appList);

    // Every 10 s get update application list
     $interval(function() {
      // get current state
       var currentState = $state.current;
      // if current state == main.dash, send request to get update appList
      if(currentState.name == 'app.dash'){
        dashBoardService.getAllApps().success(function (data) {
          $scope.appList = data;
        })
      }
    },10000);


     $scope.stopLoading = function (){

       $ionicLoading.hide();
     }


    // Open selected application in  Cordova.InAppBrowser
    $scope.openApp = function(userID,appId,appName){
      $ionicLoading.hide();
      // ME SERVER URL for GIVEN User ID & AppId
        //var url = 'http://192.168.8.35/meServer/temp/'+userID+'/templates/'+appId+'/#/';
        var url = 'http://cdn.otenro.com'+'/temp/'+userID+'/templates/'+appId+'/#/';
      console.log(url);

      // Keep in mind that you must add your own images to native resource.
      // Images below are for sample only. They are not imported by this plugin.
      var ref =  cordova.ThemeableBrowser.open(url, '_blank', {
        statusbar: {
          color: '#ffffffff'
        },
        toolbar: {
          height: 44,
          color: '#f0f0f0ff'
        },
        title: {
          color: '#003264ff',
          staticText : appName,
          showPageTitle: true
        },
        backButton: {
          wwwImage: 'img/button_back.png',
          imagePressed: 'img/button_back.png',
          align: 'left',
          event: 'backPressed'
        },
        closeButton: {
          // image: 'close',
          wwwImage: 'img/button_cancel.png',
          imagePressed: 'img/button_cancel.png',
          align: 'right',
          event: 'closePressed'
        },
        backButtonCanClose: true,
        hidden : true
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
         //console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        //console.log(e.message);

      });

      //Event start when In App Browser start loading
      ref.addEventListener('loadstart', function(event) {
        // until load In App Browser loading spinner
        $ionicLoading.show({
          template: '<ion-spinner icon="spiral" ng-click="stopLoading()" ></ion-spinner>',
          scope :$scope
        });
      });

      //Event start when In App Browser stop loading
      ref.addEventListener('loadstop', function(event){
        $ionicLoading.hide();
        // Show In-App-Browser
        ref.show();
      });
    };

  })

  /** --/-- User Ctrl ------------------- **/
  .controller('userCtrl', function($scope,$state,AuthService,$ionicPopup,dashBoardService) {

    // --- logout function --------
    $scope.logout = function () {
      AuthService.logout();
      $state.go('app.login');
    };


    $scope.clearAllData = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Clear All App Data',
        template: 'Are you sure you want clear all app data?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
          var LOCAL_TOKEN_KEY = 'userToken';
          var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);

          dashBoardService.clearAllAppData(JSON.parse(token).sub).success(function (data) {
            console.log("delete done");
          })
        } else {
          console.log('You are not sure');
        }
      });
    }


  });

