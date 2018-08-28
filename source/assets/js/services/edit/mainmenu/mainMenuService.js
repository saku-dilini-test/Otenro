/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('mainMenuService', [
        '$mdDialog', '$http', 'SERVER_URL','$q','$rootScope','toastr','Upload', mainMenuService
    ]);

    function mainMenuService($mdDialog, $http, SERVER_URL,$q,$rootScope,toastr,Upload) {
        return {
            
            

            showMainMenuDialog: function() {
                return $mdDialog.show({
                    controller: 'MainMenuCtrl',
                    templateUrl: 'user/edit/mainmenu/mainMenuManView.html',
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

            showSubChildDialog: function(subChild) {
                return $mdDialog.show({
                    controller: 'EditSubChildCtrl',
                    templateUrl: 'user/edit/mainmenu/editSubChild.html',
                    clickOutsideToClose: true,
                    locals : {
                        subChild : subChild
                    }
                }).then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },

            showSubChildImageDialog: function(imageUrl,subChild){
                return $mdDialog.show({
                    controller: 'EditSubChildImageCtrl',
                    templateUrl: 'user/edit/mainmenu/editSubChildImage.html',
                    clickOutsideToClose: true,
                    locals : {
                        imageUrl : imageUrl,
                        subChild : subChild
                    }
                }).then(function(answer) {

                });
            },

            showChildDialog: function(child){
                return $mdDialog.show({
                    controller: 'EditChildCtrl',
                    templateUrl: 'user/edit/mainmenu/editChild.html',
                    clickOutsideToClose: true,
                    locals : {
                        child : child
                    }
                }).then(function(answer) {

                },function() {

                });

            },
            showEditMenuNavigationDialog: function(data,id, productItem){
                return $mdDialog.show({
                    controller: 'MainMenuCtrl',
                    templateUrl: 'user/edit/mainmenu/editMenuNavigation.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : {
                            menu : data,
                            templateCategory : id,
                            prodItem: productItem == null ? null : productItem
                        }
                    }
                }).then(function(answer) {

                },function() {

                });
            },
            showEditMenuCategoryDialog: function(data,id,from){
                return $mdDialog.show({
                    controller: 'MainMenuCtrl',
                    templateUrl: 'user/edit/mainmenu/editMenuCategory.html',
                    clickOutsideToClose: true,
                    locals : {
                        initialData : {
                            menu : data,
                            templateCategory : id,
                            from: from
                        }
                    }
                }).then(function(answer) {

                },function() {

                });
            },

            showChildImageDialog: function(imageUrl,child){
                return $mdDialog.show({
                    controller: 'EditChildImageCtrl',
                    templateUrl: 'user/edit/mainmenu/editChildImage.html',
                    clickOutsideToClose: true,
                    locals : {
                        imageUrl : imageUrl,
                        child : child
                    }
                }).then(function(answer) {

                }, function() {

                });

            },
            //editStyles: function(fontData) {
            //    return $http.post(SERVER_URL + 'edit/addStyles', fontData);
            //},
            //checkMainMenu: function(Data) {
            //    return $http.post(SERVER_URL + 'api/templateNavigationEdit/checkMainMenu', Data);
            //},
            //deleteMainMenu: function(Data) {
            //    return $http.post(SERVER_URL + 'api/templateNavigationEdit/deleteMainMenu', Data);
            //},
            saveMainMenu: function(Data) {
                return $http.post(SERVER_URL + 'edit/saveMainMenu', Data);
            },
            getCategory: function(Data){
                return $http.post(SERVER_URL+ 'edit/specificSecondNavi?appId='+$rootScope.appId,Data);
            },
            getProduct: function(Data){
                return $http.post(SERVER_URL+ 'edit/specificThirdNavi?appId='+$rootScope.appId,Data);
            },

            addMenu: function(Data){

                return $http.post(SERVER_URL+ 'edit/addNewMenu',Data);

            },
            addNewCategory:function(appCategory){
                return $http.post(SERVER_URL+ 'edit/addNewCategory',appCategory);
            },
            addChild: function(Data){
                return $http.post(SERVER_URL+ 'edit/addChildMenu',Data);
            },
            addSubChild: function(Data){
                return $http.post(SERVER_URL+ 'edit/addSubChild',Data);
            },
            deleteData : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteItem',data);
            },
            deleteCategories : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteCategories',data);
            },            
            updateSecondNavi : function(data) {
                return $http.post(SERVER_URL+ 'edit/updateSecondNavi',data);
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
        };
    }
})();



