var mobileApp=angular.module('foodDemoApp', ['ionic']);

var serviceApi = 'http://localhost:1337/';
var GetServiceApi = 'http://localhost:1337/';
var SERVER_URL = 'http://localhost:1337';

mobileApp.run(function($ionicPlatform,$rootScope,readMadeEasy) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
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

mobileApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'appCtrl'
  })
  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
  })
  .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html'
        }
      }
  })
  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
   })

  .state('app.category', {
          url: '/category',
          views: {
              'menuContent': {
                  templateUrl: 'templates/category.html',
                  controller: 'categoryCtrl'
              }
          }
      })
   .state('app.foods', {
     url: '/category/:categoryId',
     views: {
       'menuContent': {
         templateUrl: 'templates/foods.html',
         controller: 'foodCtrl'
       }
     }
   })
   .state('app.food', {
     url: '/foods/:foodId',
     views: {
       'menuContent': {
         templateUrl: 'templates/food.html',
         controller: 'foodCtrl'
       }
     }
   })
  .state('app.order', {
    url: '/order',
    views: {
      'menuContent': {
          templateUrl: 'templates/order.html',
          controller: 'orderCtrl'
      }
    }
  })
  .state('app.payment', {
      url: '/payment',
      views: {
          'menuContent': {
              templateUrl: 'templates/payment.html',
              controller: 'paymentCtrl'
          }
      }
  })
  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
          controller: 'cartCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/login');
});
