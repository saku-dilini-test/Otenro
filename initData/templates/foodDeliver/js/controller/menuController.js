mobileApp.controller('menuController', function($scope, $rootScope, appService, $routeParams, $location, $http) {
    $scope.pageClass = 'slideLeft';
    $rootScope.appTitle = $routeParams.title;
    $rootScope.itemcategory = $routeParams.category;
    $scope.serviceApi = serviceApi;
    $scope.GetServiceApi = GetServiceApi;
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;

    var appId ={
        "appId" : $rootScope.appId
    };
    var requestParams = {
        "token": token,
        "category": $rootScope.itemcategory
    };
    console.log(requestParams);

    // appService.HttpRequest('POST',GetServiceApi+'service/get_menu/', requestParams).success(function(data) {
    // 	$scope.requestData = data;
    //    });

    $http.post(SERVER_URL + '/api/templates/getProductsByCatId', requestParams).success(function(data) {
        //alert(templates);
        $scope.requestData = data;
    }).error(function(err) {
        alert('warning', "Unable to get templates", err.message);
    });

    $http.get(SERVER_URL + '/api/templates/getCurrency?appId='+$rootScope.appId).success(function(data) {
        //alert(templates);
        $scope.requestCurrency = data.appSettings.appCurrency;
    }).error(function(err) {
        alert('warning', "Unable to get templates", err.message);
    });

    $scope.link = function(menu_id, menu_name) {
        $location.path('/detail/' + menu_id + '/' + menu_name);
    }

});
