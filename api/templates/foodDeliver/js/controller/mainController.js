mobileApp.controller('mainController', function($scope, $rootScope, appService, $q,$http,$location) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle		= '<img src="img/header.jpg">';
	//$rootScope.appTitle	 = 'Home';
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	$scope.LoadMoreData = function() {
		alert(1);
	}

    //var requestParams = {
    //    "token": token
    //};

	//$rootScope.goReload = function() {
	//	$rootScope.loading = true;
	//	appService.HttpRequest('GET',GetServiceApi+'service/get_menu/',requestParams).success(function(data) {
	//		$scope.requestData = data;
	//		$rootScope.loading = false;
	//	});
	//}

	var paramsID = {
		appId: $rootScope.appId

	};

	$http.post(GetServiceApi + 'api/templates/getMainmenu', paramsID)
		.success(function(data) {
			$scope.menuList = data;
		}).error(function(err) {
			alert('warning', "Unable to get Menus", err.message);
		});

	$scope.link=function(menuId,menuName){
		//alert(menuId+menuName);
		$location.path('/category/' + menuId + '/' + menuName);
	};

    //appService.HttpRequest('GET',GetServiceApi+'service/get_menu/', requestParams).success(function(data) {
		//$scope.requestData = data;
    //});
});