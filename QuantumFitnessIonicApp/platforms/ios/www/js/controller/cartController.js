/**
 * Created by amila on 4/5/16.
 */

mobileApp.controller('cartCtrl', function($scope,$rootScope,$http,$state,$stateParams,$ionicPopup,constants,PaypalService,$log,$ionicNavBarDelegate,$location,$timeout,$ionicLoading) {

    $scope.country  = "Sri Lanka";
    $scope.pickupOptionEnable = false;
    $scope.shippingOptionaEnable = false;


     var param = {
        'appId':$scope.appId,
        'country': $scope.country
    };
     $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
    });
    $http.post(constants.SERVER_URL + "/edit/getShippingInfoByCountry",param)
        .success(function (data) {
                $scope.shippingData=data;
                if ($scope.shippingData.length >0){
                    $scope.shippingOptionaEnable =true;
                }
                $log.debug($scope.shippingData);
                for(var i = 0; i < $scope.shippingData.length; i++){
                    if($scope.shippingData[i].shippingOption == "Pick up"){
                        $scope.shippingData.splice([i],1);
                    }
                }
                 $ionicLoading.hide();
    },function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
    });



    var pickup = {};

    $http.get(constants.SERVER_URL + "/edit/getShippingPickupInfo?appId="+$rootScope.appId)
        .success(function (data) {

                $scope.pickup=data;
                if ($scope.pickup.length >0){
                   $scope.pickupOptionEnable = true;
                }
               /* $scope.header = data.header;
                $scope.content = data.content;*/
                //$state.go('app.category');
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
    });


    $scope.details = {};
    $scope.$emit('hideMenu',{});
    $scope.userId=$rootScope.userId;
    $scope.appId=$rootScope.appId;
     $scope.isDisable=true;
     $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
    if($scope.user){
       $scope.isDisable=false;
    }else {
         $scope.isDisable=true;
    }

       var path = $location.path();
       if (path.indexOf('app/cart') != -1){
         $ionicNavBarDelegate.showBackButton(false);
       }
       else{
         $ionicNavBarDelegate.showBackButton(true);
       }
       $scope.$on('$stateChangeStart', function () {
          $ionicNavBarDelegate.showBackButton(true);
        });

       $scope.doSomething = function(){
            $state.go('app.category');
       }

    $scope.buttonDisable = function(qty,totalQty,index){

        // Parsing index, changed quantity and the state shows whether value changed
        $rootScope.parseIndex = index;
        $rootScope.parseEnable = true;
        $rootScope.parseQty = qty;
        $rootScope.cart.cartItems[index].totWeight = $rootScope.cart.cartItems[index].weight *$rootScope.parseQty;
        //----------------------------------------------------------------------
        if(qty > totalQty && totalQty > 1){
              $scope.buyButtonDisable = true;
        }else{
              $scope.buyButtonDisable = false;
        }
    }

    $http.get(constants.SERVER_URL+"/edit/getAllCountry")
        .then(function(res){
            var countries = [{"countryCode":"LK","countryName":"Sri Lanka"}]
/*            alert("res.data " + JSON.stringify(countries))*/
            $scope.details.country =  "Sri Lanka";
        });

     $scope.imageURL = constants.SERVER_URL
            +"/templates/viewImages?userId="
            +$scope.userId+"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=thirdNavi";



    $scope.cartItems = $rootScope.cart.cartItems;
    $scope.hide = true;
    $http.get(constants.SERVER_URL + '/edit/getTaxInfo?appId='+$rootScope.appId).success(function(data) {
        if(data == ''){
            $scope.hide = true;
            $scope.tax = 0;
        }else{
            $scope.tax = data[0].taxAmount;
            $scope.hide = false;
        }
    })

     $scope.login=function(){
      $scope.status = 'delivery'
      $state.go('app.login',{item:$scope.status});

     };



    $scope.getTotal = function(){
        var total = 0;
        var amount = 0;
        var tax = 0;
        var quantity = 0;
        for(var i = 0; i < $scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            amount = product.total;
            total += (amount*product.qty);
            quantity += product.qty;
        }
        $rootScope.cart.totalQuantity = quantity;
        tax = total * $scope.tax/100;
        $scope.taxTotal = total * $scope.tax/100;
        if(tax > 0){
            //total = total + tax;
            $rootScope.cart.totalPrice = total;
            return total;
        }else{
            $rootScope.cart.totalPrice = total;
            return total;
        }
    };

    $scope.getTotalQuantity = function(){
        var quantity = 0;
        for(var i =0; i<$scope.cartItems.length; i++){
            var product = $scope.cartItems[i];
            quantity += product.qty;
        }
        $rootScope.cart.totalQuantity = quantity;
        return quantity;
    };

    $scope.removeItem = function(index){
        $scope.cartItems.splice(index, 1);
        $rootScope.parseIndex = $rootScope.parseIndex -1;
        $rootScope.cart.cartSize = $rootScope.cart.cartItems.length;
        $rootScope.parentobj.cartSize = $rootScope.cart.cartSize;
        localStorage.setItem("cart",JSON.stringify($rootScope.cart)) ;

    };

    $scope.delivery = function(deliverItems){


         $state.go('app.deliverDetails',{item:deliverItems});

        /*if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId)!==null){
            $state.go('app.deliverDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'delivery'
            $state.go('app.login',{item:$scope.status});
        }*/
    }
    $scope.pickupDetails = function (deliverItems) {

         $state.go('app.pickupDetails',{item:deliverItems});
        /*if(localStorage.getItem('appLocalStorageUser'+$rootScope.appId)!==null){
            $state.go('app.pickupDetails',{item:deliverItems});
        }
        else{
            $scope.status = 'pickUp'
            $state.go('app.login',{item:$scope.status});
        }*/
    }
    $scope.pickUp = function (details) {
        $state.go('app.pickup',{
            item:$stateParams.item,
            deliverDetails:details,
            amount: $scope.amount
        });
    };

    //get the currency
    $http.get(constants.SERVER_URL + '/templates/getCurrency?appId='+$scope.appId).success(function(data) {
        $scope.currency_ = data.sign;
    }).error(function(err) {
        alert('warning', "Unable to get Products Selected Category", err.message);
    });

    //get the user's registered address
    $scope.user = angular.fromJson(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));


    // get the shipping options
    $http.get(constants.SERVER_URL + "/edit/getShippingInfo?appId="+$rootScope.appId)
        .success(function (data) {
                $scope.shippingData=data;
            },
            function (err) {
                $ionicPopup.alert({
                    title: 'Policies Data loading error!',
                    template: 'Please check your connection!'
                });
            });


    $scope.amount = $scope.getTotal();
    $scope.deliver = function(deliverDetails){

        if(typeof deliverDetails.country == 'undefined'){
            var localData = JSON.parse(localStorage.getItem('appLocalStorageUser'+$rootScope.appId));
            deliverDetails.name = localData.name;
            deliverDetails.streetNumber = localData.streetNumber;
            deliverDetails.streetName = localData.streetName;
            deliverDetails.country = localData.country;
            deliverDetails.city = localData.city;
            deliverDetails.zip = localData.zip;
            deliverDetails.phone = localData.phone;


        }
        $log.debug(deliverDetails);
        deliverDetails.method = 'Delivery';
        $state.go('app.shipping',{item:deliverDetails});
    }

});
