mobileApp.controller('bestSellerController', function($scope, $rootScope, $translate, appService,  $routeParams, $location,$http) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle 	= $routeParams.title;
	$rootScope.itemcategory = $routeParams.category;
	$scope.serviceApi		= $rootScope.serviceApi;
	$scope.GetServiceApi	= $rootScope.GetServiceApi;
	var SERVER_URL = $rootScope.SERVER_URL;
	//TODO: should remove
	var GetServiceApi = $rootScope.GetServiceApi;

	appService.HttpRequest('GET',GetServiceApi+'service/get_best_seller?token='+token).success(function(data) {
		$scope.requestData = data;
    });

	$scope.link = function(menu_id,menu_name) {
		$location.path('/detail/'+menu_id+'/'+menu_name);
	}
	
});