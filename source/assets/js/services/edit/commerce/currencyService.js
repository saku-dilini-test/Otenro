/*
sending the selected currency to the backend
 */
(function() {
    angular.module('appEdit').service('currencyService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', currencyService
    ]);
    function currencyService($mdDialog, $http,$rootScope,Upload,SERVER_URL) {
        return {
            showCurrencyDialog: function() {
                return $mdDialog.show({
                    controller: 'currencyCtrl',
                    templateUrl: 'user/edit/commerce/Currency/currencyView.html',
                    clickOutsideToClose: true
                }).then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            setCurrency: function(reqParams){
                return $http.post(SERVER_URL + 'edit/setCurrency',reqParams);
            },
            getCurrency: function(){
                return $http.get(SERVER_URL + 'edit/getCurrency?appId='+$rootScope.appId);
            },
            getAllCurrency: function(){
                return $http.get(SERVER_URL + 'edit/getAllCurrency');
            },
        };
    }
})();