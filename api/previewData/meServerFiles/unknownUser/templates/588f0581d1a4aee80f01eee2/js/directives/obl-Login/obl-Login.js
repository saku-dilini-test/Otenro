(function() {
	'use strict';

	angular.module('foodDemoApp')
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
										localStorage.setItem('appLocalStorageUser', JSON.stringify(requestParams));
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