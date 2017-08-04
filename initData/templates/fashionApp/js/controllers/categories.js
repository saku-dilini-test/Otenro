/**
 * Categories controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('CategoriesController', [
		'categoriesService',
		'$ionicLoading',
		'$rootScope',
		'$timeout',
		'routesConfig',
		'readMadeEasy',
		'$scope',
		"$http",
		function (categoriesSvc, $ionicLoading,$rootScope,$timeout,routesConfig,readMadeEasy,$scope,$http) {
			'use strict';

			var vm = this;
			vm.appName = $rootScope.appName;

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			function setCategories(categories) {

				if (typeof $rootScope.appId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appId = data.appId;
					});
				}

				if (typeof $rootScope.userId === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.userId = data.userId;
					});
				}
				if (typeof $rootScope.appName === 'undefined'){

					readMadeEasy.readFile().success(function(data){
						$rootScope.appName = data.name;
					});
				}

				readMadeEasy.readFile().success(function(data){
					$scope.userId = data.userId;
					$scope.appId = data.appId;
/*				vm.imageUrl =
					routesConfig.wpUrl.SERVER_URL()
					+"/templates/viewImages?userId="
					+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category";*/
				    for(var i=0;i<(categories.length);i++){
                        getData(i)
                    }
                    function getData(i){

                        $http.get(routesConfig.wpUrl.SERVER_URL()+"cmd=viewImages&userId="+$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=category/"+categories[i].imageUrl).success(function(Data) {
                        image.splice(i, 0, {img:Data.imageSrc});
                        replaceByValue(categories,categories[i].imageUrl,image[i].img)
                        }).error(function(err) {
                            alert('warning', "Unable to get categories", err.message);
                        });

                    }
				});
				var image = [];



                    function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                        for( var k = 0; k < imageData.length; k++ ) {
                            if( equalImage == imageData[k].imageUrl ) {

                          //console.log('dsadsadsadasdadsad'+imageData[k].imageUrl)
                          //console.log('dsadsadsadasdadsad'+image)

                            imageData[k].imageUrl = image ;
                            console.log(imageData)
                           vm.categories  = imageData;

                            }
                        }


                    }
				//vm.categories = categories;
				console.log(vm.categories)
			}

			function goToGetCategories() {
				readMadeEasy.readFile().success(function(data){
				categoriesSvc.getCategories(data.appId)
					.then(setCategories)
					.finally(function(){
						$ionicLoading.hide();
					});
					});
			}
			$timeout(function () {
				goToGetCategories();
			}, 1000);

		}
	]);

})(window.angular);
