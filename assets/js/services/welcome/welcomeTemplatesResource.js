/**
 * Created by udeshikaperera on 21/08/2015.
 */
(function(){
    "use strict";
    angular.module('app').service('welcomeTemplatesResource',[
        '$http','SERVER_URL',welcomeTemplatesResource
    ]);

    function welcomeTemplatesResource($http, SERVER_URL){
        return{
            getTemplates:function(){
                return $http.post(SERVER_URL + 'app/designApps');
            },
            viewTemplatePreview:function(tempAppParams){
                return $http.post(SERVER_URL + 'app/templatePreview', tempAppParams);
            },
            createApp:function(tempAppParams){
                return $http.post(SERVER_URL + 'app/viewTemplate', tempAppParams);
            },
            deletePreviewTemp : function(appParams){
                return $http.post(SERVER_URL + 'templates/deletePreviewTemp',appParams);
            },
            createPreview:function(appParams){
                return $http.post(SERVER_URL + 'app/preview', appParams);
            },
        }
    }
})();