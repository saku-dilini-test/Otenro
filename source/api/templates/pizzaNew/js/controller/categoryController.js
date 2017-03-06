mobileApp.controller('categoryController', function($scope, $rootScope, $translate, appService, $http,$routeParams,readMadeEasy) {
    $scope.pageClass = 'slideLeft';
    $rootScope.appTitle = $routeParams.title; //$translate.instant('load.category.Title');

    if (typeof $rootScope.appId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appId = data.appId;
        });
    }

    if (typeof $rootScope.userId === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.userId = data.userId;
        });
    }
    if (typeof $rootScope.appName === 'undefined'){

        readMadeEasy.readFile().success(function(data){
            $rootScope.appName = data.name;
        });
    }



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
