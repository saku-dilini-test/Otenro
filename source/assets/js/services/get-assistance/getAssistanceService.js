/**
 * Created by Shashan on 06/11/2017.
 */

(function() {
    angular.module('appEdit').service('getAssistanceService', [
        '$mdDialog','$http','SERVER_URL', getAssistanceService
    ]);

    function getAssistanceService($mdDialog,$http,SERVER_URL) {
        return {
            showGetAssistanceDialog: function() {
                return $mdDialog.show({
                    controller: 'GetAssistanceCtrl',
                    templateUrl: 'user/get-assistance/get-assistance.html',
                    clickOutsideToClose: true
                }).then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            sendGetAssistance: function(data) {
                return $http.post(SERVER_URL + 'edit/sendGetAssistance', data);
            },

            getTemplatesNameByID:function(data){
                return $http.post(SERVER_URL + 'edit/getTemplateNameByID',data);
            },
        };
    }
})();



