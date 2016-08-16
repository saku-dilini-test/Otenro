(function() {
    'use strict';
    angular.module("appEdit").controller("MainMenuCtrl", ['$scope', '$mdDialog', '$rootScope',
        'mainMenuService','$http','commerceService','toastr','mySharedService','ME_APP_SERVER','$auth'
        ,'dashboardService','articleService','initialData', MainMenuCtrl]);

    function MainMenuCtrl($scope, $mdDialog, $rootScope, mainMenuService,$http,commerceService,toastr,
                          mySharedService,ME_APP_SERVER,$auth,dashboardService,articleService,initialData) {


        $scope.tmpImage = [ null ];
        $scope.mainImg = null;
        $scope.topLevel  = '';
        $scope.tempplayer = "";

        // ----- Config -----
        $scope.initialData = initialData;
        var tempCatBusiness = 2;
        var tempCatMedia = 3;
        $scope.templateCategory = '';

        $scope.myImage='';
        $scope.myCroppedImage='';

        $scope.cropImage = function () {
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                        $scope.picFile =  $scope.myImage
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }

        // Main Menu view
        if($scope.initialData == null ) {
            // check ID of templateCategory and load related collection to navigation
            dashboardService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    console.log(data);
                    $scope.templateCategory = data.templateCategory;
                    // Business Template Category
                    if (data.templateCategory == tempCatBusiness) {
                        commerceService.getCategoryList()
                            .success(function (secondNaviList) {
                                $scope.menuItems = secondNaviList;
                            }).error(function (error) {
                                toastr.error('Menu Loading Error', 'Warning', {closeButton: true});
                            });
                    }   // Media Template Category
                    else if (data.templateCategory == tempCatMedia) {
                        articleService.getCategoryList()
                            .success(function (catList) {
                                $scope.menuItems = catList;
                            }).error(function (err) {
                                toastr.error('Menu Loading Error', 'Warning', {closeButton: true});
                            });
                    } else {
                        // Not defined yet  | Other Template Category Here
                    }
                }).error(function (err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
        }else if($scope.initialData){
            $scope.templateCategory = $scope.initialData.templateCategory;
            if($scope.initialData.menu == 'addNewMenuNavigation'){

            }else if($scope.initialData.menu == 'addNewMenuCategory'){

            }else if($scope.initialData.menu){
                var imgLocation = '';
                if($scope.templateCategory == tempCatBusiness){
                    imgLocation = "secondNavi";
                }
                if($scope.templateCategory == tempCatMedia){
                    imgLocation = "category";
                }
                $scope.menu = $scope.initialData.menu;
                $scope.serverImage = $scope.menu.imageUrl;
                $scope.mainImg = $scope.menu.imageUrl;
                $scope.tmpImage[0] = ME_APP_SERVER + 'temp/' + $auth.getPayload().id + '/templates/'
                                     + $rootScope.appId + '/img/'+imgLocation+'/' + $scope.menu.imageUrl;
                $scope.picFile = ME_APP_SERVER+'temp/' +$auth.getPayload().id+
                    '/templates/'+$rootScope.appId+'/img/'+imgLocation+'/'+ $scope.menu.imageUrl;
            }
        }
        // Add New Menu
        $scope.goToAddNewMenuItemView = function () {
            if($scope.templateCategory == tempCatBusiness){
                mainMenuService.showEditMenuNavigationDialog('addNewMenuNavigation',$scope.templateCategory);
            }else if($scope.templateCategory == tempCatMedia){
                mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory',$scope.templateCategory);
            }
        };

        // Edit Menu
        $scope.goToEditMenuItemView = function(item){
            if($scope.templateCategory == tempCatBusiness){
                mainMenuService.showEditMenuNavigationDialog(item,$scope.templateCategory);
            }else if($scope.templateCategory == tempCatMedia){
                mainMenuService.showEditMenuCategoryDialog(item,$scope.templateCategory);
            }
        };
        $scope.setImage = function (img) {
                    if (img == undefined) {
                        toastr.error('Upload Image', 'Warning', {
                            closeButton: true
                        });
                    } else {
                        $scope.picFile = $scope.tmpImage[img];
                    }
        };
        // Delete Menu
        $scope.deleteMenuItem = function(item){
            var childOfMenu = '';
            if($scope.templateCategory == tempCatBusiness){
                childOfMenu = 'Product';
            }
            if($scope.templateCategory == tempCatMedia){
                childOfMenu = 'Article';
            }
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        if($scope.templateCategory == tempCatBusiness){
                            mainMenuService.deleteData(item).success(function(data) {
                                $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/templates/'+$rootScope.appId+'' +
                                    '#/app/update?'+new Date().getTime();
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                return mainMenuService.showMainMenuDialog();
                            }).error(function(err) {
                                $mdDialog.hide();
                            });
                        }
                        if($scope.templateCategory == tempCatMedia){
                            articleService.deleteCategory(item).success(function(data) {
                                $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                                    +'/templates/'+$rootScope.appId+'' +
                                    '#/app/update?'+new Date().getTime();
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                return mainMenuService.showMainMenuDialog();
                            }).error(function(err) {
                                $mdDialog.hide();
                            });
                        }
                    },
                        this.cancel = function click(){
                            $mdDialog.hide();
                            return mainMenuService.showMainMenuDialog();
                        }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting category </h1>' +
                '                </div> <br>'+
                ' <div style="text-align:center">' +
                '<lable> Deleting category will delete all the ' + childOfMenu +
                ' under that category! </lable></div>' +
                '<br><br><div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">Cancel</md-button>'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })
        };

        // Add menu navigation
        $scope.addMenuNavigation = function(file,menu){

            if($scope.initialData.menu == 'addNewMenuNavigation'){
                mainMenuService.addMenu(file,$rootScope.appId,menu.name).success(function(data) {
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/'+data.id+'?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    toastr.success("Successfully added new Category", 'Message', {closeButton: true});
                    $mdDialog.hide();
                    mainMenuService.showMainMenuDialog();
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }

            if($scope.mainImg == $scope.serverImage){
                mainMenuService.updateSecondNavi(menu).success(function(data) {
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/'+data.id+'?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    toastr.success("Successfully Update new Category", 'Message', {closeButton: true});
                    $mdDialog.hide();
                    mainMenuService.showMainMenuDialog();
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }
            if($scope.mainImg != $scope.serverImage && !($scope.initialData.menu == 'addNewMenuNavigation')){
                commerceService.updateCategoryImage(file,menu.imageUrl,menu.id,$rootScope.appId).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    mainMenuService.updateSecondNavi(menu).success(function(data) {
                        $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                            +'/templates/'+$rootScope.appId+'' +
                            '#/app/home/'+data.id+'?'+new Date().getTime();
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        toastr.success("Successfully Update new Category", 'Message', {closeButton: true});
                        $mdDialog.hide();
                        mainMenuService.showMainMenuDialog();
                    }).error(function(err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });
                }).error(function(err) {
                })
            }


        };
        // Add menu category
        $scope.addNewCategory = function(file,menu){

            if($scope.initialData.menu == 'addNewMenuCategory') {
                mainMenuService.addNewCategory(file, $rootScope.appId, menu.name)
                    .success(function (data) {
                        $scope.appTemplateUrl = ME_APP_SERVER + 'temp/' + $auth.getPayload().id
                            + '/templates/' + $rootScope.appId + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        toastr.success("Successfully added new Category", 'Message', {closeButton: true});
                        $mdDialog.hide();
                        mainMenuService.showMainMenuDialog();
                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {
                            closeButton: true
                        });
                    });
            }
            if($scope.mainImg == $scope.serverImage){
                articleService.editCategory(menu)
                    .success(function (data) {
                        $scope.appTemplateUrl = ME_APP_SERVER + 'temp/' + $auth.getPayload().id
                            + '/templates/' + $rootScope.appId + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        toastr.success("Successfully added new Category", 'Message', {closeButton: true});
                        $mdDialog.hide();
                        mainMenuService.showMainMenuDialog();
                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {closeButton: true});
                    });
            }
            if($scope.mainImg != $scope.serverImage && !($scope.initialData.menu == 'addNewMenuCategory')){
                console.log('imageUpdate true');
                articleService.updateCategoryImage(file,menu.imageUrl,$rootScope.appId).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    articleService.editCategory(menu)
                        .success(function (data) {
                            $scope.appTemplateUrl = ME_APP_SERVER + 'temp/' + $auth.getPayload().id
                                + '/templates/' + $rootScope.appId + '' +
                                '#/app/home/' + data.id + '?' + new Date().getTime();
                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            toastr.success("Successfully Edit Category", 'Message', {closeButton: true});
                            $mdDialog.hide();
                            mainMenuService.showMainMenuDialog();
                        }).error(function (err) {
                            toastr.error(err.message, 'Warning', {closeButton: true});
                        });
                }).error(function(err) {
                })
            }
        };

        // change image
        $scope.changeImage = function(img){
            $scope.mainImg = img;
        };


        // TODO : may be change later

        $scope.updateNames = function (){
            if($scope.tempplayer === "") return;
            $scope.menuItems.push({menuName: $scope.tempplayer.tempName,icon:$scope.tempplayer.tempIcon});
            $scope.tempplayer.tempName = "";
            $scope.tempplayer.tempIcon = "glyphicon glyphicon-asterisk";
        };

        //$scope.deleteMainMenu = function(frontData,$index){
        //    if(typeof frontData.appId == 'undefined'){
        //        $scope.menuItems.splice($index, 1);
        //    }else {
        //        mainMenuService.checkMainMenu(frontData).success(function (data) {
        //            console.log(data);
        //            if (data.message == 'YES') {
        //                alert('warning Unable to delete Main Menu');
        //            }else if(data.message == 'NO'){
        //                mainMenuService.deleteMainMenu(frontData).success(function (data) {
        //                    console.log(data);
        //                    if (data.message == 'OK') {
        //                        $scope.menuItems.splice($index, 1);
        //                    }else{
        //                        alert('warning Unable to delete Main Menu');
        //                    }
        //                }).error(function (err) {
        //                    alert('warning Unable to delete Main Menu');
        //                });
        //            }else{
        //                alert('warning Unable to delete Main Menu');
        //            }
        //        }).error(function (err) {
        //            alert('warning Unable to delete Main Menu');
        //        });
        //    }
        //};

        $scope.saveMainMenu = function() {
            var dataPrams = {
                menuItems : $scope.menuItems,
                appId:$rootScope.appId,
                topLevel : $scope.topLevel
            };
            mainMenuService.saveMainMenu(dataPrams).success(function(data) {
                $scope.mainMenu = data;
                toastr.success('Successfully Added', 'Success', {
                    closeButton: true
                });
                $mdDialog.hide();
            }).error(function(err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };

        $scope.removes = function (scope) {
           return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                    $mdDialog.hide();
                    var nodeData = scope.$modelValue;
                    mainMenuService.deleteData(nodeData).success(function(data) {
                        return mainMenuService.showMainMenuDialog();
                        scope.remove();
                    }).error(function(err) {
                    console.log(err);
                        $mdDialog.hide();
                    });
                    },
                    this.cancel = function click(){
                        $mdDialog.hide();
                        return mainMenuService.showMainMenuDialog();
                    }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                                '<md-content >' +
                                '<div class="md-dialog-header">' +
                                    '<h1>Deleting category </h1>' +
                '                </div> <br>'+
                                    ' <div style="text-align:center"><lable> Deleting category will delete all the products under that category! </lable></div>' +
                                    '<br><br><div class="md-dialog-buttons">'+
                                         '<div class="inner-section">'+
                                             '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">Cancel</md-button>'+
                                             '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                                         '</div>'+
                                    '</div>' +
                                '</md-content>' +
                         '</md-dialog>'
            })

        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
            console.log(nodeData);
            if(nodeData.link){
                var childParams={
                    name : nodeData.name + '.' + (nodeData.nodes.length + 1),
                    mainId : nodeData.id ,
                    appId : $rootScope.appId
                };
                mainMenuService.addChild(childParams).success(function(data) {
                    nodeData.nodes.push({
                        id : data.id,
                        name: data.name,
                        mainId : data.mainId ,
                        appId : data.appId,
                        imageUrl : data.imageUrl,
                        nodes: []
                    });
                }).success(function(data) {
                    toastr.success("Successfully added new navigation", 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });


            }if(nodeData.mainId) {
                var subParams={
                    name : nodeData.name + '.' + (nodeData.nodes.length + 1),
                    childId : nodeData.id ,
                    appId : $rootScope.appId
                };
                mainMenuService.addSubChild(subParams).success(function(data) {
                    nodeData.nodes.push({
                        id : data.id,
                        name: data.name,
                        childId : data.childId ,
                        appId : data.appId,
                        imageUrl : data.imageUrl,
                        nodes: []
                    });
                }).success(function(data) {
                    toastr.success("Successfully added new navigation", 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }if(!nodeData.mainId && !nodeData.link){
                toastr.error("Not allow", 'Warning', {
                    closeButton: true
                });
            }

        };
        $scope.deleteImg = function (index) {
            $scope.tmpImage[index] = null;
        };
        $scope.addImage = function(img){
            var im = $scope.tmpImage;

            im[0] = $scope.picFile;
            $scope.tmpImage = im;
            $scope.mainImg = img;
            toastr.success('added Image', 'message', {
               closeButton: true
            });
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };

    }
})();
