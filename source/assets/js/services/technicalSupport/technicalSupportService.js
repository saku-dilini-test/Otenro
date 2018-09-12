/**
 * Created by prasanna on 2016/09/19.
 **/
(function() {
    angular.module('appEdit').service('technicalSupportService', [
        '$mdDialog', '$http', '$rootScope', 'SERVER_URL','$q', '$filter', technicalSupportService
    ]);

    var SUSPENDED = 'SUSPENDED';
    var TERMINATED = 'TERMINATED';

    function technicalSupportService($mdDialog, $http, $rootScope, SERVER_URL, $q, $filter) {
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
            getCommentsApp: function(){
                return $http.post(SERVER_URL + 'edit/getCommentsApp',{appId:$rootScope.appId});
            },
            getComments: function(){
                return $http.post(SERVER_URL + 'edit/getComments',{});
            },
            getAppStatus: function(){
                return $http.get(SERVER_URL + 'edit/getAppStatus');
            },
            buildApk: function(appId,userId){
                return $http.get(SERVER_URL + 'edit/buildSourceProg?appId=' + appId + '&userId=' + userId + '&fromscreen=ts');
            },
            getAllAddNetworks: function(){
                return $http.get(SERVER_URL + 'edit/getAllAddNetworksData');
            },
            savePushConfigDetails : function(data){
                return $http.post(SERVER_URL + 'edit/savePushConfigDetails',data);
            },
            saveServiceId : function(data){
                return $http.post(SERVER_URL + 'edit/setServiceId',data);
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
            setAppStatus: function (data){
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
                    controller: ['$scope', 'initialData','SERVER_URL', 'technicalSupportService', '$filter', '$window','toastr', function($scope, initialData,SERVER_URL,technicalSupportService,$filter,$window,toastr) {



                                    $scope.items = initialData.operators;
                                    $scope.app = initialData.app;
                                    $scope.userList = initialData.userList;
                                    $scope.selected = [];
//                                    if(initialData.selectedOperators){
//                                        $scope.selected = initialData.selectedOperators
//                                    }


                                    $scope.statusArray = [];

                                    $scope.getArr = function(status){

                                        if(status){

                                            var curStatusObj = $filter('filter')($scope.appStatusArr,{ "code": status });
                                            $scope.statusArray = $filter('filter')($scope.appStatusArr, function(value, index, array){
                                                return curStatusObj[0].nextAvailable.includes(value.code);
                                            });

                                        }

                                        return $scope.statusArray;
                                    }

                                    technicalSupportService.getAppStatus().success(function(data){
                                        $scope.appStatusArr = data.PUBLISH_STATUSES;

                                    }).error(function(err){

                                    });

                                    $scope.getStatus = function(status){
                                        if(status){
                                            var arr = $filter('filter')($scope.appStatusArr,{ "code": status });
                                            if(arr && arr.length>0){
                                                return arr[0].description;
                                            }
                                        }
                                    };

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
                                                    $mdDialog.hide();
                                                })
                                                .error(function (data, status) {
                                                    toastr.error('Error saving Operators', 'Warning', {closeButton: true});
                                                });
                                    }

                                    $scope.close = function(){
                                                $mdDialog.hide();
                                        $window.location.reload();
                                    };

                                    $scope.apply = function(operator){
                                        var app = $scope.app;
                                        var appUserId = app.userId;
                                        var user = null;
                                        var appStatus = null;

                                        $scope.items.forEach(function(op){
                                            if(op.operator==operator.operator){
                                                if(operator.nextStatus){
                                                    op.status = operator.nextStatus;
                                                    delete operator.nextStatus;
                                                }
                                            }
                                        });

                                        $scope.userList.forEach(function(u){
                                            if(u.id==appUserId){
                                                user = u;
                                            }
                                        });

                                        var appView = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + appUserId
                                            + "&appId=" + app.id + "&" + new Date().toISOString() + "/";

                                        console.log($scope.items);
                                        var data = {
                                            id:app.id,
                                            email:user.email,
                                            fName:user.firstName,
                                            lName:user.lastName,
                                            appName:app.appName,
                                            appView:appView,
                                            operators:$scope.items,
                                            userId:appUserId,
                                            appId:app.id
                                        }

                                        var emailData = {
                                            id:app.id,
                                            email:user.email,
                                            fName:user.firstName,
                                            lName:user.lastName,
                                            appName:app.appName,
                                            appView:appView,
                                            operator:operator
                                        }


                                        technicalSupportService.setAppStatus(data).success(function(res){
                                            technicalSupportService.sendApkEmail(emailData).success(function(data){
                                                 toastr.success('Status successfully changed', 'Success', {closeButton: true});
                                            }).error(function(error){
                                              console.log(error);
                                            });
                                            // $window.location.reload();
                                        }).error(function(error){
                                            console.log(error);
                                        });

                                        // If nextStatus of operator is suspended or terminated
                                        if (operator.status === SUSPENDED || operator.status === TERMINATED) {
                                            $scope.notifyAppUsers(operator);
                                        }
                                    };

                                    /**
                                     * Notify all app users who registered to an app if the app is suspended or rejected
                                     **/
                                    $scope.notifyAppUsers = function (operator) {

                                        // post request body
                                        var data = { operator: operator.operator, status: operator.status, appId: $scope.app.id };

                                        // api call for sending push message to relevant app users
                                        $http.post(SERVER_URL + 'technicalSupport/notifyAppUsers', data)
                                            .success(function (res) {
                                                console.log('response message' + JSON.stringify(res));
                                            });
                                    }

                                }]
                });
            },
            showAppcommentView: function(data) {
                return $mdDialog.show({
                    locals : {initialData : data},
                    templateUrl: 'user/technicalSupport/AppComment.html',
                    bindToController: true,
                    clickOutsideToClose: false,
                    controller: ['$scope', 'initialData','$mdDialog','toastr','technicalSupportService','$window', function($scope, initialData,$mdDialog,toastr,technicalSupportService,$window) {

                                    $scope.name = initialData.appName;
                                    $scope.comment = initialData.comment;
                                    var dates = new Date(initialData.date);
                                    $scope.date = dates.toDateString();
                                    var commentList = initialData.commentList;
                                    $scope.commentList = $filter('filter')(commentList,{ "appId": initialData.appId });

                                    console.log($scope.commentList);
                                    $scope.save = function(){
                                        var data = { id:initialData.appId,comment:$scope.comment }

                                        if(data.comment == null){
                                             toastr.error('Please enter comment', 'Warning', {closeButton: true});
                                        }else{
                                            $http.post(SERVER_URL + 'edit/setComments', data)
                                                .success(function (data, status) {
                                                    console.log(data);
                                                    $mdDialog.hide();
                                                    $window.location.reload();
                                                })
                                                .error(function (data, status) {
                                                    toastr.error('Error saving Operators', 'Warning', {closeButton: true});
                                                });
                                        }
                                    }

                                    $scope.cancel = function(){
                                        $mdDialog.hide();
                                    }
                                }]
                });
            },

            /*
            *Subscription Payments
            */
  
            getSubscriptionPayments: function(){
                return $http.get(SERVER_URL + 'appMakerReports/getSubscriptionPayments');
            },

            getReconciliationDataForYearly: function(dates){
                    return $http.post(SERVER_URL + 'appMakerReports/getReconciliationDataForYearly',dates);
            },

            getReconciliationDataForMonthly: function(dates){
                return $http.post(SERVER_URL + 'appMakerReports/getReconciliationDataForMonthly',dates);
            },

            getReconciliationDataForDateRange: function (dates) {
                return $http.post(SERVER_URL + 'appMakerReports/getReconciliationDataForDateRange', dates);
            },
            getFailedTransactionReportDataForDateRange: function (dates) {
                return $http.post(SERVER_URL + 'appMakerReports/getFailedTransactionReportDataForDateRange', dates);
            },
            getPaymentStatusOfUser: function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/getPaymentStatusOfUser', data);
            },

            getRevenueAndTrafficSummaryForDateRange :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/getRevenueAndTrafficSummaryForDateRange', data);
            },

            getRevenueAndTrafficSummaryForYearly :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/getRevenueAndTrafficSummaryForYearly', data);
            },

            getRevenueAndTrafficSummaryForMonthly :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/getRevenueAndTrafficSummaryForMonthly', data);
            },
            getAllOperators : function(){
                return $http.get(SERVER_URL + 'appMakerReports/getAllOperators');
            },

            getApplicationBaseDailySummary :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/appBaseReport/getApplicationBaseDailySummary', data);
            },

            getApplicationBaseMonthlySummary :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/appBaseReport/getApplicationBaseMonthlySummary', data);
            },
            getApplicationBaseYearlySummary :function (data) {
                return $http.post(SERVER_URL + 'appMakerReports/appBaseReport/getApplicationBaseYearlySummary', data);
            },
            getAllApps :function () {
                return $http.post(SERVER_URL + 'appMakerReports/appBaseReport/allApps', {});
            },
            getOperator:function(data){

                return $http.post(SERVER_URL + 'appMakerReports/getOperator', data);

            },
            updateAllApps:function(data){

                return $http.post(SERVER_URL + 'appMakerSupport/updateAllApps',data);

            }




        };
    }
})();



