/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and the ! prefix for excluding files.)
 */

// Path to public folder
var tmpPath = '.tmp/public/';

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [

  'vendor/**/*.css',
  'styles/ext-modules/oblFrameWork/oblFramework.css',
  'styles/ext-modules/oblDashboard/oblDashboard.css',

  'styles/widgets/appBox.css',
  'styles/common/device/iphone/iphone.css',
  'styles/common/device/tablet/tablet.css',
  'styles/ext-modules/oblMenu/oblMenu.css',
  'styles/edit/logoandtittle/textSlider.css',
  'styles/edit/appEditArea.css',
  'styles/welcome/welcomeApp.css',
  'styles/common/device/devices.min.css',
  'styles/edit/setting/contactUs/contactUsDialog.css',
  'styles/edit/styles/textSlider.css',
  'styles/treeSource/angular-ui-tree.css',

  'styles/app.css',
  'styles/bootstrap.css',
  'styles/buildkit.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [


  // Load sails.io before everything else
  'js/dependencies/sails.io.js',
  'js/dependencies/angular.1.3.js',
  'vendor/jquery/jquery.js',
  'vendor/angular/angular.js',
  'vendor/bootstrap/bootstrap.js',
  'vendor/momentjs/moment.js',
  'vendor/**/*.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/lodash.min.js',
  'js/dependencies/**/*.js',


  // All of the rest of your client-side js files
  // will be injected here in no particular order.


  'js/app.js',
  'js/appConfig.js',
  'js/services/accessLevels.js',
  'js/directives/common/device/deviceModule.js',
  'js/directives/dashboard/dashboardModule.js',
  'js/directives/ext-modules/oblFrameWork/oblFrameWorkModule.js',
  'js/directives/ext-modules/oblDashboard/oblDashBoardModule.js',
  'js/directives/ext-modules/oblMenu/oblMenuModule.js',
  'js/directives/edit/appEditModule.js',
  'js/directives/treeSource/main.js',
  'js/directives/treeSource/directives/uiTree.js',
  'js/directives/treeSource/directives/uiTreeHandle.js',
  'js/directives/treeSource/directives/uiTreeNode.js',
  'js/directives/treeSource/directives/uiTreeNodes.js',
  'js/**/*.js'

  //'js/appModule.js',
  //'js/services/accessLevels.js',
  //'js/services/auth.js',
  //'js/services/currentUser.js',
  //'js/services/localStorage.js',
  //'js/appRouteConfig.js',
  //'js/appConfig.js',
  //'js/public/auth/authtoken.js',
  //'js/public/auth/authinterceptor.js',
  //'js/**/*.js'

  // Use the "exclude" operator to ignore files
  // '!js/ignore/these/files/*.js'

];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
//module.exports.cssFilesToInject = cssFilesToInject.map(transformPath);
//module.exports.jsFilesToInject = jsFilesToInject.map(transformPath);
//module.exports.templateFilesToInject = templateFilesToInject.map(transformPath);

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});

// Transform paths relative to the "assets" folder to be relative to the public
// folder, preserving "exclude" operators.
function transformPath(path) {
  return (path.substring(0,1) == '!') ? ('!' + tmpPath + path.substring(1)) : (tmpPath + path);
}
//module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
//  return 'assets/' + path;
//});
