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

        $scope.defaultLanguage={
            language: "English"
        };

        publishService.getAllLanguages().
           success(function(data){
               $scope.languageList = data;
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });

        publishService.getAllPrimaryCategories().
           success(function(data){
               $scope.primaryCatList = data;
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });

        publishService.getAllSecondaryCategories().
           success(function(data){
               $scope.secondaryCatList = data;
           }).error(function(err){
               alert("MainMenu Loading Error : " + err);
           });

       publishService.getExistingData().
            success(function(data){
            console.log(data);
                $scope.existingLanguage = data;
                 if($scope.existingLanguage.length == 0){
                        $scope.playStoreData ={language: $scope.defaultLanguage.language};
                 }
                 else{
                 console.log($scope.existingLanguage[0].file);
                 $scope.thumbPic = $scope.existingLanguage[0].file;

                        $scope.playStoreData = {
                            language : $scope.existingLanguage[0].language,
                            primaryCat : $scope.existingLanguage[0].primaryCategory,
                            secondaryCat : $scope.existingLanguage[0].secondaryCategory,
                            name: $scope.existingLanguage[0].name,
                            springBoardName: $scope.existingLanguage[0].springBoardName,
                            desc: $scope.existingLanguage[0].description,
                            keywords: $scope.existingLanguage[0].keywords,
                        };

                 }
            }).error(function(err){
                alert("MainMenu Loading Error : " + err);
        });

        $scope.addGooglePlayInfo = function(file, playStoreData) {
            publishService.addGooglePlayInfo(file,playStoreData)
            .success(function(data, status, headers, config) {
                alert("success", 'Awsome! ', 'Genaral info has been added');
            }).error(function(data, status, headers, config) {
                //alert('warning', "Unable to get templates", err.message);
            })
        };
    }
})();
