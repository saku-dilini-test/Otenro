
(function(){
    "use strict";
    angular.module("app").config(function($provide){
       $provide.decorator("$exceptionHandler",[
           "$delegate", function($delegate){
               return function(expception,cause){
                   $delegate(expception,cause);
                 //alert(expception,cause);
               }
           }
       ])
    }).constant('SERVER_URL', 'http://localhost:1337/')
        .constant('LOCALES', {
            'locales': {
                'en_US': 'English'
            },
            'preferredLocale': 'en_US'
        })
        .constant('ME_APP_SERVER','http://localhost:8081/')
        .config(function($urlRouterProvider,$httpProvider, $authProvider, SERVER_URL) {

            $authProvider.baseUrl = SERVER_URL;
            $authProvider.loginRedirect = '/dashboard';
            $authProvider.loginUrl = '/auth/authenticate';
            $authProvider.baseUrl = SERVER_URL;


            $authProvider.google({
                clientId: '894432502234-30r2t0424l55eqv3je0ofbc259k613vc.apps.googleusercontent.com',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin
            });

            $authProvider.facebook({
                clientId: '1751523961745182',
                //redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/'
                redirectUri : window.location.origin+'/'
            });
        });
})();
