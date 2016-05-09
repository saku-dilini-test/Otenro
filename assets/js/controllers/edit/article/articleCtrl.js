/**
 * Created by amila on 5/9/16.
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog','articleService','toastr',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog,articleService,toastr) {

        $scope.publishArticle = function(article){
            articleService.publishArticle(article)
                .success(function (result) {
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

        $scope.picFile = 'images/google.png';

        $scope.answer = function() {
            $mdDialog.hide();
        };

    }
})();
