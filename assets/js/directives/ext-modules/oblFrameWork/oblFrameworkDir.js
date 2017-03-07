/**
 * Created by udeshikaperera on 14/08/2015.
 */
(function(){
   "use strict";
   angular.module("oblFrameWork").directive('oblFramework', oblFramework);

    function oblFramework(){
        return {
          transclude: true,
          scope:{
            title: '@',
            subtitle: '@',
            iconFile:'@'
          },
          controller:"OblFrameworkCtrl",
          templateUrl:"user/ext-modules/oblFrameWork/oblFrameworkTemplate.html"
        };
    }
})();