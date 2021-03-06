var mobileApp=angular.module('foodDemoApp', ['ionic','ionic.cloud','satellizer','credit-cards','starter.payPalService']);

mobileApp.run(function($ionicPlatform,$rootScope,readMadeEasy,$ionicPush,$http,constants) {
  $ionicPlatform.ready(function() {

      if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
              $ionicPopup.confirm({
                  title: "Internet Disconnected",
                  content: "The internet is disconnected on your device."
              })
                  .then(function(result) {
                      if(!result) {
                          ionic.Platform.exitApp();
                      }
                  });
          }
      }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
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
      $http.post(constants.SERVER_URL + "/templates/postDeviceId",data)
          .then(function(res){
              console.log(res);
          },function(err){
              console.log(err);
          });
    });

      ionic.Platform.isIE = function() {
          return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
      }

      if (ionic.Platform.isIE()) {
          console.log("this is IE ")
          window.addEventListener('click', function(event) {
                  if (Object.prototype.toString.call(event) == '[object PointerEvent]') {
                      event.stopPropagation();
                  }
              }
              , true);
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
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.navBar.alignTitle('center');
})

// Pay pal Config
    .constant('shopSettings',{

        payPalProductionId : 'prod-xxx',

        payPalEnv: 'paypalEnv',

        payPalSandboxId :'sandbox-xxx',

        payPalShopName : 'MyShopName',

        payPalMerchantPrivacyPolicyURL : 'url to policy',

        payPalMerchantUserAgreementURL : 'url to user agreement'
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
});

mobileApp.config(['$authProvider','constants', function($authProvider,constants) {

    $authProvider.baseUrl = constants.SERVER_URL;
    // facebook
    $authProvider.facebook({
        clientId: '1585938975033935',
        url: '/templatesAuth/facebook'
    });

    // google
    $authProvider.google({
        clientId: '785964528512-5e4oip645g34auvif9gnfmk90akd6v55.apps.googleusercontent.com',
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
      cache: false,
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
      cache: false,
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
      cache: false,
      url: '/aboutUs',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutUs.html',
            controller: 'aboutUsCtrl',
            cache: false,
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
          cache: false,
          url: '/contactUs',
          views: {
              'menuContent': {
                  templateUrl: 'templates/contactUs.html',
                  controller: 'contactUsCtrl'
              }
          }
      })
      .state('app.orderHistory', {
          cache: false,
          url: '/orderHistory',
          views: {
              'menuContent': {
                  templateUrl: 'templates/orderHistory.html',
                  controller: 'orderHistoryCtrl'
              }
          }
      })
      .state('app.pickup', {
          cache: false,
          url: '/pickup',
          params:{
            item: null,
            deliverDetails:null
          },
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
          cache: false,
          url: '/payment',
          params:{
              item: null,
              registeredName:null,
              deliverDetails:null,
              amount:null,
              shippingOpt:null,
              method:null,
              pickupId:null
          },
          views: {
              'menuContent': {
                  templateUrl: 'templates/payment.html',
                  controller: 'paymentCtrl'
              }
          }
      })
      .state('app.cart', {
          cache: false,
          url: '/cart',
          views: {
              'menuContent': {
                  templateUrl: 'templates/cart.html',
                  controller: 'cartCtrl'
              }
          }
      })
      .state('app.checkout', {
          cache: false,
          url: '/checkout',
          params:{
              item: null,
          },
          views: {
              'menuContent': {
                  templateUrl: 'templates/checkout.html',
                  controller: 'checkoutCtrl'
              }
          }
      })
      .state('app.shipping', {
          cache: false,
          url: '/shipping',
          params:{
              item: null,
          },
          views: {
              'menuContent': {
                  templateUrl: 'templates/shipping.html',
                  controller: 'shippingCtrl'
              }
          }
      })
  .state('app.deliverDetails', {
      cache: false,
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
   })
  .state('app.pickupDetails', {
      cache: false,
      url: '/pickupDetails',
      params:{
        item: null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/pickupDetails.html',
            controller: 'cartCtrl'
        }
      }
  });

  $urlRouterProvider.otherwise('/app/category');
}).filter('unique', function() {
    return function(collection, keyname) {
      var output = [],
        keys = [];

      angular.forEach(collection, function(item) {
        var key = item[keyname];
        if(keys.indexOf(key) == -1) {
          keys.push(key);
          output.push(item);
        }
      });

      return output;
    };
});
