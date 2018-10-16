/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['$scope','$mdDialog','fileUrl','width','height','initialData','mainMenuService','menu',imageEditorCtrl]);


    function imageEditorCtrl($scope,$mdDialog,fileUrl,width,height,initialData,mainMenuService,menu) {
        setTimeout(
            () => {
                console.log(initialData);
                $scope.menu = menu;
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
                 * catch the edited image(base 64) from the image editor
                 */
                $scope.imageEditorSave = function() {

                    var details = {
                        name:initialData,
                        image :imageEditor.toDataURL()
                    };
                    console.log(menu);
                    if(menu === 'addNewMenuCategory'){
                        mainMenuService.showEditMenuCategoryDialog('addNewMenuCategory','3','imageEditorCtrl', details);
                    }else{
                        mainMenuService.showEditMenuCategoryDialog($scope.menu,'3','imageEditorCtrl', details);
                    }

                    // $mdDialog.hide();

                };

            }
            , 1000)
    };

})();
