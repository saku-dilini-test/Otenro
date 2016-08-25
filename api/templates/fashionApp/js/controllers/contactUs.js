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
			function (pagesService, $stateParams, $ionicLoading,$rootScope,$scope) {
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
						console.log("setAboutUs  " + JSON.stringify(setAboutUs));
						$ionicLoading.hide();
					});

				function setContactUs(response) {
					console.log("response  " + JSON.stringify(response));
//					$scope.header = response.header;
//					$scope.content = response.content;
					$scope.email = response.email;
					$scope.address = response.address;
					$scope.telPhone = response.telPhone;
				}

			}
		]);

})(window.angular);
