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
        .filter('titleCase', function() {
                             return function(input) {
                               input = input || '';
                               return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                             };
                           })
        .controller('technicalSupportCtrl',
            ['$scope','$mdDialog','$auth','toastr','$state','$stateParams','SERVER_URL','ME_SERVER','$filter',
                '$window','userProfileResource','technicalSupportService',
                technicalSupportCtrl
            ]);


    function technicalSupportCtrl($scope,$mdDialog,$auth,toastr,$state,$stateParams,SERVER_URL,ME_SERVER,$filter,
                                  $window,userProfileResource,technicalSupportService) {

            $scope.splash = [];
            $scope.publishSplash = [];
            $scope.appList = [];
            $scope.deviceView ="mobile";
            $scope.showSearchField = true;
            $scope.responseData = null;
            $scope.reconciliationResponseData =null;
            $scope.customerCareReportData =null;
            $scope.customerCareReport = {};
            $scope.revenueAndTrafficReportResponseData =null;
            $scope.applicationBaseReportResponseData =null;
            $scope.showRegisterdusers = false;
            $scope.showAppDetails = false;
            $scope.showPayment=true;
            $scope.showRevenueAndTrafficReport=false;
            $scope.showapplicationBaseReport=false;
            $scope.failedTanscationReport =false;
            $scope.showCustomerCareReport=false;
            $scope.showReconciliationReports=false;
            $scope.sortReverse = true;
            $scope.sortType = "appName"


            $scope.reports = [
                {name:"Daily"},
                {name:"Monthly"} ,
                {name:"Yearly"}
            ];
            $scope.currentYear = new Date().getFullYear();
            // $scope.current =   $scope.currentYear -1;
            $scope.months  = [
                {month:1},
                {month:2},
                {month:3},
                {month:4},
                {month:5},
                {month:6},
                {month:7},
                {month:8},
                {month:9},
                {month:10},
                {month:11},
                {month:12}
            ];
            $scope.years  = [
                {year:$scope.currentYear},
                {year:$scope.currentYear-1},
                {year:$scope.currentYear-2},
                {year:$scope.currentYear-3}
            ];

            var tempImagePath;

//            console.log(initialData);

            if($stateParams){

                $scope.userId = $stateParams.userId;
                $scope.appId = $stateParams.appId;

                var profParams = {};

                if ($stateParams.appCreatorId){
                    $scope.userId = $stateParams.appCreatorId;
                    profParams = { userId: $scope.userId}

                }else {
                     profParams = { userId: $stateParams.userId }
                }
                userProfileResource.getUserProfile(profParams).success(function (data) {

                    $scope.user = data;
                    technicalSupportService.getAllOperators()
                        .success(function (opratoreData) {
                           if ($scope.user.userRole=="OPERATOR"){
                               $scope.operators = [{"operator":$scope.user.operator}];
                           }else {
                               opratoreData.push({"operator":"all"});
                               $scope.operators = opratoreData;
                           }

                        }).error(function (error) {
                        toastr.error('operators Loading Error', 'Warning', {closeButton: true});
                    });

                    if ($scope.user.userRole=="APP_CREATOR"){

                            var param ={userId :$scope.userId};
                            technicalSupportService.getUserApps(param)
                                .success(function (result) {
                                    $scope.apps = result;
                                }).error(function (error) {
                                toastr.error('Loading Error', 'Warning', {
                                    closeButton: true
                                });
                            })
                        document.getElementById('searchBar').style.display = 'none';
                        $scope.showRevenueAndTrafficReport=true;
                        $scope.showapplicationBaseReport=true;
                        $scope.showPayment=false;

                    }else {
                        $scope.showRegisterdusers = true;
                        $scope.showAppDetails = true;
                        getAllAppDataList();
                        technicalSupportService.getAllApps()
                            .success(function (technicalData) {
                                $scope.apps = [];
                                $scope.apps.push({appName:"all"});
                                    console.log($scope.apps);
                                var count = 0;
                                technicalData.forEach(function (app) {
                                    $scope.apps.push(app[count]);
                                })
                            }).error(function (error) {
                            toastr.error('Apps Loading Error', 'Warning', {closeButton: true});
                        });

                        $scope.showRevenueAndTrafficReport=true;
                        $scope.showapplicationBaseReport=true;
                        $scope.failedTanscationReport =true;
                        $scope.showCustomerCareReport=true;
                        $scope.showReconciliationReports=true;
                    }


                }).error(function (err) {
                    console.err(err);
                });


                // if pushConfigData undefined
                if(typeof $scope.pushConfigData == 'undefined'){
                    // set App ID
                    var appId = $scope.appId;
                    // API request get push config details
                    technicalSupportService.getPushConfigDetails(appId)
                        .success(function (data) {
                            $scope.pushConfigData = data;
                        }).error(function (error) {
                        toastr.error('Push Config Details Loading Error', 'Warning', {closeButton: true});
                    });
                }





            }

            $scope.operatorArrSort = function(operators){
                var returnArray = [];
                var idx;
                var firstIdxValue;
                $scope.sortOp = $filter('orderBy')(operators, 'operator');
                if($scope.sortOp){
                    for(var i = 0;i < $scope.sortOp.length; i++){
                        if($scope.sortOp[0].operator == "all"){
                            returnArray = $scope.sortOp;
                            break;
                        }else if ($scope.sortOp[0] != "all"){
                            firstIdxValue = $scope.sortOp[0];
                            if($scope.sortOp[i].operator == "all"){

                                idx = i;
                                $scope.sortOp[0] = $scope.sortOp[i];
                                $scope.sortOp[i] = firstIdxValue;
                                returnArray = $scope.sortOp;
                                break;
                            };
                        }
                    }
                }
                return returnArray;
            }

            $scope.applicationArrSort = function(applications){

                console.log(applications);
                var returnArray = [];
                var idx;
                var firstIdxValue;
                $scope.sortOp = $filter('orderBy')(applications, 'appName');
                if($scope.sortOp){
                    for(var i = 0;i < $scope.sortOp.length; i++){
                        if($scope.sortOp[0].appName == "all"){
                            returnArray = $scope.sortOp;
                            break;
                        }else if ($scope.sortOp[0] != "all"){
                            firstIdxValue = $scope.sortOp[0];
                            if($scope.sortOp[i].appName == "all"){

                                idx = i;
                                $scope.sortOp[0] = $scope.sortOp[i];
                                $scope.sortOp[i] = firstIdxValue;
                                returnArray = $scope.sortOp;
                                break;
                            };
                        }
                    }
                }
                return returnArray;
            }


            if($stateParams.adname){
                var addname = $stateParams.adname;

                technicalSupportService.getAdNetworkData(addname)
                    .success(function (data) {
                        $scope.addNetworkData = data;
                    }).error(function (error) {
                    toastr.error('Ad network Details Loading Error', 'Warning', {closeButton: true});
                });
            }

        if($stateParams.selectedUserId){
            var data ={userId :$stateParams.selectedUserId}
            technicalSupportService.getUserApps(data)
                .success(function (result) {
                    $scope.userAppsList = result;
                }).error(function (error) {
                toastr.error('Loading Error', 'Warning', {
                    closeButton: true
                });
            })
        }



            /**
             * @ngdoc init data
             * @description
             * # view  Publish Details of the apps
             */

            if($stateParams.appId){
                var searchApp = {
                    appId :$stateParams.appId
                }
                technicalSupportService.getPublishDetails(searchApp)
                    .success(function (result) {
                        try{
                            $scope.publishDetails = result;
                            $scope.iosPublishDetails = $scope.publishDetails[1];
                            $scope.tempNew = $scope.publishDetails[0].isNew;

                            if($scope.tempNew === true){
                                $scope.sourcePath = ME_SERVER+$scope.userId +'/progressiveTemplates' + "/"+$scope.appId ;
                                tempImagePath =  SERVER_URL +"templates/viewWebImages?userId="+ $scope.userId
                                    +"&appId="+$scope.appId+"&"+new Date().getTime()+"&images=publish/";
                                $scope.buildSource = '/edit/buildSourceProg?appId='+$scope.appId+'&userId='+ $scope.userId+'&isNew='+$scope.tempNew;
                            }else{

                                $scope.sourcePath = ME_SERVER+$scope.userId +'/templates' + "/"+$scope.appId ;
                                tempImagePath =  SERVER_URL +"templates/viewImages?userId="+ $scope.userId
                                    +"&appId="+$scope.appId+"&"+new Date().getTime()+"&img=publish/";
                                $scope.buildSource = '/edit/buildSource?appId='+$scope.appId+'&userId='+ $scope.userId;
                            }


                            for (var i=0; i< 6; i++) {
                                try {
                                    var tempImageUrl = tempImagePath + i+'.png';
                                    $scope.splash.push(tempImageUrl);

                                    if(i<=5){

                                        var iosTempImageUrl = tempImagePath + i+'ios'+'.png';
                                        $scope.publishSplash.push(iosTempImageUrl);
                                    }

                                }catch (err){
                                    console.log(err);
                                }
                            }

                        }catch(err) {
                           console.log(err);
                        }

                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                });
            }


            /**
             *
             * @name auth.isAuthenticated()
             * @description
             * # check  whether is Authenticated user
             *   and assign status of user to defined variable
             */
            if ($auth.isAuthenticated()) {
                $scope.isAuthenticated = true;
            }


            /**
             * @ngdoc function
             * @name getAllAppDataList
             * @description
             * # get all applications  data to list
             */
            var getAllAppDataList = function () {
                technicalSupportService.getAllAppData()
                    .success(function (apps) {

                        technicalSupportService.getAllPublishDetails()
                            .success(function (details) {
                                technicalSupportService.getAppStatus().success(function(data){
                                    $scope.appStatusArr = data.PUBLISH_STATUSES;
                                    $scope.publishAppData = details;
                                    details.forEach(function(detail){
                                        apps.forEach(function(app){
                                            if(detail.appId === app.id){
                                                if(detail.publishedStatus!=='') {
                                                    var curStatusObj = $filter('filter')($scope.appStatusArr, {"code": detail.publishedStatus});
                                                    app.publishedStatus = curStatusObj[0].description;
                                                }
                                                if($scope.user){
                                                    if($scope.user.userRole == "ADMIN"){
                                                        var checkStatus = $filter('filter')(detail.operators,{status:"SUBMITTED_FOR_CONFIG"});
                                                        console.log(checkStatus.length)
                                                        if(checkStatus.length == 0){
                                                            app.enableSave = false
                                                        }else{
                                                            app.enableSave = true;
                                                        }
                                                    }
                                                }
                                                app.serviceId = detail.serviceID;
                                                app.keyword = detail.keyword;
                                                    console.log(app);
                                                $scope.appList.push(app);
                                            }
                                        });
                                    });

                                    if($scope.user){
                                        if($scope.user.userRole != "ADMIN"){
                                          technicalSupportService.getComments().success(function(data){
                                                console.log(data);
                                                    $scope.commentsList = data;
                                          });
                                        }
                                    }

                                }).error(function(err){

                                });
                            }).error(function (error) {
                            toastr.error('Loading Error', 'Warning', {
                                closeButton: true
                            });
                        });
                        $scope.serverURL = SERVER_URL;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })

            }

            $scope.buildAPK = function(app){
                technicalSupportService.buildApk(app.id,app.userId)
                    .success(function (result) {
                        console.log('Start to build the apk');
                        $scope.appList = [];
                        getAllAppDataList();
                        toastr.success(result, 'Info', {
                            closeButton: true
                        });
                    }).error(function (error) {
                        console.log('Start nuild apk error: ' + error);
                    });
            }

            $scope.checkStatus = function(appId){

            }

           $scope.getUserAppData = function (userId) {
                var data ={selectedUserId:userId}
               $state.go('user.viewUserApps',data);

            }





      /**
                  * @ngdoc init data
                  * @description
                  * # view  Registered user  Details of the system
                  */

             var getAlluserData = function () {
                            technicalSupportService. getAlluserData()
                                .success(function (result) {
                                    $scope.userList = result;
                                }).error(function (error) {
                                toastr.error('Loading Error', 'Warning', {
                                    closeButton: true
                                });
                            })
             }
              getAlluserData();

            var getAllAdNetworkuserData = function () {
                technicalSupportService. getAllAduserData()
                    .success(function (result) {

                        for(var i=0; i< result.length; i++) {
                            result[i].isActive = true;
                            var nowTime = new Date().getTime();
                           var lastLogTime = new Date(result[i].lastLoginTime).getTime();
                            var diff = Math.round(Math.abs((nowTime - lastLogTime)/(24*60*60*1000)));
                            if(diff > 60)
                            {
                                result[i].isActive = false;
                            }
                        }
                        $scope.adUserList = result;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
            }
            getAllAdNetworkuserData();

            var getAllAddNetworks = function () {
                technicalSupportService.getAllAddNetworks()
                    .success(function (result) {
                        $scope.addNetworkList = result;
                    }).error(function (error) {
                    toastr.error('Loading Error', 'Warning', {
                        closeButton: true
                    });
                })
            }
            getAllAddNetworks();




            /**
             * @ngdoc function
             * @name getPublishDetails
             * @description
             * # get  Publish Details of the apps
             */
            $scope.getPublishDetails  = function (appId,userId) {
                $state.go('user.viewPublishDetails',{appId : appId,userId:userId});
            }

            $scope.adNetworkDetails = function(addnetwork) {
                $state.go('user.viewAdNetworks', {adname : addnetwork.adagentname });
            }

            $scope.deleteAdNetwork = function(addnetwork) {
                technicalSupportService.deleteAdNetwork(addnetwork).success(function (data) {
                    var johnRemoved = $scope.addNetworkList.filter(function(el) {
                        return el.adagentname !== addnetwork.adagentname;
                    });
                    $scope.addNetworkList = johnRemoved;
                    toastr.success('Ad network Successfully deleted', 'Warning', {closeButton: true});
                }).error(function (error) {
                    toastr.error('Ad network delete Error', 'Warning', {closeButton: true});
                });
            }

            $scope.saveAdNetwork= function(addNetwork) {
                technicalSupportService.saveAdNetwork(addNetwork).success(function (data) {
                    toastr.success('Ad network Successfully saved', 'Warning', {closeButton: true});
                    $state.go('user.technicalSupporter');
                }).error(function (error) {
                    toastr.error('Ad network Saving Error', 'Warning', {closeButton: true});
                });
            }

             $scope.cancel = function(){
                 $state.go('user.technicalSupporter');
             }

            // View technical user details

              $scope.usersview = function(){
                $state.go('user.technicalRegisteruser');
              };

            // push-config-details save function
            $scope.savePushConfig = function (inputData) {
                // set app ID & user ID
                inputData.appId  = $scope.appId;
                inputData.userId = $scope.userId;
                // API request save push config details
                technicalSupportService.savePushConfigDetails(inputData)
                    .success(function (data) {
                        toastr.success('Push Config Details Successfully saved', 'Warning', {closeButton: true});
                    }).error(function (error) {
                        toastr.error('Push Config Details Saving Error', 'Warning', {closeButton: true});
                });
            };

           $scope.changePublishStatus = function () {
               technicalSupportService.changePublishStatus({appId : $scope.appId})
                   .success(function (data) {
                       toastr.success('Successfully Send mail to customer', 'success', {closeButton: true});
                   }).error(function (error) {
                   toastr.error('Send mail Error', 'Warning', {closeButton: true});
               });

           }

           $scope.sendApkEmail = function(id,fName,lName,appName,appId,appUserId){

               var appView = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + appUserId
                             + "&appId=" + appId + "&" + new Date().toISOString() + "/";


               var data = {
                email:id,
                fName:fName,
                lName:lName,
                appName:appName,
                appView: appView
               }
                console.log(data);
                technicalSupportService.sendApkEmail(data).success(function(data){
                    console.log("success");
                }).error(function(){
                    console.log("error " + error);

                });

           }

            /*technicalSupportService.getOperators()
                .success(function(result){

                    $scope.operators = result;
                    console.log($scope.operators);
                }).error(function(error){
                    toastr.error('Loading operators Error', 'Warning', {
                    closeButton: true
                });
            });*/

           $scope.appDescriptionView = function(appName, appData,appId,userId){
                console.log(appName);
                console.log(appData);
                var data = { appName:appName,appData:appData,id:appId,userId:userId}
                technicalSupportService.showPublishArticleDescription(data);

           }

          $scope.approvedOperatorsView = function(app,userList,operators){
                console.log(operators);
                var data = {app: app, userList: userList, operators:operators}
                technicalSupportService.showApprovedOperators(data);

           }

          $scope.commentView = function(appName,appId,comment,createdData){
                var parseData = {appName:appName , appId:appId ,comment:comment,date:createdData,commentList:$scope.commentsList}
                technicalSupportService.showAppcommentView(parseData);
          }

        $scope.saveServiceId = function(data){
            technicalSupportService.saveServiceId(data).success(function(result){

//                toastr.error('Service ID added Successfully', 'Success', {closeButton: true});
                $window.location.reload();
            }).error(function(error){

                if(error.isError){
                    toastr.error( error.message , 'Error', {closeButton: true});
                }else{
                    toastr.error('Error adding Service ID' , 'Warning', {closeButton: true});
                }
            });
        }


          $scope.getDes = function(id,des){
          var arr = [];

            if($scope.publishAppData){
                for(var i = 0;i < $scope.publishAppData.length;i++){
                    if($scope.publishAppData[i].appId == id){
                        if(des == "full"){
                            var obj = {
                                fullDes:$scope.publishAppData[i].fullDescription,
                                keyword:$scope.publishAppData[i].keyword,
                                price:$scope.publishAppData[i].operators
                            }

                            return obj;
                            break;
                        }else if(des == "short"){
                            return $scope.publishAppData[i].shortDescription;
                            break;
                        }else if(des == "comment"){
                            if($scope.publishAppData[i].comment){

                                return $scope.publishAppData[i].comment;
                                break;
                            }else{
                                return null;
                                break;
                            }
                        }else if (des == "serviceId"){

                            return $scope.publishAppData[i].serviceId;

                        }else{
                            if($scope.publishAppData[i].operators){
                                var operators = [];

                                if($scope.user){
                                    if($scope.user.userRole){
                                        var isSuperAdmin = $filter('filter')($scope.user.userRole, "SUPER_ADMIN").length>0;
                                        var isOperator = $filter('filter')($scope.user.userRole, "OPERATOR").length>0;
                                        if(isSuperAdmin){
                                            return $scope.publishAppData[i].operators;
                                        }else if(isOperator && $scope.user.operator){
                                            return $filter('filter')($scope.publishAppData[i].operators, {"operator": $scope.user.operator});
                                        }
                                    }
                                }

                                return [];
                                break;
                            }else{
                                return arr;
                            }

                        }
                    }
                }
            }
          }

          $scope.myObj = {
              "width" : "400px",
              "font-size" : "20px",
              "margin-top" : "10px",
              "margin-left" : "20px"
            }

          $scope.showAppView = function(appId,userId){

            var encUserId = userId + "/";
            var encAppId = appId + "/";


            var encryptedURL = btoa(encUserId + encAppId);


            $state.go('anon.appView', {
                userId: userId,
                appId: appId,
                p:encryptedURL
            });

          }

          $scope.apply = function(appId,status,email,fName,lName,appName,appUserId,operators){

          var appView = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + appUserId
                                       + "&appId=" + appId + "&" + new Date().toISOString() + "/";

                var data = {
                    id:appId,
                    status:status,
                    publishStatus: status,
                    email:email,
                    fName:fName,
                    lName:lName,
                    appName:appName,
                    appView:appView,
                    operators:operators
                }
                console.log(data);

                technicalSupportService.setAppststus(data).success(function(res){
                    $window.location.reload();
                }).error(function(error){
                    console.log(error);
                });
          }

          $scope.getAppOverallStatus = function(appId){
              var publishedStatus = '';
              $scope.publishAppData.forEach(function(appData){
                  if(appData.appId===appId){
                      publishedStatus = appData.publishedStatus;
                  }
              });
              return publishedStatus;
          }

          $scope.statusArray = [];

          $scope.getArr = function(model,status){

                if(status){

                     var curStatusObj = $filter('filter')($scope.appStatusArr,{ "code": status });

                           $scope.statusArray = $filter('filter')($scope.appStatusArr, function(value, index, array){
                          return curStatusObj[0].nextAvailable.includes(value.code);
                       });

                }

                return $scope.statusArray;
          }

          $scope.getAppsCount = function(id){
          var count = 0;
                $scope.appList.forEach(function(ele){
                    if (ele.userId == id){
                        if((ele.publishedStatus == "Approved" || ele.publishedStatus == "Pending")){
                            count++;
                        }
                    }
                });
                return count;
          }

          $scope.getColor = function(status){

            if(status){
                 var curStatusObj = $filter('filter')($scope.appStatusArr,{ "code": status });
                 if(curStatusObj){
                      return curStatusObj[0].color;
                 }
            }

          }

          /**
           * REPORT GENERATION - START
           **/


          /**
           * @description Responsible for showing and hiding search field
           *
           * @param tabName :: name of the clicked tab
           **/
          $scope.showHideSearchField = function ( tabName ) {

              //get subscription payment details
                getSubscriptionPayments();
              // If user selected tab is equals to reports hide the search field
              if (tabName === 'reports') {
                  $scope.showSearchField = false;
              } else {
                  $scope.showSearchField = true;
              }
          };

             /*
            Subuscription Payments
            */

           $scope.sortType = "name";
           $scope.sortReverse = true;
           var getSubscriptionPayments = function () {
            technicalSupportService.getSubscriptionPayments()
                .success(function (result){
                    $scope.subPayments = result;
                }).error(function (error){

                });
            }


            /**
             * REPORT GENERATION - END
             **/





        $scope.master = {};

        $scope.reconciliationReportsGet = function(){

            $scope.responseData = [];
            $scope.reconciliationResponseData =[];
            $scope.customerCareReportData = [];
            $scope.revenueAndTrafficReportResponseData = [];
            $scope.applicationBaseReportResponseData =[];
        };


        $scope.getReconciliation = function(data){
                $scope.reconciliationResponseData = [];

                if(data.report == "Daily"){


                   var sdate = $filter('date')(data.sdate, "yyyy-MM-dd");
                   var edate = $filter('date')(data.edate, "yyyy-MM-dd");

                    if(edate >= sdate) {
                        if (data.operator){

                            var dates = {dateFrom: sdate, dateTo: edate,operator:data.operator};

                            technicalSupportService.getReconciliationDataForDateRange(dates)
                                .success(function (response) {
                                    $scope.reconciliationResponseData = response;
                                    if ($scope.reconciliationResponseData.length<=0){
                                        toastr.error('No data available',
                                            'Warning', {closeButton: true});
                                    }

                                }).error(function (response) {
                                toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                            });
                        }else {
                            toastr.error('Please select operator ', 'Warning', {closeButton: true});

                        }
                    }
                    else{
                        toastr.error('From Date should less than To Date', 'Warning', {closeButton: true});
                    }
                }

                else if(data.report == "Monthly"){

                        var fromMonth = data.fromMonth;
                        var toMonth = data.toMonth;
                        var year = data.year;


                    if(toMonth>=fromMonth){
                        if (data.operator){

                        dates = {monthFrom:fromMonth, monthTo:toMonth, year:year,operator:data.operator}

                        technicalSupportService.getReconciliationDataForMonthly(dates)
                            .success(function(response){
                                $scope.reconciliationResponseData = response;
                                if ($scope.reconciliationResponseData.length<=0){
                                    toastr.error('No data available',
                                        'Warning', {closeButton: true});
                                }
                            })
                            .error(function(){
                                toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});

                            });
                        }else {
                            toastr.error('Please select operator ', 'Warning', {closeButton: true});

                        }
                    }
                    else{
                        toastr.error('Invalid month range', 'Warning', {closeButton: true});
                    }
                }
                else{

                    var fromYear = data.fromYear;
                    var toYear   = data.toYear;

                    if(toYear>=fromYear) {
                        if (data.operator) {
                            dates = {yearFrom: fromYear, yearTo: toYear,operator:data.operator};
                            technicalSupportService.getReconciliationDataForYearly(dates)
                                .success(function (response) {
                                    $scope.reconciliationResponseData = response;
                                    if ($scope.reconciliationResponseData.length<=0){
                                        toastr.error('No data available',
                                            'Warning', {closeButton: true});
                                    }
                                })
                                .error(function (response) {
                                    toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                                });

                        } else {
                            toastr.error('Please select operator ', 'Warning', {closeButton: true});

                        }
                    }else{

                        toastr.error('Invalid year range', 'Warning' , {closeButton: true});
                    }
                }
            }








        $scope.applicationBaseReportData = function(data){

            $scope.applicationBaseReportResponseData = [];


            if(data.report == "Daily"){


                var sdate = $filter('date')(data.sdate, "yyyy-MM-dd");
                var edate = $filter('date')(data.edate, "yyyy-MM-dd");

                if(edate >= sdate) {

                    if (data.appName){

                        if (data.operator){

                            var reqData = {dateFrom: sdate, dateTo: edate,appName:data.appName,operator:data.operator};

                            technicalSupportService.getApplicationBaseDailySummary(reqData)
                                .success(function (response) {
                                    $scope.applicationBaseReportResponseData = response;
                                    if ($scope.applicationBaseReportResponseData.length<=0){
                                        toastr.error('No data available',
                                            'Warning', {closeButton: true});
                                    }

                                }).error(function (response) {

                                toastr.error('applicationBase Report Loading Error', 'Warning', {closeButton: true});
                            });

                        }else {
                            toastr.error('Please select operator ', 'Warning', {closeButton: true});

                        }

                    }else {
                        toastr.error('Please select application name', 'Warning', {closeButton: true});
                    }
                }
                else{
                    toastr.error('Invalid date range', 'Warning', {closeButton: true});
                }
            }

            else if(data.report == "Monthly"){

                var fromMonth = data.fromMonth;
                var toMonth = data.toMonth;
                var year = data.year;


                if(toMonth>=fromMonth){

                    if (year){
                        if (data.appName) {
                            if (data.operator){

                                var reqData = {monthFrom: fromMonth, monthTo: toMonth, year: year, appName: data.appName,operator:data.operator}

                                technicalSupportService.getApplicationBaseMonthlySummary(reqData)
                                    .success(function (response) {
                                        $scope.applicationBaseReportResponseData = response;
                                        if ($scope.applicationBaseReportResponseData.length<=0){
                                            toastr.error('No data available',
                                                'Warning', {closeButton: true});
                                        }
                                    })
                                    .error(function () {
                                        toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                                    });
                            }else {
                                toastr.error('Please select operator ', 'Warning', {closeButton: true});

                            }
                        }else{
                            toastr.error('Please select application name', 'Warning', {closeButton: true});
                        }
                    }else {
                        toastr.error('Please select year', 'Warning', {closeButton: true});
                    }
                }
                else{
                    toastr.error('Invalid month range', 'Warning', {closeButton: true});
                }
            }
            else{
                var fromYear = data.fromYear;
                var toYear   = data.toYear;


                if(toYear>=fromYear){

                    if (data.appName){

                        if (data.operator){

                            var reqData = {yearFrom:fromYear, yearTo:toYear,appName:data.appName,operator:data.operator};
                            technicalSupportService. getApplicationBaseYearlySummary(reqData)
                                .success(function(response){
                                    $scope.applicationBaseReportResponseData = response;
                                    if ($scope.applicationBaseReportResponseData.length<=0){
                                        toastr.error('No data available',
                                            'Warning', {closeButton: true});
                                    }
                                })
                                .error(function(response){
                                    toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                                });
                        }else {
                            toastr.error('Please select operator ', 'Warning', {closeButton: true});

                        }
                    }else {
                            toastr.error('Please select application name ', 'Warning' , {closeButton: true});
                    }
                } else{
                    toastr.error('Invalid year range', 'Warning' , {closeButton: true});
                }
            }
        }





        $scope.revenueAndTrafficReportData = function(data){
            $scope.revenueAndTrafficReportResponseData = [];
            if(data.report == "Daily"){


                var sdate = $filter('date')(data.sdate, "yyyy-MM-dd");
                var edate = $filter('date')(data.edate, "yyyy-MM-dd");
                var reqData ="";

                if(edate >= sdate) {
                    if (data.operator){
                        if ($scope.user.userRole=="APP_CREATOR"){
                            if (data.appName){
                                reqData = {dateFrom: sdate, dateTo: edate,operator:data.operator,appId:data.appName};
                            }else {
                                toastr.error('Please select Application name', 'Warning', {closeButton: true});
                                return;
                            }
                        }else {
                            reqData = {dateFrom: sdate, dateTo: edate,operator:data.operator};

                        }
                        technicalSupportService.getRevenueAndTrafficSummaryForDateRange(reqData)
                            .success(function (response) {
                                $scope.revenueAndTrafficReportResponseData = response;
                                if ($scope.revenueAndTrafficReportResponseData.length<=0){
                                    toastr.error('No data available',
                                        'Warning', {closeButton: true});
                                }

                            }).error(function (response) {
                            toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                        });
                    }else {
                        toastr.error('Please select operator type', 'Warning', {closeButton: true});
                    }
                }
                else{
                    toastr.error('From Date should less than To Date', 'Warning', {closeButton: true});
                }
            }

            else if(data.report == "Monthly"){

                var fromMonth = data.fromMonth;
                var toMonth = data.toMonth;
                var year = data.year;
                var reqData ="";
;

                if(toMonth>=fromMonth){

                    if (year){
                        if (data.operator) {

                            if ($scope.user.userRole=="APP_CREATOR"){
                                if (data.appName){
                                  reqData = {monthFrom: fromMonth, monthTo: toMonth, year: year, operator: data.operator,appId:data.appName}
                                }else {
                                    toastr.error('Please select Application name', 'Warning', {closeButton: true});
                                    return;
                                }
                            }else {
                                 reqData = {monthFrom: fromMonth, monthTo: toMonth, year: year, operator: data.operator}
                            }


                            technicalSupportService.getRevenueAndTrafficSummaryForMonthly(reqData)
                                .success(function (response) {
                                    $scope.revenueAndTrafficReportResponseData = response;
                                    if ($scope.revenueAndTrafficReportResponseData.length<=0){
                                        toastr.error('No data available',
                                            'Warning', {closeButton: true});
                                    }
                                })
                                .error(function () {
                                    toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                                });
                        }else{
                            toastr.error('Please select operator', 'Warning', {closeButton: true});
                        }
                    }else {
                        toastr.error('Please select year', 'Warning', {closeButton: true});
                    }
                }
                else{
                    toastr.error('Invalid month range', 'Warning', {closeButton: true});
                }
            }
            else{
                var fromYear = data.fromYear;
                var toYear   = data.toYear;

                if(toYear>=fromYear){
                    if (data.operator){
                        if ($scope.user.userRole=="APP_CREATOR"){
                            if (data.appName){
                                var reqData = {yearFrom:fromYear, yearTo:toYear,operator:data.operator,appId:appId};
                            }else {
                                toastr.error('Please select Application name', 'Warning', {closeButton: true});
                                return;
                            }
                        }else {
                            var reqData = {yearFrom:fromYear, yearTo:toYear,operator:data.operator};
                        }
                        technicalSupportService. getRevenueAndTrafficSummaryForYearly(reqData)
                            .success(function(response){
                                $scope.revenueAndTrafficReportResponseData = response;
                                if ($scope.revenueAndTrafficReportResponseData.length<=0){
                                    toastr.error('No data available',
                                        'Warning', {closeButton: true});
                                }
                            })
                            .error(function(response){
                                toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                            });

                    }else {
                        toastr.error('Please select operator ', 'Warning' , {closeButton: true});
                    }
                } else{
                    toastr.error('Invalid year range', 'Warning' , {closeButton: true});
                }
            }
        }



        $scope.getFailedTransactionData = function(data){
            $scope.responseData = [];

            if(data.report == "Daily"){


                var fromDate = $filter('date')(data.fromDate, "yyyy-MM-dd");
                var toDate = $filter('date')(data.toDate, "yyyy-MM-dd");

                if(toDate >= fromDate) {

                    if (data.operator){

                        var dates = {dateFrom: fromDate, dateTo: toDate,operator: data.operator};

                        technicalSupportService.getFailedTransactionReportDataForDateRange(dates)
                            .success(function (response) {
                                $scope.responseData = response;
                                if ($scope.responseData.length<=0){
                                    toastr.error('No data available',
                                        'Warning', {closeButton: true});
                                }

                            }).error(function (response) {
                            toastr.error('FailedTransaction Reports Loading Error', 'Warning', {closeButton: true});
                        });
                    }else {
                        toastr.error('Please select operator ', 'Warning' , {closeButton: true});
                    }
                }
                else{
                    toastr.error('Invalid date range', 'Warning', {closeButton: true});
                }
            }
        }

        $scope.getCustomerCareReportData = function(pramData){
            $scope.customerCareReportData = [];


                var fromDate = $filter('date')(pramData.fromDate, "yyyy-MM-dd");
                var toDate = $filter('date')(pramData.toDate, "yyyy-MM-dd");

                if (toDate >= fromDate) {

                    var mobile = pramData.msisdn;
                    var pattern = /^\d{11}$/;
                    if (pattern.test(mobile)) {

                        technicalSupportService.getOperator({msisdn:mobile})
                            .success(function (response) {
                                    if ($scope.user.userRole=="OPERATOR"){

                                        if (response.operator==$scope.user.operator){

                                            var data = {dateFrom: fromDate, dateTo: toDate, msisdn: pramData.msisdn};

                                            technicalSupportService.getPaymentStatusOfUser(data)
                                                .success(function (response) {
                                                    $scope.customerCareReportData = response;
                                                    if ($scope.customerCareReportData.length<=0){
                                                        toastr.error('No data available',
                                                            'Warning', {closeButton: true});
                                                    }


                                                }).error(function (response) {
                                                toastr.error('FailedTransaction Reports Loading Error', 'Warning', {closeButton: true});
                                            });

                                        }else {

                                            toastr.error('You are not allowed for this operation', 'Warning', {closeButton: true});
                                        }

                                    }else {
                                        var data = {dateFrom: fromDate, dateTo: toDate, msisdn: pramData.msisdn};

                                        technicalSupportService.getPaymentStatusOfUser(data)
                                            .success(function (response) {
                                                $scope.customerCareReportData = response;
                                                if ($scope.customerCareReportData.length<=0){
                                                    toastr.error('No data available',
                                                        'Warning', {closeButton: true});
                                                }

                                            }).error(function (response) {
                                            toastr.error('FailedTransaction Reports Loading Error', 'Warning', {closeButton: true});
                                        });

                                    }


                            }).error(function (response) {
                            toastr.error('FailedTransaction Reports Loading Error', 'Warning', {closeButton: true});
                        });
                    }else {
                        toastr.error('Invalid mobile number', 'Warning', {closeButton: true});
                    }
                }
                else {
                    toastr.error('Invalid date range', 'Warning', {closeButton: true});
                }
        }



        $scope.downloadCsv = function(reportData,args){

            var dataArray = [];
            var reportDataArray = reportData;
            var range = "";
            var rangeValue="";

            if (args.reportRange=="Daily"){
                range = "Date";
            }else if (args.reportRange=="Monthly"){
                range = "Month";
            }else {
                range = "Year"
            }

            if (args.reportType=="RECONCILIATION"){

                dataArray.push(range  +"," + "App Id"+ "," +"Name" + ","
                    + "Bank Code" + "," +"Branch Code" + ","+"Branch Name" + ","+"Bank A/C No" +
                    ","+"Service Provide Earnings" +'\r\n');

                reportDataArray.forEach(function(obj){

                    if (args.reportRange=="Daily"){
                        rangeValue = obj.date;
                    }else if (args.reportRange=="Monthly"){
                        rangeValue = obj.month;
                    }else {
                        rangeValue = obj.year;
                    }

                    var str = rangeValue + "," + obj.uniqueAppId +"," + obj.name + + obj.bankCode +"," + obj.branchCode +","
                        + obj.branchName +"," + obj.bankAccountNumber+"," + obj.revenue + '\r\n';

                    dataArray.push(str);
                });

            }else if (args.reportType=="failedTransaction"){

                dataArray.push(range +"," + "Service Provider"+ "," +"Application Name" + ","
                    + "Error Code" + "," +"Total"+'\r\n');


                reportDataArray.forEach(function(obj){

                    var str = obj.date + "," + obj.operator +"," + obj.appName + "," + obj.statusCode +"," + obj.count +'\r\n';

                    dataArray.push(str);
                });
            }else if (args.reportType=="customerCareReport"){

                dataArray.push("MSISDN"+ "," +"Application Name" + ","
                    + "Date" + "," +"Status"+','+'Charged Amount'+'\r\n');


                reportDataArray.forEach(function(obj){

                    var str = obj.msisdn + "," + obj.appName +"," + obj.dateTime + "," + obj.status +"," + obj.amount +'\r\n';

                    dataArray.push(str);
                });
            }else if (args.reportType=="revenueAndTrafficReportData"){

                dataArray.push(range + "," +"Operator" + ","
                    + "AppMaker Revenue" + "," +"AppMaker Traffic"+','+'Total Revenue'+","+'Total Revenue'+'\r\n');


                reportDataArray.forEach(function(obj){


                    if (args.reportRange=="Daily"){
                        rangeValue = obj.date;
                    }else if (args.reportRange=="Monthly"){
                        rangeValue = obj.month;
                    }else {
                        rangeValue = obj.year;
                    }

                    var str = rangeValue + "," + obj.operator +"," + obj.revenue + "," + obj.viewCount +"," + obj.revenue +"," + obj.viewCount+'\r\n';

                    dataArray.push(str);
                });
            }else if (args.reportType=="applicationBaseReport"){

                dataArray.push("Application" + "," +"Type" + ","
                    + "CaaS Taxable" + "," +range+','+'Operator'+","+'Platform Earning'+","+'SP Earning'+","
                    +'Application Total Revenue'+","+'App. Tot. Traffic'+","+'New Registrations Count'+","
                    +'New De-Reg Count'+","+'Total Subscribers'+'\r\n');


                reportDataArray.forEach(function(obj){


                    if (args.reportRange=="Daily"){
                        rangeValue = obj.date;
                    }else if (args.reportRange=="Monthly"){
                        rangeValue = obj.month;
                    }else {
                        rangeValue = obj.year;
                    }

                    var str = obj.appName + "," + obj.type +"," + false + "," + rangeValue +"," + obj.operator
                        +"," + obj.platformEarning+"," + obj.spEarning+","
                        + obj.appTotRevenue+"," + obj.appTrafficCount+"," + obj.subscriptionCount+","
                        + obj.unSubscriptionCount+"," + obj.totSubs+'\r\n';


                    dataArray.push(str);
                });
            }


            var csv = "";

            for( i=0 ; i<dataArray.length; i++ ){
                        csv += dataArray[i];
                }
            var data, filename, csvButton;
            if (csv == null) return;

            filename = args.filename || 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);
            csvButton = document.createElement('a');
            csvButton.setAttribute('href', data);
          //  csvButton.setAttribute('download', filename);
            csvButton.click();

        }

    }

})();
