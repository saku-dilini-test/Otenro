/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['$scope','$mdDialog','fileUrl','width','height','initialData','callFrom','mainMenuService','articleService',imageEditorCtrl]);


    function imageEditorCtrl($scope,$mdDialog,fileUrl,width,height,initialData,callFrom,mainMenuService,articleService) {
        setTimeout(
            () => {
                var categoryDetails = {
                    name: '',
                    image : null
                };
                var articleDetails = {
                    img : null,
                    tempImage : initialData.tempImage,
                    deleteImages : initialData.deleteImages,
                    articleCat : initialData.articleCat
                };

                $scope.callFrom = callFrom;

                var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
                    includeUI: {
                        loadImage: {
                            // path: './images/imageEditor/test.png',
                            path: fileUrl, // file for the image editor to edit
                            name: 'SampleImage'
                        },
                        theme: whiteTheme, // or blackTheme
                        initMenu: 'crop',
                        menuBarPosition: 'top'
                    },
                    cssMaxWidth: 700,
                    cssMaxHeight: 300
                });

                if(width && height){
                    imageEditor.setCropRect(width,height);
                }

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                };

                /**
                 * find the caller module and pass the image data with the initial data to the previously working dialog
                 */
                $scope.imageEditorSave = function() {
                    var editedImg = imageEditor.toDataURL();

                    categoryDetails = {
                        name: initialData,
                        image : editedImg
                    };
                    if(callFrom === 'addNewMenuCategory'){
                        mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory','3','imageEditorCtrl', categoryDetails);
                    }else if(callFrom === 'addNewArticle'){
                        articleDetails = {
                            img : editedImg,
                            tempImage : initialData.tempImage,
                            deleteImages : initialData.deleteImages,
                            articleCat : initialData.articleCat
                        };
                        articleService.showPublishArticleDialog(initialData.initData,'fromImageEditorCtrlSave',articleDetails);
                    }
                    else{
                        mainMenuService.showEditMenuCategoryDialog($scope.callFrom,'3','imageEditorCtrl',categoryDetails);
                    }
                    // $mdDialog.hide();
                };

                /**
                 * go back to the page where image editor initiated
                 */
                $scope.imageEditorCancel = function() {
                    categoryDetails = {
                        name: initialData,
                        image : null
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
                        mainMenuService.showEditMenuCategoryDialog($scope.callFrom,'3','imageEditorCtrlCancel',categoryDetails);
                    }
                };

            }
            , 1000)
    };

})();
