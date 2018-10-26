/**
 * Created by prasanna on 9/19/16.
 */
/**
 * @ngdoc function
 * @name appBuilderApp.controller:technicalSupportCtrl
 * @description
 * # technicalSupportCtrl
 * Controller of the technical Support
 */
(function() {
    'use strict';
    angular.module('app')
        .controller('appViewCtrl',
            ['$scope','$stateParams','SERVER_URL','$window',
                appViewCtrl
            ]);

    function appViewCtrl($scope,$stateParams,SERVER_URL,$window) {


        $scope.encParam = $stateParams.p;
        var decParams = atob($scope.encParam);
        console.log("decParams  : " + decParams);
        var splitParams = decParams.split("/");
        console.log(splitParams);

      $scope.deviceView = "mobile";
      $scope.appTemplateUrl = SERVER_URL + "progressiveTemplates/viewProgUrl?isFromCMSAppView=1&userId=" + splitParams[0]
                                + "&appId=" + splitParams[1] + "&" + new Date().toISOString() + "/";



          $scope.changeDevice = function(deviceType){



              if(deviceType == "mobile"){
                  $scope.deviceView = "mobile";
              }else if(deviceType == "tablet"){
                  $scope.deviceView = "tabletView";

              }else if(deviceType == "web"){

                  if($scope.isNew == 'true'){
                      $scope.deviceView = "web";
                  }else{
                      $scope.temporaryMessage();
                      $scope.deviceView = "web";
              }


              }


          };

          $scope.back = function(){
            $window.history.back();
          }
    }

})();
