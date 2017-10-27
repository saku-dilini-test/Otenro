// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',])

.run(function($ionicPlatform ,$rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

        // console.log(fromState);
        // console.log(next);

        if ('data' in next && 'authorizedRoles' in next.data) {
          var authorizedRoles = next.data.authorizedRoles;
          if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            $state.go($state.current, {}, {reload: true});
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }
        }
        if (!AuthService.isAuthenticated()) {
          if (next.name !== 'app.login') {
            event.preventDefault();
            $state.go('app.login');
          }
        }

        // When click back button in dashboard, app close
        if((fromState.name == 'app.dash') && (next.name == 'app.login')){
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
}).config(function($ionicConfigProvider) {
      $ionicConfigProvider.views.forwardCache(true);
      $ionicConfigProvider.backButton.previousTitleText(false).text('');
      $ionicConfigProvider.navBar.alignTitle('center');
  })


.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller : 'userCtrl'
      })
      .state('app.login', {
        url: '/login',
         views: {
                'menuContent': {
                  templateUrl: 'templates/login.html',
                  controller: 'LoginCtrl'
                }
              }
      })
      .state('app.dash', {
        cache: false,
        url: 'app/dash',
        views: {
          'menuContent': {
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
      ;


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get("$state");
      $state.go("app.login");
    });

}).directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
