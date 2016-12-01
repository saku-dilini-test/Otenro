/**
 * Created by Shashan on 11/25/16.
 */

mobileApp.controller('orderHistoryCtrl', function($scope,$rootScope,constants,$http) {

     //get currency
     $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
            $scope.currency = data;
        }).error(function(err) {
            alert('warning', "Unable to get Products Selected Category", err.message);
        });

     //get image url
    $scope.imageURL = constants.SERVER_URL
           +"/templates/viewImages?userId="
           +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";

    $scope.orderHistory = angular.fromJson(localStorage.getItem('history'));

});