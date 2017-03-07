app.config(['$translateProvider', function($translateProvider) {


    // var translationsData = {
    //     'template': 'Templastes<br/>sads',
    //     'FOO': 'This is a paragraph'
    // };

    $translateProvider.useLoader('customLoader');

    //$translateProvider.translations('en', translationsData);

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');

}]);
