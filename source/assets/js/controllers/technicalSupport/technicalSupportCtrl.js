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
        .controller('technicalSupportCtrl',
            ['$scope','$mdDialog','$auth','toastr','$state','$stateParams','SERVER_URL','ME_SERVER','$filter','$window','userProfileResource','technicalSupportService',
                technicalSupportCtrl
            ]);


    function technicalSupportCtrl($scope,$mdDialog,$auth,toastr,$state,$stateParams,SERVER_URL,ME_SERVER,$filter,$window,userProfileResource,technicalSupportService) {

            $scope.splash = [];
            $scope.publishSplash = [];
            $scope.appList = [];
            $scope.deviceView ="mobile";
            $scope.showSearchField = true;
            $scope.reconciliations = null;
            var tempImagePath;

//            console.log(initialData);

            if($stateParams){

                $scope.userId = $stateParams.userId;
                $scope.appId = $stateParams.appId;

                //Get User Details
                var profParams = { userId: $stateParams.userId }
                userProfileResource.getUserProfile(profParams).success(function (data) {
                    $scope.user = data;
                    console.log($scope.user);
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
                                                    console.log(app);
                                                $scope.appList.push(app);
                                            }
                                        });
                                    });
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

            $scope.checkStatus = function(appId){

            }

           $scope.getUserAppData = function (userId) {
                var data ={selectedUserId:userId}
               $state.go('user.viewUserApps',data);

            }


            getAllAppDataList();


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

            technicalSupportService.getOperators()
                .success(function(result){

                    $scope.operators = result;
                    console.log($scope.operators);
                }).error(function(error){
                    toastr.error('Loading operators Error', 'Warning', {
                    closeButton: true
                });
            });

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
                var data = {appName:appName , appId:appId ,comment:comment,date:createdData,commentList:$scope.commentsList}
                technicalSupportService.showAppcommentView(data);

          }

        $scope.saveServiceId = function(data){
            technicalSupportService.saveServiceId(data).success(function(result){

//                toastr.error('Service ID added Successfully', 'Success', {closeButton: true});
                $window.location.reload();
            }).error(function(error){
                toastr.error('Error adding Service ID', 'Warning', {closeButton: true});
            });
        }

        if($scope.user){
            if($scope.user.userRole != "ADMIN"){
              technicalSupportService.getComments().success(function(data){
                    console.log(data);
                        $scope.commentsList = data;
              });
            }
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
                                price:$scope.publishAppData[i].price
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
                        if((ele.status == "APPROVED" || ele.status == "PENDING")){
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


            var reconciliationReports;
            $scope.reports = [
                    {name:"Date Range"},
                    {name:"Monthly"} ,
                    {name:"Yearly"}
            ];
            $scope.currentYear = new Date().getFullYear();
            $scope.current =   $scope.currentYear -1;
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

            $scope.master = {};

            $scope.reconciliationReportsGet = function(){
                $scope.reconciliations = [];
            }
            $scope.getReconciliation = function(Date){
                $scope.reconciliations = [];

                var dates;
                if(Date.report == "Date Range"){


                   var sdate = $filter('date')(Date.sdate, "yyyy-MM-dd");
                   var edate = $filter('date')(Date.edate, "yyyy-MM-dd");

                    if(edate >= sdate) {

                        var dates = {dateFrom: sdate, dateTo: edate};

                        technicalSupportService.getReconciliationDataForDateRange(dates)
                            .success(function (response) {
                                $scope.reconciliations = response;

                            }).error(function (response) {
                            toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                        });

                    }
                    else{
                        toastr.error('From Date should less than To Date', 'Warning', {closeButton: true});
                    }
                }

                else if(Date.report == "Monthly"){


                    if(toMonth>fromMonth){

                        var  fromMonth = Date.fromMonth;
                        var toMonth = Date.toMonth;
                        var year = Date.year;

                        dates = {monthFrom:fromMonth, monthTo:toMonth, year:year}
                        technicalSupportService.getReconciliationDataForMonthly(dates)
                            .success(function(response){
                                $scope.reconciliations = response;
                            })
                            .error(function(){
                                toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});

                            });

                    }
                    else{
                        toastr.error('From Month should less than To Month', 'Warning', {closeButton: true});
                    }

                }

                else{

                    var fromYear = Date.fromYear;
                    var toYear   = Date.toYear;

                    if(toYear>=fromYear){
                        dates = {yearFrom:fromYear, yearTo:toYear};
                        technicalSupportService. getReconciliationDataForYearly(dates)
                            .success(function(response){
                                $scope.reconciliations = response;
                            })
                            .error(function(response){
                                toastr.error('Reconciliations Reports Loading Error', 'Warning', {closeButton: true});
                            });

                    }
                    else{

                        toastr.error('From Year Should less then To Year', 'Warning' , {closeButton: true});
                    }


                }


            }

        $scope.csvReconciliations = function(reconciliationsData,args){

            var reconciliationsArray = [];
            var array = reconciliationsData
            console.log(array);

            reconciliationsArray.push("Service Provider" +"," + "App Id"+ "," +"Name" + "," + "Bank Code" + "," +"Branch Code" + ","+"Branch Name" + ","+"Bank A/C No" + ","+"Service Provide Earnings" +'\r\n');
            array.forEach(function(obj){

            var str = obj.userId + "," + obj.appId +"," + obj.name + + obj.bankCode +"," + obj.branchCode +"," + obj.branchName +"," + obj.bankAccountNumber+"," + obj.revenue + '\r\n';

            reconciliationsArray.push(str);


            });

            var csv = "";

            for( i=0 ; i<reconciliationsArray.length; i++ ){
                        csv += reconciliationsArray[i];
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
