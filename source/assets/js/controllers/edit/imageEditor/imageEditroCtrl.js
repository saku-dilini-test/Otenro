/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['$scope','$mdDialog','fileUrl','width','height','initialData','callFrom','mainMenuService','articleService',imageEditorCtrl]);


    function imageEditorCtrl($scope,$mdDialog,fileUrl,width,height,initialData,callFrom,mainMenuService,articleService) {
        setTimeout(
            () => {
                console.log(initialData);
                $scope.callFrom = callFrom;
                var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
                    includeUI: {
                        loadImage: {
                            // path: './images/imageEditor/test.png',
                            path: fileUrl,
                            name: 'SampleImage'
                        },
                        theme: whiteTheme, // or whiteTheme
                        initMenu: 'crop',
                        menuBarPosition: 'bottom'
                    },
                    cssMaxWidth: 700,
                    cssMaxHeight: 300
                });

                imageEditor.setCropRect(width,height);

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                };

                /**
                 * find the caller module and pass the image data with the initial data to the previously working dialog
                 */
                $scope.imageEditorSave = function() {
                    var editedImg = imageEditor.toDataURL();
                    var categoryDetails = {
                        name:initialData,
                        image : editedImg
                    };

                    console.log(initialData);
                    console.log(callFrom);

                    if(callFrom === 'addNewMenuCategory'){
                        mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory','3','imageEditorCtrl', categoryDetails);
                    }else if(callFrom === 'addNewArticle'){
                        var articleDetails = {
                            img : editedImg,
                            tempImage : initialData.tempImage,
                            deleteImages : initialData.deleteImages,
                            articleCat : initialData.articleCat
                        };
                        console.log(initialData);
                        articleService.showPublishArticleDialog(initialData.initData,'fromImageEditorCtrlSave',articleDetails);
                    }
                    else{
                        mainMenuService.showEditMenuCategoryDialog($scope.callFrom,'3','imageEditorCtrl',categoryDetails);
                    }
                    // $mdDialog.hide();
                };

                $scope.imageEditorCancel = function() {
                    if(callFrom === 'addNewMenuCategory'){
                        mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory','3','imageEditorCtrlCancel', categoryDetails);
                    }else if(callFrom === 'addNewArticle'){
                        var articleDetails = {
                            img : null,
                            tempImage : initialData.tempImage,
                            deleteImages : initialData.deleteImages,
                            articleCat : initialData.articleCat
                        };
                        console.log(initialData);
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
