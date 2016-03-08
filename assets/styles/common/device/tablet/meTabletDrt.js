

(function(){
    'use strict';
    angular.module('meDevices').directive('meTablet',meIphone);

    function meIphone(){
        return{
            scope:{
              imageSrc:'@',
              tmpUrl:'@'
            },
            restrict: 'E',
            controller: 'TabletCtrl',
            templateUrl:'app/common/device/tablet/meTabletView.html'
        }
    }
})();