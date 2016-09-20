/**
 * Created by udeshikaperera on 17/02/2016.
 */
(function(){
    "use strict";
    angular.module('app').service('userProfileResource',[ '$http', 'SERVER_URL', userProfileResource ]);

    function userProfileResource($http, SERVER_URL){
        return{
            editUserProfile:function(appParams){
                 return $http.post(SERVER_URL +'auth/editUserProfile', appParams);
            },
            getUserProfile:function(appParams){
                return $http.post(SERVER_URL +'user/getUserProfile', appParams);
            },
            editBillingDetails: function(appParams){
                return $http.post(SERVER_URL +'user/editBillingDetails', appParams);
            },
            getBillingDetails: function(appParams){
                return $http.get(SERVER_URL+ 'user/getBillingDetails?userId='+ appParams);
            },
            resetPassword: function(appParams){
                return $http.post(SERVER_URL+ 'auth/resetPassword', appParams);
            }
        }
    }
})();