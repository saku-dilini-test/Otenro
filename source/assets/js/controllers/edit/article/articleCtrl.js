/**
 * Created by amila on 5/9/16.
 *
 * Note : If you call Article Controller, You should define "initialData"
 *
 */


(function() {
    'use strict';
    angular.module("appEdit").controller("ArticleCtrl", [
        '$scope','$mdDialog','$auth','$rootScope','articleService','toastr','SERVER_URL','ME_APP_SERVER','mySharedService','initialData','$log','mainMenuService',ArticleCtrl]);

    function ArticleCtrl($scope, $mdDialog,$auth,$rootScope,articleService,toastr,SERVER_URL,ME_APP_SERVER,mySharedService,initialData,$log,mainMenuService) {

        $scope.appId = $rootScope.appId;
        $scope.tmpImage = [];
        $scope.mainImg = null;
        $scope.isNewArticle = false;
        $scope.edit_Category = initialData;
        $scope.pageSize = 5;
        $log.debug("catName " + $scope.catName);

        // Characters length config (Article)
        $scope.maxArticleTitle = 20;
        $scope.maxArticleDesc = 200;

        $scope.myImage='';
        $scope.myCroppedImage='';

        $scope.imageSelected = true;
        $scope.buttonName = "Browse Image";


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
            $scope.dummyCat =[];

            $scope.seletedCategoryId = null;
            $scope.articleCat = {
                "values":  null
            };
            articleService.getArticleCategoryByAppId()
                .success(function (data) {
                    $scope.dummyCat.push({id:1,name:"Create New Category"});
                    data.forEach(function(aricaleCat) {
                       $scope.dummyCat.push({id:aricaleCat.id,name:aricaleCat.name});
                    });


                    $scope.articleCat = {
                        "value" : $scope.dummyCat.id,
                        "values": $scope.dummyCat
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
            $scope.tmpImage[0] = SERVER_URL +"templates/viewImages?userId="+ $auth.getPayload().id
            +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"&img=article/"+initialData.imageUrl;


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

        $scope.changeArticleCat = function(catId){
            if (catId.id == 1){
                mainMenuService.showMainMenuDialog();
            }
            $scope.seletedCategoryId = catId.id;
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
                toastr.error('Please select a category', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(typeof article == 'undefined'){
                toastr.error('Please fill all fields ', 'Warning', {
                    closeButton: true
                });
                return;
            }

            if(article.title == null){
                toastr.error('Please enter an article title ', 'Warning', {
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
                toastr.error('Article description required', 'Warning', {
                    closeButton: true
                });
                return;
            }
            else {

                var isImageUpdate = true;
                if($scope.mainImg == $scope.serverImg){
                    isImageUpdate = false;
                }

                articleService.publishArticle(file,article.id,$scope.seletedCategoryId,article.title, article.desc,
                                              $rootScope.appId,$scope.isNewArticle,isImageUpdate)
                    .progress(function (evt) {
                        
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (result) {
                        toastr.success('Your article has successfully been published ', 'Saved', {
                            closeButton: true
                        });

                        var catId = result.categoryId;
                        var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                       +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                        $scope.appTemplateUrl = urlPath+'' +
                            '#/app/home/'+catId+'?'+new Date().getTime();
                        mySharedService.prepForBroadcast($scope.appTemplateUrl);

                        articleService.showPreviewArticslesDilog('previewArticles');
                    }).error(function (error) {
                        toastr.error('Article publishing failed', 'Warning', {
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
                        articleService.deleteArticle(article).success(function(data) {
                            toastr.success(data.message, 'Message', {
                                closeButton: true
                            });
                            $scope.articleList.splice(index, 1);
                            $mdDialog.hide();
                            return articleService.showPreviewArticslesDilog('previewArticles');
                        }).error(function (error) {
                            toastr.error('Article Delete Error', 'Warning', {
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
                    toastr.success('Category creation successful ', 'Message', {
                        closeButton: true
                    });
                    var catId = result.id;
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    $scope.appTemplateUrl = urlPath+'' +
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
            $log.debug(dataDelete);
            articleService.deleteCategory(dataDelete)
                .success(function (data) {
                    toastr.success('Article has been  successfully deleted ', 'Message', {
                        closeButton: true
                    });
                    var urlPath =  SERVER_URL +"templates/viewTemplateUrl?userId="+ $auth.getPayload().id
                                   +"&appId="+$rootScope.appId+"&"+new Date().getTime()+"/";
                    $scope.appTemplateUrl = urlPath+'' +
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
                    toastr.success('Category has been successfully edited', 'Message', {
                        closeButton: true
                    });
                    var catId = result.id;
                    $scope.appTemplateUrl = ME_APP_SERVER+'temp/'+$auth.getPayload().id
                        +'/templates/'+$rootScope.appId+'' +
                        '#/app/home/'+catId+'?'+new Date().getTime();
                    mySharedService.prepForBroadcast($scope.appTemplateUrl);
                }).error(function (error) {
                toastr.error('Category creation failed', 'Message', {
                    closeButton: true
                });
            })
        };

        /**
         * set articles' images crop aspect ratios to $scope
         **/
        $scope.setAspectRatio = function () {
            mainMenuService.getApplicationData($rootScope.appId)
                .success(function (data) {
                    if (data.templateId){
                        mainMenuService.getTemplateData(data.templateId)
                            .success(function (templateData) {
                                if(templateData.thirdNaviAspectRatio){
                                    $scope.thirdNaviAspectRatio = parseFloat(templateData.thirdNaviAspectRatio);
                                }
                            }).error(function (err) {
                            toastr.error(err.message, 'Warning', {
                                closeButton: true
                            });
                        });
                    }
                }).error(function (err) {
                toastr.error(err.message, 'Warning', {
                    closeButton: true
                });
            });
        };
        $scope.setAspectRatio();

    }
})();
