/**
 * Created by amila on 5/9/16.
 *
 * Note : If you call Article Controller, You should define "initialData"
 *
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog','$auth','$rootScope','articleService','toastr','ME_APP_SERVER','initialData',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog,$auth,$rootScope,articleService,toastr,ME_APP_SERVER,initialData) {

        $scope.appId = $rootScope.appId;
        $scope.tmpImage = [ null , null];
        $scope.mainImg = null;
        $scope.isNewArticle = false;


        articleService.getCategoryList($scope.appId)
            .success(function (data) {
                console.log(data);
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
            for(var i=0 ; i < im.length ; i++){
                if(im[i] == null) {
                    im[i] = $scope.picFile;
                    break;
                }
            }
            $scope.tmpImage = im;
            $scope.mainImg = img;
            toastr.success('added Image', 'Message', {
                closeButton: true
            });
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

            if(file == null){
                toastr.error('Select image', 'Warning', {
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

        $scope.deleteArticle = function(index,article){

            $scope.articleList.splice(index, 1);
            articleService.deleteArticle(article).success(function(data) {
                    toastr.success(data.message, 'Message', {
                        closeButton: true
                    });
                }).error(function(err) {
                    toastr.error(err, 'Warning', {
                        closeButton: true
                    });
                });
        }

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
                .success(function (data) {
                    toastr.success('ArticlesLoading Error', 'Message', {
                        closeButton: true
                    });
                }).error(function (error) {
                toastr.error('ArticlesLoading Error', 'Message', {
                    closeButton: true
                });
            })
        };
        $scope.deleteCategory = function(data){

            var dataDelete = {
                id : data
            };
           // console.log(dataDelete);
            articleService.deleteCategory(dataDelete)
                .success(function (data) {
                    toastr.success('ArticlesLoading Error', 'Message', {
                        closeButton: true
                    });
                }).error(function (error) {
                toastr.error('ArticlesLoading Error', 'Message', {
                    closeButton: true
                });
            })
        }

    }
})();
