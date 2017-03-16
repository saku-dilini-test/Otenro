angular.module('app')
  .config(function($stateProvider, $urlRouterProvider , AccessLevels) {

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'LoginController'
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'RegisterController'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.dashboard',{
          url :'/dashboard',
          controller : 'DashboardCtrl',
          templateUrl : 'user/dashboard/dashboard.html'//
      })
      .state('user.welcome',{
          url :'/',
          controller: 'WelcomeTemplatesCtrl',
          templateUrl : 'user/welcome/welcomeTemplatesView.html'
      })
      .state('user.editApp',{
          url :'/appedit',
          params: {
                appId: null
          },
          controller : 'AppEditAreaCtrl',
          templateUrl : 'user/edit/appEditAreaView.html'
       });

    $urlRouterProvider.otherwise('/');

  });