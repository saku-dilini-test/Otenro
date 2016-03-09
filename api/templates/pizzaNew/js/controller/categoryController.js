mobileApp.controller('categoryController', function($scope, $rootScope, $translate, appService, $http,$routeParams) {
    $scope.pageClass = 'slideLeft';
    $rootScope.appTitle = $routeParams.title; //$translate.instant('load.category.Title');
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.serviceApi = $rootScope.serviceApi;
    $scope.imageURL = $rootScope.serviceApi
        +"api/edit/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=categories/";
    	var SERVER_URL = $rootScope.SERVER_URL;

    $http.get(SERVER_URL + '/api/templates/getCategories?appId='+$rootScope.appId+'&mainId='+$routeParams.id)
        .success(function(data) {
            $scope.requestCategory = data;
        }).error(function(err) {
            alert('warning', "Unable to get templates", err.message);
        });

});
