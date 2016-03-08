// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dominos', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('tabs.category', {
      url: "/category",
      views: {
        'category-tab': {
          templateUrl: "templates/category.html"
        }
      }
    })
    .state('tabs.search', {
      url: "/search",
      views: {
        'home-tab': {
          templateUrl: "templates/search.html"
        }
      }
    })
    .state('tabs.favorites', {
      url: "/favorites",
      views: {
        'favorites-tab': {
          templateUrl: "templates/favorites.html"
        }
      }
    })
    .state('tabs.orders', {
      url: "/orders",
      views: {
        'orders-tab': {
          templateUrl: "templates/orders.html"
        }
      }
    })
    .state('tabs.provideDetail', {
      url: "/provideDetail",
      views: {
        'orders-tab': {
          templateUrl: "templates/provideDetail.html"
        }
      }
    })
    .state('tabs.checkout', {
      url: "/checkout",
      views: {
        'orders-tab': {
          templateUrl: "templates/checkout.html"
        }
      }
    })
    .state('tabs.more', {
      url: "/more",
      views: {
        'more-tab': {
          templateUrl: "templates/more.html"
        }
      }
    })
    .state('tabs.register', {
      url: "/register",
      views: {
        'more-tab': {
          templateUrl: "templates/register.html"
        }
      }
    })
    .state('tabs.login', {
      url: "/login",
      views: {
        'more-tab': {
          templateUrl: "templates/login.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'more-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });

    $urlRouterProvider.otherwise("/tab/home");

});
