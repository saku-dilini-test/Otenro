angular.module('animateApp')
    .config(function($routeProvider,$locationProvider,$authProvider,SERVER_URL) {

        $authProvider.httpInterceptor = false;
        $authProvider.baseUrl = SERVER_URL;
        // facebook
        $authProvider.facebook({
            clientId: '262852717382326',
            url: '/facebookAuth'
        });

        // google
        $authProvider.google({
            clientId: '528602483901-opricfuv2v6iumlilavvljhi9maf1l9f.apps.googleusercontent.com',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin ,
            url: '/googleAuth'
        });

        $routeProvider
        	.when('/', {
        		templateUrl: 'views/home.html',
                controller: 'homeCtrl'
        	})
        	.when('/about', {
        		templateUrl: 'views/about.html',
                controller: 'aboutCtrl'
        	})

            .when('/services', {
                templateUrl: 'views/services.html',
                controller: 'serviceCtrl'
            })

            .when('/product/:categoryId', {
                templateUrl: 'views/product.html',
                controller: 'productCtrl'
            })

            .when('/detail/:productId', {
                templateUrl: 'views/details.html',
                controller: 'detailCtrl'
            })
        	.when('/contact', {
        		templateUrl: 'views/contact.html',
                controller: 'contactCtrl'
        	})
            .when('/shoppingCart', {
                templateUrl: 'views/shoppingCart.html',
                controller: 'shoppingCartCtrl'
            })
            .when('/delivery', {
                templateUrl: 'views/delivery.html',
                controller: 'locationCtrl'
            })
            .when('/paymentInfo', {
                templateUrl: 'views/paymentInfo.html',
                controller: 'paymentInfoCtrl'
            });

});