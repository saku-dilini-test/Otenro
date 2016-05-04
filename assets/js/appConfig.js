
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
        .constant('ME_APP_SERVER','http://localhost:8080/')
        .config(function($urlRouterProvider,$httpProvider, $authProvider, SERVER_URL) {

            $authProvider.baseUrl = SERVER_URL;
            $authProvider.loginRedirect = '/dashboard';
            $authProvider.loginUrl = '/auth/authenticate';
            $authProvider.baseUrl = SERVER_URL;


            $authProvider.google({
                clientId: '309371575528-rk2otjp9ousus98pl6mtcmuo7s7b4nbl.apps.googleusercontent.com',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin
            });

            $authProvider.facebook({
                clientId: '1722286804691721',
                //redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/'
                redirectUri : window.location.origin+'/'
            });
        });
})();
