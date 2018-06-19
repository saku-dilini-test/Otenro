/**
 * Created by prasanna on 2016/09/19.
 **/
(function() {
    angular.module('appEdit').service('technicalSupportService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL','$q', technicalSupportService
    ]);

    function technicalSupportService($mdDialog, $http, $rootScope, SERVER_URL, $q) {
        return {

            getAllAppData: function(){
                return $http.get(SERVER_URL + 'edit/getAllAppsData');
            },

            getUserApps : function (data) {

                return $http.post(SERVER_URL + 'edit/getUserApps',data);
            },

            getPublishDetails : function(data){
                return $http.post(SERVER_URL + 'edit/getPublishDetails',data);
            },
            getAllPublishDetails : function(){
                return $http.get(SERVER_URL + 'edit/getAllPublishDetails');
            },
            getPushConfigDetails : function(appId){
                return $http.get(SERVER_URL + 'edit/getPushConfigDetails?appId='+appId);
            },
            getAlluserData: function(){
                            return $http.get(SERVER_URL + 'edit/getAlluserData');
            },
            getAllAduserData: function(){
                return $http.get(SERVER_URL + 'edit/getAllAduserData');
            },
            getOperators: function(){
                return $http.get(SERVER_URL + 'edit/getOperators');
            },
            getAppStatus: function(){
                return $http.get(SERVER_URL + 'edit/getAppStatus');
            },
            getAllAddNetworks: function(){
                return $http.get(SERVER_URL + 'edit/getAllAddNetworksData');
            },
            savePushConfigDetails : function(data){
                return $http.post(SERVER_URL + 'edit/savePushConfigDetails',data);
            },
            changePublishStatus : function(data){
                return $http.post(SERVER_URL + 'edit/changePublishStatus',data);
            },
            saveAdNetwork : function(data){
                return $http.post(SERVER_URL + 'edit/saveAdNetwork',data);
            },
            deleteAdNetwork : function(data){
                return $http.post(SERVER_URL + 'edit/deleteAdNetwork',data);
            },
            getAdNetworkData : function(adname){
                return $http.get(SERVER_URL + 'edit/getAdNetwork?addname='+adname);
            },
            sendApkEmail: function (data) {
                return $http.post(SERVER_URL + 'edit/sendApkEmail', data);
            },
            setAppststus: function (data){
                return $http.post(SERVER_URL + 'edit/setAppstatus', data);
            },
            showPublishArticleDescription: function(data) {
                return $mdDialog.show({
                    locals : {initialData : data},
                    templateUrl: 'user/technicalSupport/AppDescription.html',
                    bindToController: true,
                    clickOutsideToClose: true,
                    controller: ['$scope', 'initialData','SERVER_URL','$auth','$rootScope', function($scope, initialData,SERVER_URL,$auth,$rootScope) {
                    console.log(initialData);

                               $scope.publishImgUrl = SERVER_URL + "templates/viewWebImages?userId=" + initialData.userId
                                    + "&appId=" + initialData.id + "&" + new Date().getTime() + "&images=publish/";

                                    $scope.appName = initialData.appName;
                                    $scope.appId = initialData.id;
                                    $scope.appDescription = initialData.appData.fullDes;
                                    $scope.keyword = initialData.appData.keyword;
                                    $scope.price = initialData.appData.price;


                                    $scope.close = function(){
                                        $mdDialog.hide();
                                    }
                                }]
                });
            },
            showApprovedOperators: function(data) {
                return $mdDialog.show({
                    locals : {initialData : data},
                    templateUrl: 'user/technicalSupport/MobileOperators.html',
                    bindToController: true,
                    clickOutsideToClose: true,
                    controller: ['$scope', 'initialData','SERVER_URL', function($scope, initialData,SERVER_URL) {



                                 $scope.items = initialData.operators;
                                    $scope.selected = [];
                                    if(initialData.selectedOperators){
                                        $scope.selected = initialData.selectedOperators
                                    }

                                    $scope.toggle = function (item, list) {
                                      var idx = list.indexOf(item.desc);
                                      if (idx > -1) {
                                        list.splice(idx, 1);
                                      }
                                      else {
                                        list.push(item.desc);
                                      }
                                    };

                                    $scope.exists = function (item, list) {
                                        return list.indexOf(item.desc) > -1;
                                    };

                                    $scope.save = function(){
                                    var data = { id:initialData.id,operators:$scope.selected }
                                    $http.post(SERVER_URL + 'edit/setOperators', data)
                                                .success(function (data, status) {
                                                    console.log(data);
                                                    $mdDialog.hide();
                                                })
                                                .error(function (data, status) {
                                                    toastr.error('Error saving Operators', 'Warning', {closeButton: true});
                                                });
                                    }

                                    $scope.close = function(){
                                                $mdDialog.hide();
                                    }

                                }]
                });
            },
            showAppcommentView: function(data) {
                return $mdDialog.show({
                    locals : {initialData : data},
                    templateUrl: 'user/technicalSupport/AppComment.html',
                    bindToController: true,
                    clickOutsideToClose: true,
                    controller: ['$scope', 'initialData','$mdDialog', function($scope, initialData,$mdDialog) {
                                    $scope.name = initialData.appName;
                                    $scope.comment = initialData.comment;
                                    var dates = new Date(initialData.date);
                                    $scope.date = dates.toDateString();

                                    $scope.save = function(){
                                        var data = { id:initialData.appId,comment:$scope.comment }
                                        $http.post(SERVER_URL + 'edit/setComments', data)
                                                .success(function (data, status) {
                                                    console.log(data);
                                                    $mdDialog.hide();
                                                })
                                                .error(function (data, status) {
                                                    toastr.error('Error saving Operators', 'Warning', {closeButton: true});
                                                });
                                    }

                                    $scope.cancel = function(){
                                        $mdDialog.hide();
                                    }
                                }]
                });
            }

        };
    }
})();



