/**
 * Created by udeshikaperera on 16/08/2015.
 */
(function(){
    "use strict";
    angular.module("oblMenu").directive("oblMenuGroup", oblMenuGroup);

    function oblMenuGroup(){
        return {
            require: "^oblMenu",
            transclude: true,
            scope: {
                label: "@",
                icon: "@"
            },
            templateUrl: "user/ext-modules/oblMenu/oblMenuGroupTemplate.html",
            link: function(scope, el, attr, ctrl){
                scope.isOpen = false;
                scope.closeMenu = function(){
                    scope.isOpen = false;
                };

                scope.clicked = function(){
                  scope.isOpen = !scope.isOpen;
                }

                scope.back = function(){
                  scope.isOpen = false;
                }
            }
        }
    }
})();