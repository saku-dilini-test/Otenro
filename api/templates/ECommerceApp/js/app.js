// ---  app js  ----

var mobileApp = angular.module('starter', ['ionic','ionic.cloud','satellizer','starter.services','starter.controllers'])

.run(function($ionicPlatform,readMadeEasy,$rootScope,$ionicPush,appServices) {
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

    // Push register function
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved: ', t.token);
      var data = {
        appId: $rootScope.appId,
        deviceId : t.token
      };
      // Send to server to save push device token
      appServices.saveDeviceID(data)
          .success(function (res) {
            console.log(res);
          }).error(function (err) {
        console.log(err);
      });
    });

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

// Ionic Cloud Provider Configuration
.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "8307b439"
    },
    "push": {
      "sender_id": "528602483901",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // setup an abstract state for the tabs directive

   .state('tab', {
    cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.login', {
    url: '/login',
    params:{
      item: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
      }
    }
  })
  .state('tab.register', {
    url: '/register',
    params:{
      item: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  .state('tab.home', {
    cache: false,
    url: '/home',
    views: {
          'menuContent': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
    .state('tab.menu', {
    cache: false,
    url: '/menu',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'MenuCtrl'
      }
    }
  })
    .state('tab.items', {
    cache: false,
    url: '/menu/:menuId/:menuName',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-items.html',
        controller: 'ItemsCtrl'
      }
    }
  })
  .state('tab.item', {
    cache: false,
    url: '/item',
    params:{
       item: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-item.html',
        controller: 'ItemCtrl'
      }
    }
  })
    .state('tab.cart', {
     cache: false,
     url: '/cart',
     views: {
           'menuContent': {
             templateUrl: 'templates/cart.html',
             controller: 'CartCtrl'
           }
         }
    })
    .state('tab.deliverDetails', {
      cache: false,
      url: '/deliverDetails',
      params:{
        item: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/deliverDetails.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('tab.pickup', {
        cache: false,
        url: '/pickup',
        views: {
          'menuContent': {
            templateUrl: 'templates/pickup.html',
            controller: 'pickupCtrl'
          }
        }
    })
    .state('tab.ourStores', {
    url: '/ourStores',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-ourStores.html',
        controller: 'OurStoresCtrl'
      }
    }
  })
  .state('tab.aboutUs', {
      cache: false,
      url: '/aboutUs',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutUs.html',
          controller: 'OurStoresCtrl'
        }
      }
    })
    .state('tab.contactUs', {
    cache: false,
    url: '/contactUs',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-contactUs.html',
        controller: 'ContactUsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
