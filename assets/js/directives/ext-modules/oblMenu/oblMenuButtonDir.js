/**
 * Created by udeshikaperera on 25/08/2015.
 */
(function(){
    angular.module('oblMenu').directive('oblMenuButton',[oblMenuButton]);

    function oblMenuButton(){
        return {
            require: "^oblMenu",
            scope: {
                label: "@",
                icon: "@",
                clickTitle:"@"
            },
            templateUrl:"user/ext-modules/oblMenu/oblMenuButtonTemplate.html",
            link:function(scope, el,attrs,ctrl){
                el.on('click',function(evt){
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function(){
                        ctrl.setActiveElement(el);
                        ctrl.showAlert(scope.clickTitle);
                    });
                })
            }
        }
    }
})();