(function() {
	'use strict';
	
	angular.module('foodDemoApp')
		.directive('oblLogin',function(){
			return {
				templateUrl:'js/directives/obl-Login/obl-Login.html',
				controller: ['$scope','$http','$state','$ionicPopup', function($scope,$http,$state,$ionicPopup) {
			   		$scope.data = {};
 
				    $scope.login = function() {		

						$http.post("http://localhost:1337/templatesAuth/authenticate",{email : $scope.data.username})
							.then(function(res){
								$state.go('app.foods');
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