/**
 * Created by udeshikaperera on 15/08/2015.
 */
(function(){
    "use strict";
    angular.module("oblMenu").directive('oblMenuItem',oblMenuItem);

    function oblMenuItem(){
        return {
            require: "^oblMenu",
            scope: {
                label: "@",
                icon: "@",
                route:"@"
            },
            templateUrl : "user/ext-modules/oblMenu/oblMenuItemTemplate.html",
            link: function(scope,el,attr, ctrl){
                scope.isActive = function(){
                    return el === ctrl.getActiveElement();
                };

                el.on('click',function(evt){
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function(){
                       ctrl.setActiveElement(el);
                       ctrl.setRoute(scope.route);
                    });
                })
            }
        }
    }
})();