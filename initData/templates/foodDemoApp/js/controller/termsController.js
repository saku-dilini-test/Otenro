/**
 * Created by amila on 4/28/16.
 */

mobileApp.controller('termsCtrl', function($scope,$rootScope,$http,constants,$log) {

    $scope.appId = $rootScope.appId;

    $http.get( constants.server_url + 'cmd=getTermsAndConditions&appId='+$scope.appId).success(function(data) {
        $log.debug("TermAndCondistion data " + data);
        $scope.terms = data.termsAndCondition;
    }).error(function(err) {
        alert('warning', "Unable to get terms & condition info", err.message);
    });

	$scope.terms = "This is terms and condition of this application ";
});
