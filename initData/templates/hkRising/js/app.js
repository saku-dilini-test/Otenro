// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.cloud','ionicLazyLoad','starter.services','starter.controllers'])

    .run(function($ionicPlatform,readMadeEasy,$rootScope,$ionicPush,$http,constants) {
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
        if (window.cordova && window.cordova.plugins.Keyboard) {
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
          $http.post(constants.SERVER_URL + "/templates/postDeviceId",data)
              .then(function(res){
                console.log(res);
              },function(err){
                console.log(err);
              });
        });

        if (typeof $rootScope.appId === 'undefined'){

          readMadeEasy.readFile().success(function(data){
            $rootScope.appId = data.appId;
            $rootScope.appName = data.name;
            console.log(data);
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
    .config(function($ionicConfigProvider) {
      $ionicConfigProvider.views.forwardCache(true);
      $ionicConfigProvider.backButton.previousTitleText(false).text('');
      $ionicConfigProvider.navBar.alignTitle('center');
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

    .config(function($ionicConfigProvider) {
      $ionicConfigProvider.views.forwardCache(true);
      $ionicConfigProvider.backButton.previousTitleText(false).text('');
    })




    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
          })

          .state('app.home', {
            url: '/home',
            views: {
              'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
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
            .state('app.terms', {
                url: '/terms',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/terms.html',
                        controller: 'termsCtrl'
                    }
                }
            })

          .state('app.home.categoryId', {
            cache: false,
            url: '/:categoryId/:categoryName',
            views: {
              'tabContent': {
                templateUrl: 'templates/article.html',
                controller: 'articleCtrl'
              }
            },
            resolve:{
              initialData : ['$q',
                function($q){
                  return $q.all({
                    imageURL : null
                  })
                }
              ]
            }
          })


          .state('app.aboutus', {
            cache: false,
            url: '/aboutus',
            views: {
              'menuContent': {
                templateUrl: 'templates/aboutus.html',
                controller: 'aboutUsCtrl'
              }
            }
          })
          .state('app.contactus', {
            cache: false,
            url: '/contactus',
            views: {
              'menuContent': {
                templateUrl: 'templates/contactus.html',
                controller: 'contactUsCtrl'
              }
            }
          })
          .state('app.category', {
            cache: false,
            url: '/category',
            views: {
              'menuContent': {
                templateUrl: 'templates/category.html',
                controller: 'HomeCtrl'
              }
            }
          })
          .state('app.articleView', {
            cache: false,
            url: '/articleView/:articleId',
            views: {
              'menuContent': {
                templateUrl: 'templates/articleView.html',
                controller: 'articleCtrl'
              }
            },
            resolve:{
              initialData : ['$q','articleResource','$stateParams',
                function($q,articleResource,$stateParams){
                  return $q.all({
                    selectedArticle : articleResource.selectedArticle($stateParams.articleId),
                    imageURL : articleResource.getImageUrl()
                  })
                }
              ]
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/category');
    });