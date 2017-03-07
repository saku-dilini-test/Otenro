/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('aboutUsCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

    // get about us
    $http.get(constants.SERVER_URL + "/templates/getAboutUs?appId="+$rootScope.appId)
        .success(function (data) {
            $scope.header = data.header;
            $scope.content = data.content;
        },function (err) {
            $ionicPopup.alert({
                title: 'About us Data loading error!',
                template: 'Please check your connection!'
            });
        });
});