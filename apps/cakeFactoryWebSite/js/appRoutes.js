angular.module('animateApp')
    .config(function($routeProvider,$locationProvider) {
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
                controller: 'detailCtrl'
            })
            .when('/delivery', {
                templateUrl: 'views/delivery.html',
                controller: 'locationCtrl'
            });

});