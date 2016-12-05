// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',])

.run(function($ionicPlatform ,$rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

        console.log(fromState);
        console.log(next);

        if ('data' in next && 'authorizedRoles' in next.data) {
          var authorizedRoles = next.data.authorizedRoles;
          if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            $state.go($state.current, {}, {reload: true});
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }
        }
        if (!AuthService.isAuthenticated()) {
          if (next.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
        }

        // When click back button in dashboard, app colose
        if((fromState.name == 'main.dash') && (next.name == 'login')){
          navigator.app.exitApp();
        }

      });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'templates/main.html'
      })
      .state('main.dash', {
        cache: false,
        url: 'main/dash',
        views: {
          'dash-tab': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashCtrl'
          }
        }
        ,
        resolve: {
          allApps: function(dashBoardService) {
            return dashBoardService.getAllApps()
          },
          meServerUrl: function(dashBoardService) {
            return dashBoardService.getMeServerUrl()
          },
          fileServerUrl: function(dashBoardService) {
            return dashBoardService.getFileServerUrl()
          }
        }
      })
      .state('main.userInfo', {
        cache: false,
        url: 'main/userInfo',
        views: {
          'user-tab': {
            templateUrl: 'templates/settings.html',
            controller: 'userCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get("$state");
      $state.go("login");
    });

});
