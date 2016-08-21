/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('policiesCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants) {

    console.log("$rootScope.appId " + $rootScope.appId);
    var data = {
        appId: $rootScope.appId
    }

    $http.post(constants.SERVER_URL + "/edit/getPoliciesData", data)
        .success(function (data) {
                console.log("getPoliciesData " + data);
                console.log("data ...."+JSON.stringify(data.privacyPolicy));
                console.log("data ...."+JSON.stringify(data.returnPolicy));

                $scope.privacyPolicy = data.privacyPolicy;
                $scope.returnPolicy = data.returnPolicy;
                //$state.go('app.category');
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
            });


});