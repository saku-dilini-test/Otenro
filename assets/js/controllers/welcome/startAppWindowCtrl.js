///**
// * @ngdoc function
// * @name appBuilderApp.controller:ModelinstanceCtrl
// * @description
// * # ModelinstanceCtrl
// * Controller of the appBuilderApp
// */
//(function () {
//  'use strict';
//  angular.module('app')
//    .controller('StartAppWindowCtrl', [
//      '$scope', '$modalInstance', 'initialData', '$state', '$auth', 'SERVER_URL', '$http',
//      StartAppWindowCtrl
//    ]);
//
//  function StartAppWindowCtrl($scope, $modalInstance, initialData, $state, $auth,
//                              SERVER_URL, $http) {
//
//    $scope.selectedTemplate = initialData.selectedTemplate;
//
//    $scope.getStarted = function () {
//      $modalInstance.close();
//      var appParams = {
//        'appName': $scope.appName,
//        'templateId': initialData.selectedTemplateId,
//        'templateName': initialData.selectedTemplateName,
//        'appIcon': $scope.image.compressed.dataURL,
//        'themeColor' : $scope.themeColor
//      };
//
//      $http.post(SERVER_URL + 'api/edit/viewTemplate', appParams).success(function (res) {
//        if ($auth.isAuthenticated()) {
//          $state.go('templateEditor', {
//            myParam: {
//              templateUrl: $scope.selectedTemplate,
//              templateId: initialData.selectedTemplateId,
//              appName: $scope.appName,
//              appId: res.appId,
//              appIcon:$scope.appIcon,
//              themeColor : $scope.themeColor
//            }
//
//          });
//        } else {
//          $state.go('register.user', {
//            myParam: {
//              template: $scope.selectedTemplate,
//              templateId: initialData.selectedTemplateId
//            }
//          });
//        }
//      }).error(function (err) {
//        console.log("Error thrown while creating the app " + err);
//      });
//    };
//    $scope.cancel=function(){
//      $mdDialog.hide();
//    };
//    $scope.cancel = function () {
//      $modalInstance.dismiss('cancel');
//    };
//
//    $scope.getFile = function () {
//      fileReader.readAsDataUrl($scope.image, $scope)
//        .then(function (result) {
//          $scope.image1.compressed.dataURL = result;
//        });
//    };
//  }
//})();
