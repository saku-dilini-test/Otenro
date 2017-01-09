/**
 *  Reading madeEasy.Project file as GET request
 *
 *  Usage : When app run, set appId for $RootScope
 */
(function() {
    angular.module('starter').service('readMadeEasy', function($http) {
        this.readFile = function()
        {
            return $http({
                method: 'GET',
                url: 'madeEasy.Project'
            });
        }
    });
})();