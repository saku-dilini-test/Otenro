/**
 * Created by amila on 21/06/16.
 */

/**
 *  Reading madeEasy.Project file as GET request
 *
 *  Usage : When app run, set appId for $RootScope
 */

(function(angular, undefined) {
    angular
        .module('invisionApp')

        .service('readMadeEasy', [
            '$http',
            function ($http) {
                'use strict';
                function readFile() {
                    return $http({
                        method: 'GET',
                        url: 'madeEasy.Project'
                    });
                }
                return {
                    readFile: readFile
                };
            }
        ]);

})(window.angular);