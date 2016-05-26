angular.module('animateApp')
    .config(function($routeProvider,$locationProvider,$authProvider,SERVER_URL) {

        $authProvider.httpInterceptor = false;
        $authProvider.baseUrl = SERVER_URL;
        // facebook
        $authProvider.facebook({
            clientId: '682434365228738',
            url: '/facebookAuth'
        });

        // google
        $authProvider.google({
            clientId: '368862461164-gr53rrut1et9v9m9rq2voqq91sfh6dh2.apps.googleusercontent.com',
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
                templateUrl: 'views/services.html'
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
            })
            .when('/mobileOrderConform', {
                templateUrl: 'views/mobileOrderConform.html',
                controller: 'mobileOrderCtrl'
            })
            .when('/mobilePaymentInfo', {
                templateUrl: 'views/mobilePaymentInfo.html',
                controller: 'mobilePaymentInfoCtrl'
            });

});