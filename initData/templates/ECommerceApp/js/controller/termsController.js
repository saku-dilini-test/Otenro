/**
 * Created by Shashan on 11/25/16.
 */

mobileApp.controller('termsCtrl', function($scope,$rootScope,$http,constants) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.server_url + 'cmd=getTermsAndConditions&appId='+$scope.appId).success(function(data) {
        $scope.terms = data.termsAndCondition;
    }).error(function(err) {
        alert('warning', "Unable to get terms & condition info", err.message);
    });

	$scope.terms = "This is terms and condition of this application ";
});
