angular.module("appeality", ["ionic", "angular-cache"])

.run(function ($ionicPlatform, CacheFactory) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        abstract: true, //requires ion-nav-view
        url: '/app',
        templateUrl: 'app/layout/menu-layout.html'
    })

    .state('app.landing', {
        url: '/landing',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/landing/landing.html'
            }
        }
    })

    .state('app.mixed-menu', {
        url: '/mixed-menu',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/menu/mixed-menu.html'
            }
        }
    })

    .state('app.menu-grid', {
        url: '/menu-grid',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/menu/menu-grid.html'
            }
        }
    })

    .state('app.menu-detail', {
            url: '/menu-detail/:id',
            views: {
                'mainContent': {
                    templateUrl: 'app/menu/menu-detail.html'
                }
            }
    })

    .state('app.aboutus', {
        url: '/aboutus',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/aboutus/aboutus.html'
            }
        }
    })

    .state('app.chefs', {
        url: '/chefs',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/aboutus/chefs.html'
            }
        }
    })

    .state('app.locations', {
        url: '/locations',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/locations/locations.html'
            }
        }
    })
    .state('app.reservations', {
        url: '/reservations',
        views: {
            'mainContent': { //mainContent is ion-nav-view name in menu-layout.html
                templateUrl: 'app/reservations/reservations.html'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/landing');

});