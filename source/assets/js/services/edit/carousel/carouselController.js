/**
 * Created by shashan on 01/02/2018.
 **/
(function () {
    angular.module('appEdit').service('carouselService', [
        '$mdDialog', 'Upload', 'SERVER_URL', '$http', '$rootScope', carouselService
    ]);

    function carouselService($mdDialog, Upload, SERVER_URL, $http, $rootScope) {
        return {
            showCarouselBannerDialog: function () {
                return $mdDialog.show({
                    controller: 'CarouselCtrl',
                    templateUrl: 'user/edit/carousel/carouselManagement.html',
                    clickOutsideToClose: false,
                    locals: {
                        initialData: null
                    }
                }).then(function (answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    //$scope.status = 'You cancelled the dialog.';
                });
            },
            addSlider: function (file, appId, name, isNew, optionals) {
                var dataURItoBlob = function (dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], { type: mimeString });
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');

                return Upload.upload({
                    url: SERVER_URL + 'edit/addNewSlider',
                    fields: {
                        'appId': appId,
                        'name': name,
                        'isNew': isNew,
                        'optionals': optionals,
                    },
                    file: UploadFile
                });
            },
            showEditSliderDialog: function (data, id, productItem) {
                return $mdDialog.show({
                    controller: 'CarouselCtrl',
                    templateUrl: 'user/edit/carousel/addCarouselBanner.html',
                    clickOutsideToClose: false,
                    locals: {
                        initialData: {
                            menu: data,
                            templateCategory: id,
                            prodItem: productItem == null ? null : productItem
                        }
                    }
                }).then(function (answer) {

                }, function () {

                });
            },
                showRemoveDefaultDataDialog : function () {
                            return $mdDialog.show({
                                controllerAs: 'dialogCtrl',
                                controller: function($mdDialog,appEditResource,toastr,$rootScope,$state,ME_APP_SERVER,mySharedService,$auth,$scope){
                                    this.confirm = function click(){
                                        appEditResource.deleteDefaultSliderData({appId:$rootScope.appId}).success(function(data) {

                                                toastr.success('Successfully Removed ', 'Done!', {
                                                    closeButton: true
                                                });
                                                var urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                                               +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";

                                                $scope.appTemplateUrl = urlPath +
                                                'src'+new Date().getTime();
                                                mySharedService.prepForBroadcast($scope.appTemplateUrl);

                                                //$state.go('user.dashboard');

                                            $mdDialog.hide();

                                        }).error(function(err) {
                                            toastr.error('Cant Build', 'Error', {
                                                closeButton: true
                                            });
                                        });
                                    },
                                        this.cancel = function click(){
                                            $mdDialog.hide();
                                        }
                                },
                                template:'<md-dialog aria-label="Edit Child Menu">'+
                                '<md-content >' +
                                '<div class="md-dialog-header">' +
                                '<h1>Deleting Demo Slider Data </h1>' +
                                '</div>' +
                                '<br>'+
                                '<div style="text-align:center">' +
                                '<lable>Are you sure, you want to delete all demo Slider data ?</lable>' +
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
            updateSliderImage: function (file, imageUrl, name, id, appId, optionals) {
                var dataURItoBlob = function (dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], { type: mimeString });
                };

                var blob = dataURItoBlob(file);
                var UploadFile = new File([blob], 'imageFileName.png');

                return Upload.upload({
                    url: SERVER_URL + 'edit/updateSliderImage',
                    fields: {
                        'imageUrl': imageUrl,
                        'name': name,
                        'id': id,
                        'appId': appId,
                        'optionals': optionals,
                    },
                    file: UploadFile
                });
            },
            updateSliderData : function(data) {
                return $http.post(SERVER_URL+ 'edit/updateSliderData',data);
            },
            deleteData : function(data){
                return $http.post(SERVER_URL+ 'edit/deleteSlider',data);
            },
            getApplicationData : function (appId) {
                return $http.get( SERVER_URL + 'edit/getApplicationData?appId=' + appId );
            },
            getTemplateData : function (templateId) {
                return $http.get( SERVER_URL + 'templates/getTemplateData?templateId=' + templateId );
            },
        };
    }
})();



