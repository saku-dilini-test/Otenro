mobileApp.controller('menuController', function($scope, $rootScope,$routeParams, $location, $http,readMadeEasy) {
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
    readMadeEasy.readFile().success(function(appData){
    $http.get(SERVER_URL + '/templates/getProductsByCatId?appId='+appData.appId+'&childId='+$rootScope.itemcategory).success(function(data) {
        $scope.requestData = data;
    }).error(function(err) {
        alert('warning', "Unable to get templates", err.message);
    });

    $http.get(SERVER_URL + '/templates/getCurrency?appId='+appData.appId).success(function(data) {
        $scope.requestCurrency = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get templates", err.message);
    });
    });

    $scope.link = function(menu_id, menu_name) {
        $location.path('/detail/' + menu_id + '/' + menu_name);
    }

});
