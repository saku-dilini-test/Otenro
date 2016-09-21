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
  'angularTrix',
  'angularUtils.directives.dirPagination',
  'ui.grid',
  'ui.grid.selection',
  'angular-bind-html-compile',
  'ngCsv',
  'ngImgCrop',
  'angular-loading-bar',
  'disableAll'


]).run(function($rootScope, $state, $auth,Auth,Permission) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    if (!Auth.authorize(toState.data.access)){
        event.preventDefault();
        $state.go('anon.welcome');
    }
  });
  console.log($auth.getPayload());


  Permission.defineRole('Admin', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if ($auth.getPayload().userRole == 'Admin') {
      return true; // Is anonymous
    }
    return false;
  });
  Permission.defineRole('Support', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if ($auth.getPayload().userRole == 'Support') {
      return true; // Is anonymous
    }
    return false;
  });
  Permission.defineRole('Beta', function (stateParams) {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    //$auth.getPayload().userRole == 'Beta'
    //TODO: Replace below 'true' with above line after userRole has been implemented.
    if (true) {
      return true; // Is anonymous
    }
    return false;
  });
});