/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('categoryMaintenanceService', [
        '$mdDialog', '$http', 'SERVER_URL','$rootScope','Upload', categoryMaintenanceService
    ]);

    function categoryMaintenanceService($mdDialog, $http, SERVER_URL,$rootScope,Upload) {
        return {

            showCategoryMaintenanceDialog: function() {
                return $mdDialog.show({
                    controller: 'CategoryMaintenaceCtrl',
                    templateUrl: 'user/edit/mainmenu/categoryMaintenance.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : null
                    }
                }).then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            showAddOrEditCategoryDialog: function(data){
                return $mdDialog.show({
                    controller: 'addCatToMaintenanaceCtrl',
                    templateUrl: 'user/edit/mainmenu/addNewCategoryToMaintenance.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : {
                            menu: data
                        }
                    }
                }).then(function(answer) {

                },function() {

                });
            },

            showAddOrEditCategoryNodeDialog: function(parentId){
                    return $mdDialog.show({
                        controller: 'addCatToMaintenanaceCtrl',
                        templateUrl: 'user/edit/mainmenu/addNewCategoryToMaintenance.html',
                        clickOutsideToClose: true,
                        locals : {
                            initialData : {
                                parentId: parentId
                            }
                        }
                    }).then(function(answer) {

                    },function() {
                });
            },

            saveAddedCategory: function(file,appId,name,parentId,isNew){
                var dataURItoBlob = function(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for(var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');
                return Upload.upload({
                    url: SERVER_URL + 'edit/addNewCategoryToMaintenance',
                    fields: {
                        'appId' : appId,
                        'name' : name,
                        'parentId' : parentId,
                        'isNew' :isNew
                    },
                    file: UploadFile
                });
            },
            /**
             * Get Application data from server
             * @param {String} appId
             * */
            getApplicationData : function (appId) {
                return $http.get( SERVER_URL + 'edit/getApplicationData?appId=' + appId );
            },
            /**
             * Get Template data from server
             * @param {String} templateId
             * */
            getTemplateData : function (templateId) {
                return $http.get( SERVER_URL + 'templates/getTemplateData?templateId=' + templateId );
            },
            getCategoryList: function () {
                return $http.get(SERVER_URL + 'edit/getCategoryListCommerce?appId=' + $rootScope.appId);
            },
            getAllCategoryWithoutMakingCommerce: function (appId) {
                return $http.get(SERVER_URL + 'edit/getAllCategoryWithoutMakingCommerce?appId='+ appId);
            },
            deleteNodes : function(id){
                return $http.post(SERVER_URL+ 'edit/deleteNodes',id);
            },
            updateCategory: function (file, imageUrl, catId, appId, name, isNew) {
                var dataURItoBlob = function(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for(var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');

                return Upload.upload({
                    url: SERVER_URL + 'edit/updateCategory',
                    fields: {
                        'imageUrl': imageUrl,
                        'categoryId': catId,
                        'appId': appId,
                        'name' : name,
                        'isNew' : isNew
                    },
                    file: UploadFile
                });
            },
            updateCategoryName : function (data) {
                 return $http.post( SERVER_URL + 'edit/updateCategoryName', data );
            },
            updateNonFeaturedCategoryLabel: function (data) {
                return $http.post(SERVER_URL + 'edit/commerce/updateFeaturedDropdownLabel', data);
            },
            getAppHeaderData: function (appId) {
                return $http.get(SERVER_URL + 'edit/commerce/getAppHeaderData?appId=' + appId);
            }
        };
    }
})();



