/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function () {
    angular.module('appEdit').service('templateService', [
        '$mdDialog', '$http', '$rootScope', 'Upload', 'SERVER_URL', 'toastr','inventoryService','appEditResource', templateService
    ]);

    function templateService($mdDialog, $http, $rootScope, Upload, SERVER_URL, inventoryService,appEditResource) {
        return {
            showTemplateDialog: function (item) {
                return $mdDialog.show({
                    controller: 'TemplateCtrl',
                    templateUrl: 'user/edit/design/changeTemplate.html',
                    clickOutsideToClose: false
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                });
            },
            updateProductImage: function (file, imageUrl, proId, appId) {
                return Upload.upload({
                    url: SERVER_URL + 'edit/updateThirdNaviImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId': proId,
                        'appId': appId

                    },
                    file: file
                });
            },
            getTemplates:function(){
                return $http.post(SERVER_URL + 'app/designApps');
            },
            createTempTemplates:function(appParams){
                return $http.post(SERVER_URL + 'app/createTempTemplates',appParams);
            },
            changeTemplatePermanent:function(appParams){
                return $http.post(SERVER_URL + 'app/changeTemplatePermanent',appParams);
            },

        };
    }
})();
