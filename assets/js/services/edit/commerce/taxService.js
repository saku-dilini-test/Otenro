/**
 * Created by amila on 7/21/16.
 */

(function() {
    angular.module('appEdit').service('taxService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL', taxService
    ]);

    function taxService($mdDialog, $http, $rootScope, SERVER_URL) {

        return {

            showTaxesDialog: function () {
                return $mdDialog.show({
                    controller: 'taxCtrl',
                    templateUrl: 'user/edit/commerce/manageTaxesView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: null
                    }
                }).then(function (answer) {
                });
            },
            showAddTaxOptionDialog: function (initialData) {
                return $mdDialog.show({
                    controller: 'taxCtrl',
                    templateUrl: 'user/edit/commerce/addTaxOptionView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: initialData
                    }
                }).then(function (answer) {
                });
            },
            showUpdateTaxOptionDialog: function (initialData) {
                return $mdDialog.show({
                    controller: 'taxCtrl',
                    templateUrl: 'user/edit/commerce/addTaxOptionView.html',
                    clickOutsideToClose: true,
                    locals: {
                        initialData: initialData
                    }
                }).then(function (answer) {
                });
            },
            getTaxInfo : function(){
                return $http.get(SERVER_URL+ 'edit/getTaxInfo?appId='+$rootScope.appId);
            },
            // Both update and create
            updateTaxInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/updateTaxInfo',data);
            },
            deleteTaxInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteTaxInfo',data);
            }
        }

    }

})();