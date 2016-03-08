/**
 * Created by udeshikaperera on 26/06/2015.
 */
(function(){
    'use strict';
    angular.module('meDevices').directive('meIphone',meIphone);

    function meIphone(){
        return{
            scope:{
              imgSrc:'@',
              tmpUrl:'@'
            },
            restrict: 'E',
            controller: 'IphoneCtrl',
            templateUrl:'user/common/device/iphone/meIphoneView.html'
        }
    }
})();