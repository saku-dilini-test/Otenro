mobileApp.controller('promoController', function($scope, $rootScope, $translate, appService, $q,$http,$routeParams) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	= $routeParams.title;
	$scope.userId=$rootScope.userId;
	$scope.appId=$rootScope.appId;
	$scope.serviceApi = $rootScope.serviceApi;
	$scope.imageURL = $rootScope.serviceApi
		+"api/edit/viewImages?userId="
		+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=categories/";
	var SERVER_URL = $rootScope.SERVER_URL;
	//TODO : should remove
	var GetServiceApi = $rootScope.GetServiceApi;

	appService.HttpRequest('GET',GetServiceApi+'service/get_promo?token='+token).success(function(data) {
		$scope.requestPromo = data;
    });
});