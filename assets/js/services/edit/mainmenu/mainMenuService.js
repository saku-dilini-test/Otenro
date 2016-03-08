/**
 * Created by udeshikaperera on 26/08/2015.
 */
(function() {
    angular.module('appEdit').service('mainMenuService', [
        '$mdDialog', '$http', 'SERVER_URL','$q','$rootScope','toastr', mainMenuService
    ]);

    function mainMenuService($mdDialog, $http, SERVER_URL,$q,$rootScope,toastr) {
        return {

            showMainMenuDialog: function() {
                return $mdDialog.show({
                    controller: 'MainMenuCtrl',
                    templateUrl: 'user/edit/mainmenu/mainMenuManView.html',
                    clickOutsideToClose: true
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

                }).error(function (error) {
                        toastr.error('Cant Load :', 'Error', {
                            closeButton: true
                        });
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

                }, function() {

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
            addChild: function(Data){
                return $http.post(SERVER_URL+ 'edit/addChildMenu',Data);
            },
            addSubChild: function(Data){
                return $http.post(SERVER_URL+ 'edit/addSubChild',Data);
            },
            deleteData : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteItem',data);
            }

        };
    }
})();



