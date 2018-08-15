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
  'ADM-dateTimePicker',
  'angularUtils.directives.dirPagination',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.exporter',
  'angular-bind-html-compile',
  'ngCsv',
  'angular-loading-bar',
  'disableAll',
  'textAngular',
  'ngImgCrop',
  'ngAnimate',
  'chart.js',
  'uiCropper',
  'ngQuill'


]).run(function($rootScope, $state, $auth,Auth,Permission,$log) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!Auth.authorize(toState.data.access)){
        event.preventDefault();
        $state.go('anon.welcome');
    }
  });

    $log.debug('TEST Log');


  Permission.defineRole('Admin', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if ($auth.getPayload().userRoles[0] == 'ADMIN') {

      return true; // Is anonymous
    }
    return false;
  });
  Permission.defineRole('Support', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if ($auth.getPayload().userRoles[0] == 'SUPER_ADMIN' || $auth.getPayload().userRoles[0] == 'OPERATOR' || $auth.getPayload().userRoles[0] == 'ADMIN') {
      return true; // Is anonymous
    }
    return false;
  });
  Permission.defineRole('Beta', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if ($auth.getPayload().userRoles[0] == 'APP_CREATOR'){
    //TODO: Replace below 'true' with above line after userRole has been implemented.

      return true; // Is anonymous
    }
    return false;
  });
});