/**
 * Created by .sanira on (5/10/2018)
 *
 * Service for image editor dialog show up
 */
(function() {
    'use strict';

    angular.module('appEdit').factory('imageEditorService', [
        '$mdDialog',imageEditorService
    ]);
    function imageEditorService($mdDialog) {

        /**
         * initiate the image editor dialog.
         * @param _fileUrl - file to be edited in the image editor(jpg,png)
         * @param _width - width of the crop area (if this passed, the height should be passed)
         * @param _height - height of the crop area (if this passed, the width should be passed)
         * @param _data - initial data from where the image editor called from
         * @param _callFrom - 'string' what is the place image editor has been called
         * @returns {*}
         */
        function showImageEditorDialog(_fileUrl,_width,_height,_data, _callFrom) {
            return $mdDialog.show({
                controller: 'imageEditorCtrl',
                templateUrl: 'user/edit/imageEditor/imageEditor.html',
                clickOutsideToClose: false,
                locals: {
                    fileUrl: _fileUrl,
                    width: _width,
                    height: _height,
                    initialData : _data,
                    callFrom : _callFrom,
                },
            });
        };

        return {
            callImageEditor: function (_file,_width,_height,_menuName,_callFrom){
                console.log(_callFrom);
                var reader = new FileReader();
                var fileUrl= './images/imageEditor/test.png';

                if (_file) {
                    reader.readAsDataURL(_file);
                }
                reader.onload = function(){
                    fileUrl = reader.result;
                    showImageEditorDialog(fileUrl, _width, _height,_menuName,_callFrom);
                }
            },
        };
    }
})();

