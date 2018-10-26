/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['$scope','$mdDialog','toastr','fileUrl','width','height','initialData','callFrom','mainMenuService','articleService',imageEditorCtrl]);


    function imageEditorCtrl($scope,$mdDialog,toastr,fileUrl,width,height,initialData,callFrom,mainMenuService,articleService) {
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

                if(width !== 0 && height!== 0 && width !== undefined && height !== undefined){
                    imageEditor.setCropRect(width,height);
                }

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                };

                /**
                 * find the caller module and pass the image data with the initial data to the previously working dialog
                 */
                $scope.imageEditorCropAndSave = function() {
                    var editedImg = null;
                    applyCrop();
                    setTimeout(()=>{
                        editedImg = imageEditor.toDataURL();
                        if(callFrom === 'addNewMenuCategory'){
                            categoryDetails = {
                                name: initialData,
                                image : editedImg
                            };
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
                    },300);
                };

                /**
                 * crop the image and redirect to image editor for edit cropped image
                 */
                $scope.imageEditorCropAndEdit = function(){
                    applyCrop();
                    setTimeout(()=>{
                        var controls = document.getElementsByClassName('tui-image-editor-controls');
                        var container = document.getElementsByClassName('tui-image-editor-main-container');
                        var wrapper = document.getElementsByClassName('tui-image-editor-wrap');
                        wrapper[0].style.top = 0+'px';
                        controls[0].style.opacity = 1;
                        container[0].style.top = 0;

                        imageEditor.clearUndoStack();
                    },100);
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

                /**
                 *
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

                /**
                 *
                 */
                function isAppropriateSize(){
                    var canvasSize = imageEditor.getCanvasSize();
                    console.log(canvasSize);
                    const expectedAR = width/height;
                    var acctualAR = canvasSize.width/canvasSize.height;

                    console.log('expected:'+expectedAR+','+'acctual:'+acctualAR);
                    return expectedAR === parseInt(acctualAR);
                }


                // /**
                //  * check the uploaded image is in correct correct size
                //  */
                // function setCropZoneRectToMatchTheImageSize(){
                //     const acceptRatio = width/height;
                //     var canvasSize = imageEditor.getCanvasSize();
                //     console.log(canvasSize);
                //
                //     if(canvasSize.width<width && canvasSize.height>=height){
                //         width = canvasSize.width;
                //         height = width/acceptRatio;
                //     }
                //     if(canvasSize.height<height && canvasSize.width>=width){
                //         height = canvasSize.height;
                //         width = acceptRatio*height;
                //     }
                //     if(canvasSize.width<width && canvasSize.height<height){
                //         if(canvasSize.width<canvasSize.height){
                //             width = canvasSize.width;
                //             height = width/acceptRatio;
                //         }
                //         else{
                //             height = canvasSize.height;
                //             width = acceptRatio*height;
                //         }
                //     }
                //     console.log(width+','+height);
                //
                //     return {
                //         newWidth: width,
                //         newHeight : height
                //     }
                // }
            }
            , 1000)
    };

})();
