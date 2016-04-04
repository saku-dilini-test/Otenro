/**
 * Created by amila on 3/31/16.
 */

mobileApp.controller('foodCtrl', function($scope,$stateParams,$rootScope,$http) {

    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
    $scope.imageURL = serviceApi
                +"templates/viewImages?userId="
                +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    $http.get(SERVER_URL + '/templates/getProductsByCatId?appId='+$scope.appId+'&childId='+$stateParams.categoryId).success(function(data) {
          $scope.foods = data;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    if($stateParams.foodId){
        $http.get(SERVER_URL + '/templates/getProductById?productId='+$stateParams.foodId)
             .success(function(data) {
                  $scope.foodInfo = data[0];
             }).error(function(err) {
                 alert('warning', "Unable to get Product", err.message);
          });
    }

});