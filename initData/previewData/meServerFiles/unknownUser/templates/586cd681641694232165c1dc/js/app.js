/**
 * SurfIT invisionApp
 */
angular.module('invisionApp', ['ionic', 'ngCordova','ionic.cloud', 'srfSocialSharing', 'srfAdMob', 'srfOneSignal'])

	.run([
		'$ionicPlatform',
		'$window',
		'$rootScope',
		'readMadeEasy',
		'$ionicPush',
		'routesConfig',
		'$http',
		function($ionicPlatform, $window,$rootScope,readMadeEasy,$ionicPush,routesConfig,$http) {
			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);
				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}

				// Push register function
				$ionicPush.register().then(function(t) {
					return $ionicPush.saveToken(t);
				}).then(function(t) {
					console.log('Token saved: ', t.token);
					var data = {
						appId: $rootScope.appId,
						deviceId : t.token
					};
					// Send to server to save push device token
					$http.post(routesConfig.wpUrl.SERVER_URL() + "/templates/postDeviceId",data)
						.then(function(res){
							console.log(res);
						},function(err){
							console.log(err);
						});
				});

				$window.localStorage.setItem('showIntro', true);

				if (typeof $rootScope.appId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appId = data.appId;
					});
				}

				if (typeof $rootScope.userId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.userId = data.userId;
					});
				}
				if (typeof $rootScope.appName === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appName = data.name;
					});
				}

                ionic.Platform.isIE = function() {
                    return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
                }

                if (ionic.Platform.isIE()) {
                    window.addEventListener('click', function(event) {
                            if (Object.prototype.toString.call(event) == '[object PointerEvent]') {
                                event.stopPropagation();
                            }
                        }
                        , true);
                }
			});
		}
	])

	// Ionic Cloud Provider Configuration
	.config([
		'$ionicCloudProvider',
		function($ionicCloudProvider) {
			$ionicCloudProvider.init({
				"core": {
					"app_id": "8307b439"
				},
				"push": {
					"sender_id": "528602483901",
					"pluginConfig": {
						"ios": {
							"badge": true,
							"sound": true
						},
						"android": {
							"iconColor": "#343434"
						}
					}
				}
			});
		}])


	.config(function($ionicConfigProvider) {
		$ionicConfigProvider.views.forwardCache(true);
		$ionicConfigProvider.backButton.previousTitleText(false).text('');
		$ionicConfigProvider.navBar.alignTitle('center');
	})








	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$ionicConfigProvider',
		function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
			$ionicConfigProvider.tabs.position('top');
			$ionicConfigProvider.tabs.style('standard');

			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'templates/menu.html',
					controller: 'ApplicationController as appCtrl'
				})
				.state('app.page', {
					url: '/pages/:pageId',
					views: {
						'menuContent': {
							templateUrl: 'templates/page.html',
							controller: 'PageController as pageCtrl'
						}
					}
				})
				.state('app.categories', {
					url: '/categories',
					views: {
						'menuContent': {
							templateUrl: 'templates/categories.html',
							controller: 'CategoriesController as categoriesCtrl'
						}
					}
				})
				.state('app.category', {
					url: '/categories/:categoryId',
					views: {
						'menuContent': {
							templateUrl: 'templates/category.html',
							controller: 'CategoryController as categoryCtrl'
						}
					}
				})
				.state('app.category-featured', {
					url: '/categories/featured/:categoryId',
					views: {
						'menuContent': {
							templateUrl: 'templates/category-featured.html',
							controller: 'CategoryController as categoryCtrl'
						}
					}
				})
				.state('app.item', {
					url: '/items/:itemId',
					views: {
						'menuContent': {
							templateUrl: 'templates/item.html',
							controller: 'ItemsController as itemCtrl'
						}
					}
				})
				.state('app.comments', {
					url: '/comments/:itemId',
					views: {
						'menuContent': {
							templateUrl: 'templates/comments.html',
							controller: 'CommentsController as commentsCtrl'
						}
					}
				})
				.state('app.help', {
					url: '/help',
					views: {
						'menuContent': {
							templateUrl: 'templates/help.html'
						}
					}
				})
				.state('app.contactUs', {
					cache: false,
					url: '/contactUs',
					views: {
						'menuContent': {
							templateUrl: 'templates/contactUs.html',
							controller: 'ContactUsController as contactUsCtrl'
						}
					}
				})
				 .state('app.policies', {
                      url: '/policies',
                      views: {
                          'menuContent': {
                              templateUrl: 'templates/policies.html',
                              controller: 'AboutUsController as aboutUsCtrl'
                          }
                      }
                  })
                  .state('app.terms', {
                      url: '/terms',
                      views: {
                          'menuContent': {
                              templateUrl: 'templates/terms.html',
                              controller: 'AboutUsController as aboutUsCtrl'
                          }
                      }
                  })
				.state('app.aboutus', {
					cache: false,
					url: '/aboutus',
					views: {
						'menuContent': {
							templateUrl: 'templates/aboutUs.html',
							controller: 'AboutUsController as aboutUsCtrl'
						}
					}
				});

			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise(function($injector, $location) {
				var state = $injector.get('$state');
				state.go('app.categories', {'forceShow': false});
				return $location.path();
			});
		}
	]);