mobileApp.controller('promoDetailController', function($scope, $rootScope, $routeParams, appService, $q,$http) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	= $routeParams.title;
	$scope.serviceApi		= $rootScope.serviceApi;
	$scope.GetServiceApi	= $rootScope.GetServiceApi;
	 $scope.imageURL = $rootScope.serviceApi
            +"api/edit/viewImages?userId="
            +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=products/";
	var SERVER_URL = $rootScope.SERVER_URL;

	var requestParams = {
		"token": token,
		"id": $routeParams.id
	};

	appService.HttpRequest('POST',GetServiceApi+'service/get_promo_detail/', requestParams).success(function(data) {
		$scope.requestPromoDetail = data;
    });
});