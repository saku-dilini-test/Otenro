/**
 * Items controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('CategoryController', [
		'$q',
		'$stateParams',
		'itemsService',
		'categoriesService',
		'$scope',
		'$rootScope',
		'appConfig',
		'routesConfig',
		'$http',
		function ($q, $stateParams, itemsSvc, categoriesSvc, $scope, $rootScope, appConfig,routesConfig,$http) {
			'use strict';

			var vm = this;
			vm.noMoreItemsAvailable = false;


			vm.items = [];
			vm.loadData = loadData;

		/*	vm.imageUrl =
				routesConfig.wpUrl.SERVER_URL()
				+"cmd=viewImages&userId="
				+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=article";*/

			function loadData() {
				//itemsSvc.getItems({
				//	'filters': {'cat': parseInt($stateParams.categoryId, 10)},
				//	'params': {'offset': vm.items.length, 'per_page': appConfig.maxItemsPaging}
				//}).then(setItems);
				itemsSvc.getItems($stateParams.categoryId).then(setItems);
			}

			categoriesSvc.getCategory($stateParams.categoryId).then(setCategory);


			function setCategory(response) {
				console.log(response)
				$http.get(routesConfig.wpUrl.SERVER_URL()+"cmd=viewImages&userId="+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=category/"+response.imageUrl).success(function(Data) {
                        response.imageUrl = Data.imageSrc;
                        console.log(response)
                        vm.category = response;
                    }).error(function(err) {
                        alert('warning', "Unable to get categories", err.message);
                    });


			}

			function setItems(response) {
				console.log(response)
				var image = [];
				for(var i=0;i<response.length;i++){
					getData(i);
				}

				function getData(i){

					console.log(response[i].imageUrl)

				$http.get(routesConfig.wpUrl.SERVER_URL()+"cmd=viewImages&userId="+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=article/"+response[i].imageUrl).success(function(Data) {
                    //response.imageUrl = Data.imageSrc;
                    image.splice(i, 0, {img:Data.imageSrc});
                    replaceByValue(response,response[i].imageUrl,image[i].img)


                }).error(function(err) {
                    alert('warning', "Unable to get categories", err.message);
                });

                console.log(response)

                function replaceByValue(imageData,equalImage,image) {
                        //console.log(imageData[0].imageUrl)

                        //console.log(image)

                    for( var k = 0; k < imageData.length; k++ ) {
                        if( equalImage == imageData[k].imageUrl ) {

                            imageData[k].imageUrl = image ;
                            $scope.imageData = imageData;

                        }

                   	}
                   	         response = $scope.imageData
                            vm.noMoreItemsAvailable = true;



                	if (response.length === 0) {
						vm.noMoreItemsAvailable = true;
					} else {
						vm.items = vm.items.concat(response);

						//vm.items = response;
						vm.noMoreItemsAvailable = true;
					}


				console.log(response)
                }

				$scope.$broadcast('scroll.infiniteScrollComplete');
            }


			}
		}
	]);

})(window.angular);
