/**
 * Created by amila on 6/20/16.
 */
(function() {
    angular.module('appEdit').service('oblMenuService', ['stylesService', 'contactUsService', 'commerceService',
        'shippingService','taxService','articleService','mainMenuService', 'currencyService', 'publishService',
        'engageService', 'logoAndTittleService','comingSoonService'
        , oblMenuService]);

    function oblMenuService(stylesService, contactUsService, commerceService,shippingService,
                            taxService,articleService ,mainMenuService,currencyService, publishService,
                            engageService, logoAndTittleService,comingSoonService) {
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
                    }


                    if(ctrl == 'products'){
                        if(ctrlFun == 'showAddProductsDialog'){
                            return commerceService.showAddProductsDialog(ctrl);
                        }
                    }

                    if(ctrl == 'commerce') {
                        if (ctrlFun == 'showOrderDialog') {
                            return commerceService.showOrderDialog();
                        }
                        if (ctrlFun == 'showShippingDialog') {
                            return shippingService.showShippingDialog();
                        }
                        if (ctrlFun == 'showTaxesDialog') {
                            return commerceService.showTaxesDialog();
                        }
                        if (ctrlFun == 'showEmailSettingsDialog') {
                            return commerceService.showEmailSettingsDialog();
                        }
                        if (ctrlFun == 'showStoreSettingsDialog') {

                            return commerceService.showStoreSettingsDialog();
                        }
                        if (ctrlFun == 'showComingSoonDialog'){
                            return comingSoonService.showComingSoonDialog();
                        }
                    }

                    if(ctrl == 'inventory'){
                        if(ctrlFun == 'showInventoryDialog'){
                            return commerceService.showInventoryDialog();
                        }
                    }
                    if(ctrl == 'tax'){
                        if (ctrlFun == 'showTaxesDialog') {
                            return taxService.showTaxesDialog();
                        }
                    }

                }else{
                    console.log('Note : data are undefined');
                }
            }
        }
    }
})();