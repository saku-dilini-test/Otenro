(function() {
	'use strict';

	angular.module('foodDemoApp')
		.directive('oblLogin',function(){
			return {
				templateUrl:'js/directives/obl-Login/obl-Login.html',
				controller: ['$scope','$http','$state','$stateParams','$ionicPopup','constants','$auth','$rootScope',
					function($scope,$http,$state,$stateParams,$ionicPopup,constants,$auth,$rootScope) {
						$scope.data = {};

						$scope.login = function() {
							var data = {
								email : $scope.data.username,
								password : $scope.data.password,
								appId : $rootScope.appId
							};
							$http.post(constants.server_url+'cmd=authenticateForApp&email='+$scope.data.username+'&password='+$scope.data.password+'&appId='+$rootScope.appId)
								.success(function(res){
                                        console.log('sfdsfdsf'+res.user);
										var requestParams = {
											"token": res.token,
											"email": data.email,
											"name": res.user.name,
											"phone": res.user.phoneNumber,
											"streetNumber": res.user.streetNumber,
											"streetName": res.user.streetName,
											"country": res.user.country,
											"city": res.user.city,
											"zip": res.user.zip,
											"type": 'internal',
                                            "appId":res.user.appId,
                                            "registeredUser": res.user.sub
										};
										localStorage.setItem('appLocalStorageUser'+$rootScope.appId, JSON.stringify(requestParams));
                                        $rootScope.isUserLoggedIn.check = true;
                                        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
										if($stateParams.item == 'delivery'){
											$state.go('app.cart');
										}else{
											$state.go('app.category');
										}
									},
									function(err){
										$ionicPopup.alert({
											title: 'Login failed!',
											template: 'Please check your credentials!'
										});
									})
						}

						$scope.authenticate = function(provider) {
							$auth.authenticate(provider).then(function(res){
								if(typeof res.data.token != 'undefined'){
									if($stateParams.item == 'delivery'){
										$state.go('app.cart');
									}else{
										$state.go('app.category');
									}
								}else{
									alert(provider+' Login error');
								}
							},function(err){
								alert(provider+' Login error');
							});
						};


						$scope.singUp = function(){
							if($stateParams.item == 'delivery'){
								$state.go('app.register',{item:$stateParams.item});
							}else{
								$state.go('app.register');
							}
						}
					}],
				restrict: 'ASE',
				replace: true
			}
		});

})();