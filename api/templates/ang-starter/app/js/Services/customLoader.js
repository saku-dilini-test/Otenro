app.factory('customLoader', ["$http", "$q", "SERVER_URL", function($http, $q, SERVER_URL) {
    return function(options) {
        return $q(function(resolve, reject) {

            var translationsData = {
                'template': 'Templastssads',
                'FOO': 'This is a paragraph'
            };
            //resolve(translationsData);
            $http.post(SERVER_URL + 'getLocaleData').success(function(localeData) {
                //do something here to localData
                resolve(localeData); // ultimately you ought to resolve inside this function
            }).error(function(err) {
                alert('warning', err.message);
                reject(localeData);
            });
        });
    };
}]);
