
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
                clientId: '170821583873-i8ud07kd4tqj8bh3u3lgl9d0aisvpbq4.apps.googleusercontent.com',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin+'/auth/google'
            });

            $authProvider.facebook({
                clientId: '459707740889740',
                redirectUri : window.location.origin+'/auth/facebook'
            });
        });
})();
