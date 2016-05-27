/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=secondNavi";

   $scope.categories = [
    {
        id : 1 , name : 'Salads' , "description": "Salads description"
    }, {
        id : 2 , name : 'Foods' , "description": "Foods description"
    }]

   
    // $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
    //     $scope.categories = data;
    // }).error(function(err) {
    //     alert('warning', "Unable to get categories", err.message);
    // });

    //$scope.categories = [{
    //    "name": "Salads",
    //    "description": "Salads description"
    //}]

});