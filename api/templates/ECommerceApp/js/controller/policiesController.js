/**
 * Created by Shashan on 11/25/16.
 */

mobileApp.controller('policiesCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

    // get policies
    $http.get(constants.SERVER_URL + "/templates/getPolicies?appId="+$rootScope.appId)
        .success(function (data) {
            $scope.privacyPolicy = data.privacyPolicy;
            $scope.returnPolicy = data.returnPolicy;
        },function (err) {
            $ionicPopup.alert({
                title: 'Policies Data loading error!',
                template: 'Please check your connection!'
            });
        });
});