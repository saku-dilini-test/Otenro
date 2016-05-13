angular.module('app', [

  //'ngDialog',
  //'tmh.dynamicLocale',
  ////'ngCookies',
  //'permission',
  //'dashboard',
  //'appEdit',
  //'ngAria',
  //'ngFileUpload',
  //'ngMaterial',
  //'meDevices',
  //'userRegister',
  //'ngRepeatReorder',
  //'ui-iconpicker',
  //'ui-notification',
  //'GoogleMapsNative',


  'ui.bootstrap',
  'ngMaterial',
  'ngDialog',
  'ngCookies',
  'ngMessages',
  'ui.router',
  'app-templates',
  'satellizer',
  'toastr',
  'compareTo',
  'permission',
  'pascalprecht.translate',
  'meDevices',
  'dashboard',
  'appEdit',
  'ngFileUpload',
  'colorpicker.module',
  'ui.tree',
  'ui.mask',
  'uiGmapgoogle-maps',
  'angularInlineEdit',
  'ui.bootstrap.datetimepicker'


]).run(function($rootScope, $state, $auth,Auth) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    if (!Auth.authorize(toState.data.access)){
        event.preventDefault();
        $state.go('anon.welcome');
    }
  });
});