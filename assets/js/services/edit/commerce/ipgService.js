
(function() {
    angular.module('appEdit').service('ipgService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL', ipgService
    ]);

    function ipgService ($mdDialog, $http, $rootScope, SERVER_URL) {

        return {

            showIPGDialog: function () {
                return $mdDialog.show({
                    controller: 'ipgCtrl',
                    templateUrl: 'user/edit/commerce/manageIPGIntegrationView.html',
                    clickOutsideToClose: true
                }).then(function (answer) {
                });
            },
            getIPGInfo : function(){
                return $http.get(SERVER_URL+ 'edit/getIPGInfo?appId='+$rootScope.appId);
            },
            // Both update and create
            updateIPGInfo : function(data){
                return $http.post(SERVER_URL+ 'edit/updateIPGInfo',data);
            }
        }

    }

})();