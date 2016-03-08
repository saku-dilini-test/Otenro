/**
 * Created by udeshikaperera on 15/08/2015.
 */
(function(){
    "use strict";
    angular.module("oblMenu").directive('oblMenu',oblMenu);

    function oblMenu(){
        return {
            transclude: true,
            scope: {

            },
            templateUrl : "user/ext-modules/oblMenu/oblMenuTemplate.html",
            controller: 'OblMenuCtrl',
            link: function(scope,el,attr){

            }
        }
    }
})();