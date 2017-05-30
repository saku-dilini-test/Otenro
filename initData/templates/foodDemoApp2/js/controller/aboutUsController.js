/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('aboutUsCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

    // get about us
    $http.get(constants.server_url + "cmd=getAboutUs&appId="+$rootScope.appId)
        .success(function (data) {
        console.log(JSON.stringify(data))
            $scope.header = data.header;
            $scope.content = data.content;
        },function (err) {
            $ionicPopup.alert({
                title: 'About us Data loading error!',
                template: 'Please check your connection!'
            });
        });
});