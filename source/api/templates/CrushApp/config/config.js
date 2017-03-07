/**
 * Created by amila on 11/18/15.
 */

/**
 *  Reading madeEasy.Project file as GET request
 *
 *  Usage : When app run, set appId for $RootScope
 */

mobileApp.service('readMadeEasy', function($http) {

    this.readFile = function()
    {
        return $http({
            method: 'GET',
            url: 'madeEasy.Project',
        });
    }
});