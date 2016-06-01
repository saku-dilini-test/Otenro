(function() {
    'use strict';
    angular.module("appEdit").controller("MainMenuCtrl", ['$scope', '$mdDialog', '$rootScope', 'mainMenuService','$http',
        'commerceService','toastr', MainMenuCtrl]);

    function MainMenuCtrl($scope, $mdDialog, $rootScope, mainMenuService,$http,commerceService,toastr) {

        var reqData = {
            appId:$rootScope.appId
        };

        $scope.topLevel  = '';

        commerceService.getMainMenuList()
            .success(function (result) {
                if(result){
                    commerceService.getCategoryList()
                        .success(function (secondResult) {
                            if(secondResult){
                                commerceService.getProductList()
                                    .success(function (thirdResult) {
                                        if(thirdResult){

                                            for(var z=0; z< result.length ; z++){
                                                result[z].nodes=[];
                                                for(var i=0 ; i < secondResult.length ; i++) {
                                                    if( result[z].id == secondResult[i].mainId ){
                                                      if(thirdResult){
                                                          secondResult[i].nodes=[];
                                                            for(var j=0 ;j < thirdResult.length ;j++){
                                                                if(secondResult[i].id == thirdResult[j].childId){
                                                                     thirdResult[j].nodes=[];
                                                                     secondResult[i].nodes.push(thirdResult[j]);
                                                                }
                                                            }
                                                            result[z].nodes.push(secondResult[i]);
                                                      }else{
                                                          result[z].nodes.push(secondResult[i]);
                                                      }
                                                    }

                                                }
                                            }
                                            $scope.menuItems= result;

                                            /**
                                             * If null main menu collection
                                             */
                                            if(result.length == 0 && secondResult.length != 0){
                                                $scope.menuItems= secondResult;
                                                $scope.topLevel  = 'secondNavi';  // This should comes DB
                                            }
                                            //console.log("Result "+JSON.stringify(result));
                                        }

                                    }).error(function (error) {
                                        toastr.error('Sub child Loading Error :', 'Error', {
                                            closeButton: true
                                        });
                                    });
                            }
                        }).error(function (error) {
                            toastr.error('Child Loading Error :', 'Error', {
                                closeButton: true
                            });
                        });
                }
            }).error(function (error) {
                toastr.error('Main Loading Error :', 'Error', {
                    closeButton: true
                });
            });

        $scope.tempplayer = "";

        $scope.updateNames = function (){
            if($scope.tempplayer === "") return;
            $scope.menuItems.push({menuName: $scope.tempplayer.tempName,icon:$scope.tempplayer.tempIcon});
            $scope.tempplayer.tempName = "";
            $scope.tempplayer.tempIcon = "glyphicon glyphicon-asterisk";
        };

        //$scope.deleteMainMenu = function(frontData,$index){
        //    if(typeof frontData.appId == 'undefined'){
        //        $scope.menuItems.splice($index, 1);
        //    }else {
        //        mainMenuService.checkMainMenu(frontData).success(function (data) {
        //            console.log(data);
        //            if (data.message == 'YES') {
        //                alert('warning Unable to delete Main Menu');
        //            }else if(data.message == 'NO'){
        //                mainMenuService.deleteMainMenu(frontData).success(function (data) {
        //                    console.log(data);
        //                    if (data.message == 'OK') {
        //                        $scope.menuItems.splice($index, 1);
        //                    }else{
        //                        alert('warning Unable to delete Main Menu');
        //                    }
        //                }).error(function (err) {
        //                    alert('warning Unable to delete Main Menu');
        //                });
        //            }else{
        //                alert('warning Unable to delete Main Menu');
        //            }
        //        }).error(function (err) {
        //            alert('warning Unable to delete Main Menu');
        //        });
        //    }
        //};

        $scope.saveMainMenu = function() {
            var dataPrams = {
                menuItems : $scope.menuItems,
                appId:$rootScope.appId,
                topLevel : $scope.topLevel
            };
            mainMenuService.saveMainMenu(dataPrams).success(function(data) {
                $scope.mainMenu = data;
                toastr.success('Successfully Added', 'Success', {
                    closeButton: true
                });
                $mdDialog.hide();
            }).error(function(err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };

        $scope.removes = function (scope) {
            var nodeData = scope.$modelValue;
            if(nodeData.nodes.length > 0){
                toastr.error('Cant delete Sub levels available :', 'Warning', {
                    closeButton: true
                });
            }else{
                mainMenuService.deleteData(nodeData).success(function(data) {
                    scope.remove();
                    toastr.success(data.message, 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                });
            }
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
            console.log(nodeData);
            if(nodeData.link){
                var childParams={
                    name : nodeData.name + '.' + (nodeData.nodes.length + 1),
                    mainId : nodeData.id ,
                    appId : $rootScope.appId
                };
                mainMenuService.addChild(childParams).success(function(data) {
                    nodeData.nodes.push({
                        id : data.id,
                        name: data.name,
                        mainId : data.mainId ,
                        appId : data.appId,
                        imageUrl : data.imageUrl,
                        nodes: []
                    });
                }).success(function(data) {
                    toastr.success("Successfully added new navigation", 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });


            }if(nodeData.mainId) {
                var subParams={
                    name : nodeData.name + '.' + (nodeData.nodes.length + 1),
                    childId : nodeData.id ,
                    appId : $rootScope.appId
                };
                mainMenuService.addSubChild(subParams).success(function(data) {
                    nodeData.nodes.push({
                        id : data.id,
                        name: data.name,
                        childId : data.childId ,
                        appId : data.appId,
                        imageUrl : data.imageUrl,
                        nodes: []
                    });
                }).success(function(data) {
                    toastr.success("Successfully added new navigation", 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err.message, 'Warning', {
                        closeButton: true
                    });
                });
            }if(!nodeData.mainId && !nodeData.link){
                toastr.error("Not allow", 'Warning', {
                    closeButton: true
                });
            }

        };

        $scope.addMenu = function(){
            var params={
                name : "New menu",
                link : "new menu",
                appId : $rootScope.appId
            };
            mainMenuService.addMenu(params).success(function(data) {
                $scope.menuItems.push({
                    id : data.id,
                    name : data.name,
                    link : data.link,
                    icon : data.icon,
                    appId : data.appId,
                });
            }).success(function(data) {
                toastr.success("Successfully added new navigation", 'Message', {
                    closeButton: true
                });
            }).error(function(err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };

        $scope.edit = function(scope){
            var nodeData = scope.$modelValue;
            console.log( nodeData);
            if(nodeData.mainId){
                return mainMenuService.showChildDialog(nodeData);
            }else{
                return mainMenuService.showSubChildDialog(nodeData);
            }
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };

    }
})();
