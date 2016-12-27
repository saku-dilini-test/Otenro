/**
 * Created by udeshikaperera on 31/08/2015.
 */
(function() {
    angular.module('appEdit').service('dialogService', ['stylesService', 'contactUsService',
        'commerceService','articleService','mainMenuService', 'currencyService',
        'publishService', 'engageService', 'logoAndTittleService','aboutUsService',
        'policiesService','comingSoonService', dialogService]);

    function dialogService(stylesService, contactUsService,
                           commerceService, articleService ,mainMenuService,
                           currencyService, publishService, engageService,
                           logoAndTittleService,aboutUsService,policiesService,comingSoonService) {
        return {
            showDialog: function(clickTitle) {

                if ('templates'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('checkoutPageStyle'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('lockedPages'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('otenroBadge'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('announcementBar'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('madeEasyBadge'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                // if ('users'==clickTitle)
                //     return comingSoonService.showComingSoonDialog();
                if ('promotionsAndSales'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('emailMarketing'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('popUpMessages'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('geofencedMessages'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('socialLock'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('detectionTools'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('sales'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('traffic'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('mobile'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('app'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('popularContent'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('searchEngineQueries'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('siteSearch'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('worldMap'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('analyticsIntegration'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('website'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
              /*  if ('appStore'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('googlePlay'==clickTitle)
                    return comingSoonService.showComingSoonDialog();*/
                if ('basicInfo'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('domain'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                // if ('users'==clickTitle)
                //     return comingSoonService.showComingSoonDialog();
                if ('seo'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('socialMedia'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('billing'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('security'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('backup'==clickTitle)
                    return comingSoonService.showComingSoonDialog();
                if ('help'==clickTitle)
                    return comingSoonService.showComingSoonDialog();


                if ('users' == clickTitle)
                     return engageService.showAppUserDialog(clickTitle);
                if ('users' == clickTitle)
                    return engageService.showAllordersView(clickTitle);
                if ('styles' == clickTitle)
                    return stylesService.showStyleDialog(clickTitle);
                if ('logoAndTitle' == clickTitle)
                    return logoAndTittleService.showLogoAndTittleDialog(clickTitle);
                /*if ('navigation' == clickTitle)
                    return mainMenuService.showMainMenuDialog(clickTitle);*/
                if ('products' == clickTitle)
                    return commerceService.showAddProductsDialog(clickTitle);
                if ('siteSettings' == clickTitle)
                    return contactUsService.showSiteSettingsDialog(clickTitle);
                if ('aboutUs' == clickTitle)
                    return aboutUsService.showAboutUsDialog(clickTitle);
                if ('policies' == clickTitle)
                    return policiesService.showPoliciesDialog(clickTitle);
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
                if ('publishArticle' == clickTitle)
                    return articleService.showPublishArticleDialog(clickTitle);
                if ('previewArticles' == clickTitle)
                    return articleService.showPreviewArticslesDilog(clickTitle);
                if ('categories' == clickTitle)
                    return articleService.showCategoriesDialog(clickTitle);
                if ('delete' == clickTitle)
                    return commerceService.showDeleteAppDialog(clickTitle);
                if ('remove' == clickTitle)
                    return commerceService.showRemoveDefaultDataDialog(clickTitle);
            }
        }
    }
})();
