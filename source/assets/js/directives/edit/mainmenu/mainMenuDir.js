/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function() {
    "use strict";
    angular.module('appEdit').directive('meMainMenu', [
        '$stateParams', meMainMenu
    ]);

    function meMainMenu() {
        return {
            transclude: true,
            scope: {},
            controller: 'MainMenuCtrl',
            templateUrl: 'user/edit/mainmenu/mainMenuManView.html',
            link: function(scope) {
                //scope.appId = $stateParams.appId;
            }
        }
    }
})();
