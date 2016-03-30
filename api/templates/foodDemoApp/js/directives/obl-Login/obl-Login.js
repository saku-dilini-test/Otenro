(function() {
	'use strict';
	
	angular.module('foodDemoApp')
		.directive('oblLogin',function(){
			return {
				templateUrl:'js/directives/obl-Login/obl-Login.html',
				controller: ['$scope','$http','$state','$ionicPopup', function($scope,$http,$state,$ionicPopup) {
			   		$scope.data = {};
 
				    $scope.login = function() {		

				    	// if username == abc && pasword == 123 go to foods page 
				    	if($scope.data.username == 'abc' && $scope.data.password == '123'){
				    		$state.go('app.foods');				  
				    	}else{
				    		$ionicPopup.alert({
				        		    title: 'Login failed!',
				        		    template: 'Please check your credentials!'
					            });	
				    	}
				        // $http.post("http://localhost:1339/user/create",{user_id : $scope.data.username})
				        // 	.then(function(res){				        		
				        // 		$state.go('app.foods');				  
				        // 	},
				        // 	function(err){				        		
				        // 		$ionicPopup.alert({
				        // 		    title: 'Login failed!',
				        // 		    template: 'Please check your credentials!'
					    //   	});			        		
				        // })
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