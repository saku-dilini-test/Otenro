/**
 * Created by udeshikaperera on 31/08/2015.
 */
(function() {
    angular.module('appEdit').service('dialogService', ['stylesService', 'contactUsService', 'commerceService', 'mainMenuService', 'currencyService', 'publishService', 'engageService', 'logoAndTittleService', dialogService]);

    function dialogService(stylesService, contactUsService, commerceService, mainMenuService, currencyService, publishService, engageService, logoAndTittleService) {
        return {
            showDialog: function(clickTitle) {
                if ('styles' == clickTitle)
                    return stylesService.showStyleDialog(clickTitle);
                if ('logoAndTitle' == clickTitle)
                    return logoAndTittleService.showLogoAndTittleDialog(clickTitle);
                if ('category' == clickTitle)
                    return commerceService.showCommerceDialog(clickTitle);
                if ('navigation' == clickTitle)
                    return mainMenuService.showMainMenuDialog(clickTitle);
                if ('products' == clickTitle)
                    return commerceService.showAddProductsDialog(clickTitle);
                if ('contactUs' == clickTitle)
                    return contactUsService.showContactUsDialog(clickTitle);
                if ('currency' == clickTitle)
                    return currencyService.showCurrencyDialog(clickTitle);
                if ('orders' == clickTitle)
                    return commerceService.showOrderDialog(clickTitle);
                if ('inventory' == clickTitle)
                    return commerceService.showInventoryDialog(clickTitle);
                if ('shipping' == clickTitle)
                    return commerceService.showShippingDialog(clickTitle);
                if ('taxes' == clickTitle)
                    return commerceService.showTaxesDialog(clickTitle);
                if ('emailSettings' == clickTitle)
                    return commerceService.showEmailSettingsDialog(clickTitle);
                if ('storeSettings' == clickTitle)
                    return commerceService.showStoreSettingsDialog(clickTitle);
                if ('appStore' == clickTitle)
                    return publishService.showPublishToAppStoreDialog(clickTitle);
                if ('googlePlay' == clickTitle)
                    return publishService.showPublishToGooglePlayDialog(clickTitle);
                if ('pushMessages' == clickTitle)
                    return engageService.showPushMessageDialog(clickTitle);
                if ('profile' == clickTitle)
                    return engageService.showProfileDialog(clickTitle);
                if ('styleEditBackgroundImage' == clickTitle)
                    return stylesService.showStyleEditBackgorundImageDialog(clickTitle);
            }
        }
    }
})();
