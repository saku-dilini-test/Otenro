/**
 * Created by udeshikaperera on 26/06/2015.
 */
(function(){
    'use strict';
    angular.module('meDevices').directive('meIphone',meIphone);

    function meIphone(){
        return{
            restrict: 'E',
            scope: {
                imageSrc:'@',
                tmpUrl:'@',
                devicePath:'@'
            },
            controller: 'IphoneCtrl',
            templateUrl: "user/common/device/iphone/meIphoneView.html"

        }
    }


})();