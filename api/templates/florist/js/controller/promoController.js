mobileApp.controller('promoController', function($scope, $rootScope, $translate, appService, $q) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	= '<img src="img/logo.png" width="75px">';
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	appService.HttpRequest('GET',GetServiceApi+'service/get_promo?token='+token).success(function(data) {
		$scope.requestPromo = data;
    });
});