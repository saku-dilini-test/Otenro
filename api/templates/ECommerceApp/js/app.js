// ---  app js  ----

angular.module('starter', ['ionic','starter.services','starter.controllers'])

.run(function($ionicPlatform,readMadeEasy,$rootScope) {
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

    if (typeof $rootScope.appId === 'undefined'){

      readMadeEasy.readFile().success(function(data){
        $rootScope.appId = data.appId;
      });
    }

    if (typeof $rootScope.userId === 'undefined'){

      readMadeEasy.readFile().success(function(data){
        $rootScope.userId = data.userId;
      });
    }
    if (typeof $rootScope.appName === 'undefined'){

      readMadeEasy.readFile().success(function(data){
        $rootScope.appName = data.name;
      });
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
    .state('tab.menu', {
    url: '/menu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'MenuCtrl'
      }
    }
  })
    .state('tab.items', {
    url: '/menu/:menuId/:menuName',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-items.html',
        controller: 'ItemsCtrl'
      }
    }
  })
  .state('tab.item', {
    url: '/item/:itemId',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-item.html',
        controller: 'ItemCtrl'
      }
    }
  })
    .state('tab.ourStores', {
    url: '/ourStores',
    views: {
      'tab-ourStores': {
        templateUrl: 'templates/tab-ourStores.html',
        controller: 'OurStoresCtrl'
      }
    }
  })
  .state('tab.aboutUs', {
      url: '/aboutUs',
      views: {
        'tab-aboutUs': {
          templateUrl: 'templates/aboutUs.html',
          controller: 'OurStoresCtrl'
        }
      }
    })
    .state('tab.contactUs', {
    url: '/contactUs',
    views: {
      'tab-contactUs': {
        templateUrl: 'templates/tab-contactUs.html',
        controller: 'ContactUsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
