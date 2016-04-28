mobileApp.controller('cartController', function($scope, $rootScope, $translate, $window, appService, $location) {
	$scope.pageClass 			= 'slideLeft';
	$scope.serviceApi			= serviceApi;
	$scope.GetServiceApi		= GetServiceApi;
	$rootScope.appTitle 		= $translate.instant('load.cart.Title');
	$rootScope.footerCheckout	= false;
	$scope.saved 				= localStorage.getItem('appLocalStorageUser');
	$scope.appLocalStorageUser 	= JSON.parse($scope.saved);

	if($location.path() == '/provideDetail'){
		$rootScope.appTitle  	= $translate.instant('load.cart.ProvideDetail');
	}

	if(localStorage.getItem('appLocalStorageUser')!==null){
		$scope.link				= '#provideDetail';
	}else{
		$scope.link				= '#login';
	}

	$scope.btnCheckout = function() {
		$rootScope.footerCheckout	= true;
	}

	$scope.randomNumberRange = function (min, max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	$scope.randomNumberLen = function (len){
		var d 		= new Date();
		var number 	= d.getMilliseconds().toString();
		for(var i=0;i<len;i++)
		{
			number += $scope.randomNumberRange(0,9);
		}
		return number;
	}

	// Shipping Value 100 and Tax 0.1
	$scope.shipping = 100;
	$scope.tax = 0.1;

	$scope.actItem = function(index,qt) {
		$scope.popup 	      = true;
		$scope.popupIndex     = index;
		$scope.popupTitle     = name;
		$scope.popupQty		  = qt;
	}

	$scope.actItemUpdate = function(index) {
		$rootScope.footerBadge = $rootScope.footerBadge - $rootScope.dataCart.items[index].qty + $scope.popupQty;
		$rootScope.dataCart.items[index].qty = $scope.popupQty;
		$scope.popup = false;
	}

	$scope.ItemDelete = function(index) {
		$rootScope.footerBadge = $rootScope.footerBadge - $rootScope.dataCart.items[index].qty;
		$scope.popup = false;
		$rootScope.dataCart.items.splice(index, 1);
	}

	$scope.ItemCheckout = function() {
		$scope.appLocalStorage  = JSON.parse(localStorage.getItem('appLocalStorage'));

		if($scope.subTotal()!=0){

			var requestParams = {
				OrdersID: $scope.randomNumberLen(8),
				OrdersDate: new Date().getTime(),
				OrdersTotal: $scope.subTotal()+(($scope.subTotal()*$scope.tax)/100)+$scope.shipping,
				ordersToName: $scope.appLocalStorageUser.name,
				ordersToEmail: $scope.appLocalStorageUser.email,
				ordersToTelp: $scope.appLocalStorageUser.phone,
				ordersToAddress: $scope.appLocalStorageUser.address,
				ordersToStatus: 'Orders',
				ordersToStreet: $scope.appLocalStorageUser.street,
				ordersToTax: $rootScope.tax,
				ordersToTaxTotal: ($scope.subTotal()*$scope.tax/100),
				ordersToSubTotal: $scope.subTotal(),
				ordersToDeliveryFee: $scope.shipping,
				ordersToNote: $scope.notes
			};

			if(localStorage.getItem('appLocalStorage')!==null){
				$scope.appLocalStorage.push({
					orders:{
						OrdersID: $scope.randomNumberLen(8),
						OrdersDate: new Date().getTime(),
						OrdersTotal: $scope.subTotal()+(($scope.subTotal()*$scope.tax)/100)+$scope.shipping,
						ordersToName: $scope.appLocalStorageUser.name,
						ordersToEmail: $scope.appLocalStorageUser.email,
						ordersToTelp: $scope.appLocalStorageUser.phone,
						ordersToAddress: $scope.appLocalStorageUser.address,
						ordersToStreet: $scope.appLocalStorageUser.street
					}
				});

				localStorage.setItem('appLocalStorage', JSON.stringify($scope.appLocalStorage));
			}else{
				localStorage.setItem('appLocalStorage', JSON.stringify(
					[{orders:
					{
						OrdersID: $scope.randomNumberLen(8),
						OrdersDate: new Date().getTime(),
						OrdersTotal: $scope.subTotal()+(($scope.subTotal()*$scope.tax)/100)+$scope.shipping,
						ordersToName: $scope.appLocalStorageUser.name,
						ordersToEmail: $scope.appLocalStorageUser.email,
						ordersToTelp: $scope.appLocalStorageUser.phone,
						ordersToAddress: $scope.appLocalStorageUser.address,
						ordersToStreet: $scope.appLocalStorageUser.street
					}
					}]));
			}

			requestParams.appId = $rootScope.appId;
			requestParams.cart = JSON.stringify($rootScope.dataCart.items);

			appService.HttpRequest('POST',GetServiceApi+'edit/checkout', requestParams).success(function(data) {
				alert($translate.instant('load.cart.alertOrders'));
				$location.path('/orders');
				$rootScope.dataCart.items 	= [];
				$rootScope.footerBadge 		= 0;
			});


		}else{
			alert($translate.instant('load.cart.alertNotItems'));
			$location.path('/cart');
		}
	}

	$scope.subTotal = function() {
		var total = 0;
		angular.forEach($rootScope.dataCart.items, function(item) {
			total += (item.price*item.qty)-((item.price*item.qty)*item.disc/100);
		})
		return total;
	}
});