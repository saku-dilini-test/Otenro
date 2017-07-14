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

        $scope.myLatLng = {lat: $scope.coords.latitude, lng: $scope.coords.longitude};
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: $scope.myLatLng
        });

        $scope.marker = new google.maps.Marker({
            position: $scope.myLatLng,
            map:  $scope.map,
            title: data.address
        });


    }).error(function(err) {
        alert('warning', "Unable to get contact us info", err.message);
    });
    
    
    
    
    
});