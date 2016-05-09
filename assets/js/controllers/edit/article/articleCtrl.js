/**
 * Created by amila on 5/9/16.
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog) {

        $scope.publishArticle = function(){
            console.log('function is working');
        }

        $scope.answer = function() {

            $mdDialog.hide();
        };

    }
})();
