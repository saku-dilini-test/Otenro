angular.module('app')
  .config(function($stateProvider, $urlRouterProvider , AccessLevels) {

    $stateProvider
      .state('anon', {
            abstract: true,
            template: '<ui-view/>',
            data: {
              access: AccessLevels.anon
            }
      }).state('anon.login', {
            url: '/login',
            templateUrl: 'auth/login.html',
            controller: 'LoginController'


      }).state('anon.forgetPassword', {
            url: '/forgetPassword/:userId',
            templateUrl: 'auth/forgotPassword.html',
            controller: 'ForgotPasswordController'


      }).state('anon.resetPassword', {
            url: '/resetPassword/:token',
            params: {
                userId:null,
                resetToken:null
            },
            templateUrl: 'auth/resetPassword.html',
            controller: 'ResetPasswordController'


      }).state('anon.welcome',{
            url :'/',
            controller: 'WelcomeTemplatesCtrl',
            templateUrl : 'user/welcome/welcomeTemplatesView.html'

      }).state('anon.livePreview',{
            url :'/livePreview/:userId/:appId/:tempUrl/:tempName/:tempCategory',
            params: {
                userId:null,
                appId: null,
                tempUrl:null,
                tempName:null,
                tempCategory: null
            },
            controller: 'livePreviewCtrl',
            templateUrl : 'user/welcome/LivePreview.html'

      }).state('user.dashboard',{
            url :'/dashboard',
            controller : 'DashboardCtrl',
            templateUrl : 'user/dashboard/dashboard.html'//

      }).state('user.templates',{
            url :'/templates',
            controller : 'TemplatesCtrl',
            templateUrl : 'user/welcome/Templates.html'

        }).state('anon.register', {
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
      .state('user.editApp',{
          url :'/appedit/:appId',
          params: {
                appId: null
          },
          controller : 'AppEditAreaCtrl',
          templateUrl : 'user/edit/appEditAreaView.html'

       })
        ;

    $urlRouterProvider.otherwise('/');

  });