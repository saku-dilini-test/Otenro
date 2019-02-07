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
                        $scope.createFeaturedCategoryArray($scope.menuItems);
                    }).error(function (error) {

                    toastr.error('Menu Loading Error', 'Warning', {closeButton: true});
                });
            }).error(function (err) {
            toastr.error(err.message, 'Warning', {
                closeButton: true
            });
        });

        // Get application header data
        categoryMaintenanceService.getAppHeaderData($rootScope.appId)
            .success(function (res) {

                if (res.status === 'SUCCESS') {

                    $scope.nonFeaturedDropdownLabel = res.data.nonFeaturedDropdownLabel;
                }
            }).error(function (err) {

            });

        // Add New Category
        $scope.goToAddNewMenuItemView = function () {
            categoryMaintenanceService.showAddOrEditCategoryDialog();
        };

        // Add New node
        $scope.goToAddNewNode = function (id, parentTreeLevel) {
            categoryMaintenanceService.showAddOrEditCategoryNodeDialog(id, parentTreeLevel);
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

        $scope.treeOptions = {

            beforeDrop: function (event) {

                if (event.source.nodesScope === event.dest.nodesScope)
                    return true;
                else
                    return false;
            },
            dragStop: function (event) {

                var socketBody = { payload: $scope.createCategoriesArrayAfterDragStop($scope.menuItems) };
                $scope.updateCategoryOrder(socketBody);
            },
            depth: function (event) {
                console.log("$$$$$$$$$$$$$$$$$$$$$$$");
                console.log("$$$$$$$$$$$$$$$$$$$$$$$");
                console.log(JSON.stringify(event, null, 2));
            }
        };

        /**
         * Responsible for moving categories upside
         * 
         * @param currentIndex {Integer} :: $index of the clicked category
         * @param isFirstElement {Boolean} :: Equals to true, if category is first element in the list else false
         * @param node :: clicked category
         * 
         **/
        $scope.moveUp = function (currentIndex, isFirstElement, node) {

            if (!isFirstElement) {

                if (!node.parentId) {

                    var updatedCategories = [];

                    var currentCategory = $scope.menuItems.splice(currentIndex, 1);
                    $scope.menuItems.splice(currentIndex - 1, 0, currentCategory[0]);

                    var associatedCategory = $scope.menuItems[currentIndex];
                    var socketBody = { payload: $scope.createUpdatedCategoriesArray(currentCategory[0], associatedCategory, currentIndex, 'MOVE_UP') };

                    $scope.updateCategoryOrder(socketBody);
                }

                if (node.parentId) {

                    function loopArr(arr) {

                        arr.forEach(function(item) {

                            if (item.id === node.parentId) {

                                var currentCategory = item.childNodes.splice(currentIndex, 1);
                                item.childNodes.splice(currentIndex - 1, 0, currentCategory[0]);

                                var associatedCategory = item.childNodes[currentIndex];
                                var socketBody = { payload: $scope.createUpdatedCategoriesArray(currentCategory[0], associatedCategory, currentIndex, 'MOVE_UP') };

                                $scope.updateCategoryOrder(socketBody);
                            }

                            else if (item.nodes.length > 0) {

                                loopArr(item.childNodes);
                            }
                        });
                    }
                    loopArr($scope.menuItems);
                }
            }
        };

        /**
         * Responsible for moving categories downside
         * 
         * @param currentIndex {Integer} :: $index of the clicked category
         * @param isLastElement {Boolean} :: Equals to true, if category is last element in the list else false
         * @param node :: clicked category
         * 
         **/
        $scope.moveDown = function (currentIndex, isLastElement, node) {

            if (!isLastElement) {

                if (!node.parentId) {

                    var currentCategory = $scope.menuItems.splice(currentIndex, 1);
                    $scope.menuItems.splice(currentIndex + 1, 0, currentCategory[0]);

                    var associatedCategory = $scope.menuItems[currentIndex];
                    var socketBody = { payload: $scope.createUpdatedCategoriesArray(currentCategory[0], associatedCategory, currentIndex, 'MOVE_DOWN') };

                    $scope.updateCategoryOrder(socketBody);
                }

                if (node.parentId) {

                    function loopArr(arr) {

                        arr.forEach(function(item) {

                            if (item.id === node.parentId) {

                                var currentCategory = item.childNodes.splice(currentIndex, 1);
                                item.childNodes.splice(currentIndex + 1, 0, currentCategory[0]);

                                var associatedCategory = item.childNodes[currentIndex];
                                var socketBody = { payload: $scope.createUpdatedCategoriesArray(currentCategory[0], associatedCategory, currentIndex, 'MOVE_DOWN') };

                                $scope.updateCategoryOrder(socketBody);
                            }

                            else if (item.nodes.length > 0) {

                                loopArr(item.childNodes);
                            }
                        });
                    }
                    loopArr($scope.menuItems);
                }
            }
        };

        /**
         * Update index value of categories
         * 
         * @param socketBody  :: updated categories
         * 
        **/
        $scope.updateCategoryOrder = function (socketBody) {

            socketBody.appId = $rootScope.appId;
            io.socket.post('/edit/commerce/updateCategoryOrder', socketBody);
        };

        /**
         * Responsible for creating updated categories array
         * 
         * @param currentCategory :: category which moved up or moved down
         * @param associatedCategory :: category which automatically affeced by moving particular category
         * @param currentIndex {Integer} :: index of the moved category
         * @param type {String} :: flag MOVE_UP or MOVE_DOWN
         * 
         * @return updatedCategories {Array}
         * 
         **/
        $scope.createUpdatedCategoriesArray = function (currentCategory, associatedCategory, currentIndex, type) {

            var updatedCategories = [];

            if (type === 'MOVE_UP')
                updatedCategories.push({ id: currentCategory.id, index: currentIndex - 1 });
            else
                updatedCategories.push({ id: currentCategory.id, index: currentIndex + 1 });

            updatedCategories.push({ id: associatedCategory.id, index: currentIndex });

            return updatedCategories;
        };

        /**
         * Responsible for updating featured category
         * 
         * @param node :: category
         **/
        $scope.onCheckboxChange = function (node) {

            if (node.isFeaturedCategory && $scope.featuredCategoryArr.length < 4) {

                var body = { appId: $rootScope.appId, characterLength: node.name.length };
                io.socket.post('/edit/commerce/checkAppHeaderEligibility', body, function(res) {

                    if (res.status === 'ELIGIBLE') {

                        var socketBody = { id: node.id, isFeaturedCategory: node.isFeaturedCategory };
                        io.socket.post('/edit/commerce/updateFeaturedCategory', socketBody, function(res) {

                            if (res.status === 'SUCCESS') {

                                $scope.featuredCategoryArr.push(node);
                                toastr.success('Successfully added to featured categories!', 'Success!', { closeButton: true });
                            }
                            else
                                toastr.error('Error in adding to featured categories', 'Error!', { closeButton: true });

                        });
                    }

                    if (res.status === 'NOT_ELIGIBLE') {

                        node.isFeaturedCategory = false;
                        toastr.warning('Maximum possible characters for the main navigation bar exceeded!', 'Warning!', { closeButton: true });
                    }
                });
            }

            if (!node.isFeaturedCategory) {

                var socketBody = { id: node.id, isFeaturedCategory: node.isFeaturedCategory };
                io.socket.post('/edit/commerce/updateFeaturedCategory', socketBody, function(res) {

                    if (res.status === 'SUCCESS') {

                        var checkedCategoryIndex = $scope.featuredCategoryArr.indexOf(node);
                        if (checkedCategoryIndex > -1) {

                            $scope.featuredCategoryArr.splice(checkedCategoryIndex, 1);
                            toastr.success('Successfully removed from featured categories!', 'Success!', { closeButton: true });
                        }
                    }
                    else
                        toastr.error('Failed to removed from featured categories!', 'Error!', { closeButton: true });
                });
            }

            if (node.isFeaturedCategory && $scope.featuredCategoryArr.length === 4) {

                toastr.warning('Maximum four categories are allowed for featured!', 'Warning!', { closeButton: true });
                node.isFeaturedCategory = false;
            }
        };

        /**
         * Create featured category array
         * 
         * @param menuItems :: Category list
         **/
        $scope.createFeaturedCategoryArray = function (menuItems) {

            $scope.featuredCategoryArr = [];
            menuItems.forEach(function(category) {

                if (category.isFeaturedCategory) {
                    $scope.featuredCategoryArr.push(category);
                }
            });
        };

        /**
         *  Responsible for creating payload for updateCategoryOrder after DragStop
         * 
         *  @param {Array} :: menuItems with current positions
         *  
         *  @return payload {Array}
         **/
        $scope.createCategoriesArrayAfterDragStop = function (currentMenuItems) {

            var payload = [];
            var tempPayloadItem;

            currentMenuItems.forEach(function(category){

                tempPayloadItem = { id: category.id, index: $scope.menuItems.indexOf(category) };
                payload.push(tempPayloadItem);
            });
            return payload;
        };

        $scope.ok = function () {

            if ($scope.nonFeaturedDropdownLabel) {

                $scope.updateNonFeaturedDropdownLabel();
                $mdDialog.hide();
            } else {

                toastr.warning('Fill the menu bar button value for non featured categories!', 'Warning', { closeButton: true });
            }
        };

        $scope.updateNonFeaturedDropdownLabel = function () {

            var postBody = { appId: $rootScope.appId, nonFeaturedDropdownLabel: $scope.nonFeaturedDropdownLabel };
            categoryMaintenanceService.updateNonFeaturedCategoryLabel(postBody)
                .success(function (res) {

                    if (res.status === 'SUCCESS') {

                        toastr.success('Successfully updated!', 'Success!', { closeButton: true });
                    }
                })
                .error(function (error) {

                    toastr.error('Error occurred!', 'Error!', { closeButton: true });
                })
        };
    }
})();
