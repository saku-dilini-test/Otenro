/**
 * Created by udeshikaperera on 26/08/2015.as
 */
(function(){
    angular.module('appEdit').controller('AppEditAreaCtrl',[
        '$scope', '$stateParams', '$rootScope', '$auth', 'appEditResource', 'userProfileService', 'ME_APP_SERVER',
        'toastr','mySharedService','$interval','dashboardService','$mdDialog','$cookieStore','currencyService',
        'templateService','SERVER_URL','$log','$state','$http',
        AppEditAreaCtrl]);

    function AppEditAreaCtrl($scope,$stateParams,$rootScope,$auth,appEditResource,userProfileService,ME_APP_SERVER,
                             toastr,mySharedService,$interval,dashboardService,$mdDialog,$cookieStore,currencyService,
                             templateService,SERVER_URL,$log,$state,$http){

        $rootScope.bodyClass = 'appEdit';
        $scope.contentUrl = true;
        var encParam = $stateParams.p;
        var decParamAppId = atob(encParam);
        var templateCheck = $stateParams.isNew;

        if(!encParam){
            decParamAppId = $stateParams.appId;
            if(!decParamAppId)
            {
                $state.go('user.dashboard');
            }
        }

        $scope.tempIsNew = $stateParams.isNew;
        $scope.appId = decParamAppId; //$stateParams.appId;
        $rootScope.appId = decParamAppId; //$stateParams.appId;
        $rootScope.tempNew = $stateParams.isNew;
        $scope.userId = $auth.getPayload().id;
        $rootScope.userId = $auth.getPayload().id;
        $scope.isArticleApp = false;

        //$scope.changeTemplate = $rootScope.changeTemplate;
        var changeTemp = JSON.parse(localStorage.getItem('changeTemplate'));
        if(changeTemp){
           // $scope.changeTemplate  = changeTemp.showConfirm;
        }

        $log.debug(localStorage.getItem('changeTemplate'));
        $log.debug($scope.changeTemplate);

        currencyService.getCurrency()
            .success(function (result) {
                if(typeof result === 'undefined'){
                    $rootScope.currency = '$';
                }else {
                    $rootScope.currency = result;
                }

            }).error(function (error) {
        })



            $scope.urlPath1 = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                + "&appId=" + $rootScope.appId + "&" + new Date().toISOString() + "/";

            $scope.appTemplateUrl = SERVER_URL + "progressiveTemplates/viewProgUrl?userId=" + $auth.getPayload().id
                + "&appId=" + $rootScope.appId + "&isFromCMSAppView=1" + "&" + new Date().toISOString() + "/";


        // $http.get(urlPath)
        //     .success(function(){
        //         console.log("working1")
        //     })
        //     .error(function() {
        //         console.log("working2")
        //     });


        //$scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
        //                        +'/templates/'+$stateParams.appId;


        appEditResource.getSelectedApp({appId: $scope.appId})
            .success(function(data) {

                /**
                 * TODO : This should change later according type of template category
                 * @type {boolean}
                 */
                if(data.templateCategory == 3){
                    $scope.isArticleApp = true;
                }
                dashboardService.getTemplateMetaData(data.templateCategory)
                    .success(function(data) {
                        $scope.buttonArray = data.btnArray;
                        $scope.firstMenuLabel = data.firstMenuLabel;
                        if(data.firstMenuLabel){
                            $scope.menuButtonView =
                                '<obl-menu-group label="{{firstMenuLabel}}" icon="fa-pencil-square-o">'+
                                    '<div ng-repeat="btn in buttonArray | orderBy : \'orderId\' " >' +
                                        '<obl-menu-button ng-if="btn.menuTitle !=\'Site Settings\' " label="{{btn.menuTitle}}" icon="fa fa-file-image-o"  menu-function="{{btn.menuFunction}}">' +
                                        '</obl-menu-button>'+
                                        '<obl-menu-group ng-if="btn.menuTitle ==\'Site Settings\' " label="{{btn.menuTitle}}" icon="fa-pencil-square-o"  class="md-sub-menu">' +
                                         '<obl-menu-button label="Site Settings" icon="fa fa-file-image-o" click-title="siteSettings"></obl-menu-button>'+
                                         '</obl-menu-button>'+
                                        '</obl-menu-group>'+
                                         '</div>'+
                                '</obl-menu-group>';
                        }
                    }).error(function(err) {

                    });
            }).error(function(err) {

            });

        $scope.buildSource = function () {
            appEditResource.buildApp({appId: $stateParams.appId})
                .success(function(data) {
                    toastr.success('Successfully Build ', 'Congratulations!', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error('Cant Build', 'Error', {
                        closeButton: true
                    });
             });
        };
        $scope.expand = false;
        $scope.clicked = function(){
               $scope.expand = !($scope.expand);
        };

        $scope.profileView = function() {
           return userProfileService.showUserProfileDialog();
        };
        $scope.changePermanently = function(state) {

            if(state == 'yes'){

                var appParams = {
                    'userId':$auth.getPayload().id,
                    'appId' : $rootScope.appId
                };
                templateService.changeTemplatePermanent(appParams)
                    .success(function(data) {
                        toastr.success('Successfully Build ', 'Congratulations!', {
                            closeButton: true
                        });
//                        var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
//                            +'/templates/'+$rootScope.appId+'/?'+new Date().getTime();
                        var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                      +"&appId="+$rootScope.appId+"&"+new Date().toISOString()+"/";

                        mySharedService.prepForBroadcast(urlPath);
                        $rootScope.changeTemplate = false;
                    }).error(function(err) {
                    toastr.error('Cant Build', 'Error', {
                        closeButton: true
                    });
                });
            }else {

//                var url= ME_APP_SERVER+'temp/'+$auth.getPayload().id
//                    +'/templates/'+$rootScope.appId+'/?'+new Date().getTime();

                var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                              +"&appId="+$rootScope.appId+"&"+new Date().toISOString()+"/";

                mySharedService.prepForBroadcast(urlPath);

                $rootScope.changeTemplate = false;
                toastr.success('You refused to change the template ', 'Congratulations!', {
                    closeButton: true
                });

            }

        };

        $scope.thumbPic = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/header.jpg?time='+new Date().toISOString();

        $scope.fonts = {
            font : 'Arial',
            fontSize : 11
        };

        $scope.temporaryMessage = function (scope) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){

                    this.confirm = function click(){
                        $mdDialog.hide();
                    }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Coming soon !!!!!</h1>' +
                '                </div> <br>'+
                ' <div style="text-align:center"><lable> This Feature will be coming soon! </lable></div>' +
                '<br><br><div class="md-dialog-buttons">'+
                '<div class="inner-section">'+
                '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Ok</md-button>'+
                '</div>'+
                '</div>' +
                '</md-content>' +
                '</md-dialog>'
            })

        };


        $scope.deviceView = "mobile";
        $scope.changeDevice = function(deviceType){



            if(deviceType == "mobile"){
                $scope.deviceView = "mobile";
            }else if(deviceType == "tablet"){
                $scope.deviceView = "tabletView";

            }else if(deviceType == "web"){

            if($scope.tempIsNew == 'true'){

                $scope.deviceView = "web";

            }else{

                $scope.deviceView = "web";
                $scope.temporaryMessage();
            }

            }


        };

        $scope.downloadMobileViewer = function() {
            return userProfileService.showDownloadMobileViewerDialog();
        };



        

    }
})();