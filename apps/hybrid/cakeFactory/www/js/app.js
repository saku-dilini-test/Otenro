// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter',
  [
    'ionic',
    'ionic.service.core',
    'starter.controllers',
    'starter.services',
    'ionic-datepicker',
    'ionic-timepicker',
    'ngCordova',
    'ionic.cloud'
])

  .run(function($ionicPlatform,$rootScope, paymentResources, $ionicPush,$ionicPopup, $http) {
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
            // Push register function
      $ionicPush.register().then(function(t) {
         return $ionicPush.saveToken(t);
      }).then(function(t) {
         console.log('Token saved: ', t.token);
       //appId: $rootScope.appId,
      var data = {
          deviceId : t.token
      }
      // Send to localserver to save push device token
      //$http.post('http://192.168.8.53:1341/template/postDeviceId',data)
      // Send to server to save push device token
      $http.post(' http://simatosolutions.com:1341/template/postDeviceId',data)
        .then(function(res){
             console.log(res);
             //alert('success ' + data.deviceId);
         },function(err){
             console.log(err);
         });
      });

      $rootScope.$on('cloud:push:notification', function(event, data) {
         var msg = data.message;
         //alert(msg.title + ': ' + msg.text);
         var alertPopup = $ionicPopup.alert({
             title: msg.title,
             template: msg.text
         });
         alertPopup.then(function(res) {
             console.log('Thank you');
         });
      });

    });


  })


  .config(function($stateProvider, $urlRouterProvider,ionicDatePickerProvider,ionicTimePickerProvider, $ionicCloudProvider) {

    $ionicCloudProvider.init({
         "core": {
           //development level
           //"app_id": "d4838ea4"

           //production level
           "app_id": "ccf341c8"
         },
         "push": {
           "sender_id": "830023904047",
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

    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);


    var timePickerObj = {
      format: 12,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };

    ionicTimePickerProvider.configTimePicker(timePickerObj);

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
        templateUrl: 'templates/home.html',
        resolve:{
          initialData : ['$q','paymentResources',
            function($q,paymentResources){
              return $q.all({
                oneUSD:paymentResources.oneUSD()
              })
            }
          ]
        }
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
  //.constant('SERVER_URL', "http://192.168.8.108:1337/")
  .constant('SERVER_URL', "http://onbitlabs.com:1338/")

  //.constant('ORDER_URL','http://192.168.8.108:8080/#/mobileOrderConform?')
  .constant('ORDER_URL','http://tecclk.com/#/mobileOrderConform?')

  .constant('shopSettings',{

  payPalMerchantPrivacyPolicyURL : 'http://onbitlabs.com:1338/ur_to_policy',

  payPalMerchantUserAgreementURL : 'http://onbitlabs.com:1338/url_to_user_agreement'

});
