/**
 * Items controller
 */
(function(angular, undefined) {
angular
	.module('invisionApp')

	.controller('ItemsController', [
		'$q',
		'$stateParams',
		'itemsService',
		'categoriesService',
		'commentsService',
		'$ionicLoading',
		'sharedObjects',
		'routesConfig',
		'$rootScope',
		function ($q, $stateParams, itemsSvc, categoriesSvc, commentsSvc, $ionicLoading,
				  sharedObjects, routesConfig, $rootScope) {
			'use strict';

			var vm = this;
            vm.sliderOptions = {
                  initialSlide: 0,
                  direction: 'horizontal', //or vertical
                  speed: 300 //0.3s transition
                };
            vm.sliderDelegate = null;

			vm.imageUrl =
				routesConfig.wpUrl.SERVER_URL()
				+"/templates/viewImages?userId="
				+$rootScope.userId+"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=article";

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});


			itemsSvc.getItemById($stateParams.itemId)
				.then(setItems)
				.then(getCategory)
				.then(setCategory)
				.then(setShare)
				.finally(function(){
					$ionicLoading.hide();
				});

			function setItems(response) {
				vm.item = response;
				return response;
			}

			function getCategory(response) {
				return categoriesSvc.getCategory(response.categoryId)
			}

			function setCategory(response) {
				vm.category = response;
			}

			function setShare() {
				vm.share = {
					'networks': ['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
					'message': vm.item.title,
					'subject': vm.category.name,
					'file': vm.item.img,
					'link': vm.item.link,
					'toArr': ['info@surfit.mobi'],
					'bccArr': [],
					'ccArr': [],
					'phone': '098765432'
				};
			}

		}
	]);

})(window.angular);
