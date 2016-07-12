/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('policiesCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants) {

    var data = {
        appId: $rootScope.appId
    }

    $http.post(constants.SERVER_URL + "/edit/getPoliciesData", data)
        .success(function (data) {
                console.log(data);
                $scope.header = data.header;
                $scope.content = data.content;
                //$state.go('app.category');
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
            });


});