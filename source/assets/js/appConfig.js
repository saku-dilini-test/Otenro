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


    }).constant('SERVER_URL', O_SERVER_URL)


        .constant('LOCALES', {
            'locales': {
                'en_US': 'English'
            },
            'preferredLocale': 'en_US'
        })
        .constant('ME_APP_SERVER',O_MESERVER_URL)
        .constant('ME_SERVER',O_ME_SERVER)
        .constant('LIVE_APPS',O_LIVE_APPS)
        .config(function($urlRouterProvider,$httpProvider, $authProvider, SERVER_URL,uiGmapGoogleMapApiProvider,$logProvider) {

            $logProvider.debugEnabled(false);


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

            // uiGmapGoogleMapApiProvider.configure({
            //     key: 'AIzaSyALHGyv2kzhMd4nd7GQOoQMR8_JM6EVmxc',
            //     v: '3.17',
            //     libraries: 'weather,geometry,visualization'
            // });

            //disable cache for http get
            $httpProvider.defaults.cache = false;
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
        });
})();

