// ---  app js  ----

var mobileApp = angular.module('starter', ['ionic','ionic.cloud','satellizer','starter.services','starter.controllers','credit-cards','starter.payPalService'])

    .run(function($ionicPlatform,readMadeEasy,$rootScope,$ionicPush,appServices) {
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
                cache: false,
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
                cache: false,
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
                params:{
                    item: null,
                    deliverDetails:null,
                    amount: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pickup.html',
                        controller: 'pickupCtrl'
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
            })
            .state('tab.policies', {
                cache: false,
                url: '/policies',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/policies.html',
                        controller: 'policiesCtrl'
                    }
                }
            })
            .state('tab.orderHistory', {
                cache: false,
                url: '/orderHistory',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/orderHistory.html',
                        controller: 'orderHistoryCtrl'
                    }
                }
            })
            .state('tab.terms', {
                cache: false,
                url: '/terms',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/terms.html',
                        controller: 'termsCtrl'
                    }
                }
            })
            .state('tab.cardPayment', {
                cache: false,
                url: '/cardPayment',
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
                        templateUrl: 'templates/cardPayment.html',
                        controller: 'paymentCtrl'
                    }
                }
            })

                   .state('tab.shipping', {
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

                    .state('tab.checkout', {
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


            .state('tab.payment', {
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


            /*.state('tab.category', {
                        cache: false,
                        url: '/category',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/category.html',
                                controller: 'categoryCtrl'
                            }
                        }
                    })
*/
            .state('tab.pickupDetails', {
                cache: false,
                url: '/pickupDetails',
                params:{
                    item: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/pickupDetails.html',
                        controller: 'CartCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/menu');

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