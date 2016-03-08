mobileApp.controller('categoryController', function($scope, $rootScope, $translate, appService, $http) {
    $scope.pageClass = 'slideLeft';
    $rootScope.appTitle = $translate.instant('load.category.Title');

    // appService.HttpRequest('GET', GetServiceApi + 'service/get_category?token=' + token).success(function(data) {
    //     $scope.requestCategory = data;
    // });

    $http.post(SERVER_URL + '/api/templates/getCategories', {
        appId: '01'
    }).success(function(data) {
        //alert(templates);
        $scope.requestCategory = data;
        console.log(data);
    }).error(function(err) {
        alert('warning', "Unable to get templates", err.message);
    });

});
