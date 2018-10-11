/**
 * Created by Sanira on (5/10/2018)
 */

(function() {
    'use strict';
    angular.module("appEdit").controller("imageEditorCtrl" , ['fileUrl','width','height',imageEditorCtrl]);


    function imageEditorCtrl(fileUrl,width,height) {
        setTimeout(
            () => {
                var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
                    includeUI: {
                        loadImage: {
                            // path: './images/imageEditor/test.png',
                            path: fileUrl,
                            name: 'SampleImage'
                        },
                        theme: blackTheme, // or whiteTheme
                        initMenu: 'crop',
                        menuBarPosition: 'bottom'
                    },
                    cssMaxWidth: 700,
                    cssMaxHeight: 300
                });

                imageEditor.setCropRect(width,height);

                window.onresize = function () {
                    imageEditor.ui.resizeEditor();
                }

            }
            , 1000)
    };

})();
