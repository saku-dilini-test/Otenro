(function() {
    'use strict';
    angular.module("appEdit").controller("CategoryMaintenaceCtrl", ['oblMenuService','$scope', '$mdDialog', '$rootScope',
        'mainMenuService','$http','commerceService','toastr','mySharedService','SERVER_URL','ME_APP_SERVER','$auth'
        ,'dashboardService','articleService','initialData','$log','$filter','categoryMaintenanceService', CategoryMaintenaceCtrl]);

    function CategoryMaintenaceCtrl(oblMenuService,$scope, $mdDialog, $rootScope, mainMenuService,$http,commerceService,toastr,
                          mySharedService,SERVER_URL,ME_APP_SERVER,$auth,dashboardService,articleService,initialData,$log,$filter,categoryMaintenanceService) {

        //initial data
        dashboardService.getApplicationData($rootScope.appId)
            .success(function (data) {
                $scope.templateCategory = data.templateCategory;
                categoryMaintenanceService.getCategoryList()
                    .success(function (secondNaviList) {
                        $scope.menuItems = secondNaviList;

                    }).error(function (error) {
                    toastr.error('Menu Loading Error', 'Warning', {closeButton: true});
                });
            }).error(function (err) {
            toastr.error(err.message, 'Warning', {
                closeButton: true
            });
        });

        // Add New Category
        $scope.goToAddNewMenuItemView = function () {
            categoryMaintenanceService.showAddOrEditCategoryDialog();
        };

        // Add New node
        $scope.goToAddNewNode = function (id) {
            categoryMaintenanceService.showAddOrEditCategoryNodeDialog(id);
        };


        // Delete Categories
        $scope.deleteNodes = function(node){
            var data = {
               data:node
            }
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                            categoryMaintenanceService.deleteNodes(data).success(function(data) {
                                if(data === 'ok'){
                                    toastr.success('Deleted all the related categories and products', 'Deleted!', {
                                        closeButton: true
                                    });
                                }
                                var urlPath;

                                if($rootScope.tempNew == 'true'){
                                    urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                        +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                    $scope.appTemplateUrl = urlPath +
                                        'src'+new Date().getTime();
                                }else{
                                    urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                        +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                    $scope.appTemplateUrl = urlPath+'' +
                                        '#/app/update?'+new Date().getTime();
                                }

                                $scope.appTemplateUrl = urlPath+'' +
                                    '#/app/update?'+new Date().getTime();
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                return categoryMaintenanceService.showCategoryMaintenanceDialog();
                            }).error(function(err) {
                                $mdDialog.hide();
                            });
                    },
                    this.cancel = function click(){
                        $mdDialog.hide();
                        return categoryMaintenanceService.showCategoryMaintenanceDialog();
                    }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting category</h1>' +
                '</div>'+
                '<br>'+
                '<div style="text-align:center">' +
                '<lable>Are you sure, you want to delete the selected Category?</lable>' +
                '<div>Note: It will delete all the related child categories and relevent products</div>' +
                '</div>' +
                '<br>' +
                '<br>' +
                '<div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">NO</md-button>'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">YES</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })
        };

        // Edit Menu
        $scope.goToEditMenuItemView = function (data) {
            categoryMaintenanceService.showAddOrEditCategoryDialog(data);
        };

        $scope.clearDefaultData = function () {
            commerceService.showRemoveDefaultDataDialog("remove");
        }

        $scope.cancel = function() {
            $mdDialog.hide();
        };

    }
})();
