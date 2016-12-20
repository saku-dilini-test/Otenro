// Karma configuration
// Generated on Mon Dec 19 2016 16:37:44 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './assets/js/dependencies/sails.io.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/rangy/rangy-core.js',
        './bower_components/rangy/rangy-classapplier.js',
        './bower_components/adm-dtp/dist/ADM-dateTimePicker.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-aria/angular-aria.js',
        './bower_components/angular-base64/angular-base64.js',
        './bower_components/angular-bind-html-compile/angular-bind-html-compile.js',
        './bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
        './bower_components/angular-bootstrap-grid-tree/src/tree-grid-directive.js',
        './bower_components/angular-color-picker/angularjs-color-picker.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/angular-credit-cards/release/angular-credit-cards.js',
        './bower_components/angular-disable-all/dist/angular-disable-all.js',
        './bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.js',
        './bower_components/angular-gridster/src/angular-gridster.js',
        './bower_components/angular-hammer/angular-hammer.js',
        './bower_components/angular-loading-bar/src/loading-bar.js',
        './bower_components/angular-material/angular-material.js',
        './bower_components/angular-messages/angular-messages.js',
        './bower_components/angular-permission/dist/angular-permission.js',
        './bower_components/angular-resource/angular-resource.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        './bower_components/angular-translate/angular-translate.js',
        './bower_components/angular-ui-grid/ui-grid.js',
        './bower_components/angular-ui-grid/ui-grid.min.js',
        './bower_components/angular-ui-mask/dist/mask.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-ui-tree/dist/angular-ui-tree.js',
        './bower_components/angularUtils-pagination/dirPagination.js',
        './bower_components/hammerjs/hammer.js',
        './bower_components/javascript-detect-element-resize/detect-element-resize.js',
        './bower_components/ng-csv/build/ng-csv.min.js',
        './bower_components/ng-dialog/js/ngDialog.js',
        './bower_components/ng-file-upload/ng-file-upload.js',
        './bower_components/ng-img-crop-full-extended/compile/minified/ng-img-crop.js',
        './bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
        './bower_components/ng-inline-edit/dist/ng-inline-edit.js',
        './bower_components/ngCroppie/minified/ng-croppie.min.js',
        './bower_components/ngCroppie/unminified/ng-croppie.js',
        './bower_components/ngDialog/js/ngDialog.js',
        './bower_components/ngRepeatReorder/dist/ngRepeatReorder.js',
        './bower_components/rangy/rangy-highlighter.js',
        './bower_components/rangy/rangy-selectionsaverestore.js',
        './bower_components/rangy/rangy-serializer.js',
        './bower_components/rangy/rangy-textrange.js',
        './bower_components/satellizer/satellizer.js',
        './bower_components/textAngular/dist/textAngular-sanitize.js',
        './bower_components/textAngular/dist/textAngular.js',
        './bower_components/textAngular/dist/textAngularSetup.js',
        './bower_components/tinycolor/tinycolor.js',
        './bower_components/tweenlite/TweenLite.min.js',
        './.tmp/public/templates.js',
        './assets/js/directives/compareTo.module.js',
        './assets/js/directives/common/device/deviceModule.js',
        './assets/js/directives/dashboard/dashboardModule.js',
        './assets/js/directives/ext-modules/oblDashboard/oblDashBoardModule.js',
        './assets/js/directives/edit/appEditModule.js',
        './assets/js/directives/ext-modules/oblFrameWork/oblFrameWorkModule.js',
        './assets/js/directives/ext-modules/oblMenu/oblMenuModule.js',
        './assets/js/dependencies/angular-google-maps.min.js',



        './node_modules/angular-mocks/angular-mocks.js',

        './assets/js/dependencies/ui-bootstrap-tpls-0.11.0.js',



        './bower_components/angular-cookies/angular-cookies.js',

        './assets/js/app.js',
        './assets/js/services/users.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
