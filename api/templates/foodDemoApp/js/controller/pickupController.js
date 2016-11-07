

mobileApp.controller('pickupCtrl', function ($scope, $http, $rootScope,$ionicPopup, $state, constants, $stateParams) {

    $scope.$emit('hideMenu',{});

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
                        $state.go('app.cardPayment',{
                            pickupId:$scope.pickup.opt,
                            item:$stateParams.item,
                            deliverDetails:$stateParams.deliverDetails,
                            amount:$stateParams.amount
                        });
                    };
});
