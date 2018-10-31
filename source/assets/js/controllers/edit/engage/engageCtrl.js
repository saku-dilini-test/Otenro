(function() {
    'use strict';
    angular.module("appEdit").controller("EngageCtrl", ['$scope', '$mdDialog', '$rootScope', '$auth', 'toastr',
        'engageService', '$http', 'SERVER_URL','$log','initialData', EngageCtrl]);




    function EngageCtrl($scope, $mdDialog, $rootScope, $auth, toastr, engageService, $http, SERVER_URL,$log ,initialData) {

        $scope.url = SERVER_URL;
        $scope.pushMessage = {};
        $scope.pushMessage.type = "A";
        $scope.scheduleType = "A";
        const SEND_NOW = 'send_now';
        const SCHEDULED = 'scheduled';
        if (initialData){
            $scope.pushMessage = initialData;
            if($scope.pushMessage.article){
                $scope.linkArticle = true;
            }
        }

        io.socket.get('/edit/pushMessage/subscribe', function(data){

            console.log('Subscribe Data => ' + JSON.stringify(data, null, 2))
        });

        io.socket.on('pushmessage', function(socketData){

            if (socketData.verb === 'updated') {

                var updatedMessage = $scope.pushedMessages.filter(function(message){

                    return message.id === socketData.data.id;
                });

                var updateMessageIndex = $scope.pushedMessages.indexOf(updatedMessage[0]);

                if (updateMessageIndex > -1) {

                    $scope.pushedMessages[updateMessageIndex].status = socketData.data.status;
                    $scope.$apply();
                }
            }
        });

        // //get all app registered user details
        //
        // var getAppUserData = function () {
        //     engageService. getAppUserData()
        //         .success(function (result) {
        //             for(var i=0; i<result.length; i++){
        //                 var date = new Date(result[i].updatedAt);
        //                 $scope.year = date.getFullYear();
        //                 $scope.month = date.getMonth() + 1;
        //                 $scope.date = date.getDate();
        //                 result[i].registeredDate = $scope.year + "-" + $scope.month + "-" + $scope.date;
        //             }
        //             $scope.appuserList = result;
        //         }).error(function (error) {
        //         toastr.error('Loading Error', 'Warning', {
        //             closeButton: true
        //         });
        //     })
        // }
        // getAppUserData();

        // $scope.redirect = function(data){
        //     return engageService.showAllordersView(data);
        // }

        $scope.downLoadSampleFile = function () {

            $http({
                method: 'POST',
                url: SERVER_URL+"edit/sendSampleFile" ,
                data: {file:""},
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                headers = headers();

                var filename = headers['x-filename'];
                var contentType = headers['content-type'];

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], {type: contentType});
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function (data) {
                console.log(data);
            });
        };


        $scope.edit =function (data) {

            return engageService.showPushMessageEditDialog(data);

        };

        engageService.getAllArticles().success(function(data){

            console.log(data);
            $scope.linkedArticles = data;

        });

        $scope.clearArticle = function(isAllow){
            if(!isAllow){
                $scope.pushMessage.article = null;
            }
        };

        $scope.delete = function (data) {

            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){

                    this.message = "Are you sure you want to delete this record ?";

                    this.confirm = function click(){

                        engageService.deletePushMessage(data)
                            .success(function(data){
                                toastr.success('Successfully Deleted ', 'Deleted', {
                                    closeButton: true
                                });
                                $mdDialog.hide();
                                return engageService.showPushMessageDialog();
                            })
                            .error(function(err){
                                $mdDialog.hide();
                                toastr.error('Error on deleting push message record', 'Warning', {
                                    closeButton: true
                                });
                            })



                    },
                        this.cancel = function click(){
                            $mdDialog.hide();
                            return engageService.showPushMessageDialog();

                        }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting Push Message Record </h1>' +
                '</div>' +
                '<br>'+
                '<div style="text-align:center">' +
                '<lable>{{dialogCtrl.message}}</lable>' +
                '</div>' +
                '<br><br>' +
                '<div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">No</md-button>'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Yes</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        },

         $scope.isSent  = function (data) {

            if (data.status == 'sent'){

                return true;
            }else {

                return false;
            }

         }


        $scope.uploadFile = function(){

            var file = $scope.myFile;
            console.log('file is '  + file);
            console.dir(file);

            var uploadUrl = SERVER_URL+"edit/saveSchedulePushMassageFile";
            console.log(uploadUrl);


            var fd = new FormData();
            fd.append("appId",$rootScope.appId);
            fd.append('file', file);
            fd.append('type', $scope.scheduleType);

            if (file){
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function(data){
                    toastr.success("Upload Success", {
                        closeButton: true
                    });

                    return engageService.showPushMessageDialog();

                }).error(function(error){
                    toastr.error(error.error, 'Error', {
                        closeButton: true
                    });

                });

            }else {

                toastr.error('Please add a file to upload', 'Warning', {
                    closeButton: true
                });
            }
        };


        $scope.sendPushMessage=function(){
            return engageService.showPushMessageSendDialog();
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.back = function() {
            return engageService.showPushMessageDialog();
        };

        // $scope.backToUserView = function(){
        //     return engageService.showAppUserDialog();
        // };


        $scope.sendMsgNow = function(message){
            if ($scope.isPushValidationOk(SEND_NOW, message)) {
                if(message.date != ""){
                    toastr.error('Clean the schedule message', 'Warning', {
                        closeButton: true
                    });
                }
                else{
                    message.appId = $rootScope.appId;
                    message.userId = $auth.getPayload().id;
                    engageService.sendPushMessage(message)
                        .success(function(data){
                            toastr.success('The message has been successfully sent.', 'Message Sent', {
                                closeButton: true
                            });
                            return engageService.showPushMessageDialog();
                        })
                        .error(function(err){
                            toastr.error('Push massage configuration  not found. Please contact support@otenro.com ', 'Warning', {
                                closeButton: true
                            });
                        })
                }
            } else {
                toastr.error('Please enter the message field before sending.', 'Warning', {
                    closeButton: true
                });
            }
        };

        $scope.save = function(message){

        if (!$scope.linkArticle && message.article) {

            message.article = null;
        }

        if($scope.linkArticle && !$scope.pushMessage.article){
                toastr.error('Please select an article before save.', 'Warning', {
                    closeButton: true
                });
        }else{

            if ($scope.isPushValidationOk(SCHEDULED, message)) {
                message.appId = $rootScope.appId;
                message.userId = $auth.getPayload().id;

                var now = new Date();
                if (message.date){
                    var sdDate = $scope.getScheduledDate(message.date);
                    if (sdDate < now){
                        toastr.error('Invalid date selection', 'Warning', {
                            closeButton: true
                        });
                        return ;
                    }
                }

                engageService.saveSchedulePushMassage(message)
                    .success(function(data){
                        toastr.success('Successfully Saved ', 'Saved', {
                            closeButton: true
                        });
                        return engageService.showPushMessageDialog();
                    })
                    .error(function(err){
                        toastr.error('Push massage configuration  not found . Please contact support@otenro.com' , 'Warning', {
                            closeButton: true
                        });
                    });
            } else {
                toastr.error('Please fill required fields before save.', 'Warning', {
                    closeButton: true
                });
            }
           }
        };

        //Method use to get a Date object for the format "DD/MM/YY hh:mm" (eg.12/09/18 00:00)
        $scope.getScheduledDate = function(dateStr){
            var d = dateStr.substring(0,2);
            var m = parseInt(dateStr.substring(3,5))-1;
            var y = '20' + dateStr.substring(6,8);
            var h = dateStr.substring(9,11);
            var min = dateStr.substring(12,14);
            return new Date(y,m,d,h,min);
        };

        /**
         * Check for push message fields validations
         *
         * @param type {String} - message type as a string whether send_now or scheduled
         * @param message {Json} - push message data
         *
         * @return boolean - validations ok or failed status as true or false
         *
         **/
        $scope.isPushValidationOk = function (type, msg) {
            // If type is send_now
            if (type === SEND_NOW) {
                if (msg.message !== "" && msg.message !== undefined) {
                    return true;
                } else {
                    return false;
                }

            } else if (type === SCHEDULED) {
                if ((msg.message !== "" && msg.message !== undefined) && msg.date !== "") {
                    return true;
                } else {
                    return false;
                }
            }
        };


          var  userId= $auth.getPayload().id

        engageService.getMessageDetails(userId)
            .success(function(data){
                $scope.pushedMessages = data;
            })
            .error(function(err){
                $log.debug(err);
            });

        
        // if(initialData != null) {
        //     $scope.user = initialData;
        //       var  registeredUser= $scope.user.id;
        //     engageService.getUserOrders(registeredUser)
        //         .success(function (data) {
        //
        //             $scope.orders = data;
        //             console.log(user);
        //         })
        //         .error(function (err) {
        //             $log.debug(err);
        //         });
        // }
        // Sales & Promotions

        $scope.addNewSalesAndPromotions = function () {
            return engageService.showPromotionsAndSalesAddNewDialog();
        };

        $scope.pushDateDisable = false;

        $scope.dateChanged = function (date) {
            // if(dateYear dateMonth dateDay)
            // {
                var dateDay = new Date().getDay();
                var dateX = new Date();
                var dateMonth = new Date().getFullYear();
                var dateYear = new Date().getMonth();

                console.log(dateDay);
                console.log(dateMonth);
                console.log(dateYear);
                console.log(dateX);
                console.log(date);
                console.log(date.day);
                console.log(date.year);
                console.log(date.month);
            // }
        };
    }

})();
