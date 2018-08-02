(function () {
    'use strict';
    angular.module("appEdit").controller("BlogCtrl", [
        '$scope', '$mdDialog', 'toastr', 'commerceService','carouselService', 'currencyService', 'publishService', '$rootScope',
        'SERVER_URL', '$auth', 'ME_APP_SERVER', '$interval', '$q','aboutUsService','mySharedService','initialData','comingSoonService',
        '$filter','$templateCache','$log',
        BlogCtrl]);

    function BlogCtrl($scope, $mdDialog, toastr, commerceService,carouselService, currencyService, publishService, $rootScope,
             SERVER_URL, $auth, ME_APP_SERVER, $interval, $q,aboutUsService,mySharedService,initialData,comingSoonService, $filter
            ,$templateCache,sendDate,$log) {


                $scope.appId = $rootScope.appId;
                $scope.tmpImage = [];
                $scope.mainImg = null;
                $scope.isNewBlog = false;
                $scope.pageSize = 5;

                $scope.maxBlogTitle = 20;
                $scope.maxBlogDesc = 200;
                $scope.myImage='';
                $scope.myCroppedImage='';

                $scope.imageSelected = true;
                $scope.buttonName = "Browse Image";

                if(initialData == 'publishBlog'){
                    $scope.isNewBlog = true;

                }else if(initialData == 'previewBlog'){
                    commerceService.getBlogsList($scope.appId)
                        .success(function (data) {

                            for(var i=0; i<data.length; i++){
                                var date = new Date(data[i].createdAt);
                                $scope.displayDate = date.toLocaleString();
                                $scope.year = date.getFullYear();
                                $scope.month = date.getMonth()+1;
                                $scope.date = date.getDate();
                                data[i].createdDate = $scope.year+"-"+$scope.month+"-"+$scope.date;
                            }
                            $scope.blogList = data;
                        }).error(function (error) {
                            toastr.error('Blog Loading Error', 'Message', {
                                closeButton: true
                            });
                        })
                }else{
                    $scope.blog = initialData;
                    $scope.serverImg = initialData.imageUrl;
                    $scope.mainImg = initialData.imageUrl;
                    $scope.picFile = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/progressiveTemplates/'+$rootScope.appId+'/src/assets/images/blogs/'+initialData.imageUrl;
                    $scope.tmpImage[0] = SERVER_URL +"templates/viewWebImages?userId="+ $auth.getPayload().id
                    +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&images=blogs/"+initialData.imageUrl;

                }



                $scope.cropImage = function () {
                    var handleFileSelect=function(evt) {
                        var file=evt.currentTarget.files[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function($scope){
                                $scope.myImage=evt.target.result;
                                $scope.picFile =  $scope.myImage
                            });
                        };
                        reader.readAsDataURL(file);
                        $scope.imageSelected =false;
                        $scope.buttonName = "Upload";
                    };
                    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
                }

                $scope.addImage = function(img){

                    var im = $scope.tmpImage;
                    if(angular.element('#fileInput').val() == ''){
                        toastr.error('Select an image to upload', 'Warning', {
                            closeButton: true
                        });
                    }
                    else{
                        im[0] = $scope.picFile;
                        $scope.tmpImage = im;
                        $scope.mainImg = img;
                        toastr.success('Image successfully uploaded ', 'Message', {
                            closeButton: true
                        });
                    }

                    $scope.imageSelected = true;
                    $scope.buttonName = "Browse Image";
                };

                $scope.deleteImg = function(index){
                    $scope.tmpImage[index] = null;
                };

                $scope.setImage = function(img){

                    if(img == undefined){
                        toastr.error('Set Image', 'Warning', {
                            closeButton: true
                        });
                    }else{
                        $scope.picFile = $scope.tmpImage[img];
                        $scope.mainImg = $scope.tmpImage[img];
                    }
                };

                $scope.editBlog = function(blog){
                    commerceService.showPublishBlogDialog(blog);

                }
                $scope.deleteBlog = function (index,blog) {
                    return $mdDialog.show({
                        controllerAs: 'dialogCtrl',
                        controller: function($mdDialog){
                            this.confirm = function click(){
                                commerceService.deleteBlog(blog).success(function(data) {
                                    toastr.success(data.message, 'Message', {
                                        closeButton: true
                                    });
                                    $scope.blogList.splice(index, 1);
                                    $mdDialog.hide();
                                    return commerceService.showPreviewBlogDialog('previewBlog');
                                }).error(function (error) {
                                    toastr.error('Blog Delete Error', 'Warning', {
                                        closeButton: true
                                    });
                                    $mdDialog.hide();
                                    return commerceService.showPreviewBlogDilog('previewBlog');
                                });
                            },
                            this.cancel = function click(){
                                $mdDialog.hide();
                                return commerceService.showPreviewBlogDilog('previewBlog');
                            }
                        },
                        template:'<md-dialog aria-label="Edit Child Menu">'+
                        '<md-content >' +
                        '<div class="md-dialog-header">' +
                        '<h1>Deleting Blog </h1>' +
                        '                </div> <br>'+
                        ' <div style="text-align:center"><lable> Are you sure you want to delete this blog? </lable></div>' +
                        '<br><br><div class="md-dialog-buttons">'+
                        '<div class="inner-section">'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.cancel()">Cancel</md-button>'+
                        '<md-button class="me-default-button" ng-click="dialogCtrl.confirm()">Confirm</md-button>'+
                        '</div>'+
                        '</div>' +
                        '</md-content>' +
                        '</md-dialog>'
                    })

                };

                $scope.answer = function() {
                    $mdDialog.hide();
                };

                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };




                $scope.publishBlog = function(file,blog){

                    if(typeof blog == 'undefined'){
                        toastr.error('Please fill all fields ', 'Warning', {
                            closeButton: true
                        });
                        return;
                    }

                    if(blog.title == null){
                        toastr.error('Please enter an blog title ', 'Warning', {
                            closeButton: true
                        });
                        return;
                    }
                    if(!blog.shortDesc){
                        toastr.error('Please enter an short description ', 'Warning', {
                            closeButton: true
                        });
                        return;
                    }

                    // If article title not undefined, check maximum letter length is exceed
                    if((typeof blog.title != 'undefined') && (blog.title.length > $scope.maxBlogTitle)){
                        toastr.error('Blog Title should be less than '+$scope.maxBlogTitle+' letters.',
                            'Warning', {closeButton: true}
                        );
                        return;
                    }
                    if($scope.tmpImage[0] == null){
                        toastr.error('Please upload an image', 'Warning', {
                            closeButton: true
                      });
                        return;
                    }

                    if(blog.desc == null){
                        toastr.error('Blog description required', 'Warning', {
                            closeButton: true
                        });
                        return;
                    }
                    else {

                        var isImageUpdate = true;
                        if($scope.mainImg == $scope.serverImg){
                            isImageUpdate = false;
                        }
                        commerceService.publishBlog(file,blog.id,blog.title, blog.desc,blog.shortDesc,$rootScope.appId,$scope.isNewBlog,isImageUpdate)
                            .success(function (result) {
                                toastr.success('Your Blog has successfully been published ', 'Saved', {
                                    closeButton: true
                                });

                                var urlPath =  SERVER_URL +"progressiveTemplates/viewProgUrl?userId="+ $auth.getPayload().id
                                               +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                                $scope.appTemplateUrl = urlPath+'' +
                                    'src/?'+new Date().getTime();
                                mySharedService.prepForBroadcast($scope.appTemplateUrl);

                                commerceService.showPreviewBlogDialog('previewBlog');
                            }).error(function (error) {
                                toastr.error('Blogs publishing failed', 'Warning', {
                                    closeButton: true
                                });
                            })
                    }

                }

//        $scope.setAspectRatio = function () {
//            mainMenuService.getApplicationData($rootScope.appId)
//                .success(function (data) {
//                    if (data.templateId){
//                        mainMenuService.getTemplateData(data.templateId)
//                            .success(function (templateData) {
//                                if(templateData.thirdNaviAspectRatio){
//                                    $scope.thirdNaviAspectRatio = parseFloat(templateData.thirdNaviAspectRatio);
//                                }
//                                if(templateData.iSizeThird){
//                                    $scope.iSizeThird={w:templateData.iSizeThird.w,h:templateData.iSizeThird.h};
//                                }
//                            }).error(function (err) {
//                            toastr.error(err.message, 'Warning', {
//                                closeButton: true
//                            });
//                        });
//                    }
//                }).error(function (err) {
//                toastr.error(err.message, 'Warning', {
//                    closeButton: true
//                });
//            });
//        };
//        $scope.setAspectRatio();


    }
})();
