/**
 * Created by manosh on 12/29/16.
 */

(function() {
    angular.module('appEdit').service('helpService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL', helpService
    ]);

    function helpService($mdDialog, $http, $rootScope, SERVER_URL) {

        return {

            getcommeceFile : function(){
                return $http.get(SERVER_URL+ 'edit/getcommeceFile?appId='+$rootScope.appId);
            },


            getstyleFile : function(){
                return $http.get(SERVER_URL+ 'edit/getstyleFile?appId='+$rootScope.appId);
            },

            getcategoryFile : function(){
                return $http.get(SERVER_URL+ 'edit/getcategoryFile?appId='+$rootScope.appId);
            },

            getorderFile : function(){
                return $http.get(SERVER_URL+ 'edit/getorderFile?appId='+$rootScope.appId);
            },

            getinventoryFile : function(){
                return $http.get(SERVER_URL+ 'edit/getinventoryFile?appId='+$rootScope.appId);
            },

            gettaxFile : function(){
                return $http.get(SERVER_URL+ 'edit/gettaxFile?appId='+$rootScope.appId);
            },

            getemailFile : function(){
                return $http.get(SERVER_URL+ 'edit/getemailFile?appId='+$rootScope.appId);
            },

            getshippingFile : function(){
                return $http.get(SERVER_URL+ 'edit/getshippingFile?appId='+$rootScope.appId);
            },

            getstoreFile : function(){
                return $http.get(SERVER_URL+ 'edit/getstoreFile?appId='+$rootScope.appId);
            },

            getpaymentfile : function(){
                return $http.get(SERVER_URL+ 'edit/getpaymentfile?appId='+$rootScope.appId);
            }

        }

    }

})();
