/**
 * Created by dilakshandc on 4/7/18.
 */

(function() {
    angular.module('appEdit').service('registerService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL', registerService
    ]);

    function registerService($mdDialog, $http, $rootScope, SERVER_URL) {

        return {

            getAllCountry:function(){
                return $http.get(SERVER_URL+ 'auth/getAllCountry');
            }
        }

    }

})();