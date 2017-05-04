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
            params: {
                affid: null,
                clickid:null
            },
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


      }).state('anon.checkEmail', {
            url: '/checkEmail',
            templateUrl: 'auth/checkEmail.html'

      }).state('anon.welcome',{
            url :'/',
            controller: 'WelcomeTemplatesCtrl',
            templateUrl : 'user/welcome/welcomeTemplatesView.html'

      }).state('anon.livePreview',{
            url :'/livePreview/:p',
            params: {
                userId:null,
                appId: null,
                tempUrl:null,
                tempName:null,
                tempCategory: null,
                affid: null,
                clickid:null,
                p:null
            },
            controller: 'livePreviewCtrl',
            templateUrl : 'user/welcome/LivePreview.html'

      }).state('user.dashboard',{
            url :'/dashboard',
            controller : 'DashboardCtrl',
            templateUrl : 'user/dashboard/dashboard.html',
            data: {
                permissions: {
                    only: ['Admin', 'Beta'],
                    redirectTo: 'anon.login'
                }
            }

      }).state('user.templates',{
            url :'/templates',
            controller : 'TemplatesCtrl',
            templateUrl : 'user/welcome/Templates.html'

      }).state('anon.register', {
            url: '/register',
            params: {
                affid: null,
                clickid:null
            },
            templateUrl: 'auth/register.html',
            controller: 'RegisterController',
            resolve:{
                initialData : ['$q','userProfileResource',
                    function($q,userProfileResource){
                        return $q.all({
                            yourselfReasonList : userProfileResource.getYourselfReason()
                        })
                    }
                ]
            }
      }).state('user.technicalSupporter',{
            url :'/technicalSupport',
            controller : 'technicalSupportCtrl',
            templateUrl : 'user/technicalSupport/TechnicalSupport.html',
            data : {
                permissions: {
                    only: ['Support'],
                    redirectTo: 'anon.login'
                }
            }

      }).state('user.technicalRegisteruser',{
            url :'/technicalRegisterusers',
            controller : 'technicalSupportCtrl',
            templateUrl : 'user/technicalSupport/TechnicalRegisteruser.html',
            data : {
                permissions: {
                    only: ['Support'],
                    redirectTo: 'anon.login'
                }
            }

      }).state('user.viewPublishDetails',{
            url :'/viewPublishDetails/:appId/:userId',
            controller : 'technicalSupportCtrl',
            data : {
                appId : null,
                userId:null,
            },
            templateUrl : 'user/technicalSupport/ViewPublishDetails.html'
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
          url :'/appedit/:p',
          params: {
                appId: null,
                p: null
          },
          controller : 'AppEditAreaCtrl',
          templateUrl : 'user/edit/appEditAreaView.html'

       })
        ;

    $urlRouterProvider.otherwise('/');

  });