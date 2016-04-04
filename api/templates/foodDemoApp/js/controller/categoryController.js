/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http) {

    console.log($rootScope.appId);
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = serviceApi
        +"templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=secondNavi";

    $http.get(SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
        $scope.categories = data;
    }).error(function(err) {
        alert('warning', "Unable to get categories", err.message);
    });

});