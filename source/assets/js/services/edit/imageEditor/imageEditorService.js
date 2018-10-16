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

        var initialData = {image:''};
        function showImageEditorDialog(_fileUrl,_width,_height,menuName, menu) {
            return $mdDialog.show({
                controller: 'imageEditorCtrl',
                templateUrl: 'user/edit/imageEditor/imageEditor.html',
                clickOutsideToClose: true,
                locals: {
                    fileUrl: _fileUrl,
                    width: _width,
                    height: _height,
                    initialData : menuName,
                    menu : menu,
                },
            });
        };
        return {
            getImage : function(){
                return initialData;
            },
            callImageEditor: function (_file,_width,_height,menuName,menu){
                console.log(menu);
                var reader = new FileReader();
                var fileUrl;

                if (_file) {
                    reader.readAsDataURL(_file);
                }
                reader.onload = function(){
                    fileUrl = reader.result;
                    showImageEditorDialog(fileUrl, _width, _height,menuName,menu);
                }
            },
        };
    }
})();

