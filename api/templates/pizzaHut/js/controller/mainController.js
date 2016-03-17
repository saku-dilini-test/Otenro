mobileApp.controller('mainController', function($scope, $rootScope, $q,$http,$location) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle		= '<img src="img/header.jpg?time='+new Date().getTime()+'">';

	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	$scope.LoadMoreData = function() {
		alert(1);
	};


	var paramsID = {
		appId: $rootScope.appId

	};

	$http.post(SERVER_URL + '/templates/getMainMenu', paramsID)
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