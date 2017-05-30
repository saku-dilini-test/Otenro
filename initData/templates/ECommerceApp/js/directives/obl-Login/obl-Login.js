(function() {
	'use strict';
	
	angular.module('starter')
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
								.then(function(res){
                                        console.log(res);
										var requestParams = {
											"token": res.data.token,
											"email": data.email,
											"name": res.data.user.name,
											"phone": res.data.user.phoneNumber,
											"streetNumber": res.data.user.streetNumber,
											"streetName": res.data.user.streetName,
											"country": res.data.user.country,
											"city": res.data.user.city,
											"zip": res.data.user.zip,
											"type": 'internal',
                                            "appId":res.data.user.appId,
                                            "registeredUser": res.data.user.sub
										};
										localStorage.setItem('appLocalStorageUser'+$rootScope.appId, JSON.stringify(requestParams));
                                        $rootScope.isUserLoggedIn.check = true;
                                        $rootScope.parentobj.userLog = $rootScope.isUserLoggedIn.check;
										if($stateParams.item == 'delivery'){
											$state.go('tab.cart');
										}else{
											$state.go('tab.menu');
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
                                    $state.go('tab.cart');
                                }else{
                                    $state.go('tab.menu');
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
                            $state.go('tab.register',{item:$stateParams.item});
                        }else{
                            $state.go('tab.register');
                        }
					}
				}],
				restrict: 'ASE',
				replace: true
			}
		});

})();