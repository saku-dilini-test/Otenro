/**
 * Created by thusithz on 1/26/16.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("EditChildCtrl", [
        '$scope', '$mdDialog','$rootScope','child','mainMenuService','commerceService','$auth','SERVER_URL',
        EditChildCtrl]);

    function EditChildCtrl($scope, $mdDialog,$rootScope,child,mainMenuService,commerceService,$auth,SERVER_URL) {

        $scope.child=child;
        $scope.imageURL= SERVER_URL+
            "edit/viewImages?userId="+$auth.getPayload().id
            +"&appId="+$rootScope.appId+"&"
            +new Date().getTime();

        commerceService.getMainMenuList()
            .success(function (result) {
                $scope.mainMenus = result;
            }).error(function (error) {
                alert("MainMenu Loading Error : " + error);
            });

        $scope.editChildImage=function(imageUrl,child){
            return mainMenuService.showChildImageDialog(imageUrl,child);
        };

        $scope.updateChild=function(){

            commerceService.updateCategoryList(child)
                .success(function() {
                    alert("success", 'Awsome! ', 'Category has been successfully Updated');
                      return mainMenuService.showMainMenuDialog();
                }).error(function(err) {
                    alert('warning', "Update Failed ");
                })

        };


        $scope.cancelChild=function(){
            return mainMenuService.showMainMenuDialog();
        };
        $scope.childFinish=function(){
            return mainMenuService.showMainMenuDialog();
        };

    }
})();

