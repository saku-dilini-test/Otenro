/**
 * Created by udeshikaperera on 04/09/2015.
 */
(function (){
    angular.module('appEdit').service('appEditResource',[
        '$http','SERVER_URL',appEditAreaResource]);

    function appEditAreaResource($http, SERVER_URL){
        return {
            buildApp: function(params){
                return  $http.post(SERVER_URL + 'edit/buildSource',params);
            },
            getSelectedApp: function(params){
                return  $http.post(SERVER_URL + 'edit/getSelectedApp',params);
            },
            deleteSelectedApp: function(params){
                return  $http.post(SERVER_URL + 'edit/deleteSelectedApp',params);
            },
            deleteDefaultData: function(params){
                return  $http.post(SERVER_URL + 'edit/deleteDefaultData',params);
            },
            deleteDefaultSliderData: function(params){
                return  $http.post(SERVER_URL + 'edit/deleteDefaultSliderData',params);
            },
            deleteSalesAndPromotions: function(params){
                return  $http.post(SERVER_URL + 'edit/deleteSalesAndPromotions',params);
            }
        }
    }
})();