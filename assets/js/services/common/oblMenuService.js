/**
 * Created by amila on 6/20/16.
 */
(function() {
    angular.module('appEdit').service('oblMenuService', ['stylesService', 'contactUsService', 'commerceService','articleService','mainMenuService', 'currencyService', 'publishService', 'engageService', 'logoAndTittleService', oblMenuService]);

    function oblMenuService(stylesService, contactUsService, commerceService, articleService ,mainMenuService, currencyService, publishService, engageService, logoAndTittleService) {
        return {
            setOblMenuService : function(data) {

                if(data){

                    var values = data.split(".");
                    var ctrl = values[0];
                    var ctrlFun = values[1];

                    if(ctrl == 'article'){
                        if(ctrlFun == 'publishArticle'){
                            return articleService.showPublishArticleDialog(ctrlFun);
                        }
                        if(ctrlFun == 'previewArticles'){
                            return articleService.showPreviewArticslesDilog(ctrlFun);
                        }
                    }else{
                        console.log('Note : else part not defined ');
                    }

                }else{
                    console.log('Note : data are undefined');
                }
            }
        }
    }
})();