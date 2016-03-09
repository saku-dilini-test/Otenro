mobileApp.controller('categoryController', function($scope, $rootScope, $translate, appService, $http,$routeParams) {
    $scope.pageClass = 'slideLeft';
    $rootScope.appTitle = $routeParams.title; //$translate.instant('load.category.Title');
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.serviceApi = $rootScope.serviceApi;
    $scope.imageURL = $rootScope.serviceApi
        +"templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=secondNavi";
    	var SERVER_URL = $rootScope.SERVER_URL;

    $http.get(SERVER_URL + '/templates/getSpecificChild?appId='+$rootScope.appId+'&mainId='+$routeParams.id)
        .success(function(data) {
            $scope.requestCategory = data;
            console.log(data);
        }).error(function(err) {
            alert('warning', "Unable to get templates", err.message);
        });

});
