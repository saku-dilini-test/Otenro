(function() {
	'use strict';
	
	angular.module('foodDemoApp')
		.directive('oblLogin',function(){
			return {
				templateUrl:'js/directives/obl-Login/obl-Login.html',
				controller: ['$scope','$http','$state','$ionicPopup','constants', function($scope,$http,$state,$ionicPopup,constants) {
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
								$state.go('app.category');
							},
							function(err){
								$ionicPopup.alert({
									title: 'Login failed!',
									template: 'Please check your credentials!'
								});
							})
				    }

					$scope.singUp = function(){
						$state.go('app.register');
					}
				}],
				restrict: 'ASE',
				replace: true
			}
		});

})();