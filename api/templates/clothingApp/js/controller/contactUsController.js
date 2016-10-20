/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('contactUsCtrl', function($scope,$rootScope,$http,constants) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.SERVER_URL + '/templates/getContactUs?appId='+$scope.appId).success(function(data) {
        $scope.address = data.address;
        $scope.email = data.email;
        $scope.webSite = data.webSite;
        $scope.telPhone = data.telPhone;
        $scope.coords =data.coords;
        $scope.googleMap = data;


        $scope.getIframeSrc = function (longitude, latitude) {
          return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2071885164955!2d' + longitude + '!3d' + latitude + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTEnNTYuNyJOIDgwwrAwNyc0My42IkU!5e0!3m2!1sen!2slk!4v1476964361625" frameborder="0" style="border:0" allowfullscreen';
        };

        console.log($scope.coords)
    }).error(function(err) {
        alert('warning', "Unable to get contact us info", err.message);
    });

});