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
			'$log',
			'$http',
			'routesConfig',
			function (pagesService, $stateParams, $ionicLoading,$rootScope,$scope,$log,$http,routesConfig) {
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

			  // get policies
              $http.get(routesConfig.wpUrl.SERVER_URL() + "/templates/getPolicies?appId="+$rootScope.appId)
                  .success(function (data) {
                      $scope.privacyPolicy = data.privacyPolicy;
                      $scope.returnPolicy = data.returnPolicy;
                  },function (err) {
                      $ionicPopup.alert({
                          title: 'Policies Data loading error!',
                          template: 'Please check your connection!'
                      });
                  });


            $http.get( routesConfig.wpUrl.SERVER_URL() + '/templates/getTermsAndConditions?appId='+$scope.appId).success(function(data) {
                $scope.terms = data.termsAndCondition;
            }).error(function(err) {
                console.log('warning', "Unable to get terms & condition info", err.message);
            });

            $scope.terms = "This is terms and condition of this application ";

			}
		])
		;

})(window.angular);
