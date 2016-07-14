/**
 * Created by amila on 7/14/16.
 */

(function() {
    angular.module('appEdit').service('shippingService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL', shippingService
    ]);

    function shippingService($mdDialog, $http, $rootScope, SERVER_URL) {

        return {
            showShippingDialog: function () {
                return $mdDialog.show({
                    controller: 'ShippingCtrl',
                    templateUrl: 'user/edit/commerce/manageShippingView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: null
                    }
                }).then(function (answer) {
                });
            },
            showAddShippingOptionDialog: function (initialData) {
                return $mdDialog.show({
                    controller: 'ShippingCtrl',
                    templateUrl: 'user/edit/commerce/addShippingOptionView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: initialData
                    }
                }).then(function (answer) {
                }, function () {
                });
            },
            showUpdateShippingOptionDialog: function (initialData) {
                return $mdDialog.show({
                    controller: 'ShippingCtrl',
                    templateUrl: 'user/edit/commerce/addShippingOptionView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: initialData
                    }
                }).then(function (answer) {
                }, function () {

                });
            },
            getShippingInfo : function(){
                return $http.get(SERVER_URL+ 'edit/getShippingInfo?appId='+$rootScope.appId);
            },
            // Both update and create
            updateShippingInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/updateShippingInfo',data);
            },
            deleteShippingInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteShippingInfo',data);
            }
        }

    }

})();