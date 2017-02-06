/**
 * Comments controller
 */
(function(angular, undefined) {
	angular
		.module('invisionApp')

		.controller('AboutUsController', [
			'pagesService',
			'$stateParams',
			'$ionicLoading',
			'$rootScope',
			'$scope',
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
				pagesService.getAboutUs(appId).then(setAboutUs)
					.finally(function(){
						$log.debug("setAboutUs  " + JSON.stringify(setAboutUs));
						$ionicLoading.hide();
					});


				function setAboutUs(response) {
					$log.debug("response  " + JSON.stringify(response));
					$scope.header = response.header;
					$scope.content = response.content;
					$scope.termsAndCondition = response.termsAndCondition;
					$log.debug(response.content);
				}

			}
		]);

})(window.angular);
