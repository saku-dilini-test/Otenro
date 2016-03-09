mobileApp.controller('detailController', function($scope, $rootScope,$http, $translate, appService, $routeParams, $filter) {
    $scope.pageClass 		= 'slideLeft';
	$scope.serviceApi		= $rootScope.serviceApi;
	$scope.GetServiceApi	= $rootScope.GetServiceApi;
	$rootScope.appTitle 	= $routeParams.title;
	$rootScope.itemID		= $routeParams.id;
	$scope.itemCount		= 1;
	$rootScope.favoritesNav = true;
	$scope.userId=$rootScope.userId;
	$scope.appId=$rootScope.appId;
	var SERVER_URL = $rootScope.SERVER_URL;


	var requestParams = {
        "token": token,
		"id": $rootScope.itemID
    };

	$http.get(SERVER_URL + '/templates/getProductById?productId='+$routeParams.id)
		.success(function(data) {
			//alert(templates);
			$scope.requestDetail = data;
			//console.log(data);
		}).error(function(err) {
			alert('warning', "Unable to get Product", err.message);
		});

	$http.get(SERVER_URL + '/templates/getCurrency?appId='+$rootScope.appId).success(function(data) {
		//alert(templates);
		$scope.requestCurrency = data.appSettings.appCurrency;
	}).error(function(err) {
		alert('warning', "Unable to get templates", err.message);
	});

	$rootScope.goFavorites  = function() {
		$rootScope.favoritesNav = false;
		$scope.appLocalStorage  = JSON.parse(localStorage.getItem('appLocalStorage'));
		
		if(localStorage.getItem('appLocalStorage')!==null){
			if($scope.countStorage != 1){
				$scope.appLocalStorage.push({
					favorites:{
						id: $scope.requestDetail[0].menu_id, 
						name: $scope.requestDetail[0].menu_name,
						category: $scope.requestDetail[0].category_name, 
						img: $scope.requestDetail[0].menu_img, 
						desc: $scope.requestDetail[0].menu_desc
					}
				});
				
				localStorage.setItem('appLocalStorage', JSON.stringify($scope.appLocalStorage));
			}
		}else{
			localStorage.setItem('appLocalStorage', JSON.stringify(
			[{favorites:
				{	id: $scope.requestDetail[0].menu_id, 
					name: $scope.requestDetail[0].menu_name,
					category: $scope.requestDetail[0].category_name, 
					img: $scope.requestDetail[0].menu_img, 
					desc: $scope.requestDetail[0].menu_desc
				}
			}]));
		}
		
		alert("Add "+$scope.requestDetail[0].menu_name+" to Favorites");
	};
	
	$scope.qtyPlus  = function() {	
		$scope.itemCount++;
	};

	$scope.qtyMinus = function() {
		if($scope.itemCount > 1){
			$scope.itemCount--;
		}
	};
	
    $scope.addItem = function(orderInfo) {
		$rootScope.footerBadge = $rootScope.footerBadge + $scope.itemCount;
		$rootScope.headerSecondary = false;
		$rootScope.footerSecondary = false;
		$rootScope.detailTotal	   = false;

		$rootScope.dataCart.items.push({
			id			: orderInfo._id,
			name		: orderInfo.name,
			category	: 'undefined',
			qty			: $scope.itemCount,
			img			: 'undefined',
			disc		: 10,
			price		: orderInfo.price,
			subtotal	: (orderInfo.price*$scope.itemCount)
		});

		alert("Add ("+$scope.itemCount+"x) "+orderInfo.name+" to orders");
		window.history.back();
    }
});