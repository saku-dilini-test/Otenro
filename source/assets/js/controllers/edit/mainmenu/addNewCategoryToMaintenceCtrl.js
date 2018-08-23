(function() {
    'use strict';
    angular.module("appEdit").controller("addCatToMaintenanaceCtrl", ['$scope','oblMenuService','commerceService','categoryMaintenanceService','$rootScope','toastr','$mdDialog','SERVER_URL','$auth','mySharedService','initialData','$log', addCatToMaintenanaceCtrl]);

    function addCatToMaintenanaceCtrl($scope,oblMenuService,commerceService,categoryMaintenanceService,$rootScope,toastr,$mdDialog,SERVER_URL,$auth,mySharedService,initialData,$log) {

        $scope.maxMenuNavigation = 20;
        $scope.tmpImage = [];
        $scope.initialData = initialData;
        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";

        if(initialData.menu){
            $scope.menu = $scope.initialData.menu;
            $scope.mainImg = $scope.menu.imageUrl;
            $scope.serverImage = $scope.menu.imageUrl;
            // defined Navigation or Article Category image path


            var imageURL;
            if($rootScope.tempNew == 'true'){
                imageURL = SERVER_URL +"templates/viewWebImages?" +
                    "userId="+ $auth.getPayload().id +
                    "&appId="+$rootScope.appId+"&"+new Date().getTime()+
                    "&images=secondNavi/"+$scope.menu.imageUrl;
            }else{
                imageURL = SERVER_URL +"templates/viewImages?" +
                    "userId="+ $auth.getPayload().id +
                    "&appId="+$rootScope.appId+"&"+new Date().getTime()+
                    "&img=secondNavi/"+$scope.menu.imageUrl;
            }


            $scope.tmpImage[0] = imageURL;
            $scope.picFile     = imageURL;

        }

        // image crop function
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
                $scope.imageSelected =false;
                $scope.buttonName = "Upload";
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }


        $scope.addImage = function(img){
            if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                $scope.tmpImage[0] = img;
                $scope.mainImg = img;
                $scope.myImage = null;
            }

            $scope.imageSelected = true;
            $scope.buttonName = "Browse Image";
        };



        // save added category
        $scope.saveCategory = function(file,menu,parentId){

            $scope.disableSave = true;

            if($scope.tmpImage[0] == null){
                $scope.disableSave = false;
                toastr.error('Please upload an image', 'Warning', {closeButton: true});
                return;
            }
            // If menu undefined || menu.name undefined or empty, pop up error message
            if((typeof menu == 'undefined') || (typeof menu.name == 'undefined') || menu.name == ''){
                $scope.disableSave = false;
                toastr.error('Please enter a name ', 'Warning', {closeButton: true});
                return;
            }

            //adding new category
            if(!$scope.menu.id){
                categoryMaintenanceService.saveAddedCategory(file,$rootScope.appId,menu.name,parentId,$rootScope.tempNew).success(function(data) {
                    var urlPath;
                    $scope.disableSave = false;
                    if($rootScope.tempNew == 'true'){
                        urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                        $scope.appTemplateUrl = urlPath +'src'+new Date().getTime();
                    }else{
                         urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                        $scope.appTemplateUrl = urlPath+'' +'#/app/update?'+new Date().getTime();
                    }
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                    toastr.success("New Category Added", 'Message', {closeButton: true});
                    $mdDialog.hide();

                    if(initialData.prodItem == null) {
                        categoryMaintenanceService.showCategoryMaintenanceDialog();
                    }else{
                        if(initialData.prodItem.id == undefined || initialData.prodItem.id == '0'){

                            return commerceService.showAddProductsDialog(initialData.prodItem,true, null,'0', false)
                        }else{
                            return commerceService.showAddProductsDialog(initialData.prodItem,false);
                        }
                    }
                }).error(function(err) {
                    $scope.disableSave = false;
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                });
            }
            //updating only if name
            else if($scope.mainImg == $scope.serverImage){
                categoryMaintenanceService.updateCategoryName(menu).success(function() {
                    $scope.disableSave = false;
                    // update image name set to imageUrl in menu collection
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
                    toastr.success("Updated Category!", 'Message', {closeButton: true});
                    $mdDialog.hide();
                    categoryMaintenanceService.showCategoryMaintenanceDialog();

                }).error(function(err) {
                    $scope.disableSave = false;
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                })
            }
            //updating both category and image
            else{
                categoryMaintenanceService.updateCategory(file,$scope.menu.imageUrl,$scope.menu.id,$rootScope.appId,menu.name,$rootScope.tempNew).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function() {
                    $scope.disableSave = false;
                    // update image name set to imageUrl in menu collection
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
                        toastr.success("Updated Category!", 'Message', {closeButton: true});
                        $mdDialog.hide();
                    categoryMaintenanceService.showCategoryMaintenanceDialog();

                }).error(function(err) {
                    $scope.disableSave = false;
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                });
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
                categoryMaintenanceService.showCategoryMaintenanceDialog();
            }
        };

        /**
         * set second navigation aspect ratios to $scope
         **/
        $scope.setAspectRatio = function () {
            categoryMaintenanceService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        categoryMaintenanceService.getTemplateData(data.templateId)
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


        $scope.deleteImg = function () {
            $scope.tmpImage[0] = null;
            $scope.picFile     = null;
        };

    }
})();
