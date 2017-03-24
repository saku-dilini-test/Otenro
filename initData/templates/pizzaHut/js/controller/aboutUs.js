mobileApp.controller('aboutUsController', function($scope,$translate, $rootScope,$http, $window) {

	$scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	=  $translate.instant('load.aboutUs.Title');
	$scope.serviceApi		=  serviceApi;
	$scope.GetServiceApi	=  GetServiceApi;
	$scope.appName 			= $rootScope.appName;
	$scope.appId = $rootScope.appId;

	$scope.imageURL = "img/header.jpg";

});