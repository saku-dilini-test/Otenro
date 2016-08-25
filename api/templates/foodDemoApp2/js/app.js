var mobileApp=angular.module('foodDemoApp', ['ionic','satellizer']);

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
}).config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.forwardCache(true);
})

mobileApp.config(['$authProvider','constants', function($authProvider,constants) {

    $authProvider.baseUrl = constants.SERVER_URL;
    // facebook
    $authProvider.facebook({
        clientId: '1585938975033935',
        url: '/templatesAuth/facebook'
    });

    // google
    $authProvider.google({
        clientId: '785964528512-5e4oip645g34auvif9gnfmk90akd6v55.apps.googleusercontent.com1585938975033935',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin ,
        url: '/templatesAuth/google'
    });

}])

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
      params:{
        item: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
  })
  .state('app.register', {
      url: '/register',
      params:{
        item: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
            controller: 'registerCtrl'
        }
      }
  })
  .state('app.aboutUs', {
      url: '/aboutUs',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutUs.html',
            controller: 'aboutUsCtrl'
        }
      }
   })
      .state('app.policies', {
          url: '/policies',
          views: {
              'menuContent': {
                  templateUrl: 'templates/policies.html',
                  controller: 'policiesCtrl'
              }
          }
      })
      .state('app.contactUs', {
          url: '/contactUs',
          views: {
              'menuContent': {
                  templateUrl: 'templates/contactUs.html',
                  controller: 'contactUsCtrl'
              }
          }
      })
      .state('app.pickup', {
          url: '/pickup',
          views: {
              'menuContent': {
                  templateUrl: 'templates/pickup.html',
                  controller: 'pickupCtrl'
              }
          }
      })
      .state('app.terms', {
          url: '/terms',
          views: {
              'menuContent': {
                  templateUrl: 'templates/terms.html',
                  controller: 'termsCtrl'
              }
          }
      })
  .state('app.category', {
          cache: false,
          url: '/category',
          views: {
              'menuContent': {
                  templateUrl: 'templates/category.html',
                  controller: 'categoryCtrl'
              }
          }
      })
   .state('app.foods', {
     cache: false,
     url: '/category/:categoryId/:categoryName',
     views: {
       'menuContent': {
         templateUrl: 'templates/foods.html',
         controller: 'foodCtrl'
       }
     }
   })
   .state('app.food', {
     cache: false,
     url: '/foods',
     params:{
        item: null
     },
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
  })
  .state('app.deliverDetails', {
      url: '/deliverDetails',
      params:{
        item: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/deliverDetails.html',
            controller: 'cartCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/category');
});
