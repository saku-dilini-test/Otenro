/**
 * Created by amila on 4/1/16.
 */


mobileApp.controller('categoryCtrl', function($scope,$stateParams,$rootScope,$http,constants) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = constants.SERVER_URL
        +"/templates/viewImages?userId="
        +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=secondNavi";


      $http.get(constants.SERVER_URL + '/templates/getSpecificChild?appId='+$scope.appId).success(function(data) {
          $scope.categories = data;
      }).error(function(err) {
          alert('warning', "Unable to get categories", err.message);
      });

    // $scope.categories = [
    //{
    //    "id" : 1,
    //    "imageUrl": "a.png",
    //    "name": "Shirt",
    //    "description": "Shirt description"
    //},
    //{
    //    "id" : 2,
    //    "imageUrl": "b.png",
    //    "name": "Shirt",
    //    "description": "Shirt description"
    //},
    //{
    //    "id" : 3,
    //    "imageUrl": "c.png",
    //    "name": "Shirt",
    //    "description": "Shirt description"
    //},
    //{
    //    "id" : 4,
    //    "imageUrl": "d.png",
    //    "name": "Shirt",
    //    "description": "Shirt description"
    //},
    //{
    //    "id" : 5,
    //    "imageUrl": "e.png",
    //    "name": "Shirt",
    //    "description": "Shirt description"
    //}
    //];

});