/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('aboutUsCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants) {

    var data = {
        appId: $rootScope.appId
    }

    $http.post(constants.SERVER_URL + "/edit/getAboutUsData", data)
        .success(function (data) {
                console.log(data);
                $scope.header = data.header;
                $scope.content = data.content;
                //$state.go('app.category');
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'About us Data loading error!',
                    template: 'Please check your connection!'
                });
            });


});