/**
 * Created by .sanira on (11/10/2018)
 *
 * Service for image editor dialog show up
 */
(function() {
    'use strict';

    angular.module('appEdit').service('imageEditorService', [
        '$mdDialog',imageEditorService
    ]);

    function imageEditorService($mdDialog) {
        return {

            showImageEditorDialog: function (_width,_height) {
                return $mdDialog.show({
                    controller: 'imageEditorCtrl',
                    templateUrl: 'user/edit/imageEditor/imageEditor.html',
                    clickOutsideToClose: true,
                    locals: {
                        width: _width,
                        height: _height
                    }
                });
            },
        };
    }
})();
// (function () {
//     "use strict";
//
//     angular.module('app')
//         .factory('tui', ['$mdDialog', function ($mdDialog) {
//
//             return{
//                 showImageEditor: function (){
//                     return $mdDialog.show({
//                         controller: 'imageEditorCtrl',
//                         templateUrl: '../imageEditor.html',
//                         clickOutsideToClose: true
//                     });
//                 }
//             }
//
//         }]);
// })();