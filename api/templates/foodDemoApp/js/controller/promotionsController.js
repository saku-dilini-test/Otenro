/**
 * Created by manosh on 1/3/17.
 */

mobileApp.controller('SalesAndPromotionCtrl', function ($scope, $http, $rootScope, $ionicPopup, constants) {



    $scope.appId = $rootScope.appId;

    $http.get( constants.SERVER_URL + '/templates/getListOfSalesAndPromotions?appId='+$scope.appId).success(function(data) {
        $log.debug("SalesAndPromotions data " + data);
        $scope.terms = data.termsAndCondition;
    }).error(function(err) {
        alert('warning', "Unable to get sales and Promotions", err.message);
    });


});
