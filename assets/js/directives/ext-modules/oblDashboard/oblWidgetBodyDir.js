/**
 * Created by udeshikaperera on 24/08/2015.
 */
(function(){
    'use strict';
    angular.module('oblDashboard').directive('oblWidgetBody',[
        '$compile',oblWidgetBody]);

    function oblWidgetBody($compile){
        return{
            templateUrl:'user/ext-modules/oblDashboard/oblWidgetBodyView.html',
            link: function(scope,element, attrs){
                var newElement = angular.element(scope.item.template);
                element.append(newElement);
                $compile(newElement)(scope)
            }
        }
    }
})();