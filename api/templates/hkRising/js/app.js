// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionicLazyLoad','starter.services','starter.controllers'])

.run(function($ionicPlatform,readMadeEasy,$rootScope) {
  $ionicPlatform.ready(function() {
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
  $ionicConfigProvider.backButton.text("Back");
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

  .state('app.home.categoryId', {
    url: '/:categoryId',
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
      url: '/aboutus',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutus.html',
          controller: 'aboutUsCtrl'
        }
      }
    })
    .state('app.contactus', {
      url: '/contactus',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactus.html',
          controller: 'contactUsCtrl'
        }
      }
    })
      .state('app.articleView', {
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
  $urlRouterProvider.otherwise('/app/home/firstMenu');
});
