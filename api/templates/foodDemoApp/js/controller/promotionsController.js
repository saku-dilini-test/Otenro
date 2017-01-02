/**
 * Created by manosh on 1/2/17.
 */

mobileApp.controller('SalesAndPromotionCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {

    // get Promotions and Sales
    $http.get(constants.SERVER_URL + "/templates/getListOfSalesAndPromotions?appId="+$rootScope.appId)
        .success(function (data) {
            $scope.header = data.header;
            $scope.content = data.content;
        },function (err) {
            $ionicPopup.alert({
                title: 'Promotion loading error!',
                template: 'Please check your connection!'
            });
        });
});
