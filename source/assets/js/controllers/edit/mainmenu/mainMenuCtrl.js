(function() {
    'use strict';
    angular.module("appEdit").controller("MainMenuCtrl", ['oblMenuService','$scope', '$mdDialog', '$rootScope',
        'mainMenuService','$http','commerceService','toastr','mySharedService','SERVER_URL','ME_APP_SERVER','$auth'
        ,'dashboardService','articleService','initialData','$log','$filter','imageEditorService', MainMenuCtrl]);

    function MainMenuCtrl(oblMenuService,$scope, $mdDialog, $rootScope, mainMenuService,$http,commerceService,toastr,
                          mySharedService,SERVER_URL,ME_APP_SERVER,$auth,dashboardService,articleService,initialData,$log,$filter,imageEditorService) {

        $scope.tmpImage = [];
        $scope.mainImg = null;
        $scope.topLevel  = '';
        $scope.newSortArr;

        $scope.tempplayer = "";
        console.log( initialData);
        $scope.filesSortConfig = {
            animation: 150,
            ghostClass: 'ghost',
            onAdd: function (evt) {
        },
        onUpdate: function (evt) {
            console.log(evt);
            console.log(evt.models);
            var myarr = $filter('orderBy')(evt.models, 'orderNo');
            console.log(myarr);
            var newArray = [];
            myarr.forEach(function(ele,idx){
                ele.orderNo = idx;
                newArray.push(ele);
            });
            newArray[evt.oldIndex].orderNo = evt.newIndex;
            newArray[evt.newIndex].orderNo = evt.oldIndex;

            $scope.saveCategoryOrder(newArray);
        }
    };

        $scope.saveCategoryOrder = function(arr){
            mainMenuService.updateCategoryOrder(arr).success(function(data){
                console.log(data);
            }).error(function(err) {
                console.log("error update cat")
            });
        };

        // ----- Config -----
        $scope.initialData = initialData;
        var tempCatBusiness = 2;
        var tempCatMedia = 3;
        $scope.templateCategory = '';

        // max character length defined
        $scope.maxMenuNavigation = 20;
        $scope.maxMenuCategory = 20;
        $scope.myImage='';
        $scope.myCroppedImage='';


        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";

        function view(){
            if($scope.templateCategory == tempCatBusiness){
                mainMenuService.showEditMenuNavigationDialog(item,$scope.templateCategory);
            }else if($scope.templateCategory == tempCatMedia){
                mainMenuService.showEditMenuCategoryDialog(item,$scope.templateCategory);
            }
        }

        // // open image editor function (added by .sanira)
        // $scope.openImageEditorDialog = function (element,width,height,menuName) {
        //     var file = element.files[0];
        //     console.log(initialData);
        //     imageEditorService.callImageEditor(file,width,height,menuName,initialData.menu);
        // };



        // image crop function
        $scope.cropImage = function () {
            console.log("inside cropImage");
            $scope.name;
            if($scope.menu){
                $scope.name = $scope.menu.name;
                console.log($scope.menu.name);
            }else{
                $scope.name = '';
            }
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                imageEditorService.callImageEditor(file,100,100, $scope.name, initialData.menu);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        };


        $scope.moveUp = function(arr, old_index) {

            arr = $filter('orderBy')(arr, 'orderNo');


                if(old_index != 0){

                    var orderNoStable;
                    var orderNo;

                    orderNo = arr[old_index].orderNo;
                    orderNoStable = arr[old_index - 1].orderNo;
                    arr[old_index - 1].orderNo = orderNo;
                    arr[old_index].orderNo = orderNoStable;

                    $scope.saveCategoryOrder(arr);
                }

        };


        $scope.moveDown = function(arr, old_index){
            arr = $filter('orderBy')(arr, 'orderNo');


                if(old_index != arr.length - 1){

                    var orderNoStable;
                    var orderNo;

                    orderNo = arr[old_index].orderNo;
                    orderNoStable = arr[old_index + 1].orderNo;
                    arr[old_index + 1].orderNo = orderNo;
                    arr[old_index].orderNo = orderNoStable;

                    $scope.saveCategoryOrder(arr);
                }
        }

        function addImage(img){
            // console.log(img)
                    if(angular.element('#fileInput').val() == ''){
                        toastr.error('Please choose an image to upload', 'Warning', {
                            closeButton: true
                        });
                    }
                    else{
                        $scope.tmpImage = [];
                        $scope.tmpImage[0] = img;
                        console.log($scope.tmpImage);
                        $scope.mainImg = img;
                        $scope.myImage = null;

                        toastr.success('Image has been uploaded successfully', 'message', {
                           closeButton: true
                        });
                    }

                     $scope.imageSelected = true;
                     $scope.buttonName = "Browse Image" ;
        };

        // Main Menu view
        if($scope.initialData == null ) {
        $scope.heading = "Add Category";
            // check ID of templateCategory and load related collection to navigation
            dashboardService.getApplicationData($rootScope.appId)
                .success(function (data) {
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
        }   // Menu-Navigation or Menu-Category (Article Category) -> Add / Update
        else if($scope.initialData){
            console.dir($scope.initialData);

            if($scope.initialData.from === 'imageEditorCtrl'){
                 $scope.menu = $scope.initialData.categoryDetails;
                 // console.log($scope.initialData.menu.image);
                 addImage($scope.menu.image);
                // $scope.tmpImage = [];
                // $scope.tmpImage =  $scope.initialData.menu.image;

            }else{
                if(initialData.from && initialData.from.from == 'fromPublishArticle' || initialData.menu == 'addNewMenuCategory'){
                    $scope.heading = "Add Category";

                }else{
                    $scope.heading = "Edit Category";
                }
                // Config
                $scope.templateCategory = $scope.initialData.templateCategory;
                // Add new Menu Navigation
                if($scope.initialData.menu == 'addNewMenuNavigation'){

                }  // Add New Menu Category
                else if($scope.initialData.menu == 'addNewMenuCategory'){

                }  // Update Menu-Navigation or Menu-Category
                else if($scope.initialData.menu){
                    var imgLocation = '';
                    if($scope.templateCategory == tempCatBusiness){
                        imgLocation = "secondNavi";
                    }
                    if($scope.templateCategory == tempCatMedia){
                        imgLocation = "category";
                    }
                    if(($scope.templateCategory == tempCatMedia && $scope.initialData.menu.isNew == 'true') || ($scope.templateCategory == tempCatMedia && $scope.initialData.menu.isNew == true)){
                        imgLocation = "secondNavi";
                    }
                    $scope.menu = $scope.initialData.menu;
                    $scope.serverImage = $scope.menu.imageUrl;
                    $scope.mainImg = $scope.menu.imageUrl;

                    // defined Navigation or Article Category image path
                    var imageURL;
                    if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                        imageURL= SERVER_URL +"templates/viewWebImages?" +
                            "userId="+ $auth.getPayload().id +
                            "&appId="+$rootScope.appId+"&"+new Date().getTime()+
                            "&images="+imgLocation+"/"+$scope.menu.imageUrl;
                    }else{

                        imageURL= SERVER_URL +"templates/viewImages?" +
                            "userId="+ $auth.getPayload().id +
                            "&appId="+$rootScope.appId+"&"+new Date().getTime()+
                            "&img="+imgLocation+"/"+$scope.menu.imageUrl;
                    }
                    $scope.tmpImage[0] = imageURL;
                    $scope.picFile     = imageURL;
                }
            }

        }

        //Delete Categories related
        $scope.selected = [];
        $scope.toggleDelete = function (itemId, list) {
            if(list && list.length > 0){
                var idx = list.indexOf(itemId);
                if (idx > -1) {
                  list.splice(idx, 1);
                  return;
                }
            }
              
            list.push(itemId);
        };

        $scope.exists = function (itemId, list) {
            return list.indexOf(itemId) > -1;
        };

        $scope.isChecked = function() {
            return $scope.selected && $scope.selected.length > 0 && $scope.menuItems && ($scope.selected.length === $scope.menuItems.length);
        };

        $scope.toggleAll = function() {
        if ($scope.selected.length === $scope.menuItems.length) {
          $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0 && $scope.menuItems.length > 0) {
          $scope.selected = [];  
          $scope.menuItems.forEach(function(item){
            $scope.selected.push(item.id);
          });  
        }
      };        

        // Add New Menu
        $scope.goToAddNewMenuItemView = function () {
            if($scope.templateCategory == tempCatBusiness){
                $log.debug(tempCatBusiness);
                $log.debug($scope.templateCategory );
                mainMenuService.showEditMenuNavigationDialog('addNewMenuNavigation',$scope.templateCategory);
            }else if($scope.templateCategory == tempCatMedia){
                $log.debug(tempCatMedia);
                $log.debug($scope.templateCategory );
                mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory',$scope.templateCategory);
            }
        };


        $scope.clearDefaultData = function () {
            commerceService.showRemoveDefaultDataDialog("remove");
        }

        // Edit Menu
        $scope.goToEditMenuItemView = function(item){
            if($scope.templateCategory == tempCatBusiness){
                console.log(1);

                mainMenuService.showEditMenuNavigationDialog(item,$scope.templateCategory);
            }else if($scope.templateCategory == tempCatMedia){
                console.log(2);

                mainMenuService.showEditMenuCategoryDialog(item,$scope.templateCategory);
            }
        };
        $scope.setImage = function (img) {
                    if (img == undefined) {
                        toastr.error('Please choose an image to upload', 'Warning', {
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

                                var urlPath;
                                if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                                    urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                        + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                                }else {

                                    urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                        + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                                }

                                $scope.appTemplateUrl = urlPath+'' +
                                    '#/app/update?'+new Date().getTime();
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                return mainMenuService.showMainMenuDialog();
                            }).error(function(err) {
                                $mdDialog.hide();
                            });
                        }
                        if($scope.templateCategory == tempCatMedia){
                            articleService.deleteCategory(item).success(function(data) {
                                var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                               +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                $scope.appTemplateUrl = urlPath+'' +
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
                        '<h1>Deleting category</h1>' +
                    '</div>'+
                    '<br>'+
                    '<div style="text-align:center">' +
                        '<lable>Are you sure, you want to delete this category ?</lable>' +
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

        // Delete Categories
        $scope.deleteCategories = function(catogoryIds){
            if(!(catogoryIds && catogoryIds.length>0)){
                return;
            }
            console.log(catogoryIds);
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        if($scope.templateCategory == tempCatBusiness){
                            mainMenuService.deleteCategories(catogoryIds).success(function(data) {

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
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);
                                return mainMenuService.showMainMenuDialog();
                            }).error(function(err) {
                                $mdDialog.hide();
                            });
                        }
                         if($scope.templateCategory == tempCatMedia){

                            articleService.deleteCategory({'id':catogoryIds,'appId':$rootScope.appId}).success(function(data) {

                                var urlPath;

                                if($rootScope.tempNew == true || $rootScope.tempNew == 'true'){

                                      urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                                                     + "&appId=" + $rootScope.appId + "&" + new Date().toISOString() + "/";
                                      $scope.appTemplateUrl = urlPath +
                                         'src' + data.id + '?' + new Date().toISOString();

                                }else{

                                     urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                                   +"&appId="+$rootScope.appId+"&"+new Date().toISOString()+"/";
                                     $scope.appTemplateUrl = urlPath+'' +'#/app/update?'+new Date().toISOString();
                                }


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
                        '<h1>Deleting category</h1>' +
                    '</div>'+
                    '<br>'+
                    '<div style="text-align:center">' +
                        '<lable>Are you sure, you want to delete the selected Categories?</lable>' +
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

        // Add menu navigation
        $scope.addMenuNavigation = function(file,menu){

            $log.debug(menu);
            if($scope.tmpImage[0] == null){
                toastr.error('Please upload an image', 'Warning', {closeButton: true});
                return;
            }
            // If menu undefined || menu.name undefined or empty, pop up error message
            if((typeof menu == 'undefined') || (typeof menu.name == 'undefined') || menu.name == ''){
                toastr.error('Please enter a name ', 'Warning', {closeButton: true});
                return;
            }

            // If Add new Menu Navigation
            if($scope.initialData.menu == 'addNewMenuNavigation'){
                console.dir(initialData.prodItem)
                //$log.debug("Add new Menu Navigation ");
                mainMenuService.addMenu({"file":$scope.tmpImage, "appId":$rootScope.appId, "name":menu.name,"isNew":$rootScope.tempNew}).success(function(data) {

                    console.log("$rootScope.tempNew : " + $rootScope.tempNew);
                    var urlPath;
                    if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                        urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                                        $scope.appTemplateUrl = urlPath +
                                            'src' + data.id + '?' + new Date().getTime();
                    }else {

                        urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                                        $scope.appTemplateUrl = urlPath + '' +
                                            '#/app/home/' + data.id + '?' + new Date().getTime();
                    }


                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    toastr.success("New Category Added", 'Message', {closeButton: true});
                    $mdDialog.hide();

                    if(initialData.prodItem == null) {
                        mainMenuService.showMainMenuDialog();
                    }else{
                        console.dir(initialData.prodItem.id )
                        if(initialData.prodItem.id == undefined || initialData.prodItem.id == '0'){

                            return commerceService.showAddProductsDialog(initialData.prodItem,true, null,'0', false)
                        }else{
                            return commerceService.showAddProductsDialog(initialData.prodItem,false);
                        }
                    }
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }

            // if Only Update Menu Name
            if($scope.mainImg == $scope.serverImage){
                //$log.debug("Only Update Menu Name ");
                mainMenuService.updateSecondNavi(menu).success(function(data) {

                    var urlPath;
                    if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                        urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                    $scope.appTemplateUrl = urlPath +
                        'src'+data.id+'?'+new Date().getTime();
                    }else {

                        urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                            + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                    $scope.appTemplateUrl = urlPath+'' +
                        '#/app/home/'+data.id+'?'+new Date().getTime();
                    }


                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    toastr.success("Successfully updated category", 'Message', {closeButton: true});
                    $mdDialog.hide();
                    mainMenuService.showMainMenuDialog();
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }

//************************************************************
//                  .progress(function(evt) {
//                      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                      $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//                  })

            // If Update Both Menu name and Image
            if($scope.mainImg != $scope.serverImage && !($scope.initialData.menu == 'addNewMenuNavigation')){
                //$log.debug("If Update Both Menu name and Image");
                commerceService.updateCategoryImage({"file":$scope.tmpImage, "imageUrl":menu.imageUrl, "categoryId":menu.id, "appId":$rootScope.appId,"isNew":$rootScope.tempNew}).success(function(data, status, headers, config) {
                console.log(data);
                    // update image name set to imageUrl in menu collection
                    menu.imageUrl = data.imageUrl;
                    mainMenuService.updateSecondNavi(menu).success(function(data) {
                        var urlPath;
                        if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                            urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                        $scope.appTemplateUrl = urlPath +
                            'src'+data.id+'?'+new Date().getTime();

                        }else {

                            urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

//                        $scope.appTemplate.progress is not a functionUrl = urlPath+'' +
//                            '#/app/home/'+data.id+'?'+new Date().getTime();
//                        }

                        $scope.appTemplateUrl = urlPath +
                            '#/app/home/'+data.id+'?'+new Date().getTime();

                        }

                         mySharedService.prepForBroadcast($scope.appTemplateUrl);
                           toastr.success("Successfully updated category", 'Message', {closeButton: true});
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
            // console.log($scope.initialData,file,menu);

            if($scope.tmpImage[0] == null){
                toastr.error('Please upload an image', 'Warning', {closeButton: true});
                return;
            }
            // If menu undefined || menu.name undefined or empty, pop up error message
            if((typeof menu == 'undefined') || (typeof menu.name == 'undefined') || menu.name == ''){
                toastr.error('Please Fill the Name Field', 'Warning', {closeButton: true});
                return;
            }
            // if($scope.myImage == ''){
            //     toastr.error('Please choose image and upload image', 'Warning', {
            //         closeButton: true
            //     });
            //     return;
            // }
            // if(file == null){
            //     toastr.error('Please upload image', 'Warning', {
            //         closeButton: true
            //     });
            //     return;
            // }
            else{
            if($scope.initialData.menu == 'addNewMenuCategory') {
                mainMenuService.addNewCategory({"file":$scope.tmpImage,"appId":$rootScope.appId,"name": menu.name,"isNew":$rootScope.tempNew})
                    .success(function (data) {
                        var urlPath;
                        if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                            urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                        $scope.appTemplateUrl = urlPath +
                            'src' + data.id + '?' + new Date().getTime();
                        }else {

                            urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                        $scope.appTemplateUrl = urlPath + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();
                        }

                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        toastr.success("New category has been added successfully", 'Message', {closeButton: true});
                        $mdDialog.hide();
                         if(initialData.from && initialData.from.from == 'fromPublishArticle'){
                                       articleService.showPublishArticleDialog(initialData.from.article);
                                   }else {
                                       mainMenuService.showMainMenuDialog();
                                   }
                    }).error(function (err) {
                        toastr.error(err, 'Warning', {
                            closeButton: true
                        });
                    });
            }
            if($scope.mainImg == $scope.serverImage){
                articleService.editCategory(menu)
                    .success(function (data) {
                        var urlPath;
                        if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                            urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                        $scope.appTemplateUrl = urlPath +
                            'src' + data.id + '?' + new Date().getTime();
                        }else {

                            urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                        $scope.appTemplateUrl = urlPath + '' +
                            '#/app/home/' + data.id + '?' + new Date().getTime();
                        }

                        mySharedService.prepForBroadcast($scope.appTemplateUrl);
                        toastr.success("New category has been added successfully", 'Message', {closeButton: true});
                        $mdDialog.hide();
                        mainMenuService.showMainMenuDialog();
                    }).error(function (err) {
                        toastr.error(err.message, 'Warning', {closeButton: true});
                    });
            }
            if($scope.mainImg != $scope.serverImage && !($scope.initialData.menu == 'addNewMenuCategory')){
                console.log('image update');
                $log.debug('imageUpdate true');
                articleService.updateCategoryImage(file,$scope.initialData.menu.imageUrl,$rootScope.appId,$rootScope.tempNew).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    // update image name set to imageUrl in menu collection
                    $scope.initialData.menu.imageUrl = data.imageUrl;
                    $log.debug($scope.initialData.menu);
                    articleService.editCategory($scope.initialData.menu)
                        .success(function (data) {

                            var urlPath;
                            if($rootScope.tempNew == 'true' || $rootScope.tempNew == true){
                                urlPath = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                                    + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                            $scope.appTemplateUrl = urlPath +
                                'src' + data.id + '?' + new Date().getTime();
                            }else {

                                urlPath = SERVER_URL + "templates/viewTemplateUrl?userId=" + $auth.getPayload().id
                                    + "&appId=" + $rootScope.appId + "&" + new Date().getTime() + "/";

                            $scope.appTemplateUrl = urlPath + '' +
                                '#/app/home/' + data.id + '?' + new Date().getTime();
                            }

                            mySharedService.prepForBroadcast($scope.appTemplateUrl);
                            toastr.success("Successfully edited category", 'Message', {closeButton: true});
                            $mdDialog.hide();
                            mainMenuService.showMainMenuDialog();
                        }).error(function (err) {
                            toastr.error(err.message, 'Warning', {closeButton: true});
                        });
                }).error(function(err) {
                })
            }
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
        //            $log.debug(data);
        //            if (data.message == 'YES') {
        //                alert('warning Unable to delete Main Menu');
        //            }else if(data.message == 'NO'){
        //                mainMenuService.deleteMainMenu(frontData).success(function (data) {
        //                    $log.debug(data);
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
                toastr.success('New Category Added', 'Success', {
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
                    $log.debug(err);
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
            $log.debug(nodeData);
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
                    toastr.success("New Category Added", 'Message', {
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
                    toastr.success("New Category Added", 'Message', {
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


        $scope.hide = function() {
            $mdDialog.hide();
        };
        
        $scope.cancel = function() {
            $mdDialog.hide();
        };

        $scope.cancelCategory = function() {
            $mdDialog.hide();
            if(initialData.from && initialData.from.from == 'fromPublishArticle'){
                articleService.showPublishArticleDialog(initialData.from.article);
            }else {
                mainMenuService.showMainMenuDialog();
            }
        };

        $scope.cancelEdit = function() {
            $scope.data = oblMenuService.parseData();
            // console.log($scope.data);
            if($scope.data == true){
                $mdDialog.hide();
                return commerceService.showAddProductsDialog(initialData.prodItem,true, null,'0', false)
            }else if($rootScope.hasCurrentProduct){
                $rootScope.hasCurrentProduct = false;
                $mdDialog.hide();
                return commerceService.showAddProductsDialog($rootScope.currentProduct);
            }else{
                $mdDialog.hide();
                mainMenuService.showMainMenuDialog();
            }
        };
        /**
         * set second navigation aspect ratios to $scope
         **/
        $scope.setAspectRatio = function () {
            mainMenuService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        mainMenuService.getTemplateData(data.templateId)
                            .success(function (templateData) {
                                if(templateData.secondNaviAspectRatio){
                                    $scope.secondNaviAspectRatio = parseFloat(templateData.secondNaviAspectRatio);
                                }
                                if(templateData.iSizeSecond){
                                    $scope.iSizeSecond={w:templateData.iSizeSecond.w,h:templateData.iSizeSecond.h};
                                }
                            }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }
                }).error(function (err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };
        $scope.setAspectRatio();
    }
})();
