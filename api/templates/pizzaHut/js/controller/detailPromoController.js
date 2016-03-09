mobileApp.controller('detailPromoController', function($scope, $rootScope, $translateappService, $routeParams, $filter) {
    $scope.pageClass 		= 'slideLeft';
	$scope.serviceApi		= $rootScope.serviceApi;
	$scope.GetServiceApi	= $rootScope.GetServiceApi;
	$rootScope.appTitle 	= $routeParams.title;
	$rootScope.promoID		= $routeParams.id;
	var GetServiceApi = $rootScope.GetServiceApi;
	var requestParams = {
        "token": token,
		"id": $rootScope.promoID
    };
	
	appService.HttpRequest('POST',GetServiceApi+'service/get_promo_detail',requestParams).success(function(data) {
		$scope.requestPromoDetail = data;
    });
 });