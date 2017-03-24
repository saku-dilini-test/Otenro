/**
 * Comments controller
 */
(function(angular, undefined) {
	angular
		.module('invisionApp')

		.controller('ContactUsController', [
			'pagesService',
			'$stateParams',
			'$ionicLoading',
			'$rootScope',
			'$scope',
			'$log',
			function (pagesService, $stateParams, $ionicLoading,$rootScope,$scope,$log) {
				'use strict';

				//var vm = this;

				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});

				var appId = $rootScope.appId;
				pagesService.getContactUs(appId).then(setContactUs)
					.finally(function(){
						$log.debug("setAboutUs  " + JSON.stringify(setContactUs));
						$ionicLoading.hide();
					});

				function setContactUs(response) {
					$log.debug("response  " + JSON.stringify(response));
//					$scope.header = response.header;
//					$scope.content = response.content;
					$scope.email = response.email;
					$scope.address = response.address;
					$scope.telPhone = response.telPhone;
					$scope.webSite = response.webSite;
				}

			}
		]);

})(window.angular);
