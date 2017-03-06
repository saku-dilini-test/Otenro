/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function() {
    "use strict";
    angular.module('appEdit').directive('meManageCat', [
        '$stateParams', meManageCat
    ]);

    function meManageCat() {
        return {
            transclude: true,
            scope: {},
            controller: 'ManageCatCtrl',
            templateUrl: 'user/edit/appManageCatView.html',
            link: function(scope) {
                //scope.appId = $stateParams.appId;
            }
        }
    }
})();

