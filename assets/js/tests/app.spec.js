/*
   ** Created by shamila sallay
   ** Testing spec for app.js
*/
describe('Unit: app', function () {
    // Include Modules
     beforeEach(module('app'));
     beforeEach(module('ui.bootstrap'));
     beforeEach(module('ngMaterial'));
     beforeEach(module('ngDialog'));
     beforeEach(module('ngCookies'));
     beforeEach(module('ngMessages'));
     beforeEach(module('ui.router'));
     beforeEach(module('app-templates'));
     beforeEach(module('satellizer'));
     beforeEach(module('toastr'));
     beforeEach(module('compareTo'));
     beforeEach(module('permission'));
     beforeEach(module('pascalprecht.translate'));
     beforeEach(module('meDevices'));
     beforeEach(module('dashboard'));
     beforeEach(module('appEdit'));
     beforeEach(module('ngFileUpload'));
     beforeEach(module('colorpicker.module'));
     beforeEach(module('ui.tree'));
     beforeEach(module('ui.mask'));
     beforeEach(module('uiGmapgoogle-maps'));
     beforeEach(module('angularInlineEdit'));
     beforeEach(module('ADM-dateTimePicker'));
     beforeEach(module('angularUtils.directives.dirPagination'));
     beforeEach(module('ui.grid'));
     beforeEach(module('ui.grid.selection'));
     beforeEach(module('ui.grid.exporter'));
     beforeEach(module('angular-bind-html-compile'));
     beforeEach(module('ngCsv'));
     beforeEach(module('angular-loading-bar'));
     beforeEach(module('disableAll'));
     beforeEach(module('textAngular'));
     beforeEach(module('ngImgCrop'));

     it("should test the $routeChangeStart listener", inject(function($rootScope) {
        var $event, $toState, $toParams, $fromState, $fromParams;
        beforeEach(inject(function (_event_, _toState_, _toParams_, _fromState_, _fromParams_){
            $event = _event_;
            $toState = _toState_;
            $toParams = _toParams_;
            $fromState = _fromState_;
            $fromParams = _fromParams_;
        }));
        $rootScope.$on("$routeChangeStart");
        //expects for the listener
     }));
});