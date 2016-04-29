/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('termsCtrl', function($scope,$rootScope,$http,constants) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.SERVER_URL + '/templates/getTermsAndConditions?appId='+$scope.appId).success(function(data) {
        $scope.terms = data.termsAndCondition;
    }).error(function(err) {
        alert('warning', "Unable to get terms & condition info", err.message);
    });

});
