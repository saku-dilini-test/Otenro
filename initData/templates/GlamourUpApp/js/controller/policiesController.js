/**
 * Created by amila on 8/21/16.
 */

mobileApp.controller('policiesCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

    // get policies
    $http.get(constants.server_url + "cmd=getPolicies&appId="+$rootScope.appId)
        .success(function (res) {
            $scope.privacyPolicy = res.data.privacyPolicy;
            $scope.returnPolicy = res.data.returnPolicy;
        },function (err) {
            $ionicPopup.alert({
                title: 'Policies Data loading error!',
                template: 'Please check your connection!'
            });
        });
});