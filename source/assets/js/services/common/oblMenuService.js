/**
 * Created by amila on 6/20/16.
 */
(function() {
    angular.module('appEdit').service('oblMenuService', ['stylesService', 'contactUsService', 'commerceService',
        'shippingService','taxService','articleService','mainMenuService', 'currencyService', 'publishService',
        'engageService', 'logoAndTittleService','ipgService','comingSoonService','$log','categoryMaintenanceService', oblMenuService]);

    function oblMenuService(stylesService, contactUsService, commerceService,shippingService,
                            taxService,articleService ,mainMenuService,currencyService, publishService,
                            engageService, logoAndTittleService,ipgService,comingSoonService,$log,categoryMaintenanceService) {

        this.mockData = false;

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
                        if (ctrlFun=='categories') {
                        } return mainMenuService.showMainMenuDialog(ctrlFun);
                    }


                    if(ctrl == 'products'){
                        if(ctrlFun == 'showAddProductsDialog'){
                            this.mockData = true;
                            return commerceService.showAddProductsDialog(ctrl);
                        }
                    }

                    if(ctrl == 'commerce') {


                        if (ctrlFun=='showAddCategoriesDialog') {
                            this.mockData = false;
                            return mainMenuService.showMainMenuDialog(ctrlFun);
                        }

                        if (ctrlFun=='showCategoriesMaintenance') {
                            this.mockData = false;
                            return categoryMaintenanceService.showCategoryMaintenanceDialog(ctrlFun);
                        }




                        if(ctrlFun == 'publishBlog'){
                            return commerceService.showPublishBlogDialog(ctrlFun);
                        }
                        if(ctrlFun == 'previewBlog'){
                            return commerceService.showPreviewBlogDialog(ctrlFun);
                        }




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
                        if (ctrlFun == 'showIPGDialog'){
                            return ipgService.showIPGDialog();
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
                    $log.debug('Note : data are undefined');
                }
            },
            parseData : function(){

                return this.mockData;
            }
        }
    }
})();