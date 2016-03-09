mobileApp.controller('contactController', function($scope,$translate, $rootScope, appService,$http, $window) {

	$scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle	 	=  $translate.instant('load.contact.Title');
	$scope.serviceApi		=  $rootScope.serviceApi;
	$scope.GetServiceApi	=  $rootScope.GetServiceApi;
	$scope.appName 			= $rootScope.appName;
    var SERVER_URL = $rootScope.SERVER_URL;
	$scope.imageURL = "img/header.jpg";
    $scope.marker="";
	$http.get(SERVER_URL + '/templates/getContactUs?appId='+$rootScope.appId)
		.success(function(data) {
			$scope.data= data;
			$scope.marker=data.coords;
			if(!data.coords){
				$scope.marker={
					latitude : 6.9320204155752050,
					longitude: 79.8890950584107031
				}
			}
			$scope.mapUrl="https://maps.googleapis.com/maps/api/staticmap?center="+$scope.marker.latitude+","+$scope.marker.longitude+"&zoom=14&size=250x300&markers=color:red|Clabel:S|"
				+$scope.marker.latitude+","+$scope.marker.longitude+"&maptype=roadmap";

		}).error(function(err) {
			alert('warning', "Unable to get templates", err.message);
		});

	//appService.HttpRequest('GET',GetServiceApi+'service/get_setting?token='+token).success(function(data) {
	//	$scope.setting 			= data;
	//	$scope.settingImages 	= data[0].setting_img;
	//	$scope.settingName 		= data[0].setting_name;
	//	$scope.lnglat    		= data[0].setting_longitude+','+data[0].setting_latitude;
	//});
	//
	//
	//
	//
	//if(typeof $scope.opening === 'undefined'){
	//	appService.HttpRequest('GET',GetServiceApi+'service/get_opening?token='+token).success(function(data) {
	//		$scope.opening 	= data;
	//	});
	//}
	//$scope.getStaticMap = function(opts) {
	//	var src = "http://maps.googleapis.com/maps/api/staticmap?",
	//		params = angular.extend({
	//		center: $scope.lnglat,
	//		zoom: 14,
	//		size: '512x512',
	//		markers:'color:red|Clabel:S|'+$scope.lnglat,
	//		maptype: 'roadmap',
	//		sensor: false
	//		},opts),
	//
	//     query = [];
	//
	//	angular.forEach(params, function(k, v) {
	//		query.push(v + '=' + encodeURIComponent(k));
	//	});
	//
	//	src += query.join('&');
	//	return src;
	//};



});