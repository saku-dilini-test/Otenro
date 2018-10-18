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

        function showImageEditorDialog(_fileUrl,_width,_height,_data, _callFrom) {
            return $mdDialog.show({
                controller: 'imageEditorCtrl',
                templateUrl: 'user/edit/imageEditor/imageEditor.html',
                clickOutsideToClose: true,
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

