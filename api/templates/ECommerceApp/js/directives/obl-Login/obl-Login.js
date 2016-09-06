(function() {
	'use strict';
	
	angular.module('starter')
		.directive('oblLogin',function(){
			return {
				templateUrl:'js/directives/obl-Login/obl-Login.html',
				controller: ['$scope','$http','$state','$stateParams','$ionicPopup','constants','$auth',
				function($scope,$http,$state,$stateParams,$ionicPopup,constants,$auth) {
			   		$scope.data = {};
 
				    $scope.login = function() {
						var data = {
							email : $scope.data.username,
							password : $scope.data.password
						};
						$http.post(constants.SERVER_URL+"/templatesAuth/authenticate",data)
							.then(function(res){
							var requestParams = {
                            	"token": res.data.token,
                            	"email": data.email,
                            	"password": data.password,
                            	"name": res.data.user.name,
                            	"phone": res.data.user.phoneNumber,
                            	"address": res.data.user.address,
                            	"type": 'internal'
                            };
                            localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
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
                            $state.go('register',{item:$stateParams.item});
                        }else{
                            $state.go('register');
                        }
					}
				}],
				restrict: 'ASE',
				replace: true
			}
		});

})();