/**
 * Created by amila on 5/9/16.
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog) {

        $scope.publishArticle = function(article){
            console.log('function is working');
            console.log(article);
        }

        $scope.picFile = 'images/google.png';

        $scope.answer = function() {

            $mdDialog.hide();
        };

    }
})();
