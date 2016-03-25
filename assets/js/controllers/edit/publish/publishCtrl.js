(function() {
    'use strict';
    angular.module("appEdit").controller("PublishCtrl", ['$scope', '$mdDialog', '$rootScope', 'publishService', '$http', 'SERVER_URL', PublishCtrl]);

    function PublishCtrl($scope, $mdDialog, $rootScope, publishService, $http, SERVER_URL) {

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };


        $scope.addGooglePlayInfo = function(file, playStoreData) {
          console.log(playStoreData);
          console.log(file);
            publishService.addGooglePlayInfo(file,playStoreData)
//                .progress(function(evt) {
//                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
////                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//                })
                .success(function(data, status, headers, config) {
                    alert("success", 'Awsome! ', 'Genaral info has been added');
                }).error(function(data, status, headers, config) {
                    //alert('warning', "Unable to get templates", err.message);
                })
        };
    }
})();
