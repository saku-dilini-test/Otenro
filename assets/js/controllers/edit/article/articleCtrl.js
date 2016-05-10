/**
 * Created by amila on 5/9/16.
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog','$auth','$rootScope','articleService','toastr','ME_APP_SERVER',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog,$auth,$rootScope,articleService,toastr,ME_APP_SERVER) {

        $scope.publishArticle = function(file,article){

            if(typeof article == 'undefined'){
                toastr.error('Fill blanks', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(article.title == null){
                toastr.error('Fill article title', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(file == null){
                toastr.error('Select image', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(article.desc == null){
                toastr.error('Fill article description', 'Warning', {
                    closeButton: true
                });
                return;
            }
            else {

                articleService.publishArticle(file, article.title, article.desc, $rootScope.appId)
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (result) {
                        toastr.success('Successfully Publish Article ', 'Saved', {
                            closeButton: true
                        });
                        $mdDialog.hide();
                    }).error(function (error) {
                        toastr.error('Article Publish Error', 'Warning', {
                            closeButton: true
                        });
                    })
            }

        }

        $scope.tmpImage = [ null , null];
        $scope.mainImg = null;

        $scope.addImage = function(img){
            var im = $scope.tmpImage;
            for(var i=0 ; i < im.length ; i++){
                if(im[i] == null) {
                    im[i] = $scope.picFile;
                    break;
                }
            }
            $scope.tmpImage = im;
            $scope.mainImg = img;
            toastr.success('added Image', 'message', {
                closeButton: true
            });
        };

        $scope.deleteImg = function(index){
            $scope.tmpImage[index] = null;
        };

        $scope.setImage = function(img){

            if(img == undefined){
                toastr.error('Set Image', 'Warning', {
                    closeButton: true
                });
            }else{
                $scope.picFile = $scope.tmpImage[img];
            }
        };

        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/default.jpg';

        $scope.answer = function() {
            $mdDialog.hide();
        };

    }
})();
