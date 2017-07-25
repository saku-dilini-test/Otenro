

mobileApp.controller('pickupCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants, $stateParams,$log) {

    $scope.$emit('hideMenu',{});
    var pickup = {};

    $log.debug($stateParams.item);
    $http.get(constants.SERVER_URL + "/edit/getShippingPickupInfo?appId="+$rootScope.appId)
        .success(function (data) {

                $scope.pickup=data;
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
            $scope.gotoCartPayment = function(){
                        $state.go('tab.cardPayment',{
                            pickupId:$scope.pickup.opt,
                            item:$stateParams.item,
                            deliverDetails:$stateParams.deliverDetails,
                            amount:$stateParams.amount
                        });
                    };

    $scope.checkout = function(){
        $scope.pickupData  = {item:$stateParams.item,
            delivery:{location : "Pick up",method:"Pick up"},
            deliverDetails :$stateParams.deliverDetails ,
            pickupId :$scope.pickup.opt
        }
        $state.go('app.checkout',{item: $scope.pickupData});
    };
});
