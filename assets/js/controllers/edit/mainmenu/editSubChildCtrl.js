/**
 * Created by thusithz on 1/26/16.
 */

/**
 * Created by thusithz on 1/26/16.
 */
(function() {
    'use strict';
    angular.module("appEdit").controller("EditSubChildCtrl", [
        '$scope', '$mdDialog','$rootScope','subChild','mainMenuService','commerceService','$auth','SERVER_URL',
        EditSubChildCtrl]);

    function EditSubChildCtrl($scope, $mdDialog,$rootScope,subChild,mainMenuService,commerceService,$auth,SERVER_URL) {

        $scope.subChild=subChild;
        $scope.imageURL= SERVER_URL+
            "edit/viewImages?userId="+$auth.getPayload().id
            +"&appId="+$rootScope.appId+"&"
            +new Date().getTime();

        commerceService.getCategoryList()
            .success(function (result) {
                $scope.childs = result;
            }).error(function (error) {
                alert("Category Loading Error : " + error);
            });

        $scope.editSubChildImage=function(imageUrl,subChild){
            return mainMenuService.showSubChildImageDialog(imageUrl,subChild);
        };

        $scope.updateSubChild=function(){

            commerceService.updateProductList(subChild)
                .success(function() {
                    alert("success", 'Category has been successfully Updated');
                    return mainMenuService.showMainMenuDialog();
                }).error(function(err) {
                    alert('warning', "Update Failed ");
                })

        };

        $scope.cancelSubChild=function(){
            return mainMenuService.showMainMenuDialog();
        };
        $scope.childSubFinish=function(){
            return mainMenuService.showMainMenuDialog();
        };

    }
})();







