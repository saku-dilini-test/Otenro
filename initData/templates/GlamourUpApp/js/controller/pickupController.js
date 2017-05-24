

mobileApp.controller('pickupCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants, $stateParams) {

    $scope.$emit('hideMenu',{});
    var pickup = {};

    $http.get(constants.server_url + "cmd=getShippingPickupInfo&appId="+$rootScope.appId)
        .success(function (res) {

                $scope.pickup=res.data;
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
                        $state.go('app.cardPayment',{
                            pickupId:$scope.pickup.opt,
                            item:$stateParams.item,
                            deliverDetails:$stateParams.deliverDetails,
                            amount:$stateParams.amount
                        });
                    };

                    $scope.checkout = function(pickup){

                        pickup.item = $stateParams.item;
                        pickup.delivery = {
                            location : "Pick up"
                        };
                        pickup.deliverDetails = $stateParams.deliverDetails;
                        pickup.pickupId = $scope.pickup.opt;
                        $state.go('app.checkout',{item:pickup});
                    };
});
