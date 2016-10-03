/**
 * Created by amila on 5/9/16.
 *
 * Note : If you call Article Controller, You should define "initialData"
 *
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog','$auth','$rootScope','articleService','toastr','SERVER_URL','ME_APP_SERVER','mySharedService','initialData',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog,$auth,$rootScope,articleService,toastr,SERVER_URL,ME_APP_SERVER,mySharedService,initialData) {

        $scope.appId = $rootScope.appId;
        $scope.tmpImage = [];
        $scope.mainImg = null;
        $scope.isNewArticle = false;
        $scope.edit_Category = initialData;
        $scope.pageSize = 5;
        console.log("catName " + $scope.catName);

        // Characters length config (Article)
        $scope.maxArticleTitle = 20;
        $scope.maxArticleDesc = 200;

        $scope.myImage='';
        $scope.myCroppedImage='';

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
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }


        articleService.getCategoryList($scope.appId)
            .success(function (data) {
                $scope.categoryList = data;
            }).error(function (error) {
            toastr.error('ArticlesLoading Error', 'Message', {
                closeButton: true
            });
        });

        if(initialData == 'publishArticle'){
            $scope.isNewArticle = true;

            $scope.seletedCategoryId = null;
            $scope.articleCat = {
                "values":  null
            };
            articleService.getArticleCategoryByAppId()
                .success(function (data) {
                    $scope.articleCat = {
                        "values":  data
                    };
                }).error(function (error) {
                    toastr.error('Articles Category List Loading Error', 'Message', {
                        closeButton: true
                    });
                })


        }else if(initialData == 'previewArticles'){
            articleService.getArticleList($scope.appId)
                .success(function (data) {

                    for(var i=0; i<data.length; i++){
                        var date = new Date(data[i].createdAt);
                        $scope.displayDate = date.toLocaleString();
                        $scope.year = date.getFullYear();
                        $scope.month = date.getMonth()+1;
                        $scope.date = date.getDate();
                        data[i].createdDate = $scope.year+"-"+$scope.month+"-"+$scope.date;
                    }
                    $scope.articleList = data;
                }).error(function (error) {
                    toastr.error('ArticlesLoading Error', 'Message', {
                        closeButton: true
                    });
                })
        }else{
            $scope.article = initialData;
            $scope.serverImg = initialData.imageUrl;
            $scope.mainImg = initialData.imageUrl;
            $scope.picFile = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/article/'+initialData.imageUrl;
            $scope.tmpImage[0] = ME_APP_SERVER+'temp/' +$auth.getPayload().id+'/templates/'+$rootScope.appId+'/img/article/'+initialData.imageUrl;

            $scope.seletedCategoryId = initialData.categoryId;

            articleService.getArticleCategoryByAppId()
                .success(function (data) {
                    $scope.articleCat = {
                        "value" : initialData.categoryId,
                        "values":  data
                    };
                }).error(function (error) {
                    toastr.error('Articles Category List Loading Error', 'Message', {
                        closeButton: true
                    });
                })
        }

        $scope.addImage = function(img){

            var im = $scope.tmpImage;
            if(angular.element('#fileInput').val() == ''){
                toastr.error('Please choose an image to upload', 'Warning', {
                    closeButton: true
                });
            }
            else{
                im[0] = $scope.picFile;
                $scope.tmpImage = im;
                $scope.mainImg = img;
                toastr.success('added Image', 'message', {
                    closeButton: true
                });
            }
        };

        $scope.changeArticleCat = function(catId){
            $scope.seletedCategoryId = catId;
        }

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



        $scope.publishArticle = function(file,article){
            if($scope.seletedCategoryId == null){
                toastr.error('Selected Category', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(typeof article == 'undefined'){
                toastr.error('Fill blanks', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(article.title == null){
                toastr.error('Fill article title', 'Warning', {
                    closeButton: true
                });
                return;
            }

            // If article title not undefined, check maximum letter length is exceed
            if((typeof article.title != 'undefined') && (article.title.length > $scope.maxArticleTitle)){
                toastr.error('Article Title should be less than '+$scope.maxArticleTitle+' letters.',
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

            if(article.desc == null){
                toastr.error('Fill article description', 'Warning', {
                    closeButton: true
                });
                return;
            }
            else {

                var isImageUpdate = true;
                if($scope.mainImg == $scope.serverImg){
                    isImageUpdate = false;
                }

                articleService.publishArticle(file,article.id,$scope.seletedCategoryId,article.title, article.desc, $rootScope.appId,$scope.isNewArticle,isImageUpdate)
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (result) {
                        toastr.success('Successfully Publish Article ', 'Saved', {
                            closeButton: true
                        });

                        var catId = result.categoryId;
                        $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                            +'/templates/'+$rootScope.appId+'' +
                            '#/app/home/'+catId+'?'+new Date().getTime();
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);

                        articleService.showPreviewArticslesDilog('previewArticles');
                    }).error(function (error) {
                        toastr.error('Article Publish Error', 'Warning', {
                            closeButton: true
                        });
                    })
            }

        }

        $scope.editArticle = function(article){
            articleService.showPublishArticleDialog(article);

        }
        $scope.deleteArticle = function (index,article) {
            return $mdDialog.show({
                controllerAs: 'dialogCtrl',
                controller: function($mdDialog){
                    this.confirm = function click(){
                        $scope.articleList.splice(index, 1);
                        articleService.deleteArticle(article).success(function(data) {
                            toastr.success(data.message, 'Message', {
                                closeButton: true
                            });
                            $mdDialog.hide();
                            return articleService.showPreviewArticslesDilog('previewArticles');
                        });
                    },
                    this.cancel = function click(){
                        $mdDialog.hide();
                        return articleService.showPreviewArticslesDilog('previewArticles');
                    }
                },
                template:'<md-dialog aria-label="Edit Child Menu">'+
                '<md-content >' +
                '<div class="md-dialog-header">' +
                '<h1>Deleting Product </h1>' +
                '                </div> <br>'+
                ' <div style="text-align:center"><lable> Are you sure you want to delete this article? </lable></div>' +
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

        $scope.addCategoryDialog = function(data){
            return articleService.addCategoryDialog(data);
        };

        $scope.editCategoryDialog = function(data){
            return articleService.editCategoryDialog(data);
        };

        $scope.addCategory = function(data){
            data.appId = $rootScope.appId;
            articleService.addCategory(data)
                .success(function (result) {
                    toastr.success('Successfully Added Article Category', 'Message', {
                        closeButton: true
                    });
                    var catId = result.id;
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/'+catId+'?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (error) {
                toastr.error('Article Category Adding Error', 'Message', {
                    closeButton: true
                });
            })
        };
        $scope.deleteCategory = function(data){

            var dataDelete = {
                catId : data
            };
            console.log(dataDelete);
            articleService.deleteCategory(dataDelete)
                .success(function (data) {
                    toastr.success('Successfully Delete Article Category', 'Message', {
                        closeButton: true
                    });
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/firstMenu?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (error) {
                toastr.error('Article Category Delete Error', 'Message', {
                    closeButton: true
                });
            })
        }

        $scope.editCategory = function(data){
            articleService.editCategory(data)
                .success(function (result) {
                    toastr.success('Successfully Edit Article Category', 'Message', {
                        closeButton: true
                    });
                    var catId = result.id;
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/'+catId+'?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (error) {
                toastr.error('Article Category Adding Error', 'Message', {
                    closeButton: true
                });
            })
        };

    }
})();
