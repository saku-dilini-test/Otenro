/**
 * Created by shamilaSallay on 26/08/2015.
 */
 (function() {
    'use strict';
    angular.module("appEdit").controller("InventoryCtrl", [
    '$scope', 'inventoryService','$rootScope','SERVER_URL','$auth',
    InventoryCtrl]);
    function InventoryCtrl($scope, inventoryService,$rootScope,SERVER_URL,$auth) {

    $scope.userId=$auth.getPayload().sub;
            $scope.appId=$rootScope.appId;
            $scope.SERVER_URL = SERVER_URL;
            $scope.imageURL = SERVER_URL+
                "api/edit/viewImages?userId="+$scope.userId
                +"&appId="+$scope.appId+"&"
                +new Date().getTime();
                if (typeof $scope.inventoryList === 'undefined') {
                     inventoryService.getInventoryList()
                         .success(function (result) {
                             $scope.inventoryList = result;
//                             $scope.inventoryList={
//                             quantity:0,
//                             sale: 0,
//                             discount: 0

//                             }
                             console.log("result "+result);
                         }).error(function (error) {
                             alert("Inventory Loading Error : " + error);
                         })
            }
    }
    })();