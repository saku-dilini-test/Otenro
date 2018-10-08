/**
 * Created by Sanira on (11/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl","width","height", [imageEditorCtrl]);


    function imageEditorCtrl(width,height) {
        setTimeout(
            () => {
                console.log(width+','+height);
                var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
                    includeUI: {
                        loadImage: {
                            path: './images/imageEditor/test.png',
                            name: 'SampleImage'
                        },
                        theme: blackTheme, // or whiteTheme
                        initMenu: 'crop',
                        menuBarPosition: 'bottom'
                    },
                    cssMaxWidth: 700,
                    cssMaxHeight: 300
                });
                // console.log(imageEditor.ui.initMenu);
                imageEditor.setCropRect(500,300);

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                }

            }
            , 1000)
    };

})();
