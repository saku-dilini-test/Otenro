//test
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
        .constant('ME_APP_SERVER','http://localhost:80/meServer/')
        .config(function($urlRouterProvider,$httpProvider, $authProvider, SERVER_URL,uiGmapGoogleMapApiProvider) {

            $authProvider.loginRedirect = '/dashboard';
            $authProvider.loginUrl = '/auth/authenticate';
            $authProvider.baseUrl = SERVER_URL;

        
            $authProvider.google({
                clientId: '785964528512-5e4oip645g34auvif9gnfmk90akd6v55.apps.googleusercontent.com',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin+'/auth/google'
            });

            $authProvider.facebook({
                clientId: '1585938975033935',
                redirectUri : window.location.origin+'/auth/facebook'
            });

            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyB3zB_AXyBODCmnpBIsJ0xyg_xH9iBnsCk',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });
        });
})();

