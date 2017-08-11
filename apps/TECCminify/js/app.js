var cakeApp = angular.module('animateApp',
    [
        'ngRoute',
        'satellizer',
        'wu.staticGmap',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'ngFileUpload'
    ]);

//cakeApp.constant('SERVER_URL', "http://192.168.8.155:1337/");    // local development
//cakeApp.constant('SERVER_URL', "http://192.168.8.155:1338/");  // local production
cakeApp.constant('SERVER_URL', "http://tecclk.com:1338/");  // live production



