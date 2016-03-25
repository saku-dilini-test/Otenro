// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.payPalService'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
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
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'templates/home.html'
      })

      .state('tab.menu', {
        url: '/menu',
        views: {
          'tab-menu': {
            templateUrl: 'templates/tab-menu.html',
            controller: 'MenuCtrl',
            resolve:{
              initialData : ['$q','categoryResources',
                function($q,categoryResources){
                  return $q.all({
                    categories:categoryResources.all()
                  })
                }
              ]
            }
          }
        }
      })

      .state('tab.products', {
        url: '/menu/:categoryCode',
        views: {
          'tab-menu': {
            templateUrl: 'templates/categoryProducts.html',
            controller: 'CategoryProductsCtrl',
          }
        }
      })

      .state('tab.product', {
        url: '/menu/:categoryId/:productId',
        views: {
          'tab-menu': {
            templateUrl: 'templates/productDetails.html',
            controller: 'ProductDetailCtrl'
          }
        }
      })

      .state('promos', {
        url: "/promos",
        controller: 'PromosCtrl',
        templateUrl: 'templates/promos.html'
      })

      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'templates/tab-about.html',
            controller: 'AboutCtrl'
          }
        }
      })

      .state('tab.cart', {
        url: '/cart',
        views: {
          'tab-cart': {
            templateUrl: 'templates/tab-cart.html',
            controller: 'CartCtrl'
          }
        }
      })

      .state('pickup', {
        url: '/pickup/:totalAmount',
        controller: 'PickupCtrl',
        resolve:{
          initialData : ['$q','paymentResources','$stateParams',
            function($q,paymentResources,$stateParams){
              return $q.all({
                totalAmount:paymentResources.amountInUSD($stateParams.totalAmount),
                branchLocations: paymentResources.getBranchLocations()
              })
            }
          ]
        },
        templateUrl: 'templates/pickup.html'
      })

      .state('delivery', {
        url: '/delivery/:totalAmount',
        controller: 'DeliveryCtrl',
          resolve:{
            initialData : ['$q','paymentResources','$stateParams',
              function($q,paymentResources,$stateParams){
                return $q.all({
                  totalAmount:paymentResources.amountInUSD($stateParams.totalAmount),
                  oneUSD:paymentResources.oneUSD(),
                  deliveryLocations: paymentResources.getDeliveryLocations()
                })
              }
            ]
          },
        templateUrl: 'templates/delivery.html'
      })

      .state('orderConfirmation', {
        url: '/order/confirmation/:orderId',
        controller: 'orderConfirmationCtrl',
        resolve:{
          initialData : ['$q','paymentResources','$stateParams',
            function($q,paymentResources,$stateParams){
              return $q.all({
                orderSummary:paymentResources.getOrderSummary($stateParams.orderId)
              })
            }
          ]
        },
        templateUrl: 'templates/orderConfirmation.html'
      })

      .state('tab.contact', {
        url: '/contact',
        views: {
          'tab-contact': {
            templateUrl: 'templates/tab-contact.html',
            controller: 'ContactCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  })
  //.constant('SERVER_URL', "http://192.168.8.157:1338/")
  .constant('SERVER_URL', "http://onbitlabs.com:1338/")
  .constant('shopSettings',{

  payPalSandboxId :'Aar8HZzvc5NztVWodTBpOiOod9wWrBDrJUjyvRr4WsxcCD28xYig7oecfYsqxQUDu5QHptPpSALirxZD',

  payPalProductionId : 'AcRGjW3N7TaJDv8TPjCDqiyi6pYHaLSLBsjo2VzgGJB1ScKAARZBbvNqsrRzjlz7T5-nryJpltpnVQ0L',

  payPalEnv: 'PayPalEnvironmentProduction', // for testing production for production

  payPalShopName : 'cakeCompany',

  payPalMerchantPrivacyPolicyURL : 'http://onbitlabs.com:1338/ur_to_policy',

  payPalMerchantUserAgreementURL : 'http://onbitlabs.com:1338/url_to_user_agreement'

});
