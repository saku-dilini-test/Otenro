mobileApp.controller('menuController', function($scope, $rootScope, appService,  $routeParams, $location) {//1S
	$http({method: 'GET', url: 'en_US.json'}).success( function(data){//2S
	$scope.load = data;

    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle 	= $routeParams.title;
	$rootScope.itemcategory = $routeParams.category;
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;

	var requestParams = {//3S
        "token": token,
		"category": $rootScope.itemcategory 
    };//3C
	
	appService.HttpRequest('POST',GetServiceApi+'service/get_menu/', requestParams).success(function(data) {//4S
		$scope.requestData = data;
    });//4C
    

	$scope.link = function(menu_id,menu_name) {//5S
		$location.path('/detail/'+menu_id+'/'+menu_name);
	}//5C
  });//2C
});//1C