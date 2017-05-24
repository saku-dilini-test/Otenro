/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('contactUsCtrl', function($scope,$rootScope,$http,constants) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.server_url + 'cmd=getContactUs&appId='+$scope.appId).success(function(res) {
    console.log('sssssssssssssssssss'+res.data.address);
        $scope.address = res.data.address;
        $scope.email = res.data.email;
        $scope.webSite = res.data.webSite;
        $scope.telPhone = res.data.telPhone;
        $scope.coords =res.data.coords;
        $scope.googleMap = res.data;

    }).error(function(err) {
        alert('warning', "Unable to get contact us info", err.message);
    });

});