/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['$scope','$mdDialog','toastr','fileUrl','width','height','initialData','callFrom','mainMenuService','articleService',imageEditorCtrl]);


    function imageEditorCtrl($scope,$mdDialog,toastr,fileUrl,width,height,initialData,callFrom,mainMenuService,articleService) {
        var categoryDetails = {
            name: '',
            image : null
        };
        var articleDetails = {
            img : null,
            tempImage : null,
            deleteImages : null,
            articleCat : null
        };
        var callFrom = callFrom;
        $scope.isCropped = false;
        $scope.saveButton = 'Crop & Save';
        setTimeout(
            () => {
                var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
                    includeUI: {
                        loadImage: {
                            // path: './images/imageEditor/test.png',
                            path: fileUrl, // file for the image editor to edit, can pass a url also (without this image editor won't initiate correctly)
                            name: 'SampleImage'
                        },
                        theme: whiteTheme, // or blackTheme
                        initMenu: 'crop',
                        menuBarPosition: 'top'
                    },
                    cssMaxWidth: 700,
                    cssMaxHeight: 300
                });

                if(width !== 0 && height!== 0 && width !== undefined && height !== undefined){
                    imageEditor.setCropRect(width,height);
                }

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                };

                /**
                 * find the caller module and pass the image data with the initial data to the previously working dialog
                 */
                $scope.imageEditorSave = function() {
                    var editedImg = null;
                    var cropped = false;
                    if(!$scope.isCropped){
                        cropped = applyCrop();
                    }
                    if(cropped || $scope.saveButton === 'Save') {
                        setTimeout(() => {
                            editedImg = imageEditor.toDataURL();
                            if (callFrom === 'addNewMenuCategory') {
                                categoryDetails = {
                                    name: initialData.name,
                                    image: editedImg
                                };
                                mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory', '3', 'imageEditorCtrl', categoryDetails);
                            } else if (callFrom === 'addNewArticle') {
                                articleDetails = {
                                    img: editedImg,
                                    tempImage: initialData.tempImage,
                                    deleteImages: initialData.deleteImages,
                                    articleCat: initialData.articleCat
                                };
                                articleService.showPublishArticleDialog(initialData.initData, 'fromImageEditorCtrlSave', articleDetails);
                            }
                            else {
                                categoryDetails = {
                                    name: initialData.name,
                                    image: editedImg
                                };
                                mainMenuService.showEditMenuCategoryDialog(callFrom, '3', 'imageEditorCtrl', categoryDetails);
                            }
                        }, 300);
                    }
                };

                /**
                 * crop the image and redirect to image editor for edit cropped image
                 */
                $scope.imageEditorCropAndEdit = function(){
                    var cropped = applyCrop();
                    if(cropped){
                        $scope.isCropped = true;
                        $scope.saveButton = 'Save';
                        setTimeout(()=>{
                            var controls = document.getElementsByClassName('tui-image-editor-controls');
                            var container = document.getElementsByClassName('tui-image-editor-main-container');
                            var wrapper = document.getElementsByClassName('tui-image-editor-wrap');
                            wrapper[0].style.top = 0+'px';
                            controls[0].style.opacity = 1;
                            container[0].style.top = 0;

                            imageEditor.clearUndoStack();
                        },100);
                    }
                };

                /**
                 * go back to the page where image editor initiated
                 */
                $scope.imageEditorCancel = function() {
                    categoryDetails = {
                        name: initialData.name,
                        image: initialData.tempImage
                    };
                    if(callFrom === 'addNewMenuCategory'){

                        mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory','3','imageEditorCtrlCancel', categoryDetails);
                    }else if(callFrom === 'addNewArticle'){
                        articleDetails = {
                            img : null,
                            tempImage : initialData.tempImage,
                            deleteImages : initialData.deleteImages,
                            articleCat : initialData.articleCat
                        };
                        articleService.showPublishArticleDialog(initialData.initData,'fromImageEditorCtrlCancel',articleDetails);
                    }
                    else{
                        mainMenuService.showEditMenuCategoryDialog(callFrom,'3','imageEditorCtrlCancel',categoryDetails);
                    }
                };

                /**
                 * apply the crop to image
                 */
                function applyCrop(){
                    var cropZoneRect = imageEditor.getCropzoneRect();
                    if(cropZoneRect){
                        // imageEditor.crop(cropZoneRect);
                        var applyBtn = document.getElementById('tie-crop-button');
                        $scope.apply = applyBtn.getElementsByClassName('apply');
                        $scope.apply[0].click();
                        return true;
                    }else{
                        toastr.error('Mouse drag to draw the crop zone to crop', 'Warning', {
                            closeButton: true
                        });
                    }
                    return false;
                }
            }
            , 1000)
    };

})();
