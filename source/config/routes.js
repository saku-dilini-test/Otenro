/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


    // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
    // default view engine) your home page.
    //
    // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
    '/': {view: 'homepage'},


    // Custom routes here...


    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

    /***
     *
     * User Authentication
     *
     * */

    'POST /auth/editUserProfile': 'UserController.editUserProfile',
    'POST /auth/resetPassword': 'UserController.forgotPasswordReset',
    'POST /auth/google': 'AuthController.googleAuth',
    'POST /auth/facebook': 'AuthController.facebookAuth',
    'POST /api/updateUserAdNetwork': 'AuthController.updateUserAdNetwork',
    'GET /api/getYourselfReason': 'AuthController.getYourselfReason',
    'GET /fromAddNetwork': 'AuthController.fromAddNetwork',

    /***
     * Billing Data
     * */
    'POST /user/editBillingDetails': 'UserController.editBillingDetails',
    'GET /user/getBillingDetails': 'UserController.getBillingDetails',

    /***
     * Application Data
     * */

    'POST /app/dashboard/allApps': 'DashboardController.allApps',
    'POST /api/dashboard/getAllCategory': 'DashboardController.getAllCategory',
    'POST /api/dashboard/getSelectedCategory': 'DashboardController.getSelectedCategory',
    'POST /api/dashboard/getSelectedCategoryDashboard': 'DashboardController.getSelectedCategoryDashboard',
    'POST /app/designApps': 'ApplicationController.designApps',
    'POST /app/getAppsCommerce': 'ApplicationController.getAppsCommerce',
    'POST /app/viewTemplate': 'ApplicationController.viewTemplate',
    'POST /app/templatePreview': 'ApplicationController.templatePreview',
   
    'GET /api/getTemplateMetaData': 'DashboardController.getTemplateMetaData',
    'GET /app/getIconAllowance': 'ApplicationController.iconAllowance',
    'POST /app/createTempTemplates': 'ApplicationController.createTempTemplates',
    'POST /app/changeTemplatePermanent': 'ApplicationController.changeTemplatePermanent',
    /***
     * Store Settings Data
     *
     * */
    'POST /edit/saveStoreSettings': 'edit/commerce/UserSettingsController.saveStoreSettings',
    'POST /edit/savePolicies': 'edit/commerce/UserSettingsController.savePolicies',
    'GET /edit/showStoreSettings': 'edit/commerce/UserSettingsController.showStoreSettings',
    'GET /edit/getAllSiteType': 'edit/commerce/UserSettingsController.getAllSiteType',
    'GET /edit/getAllMeasurementType': 'edit/commerce/UserSettingsController.getAllMeasurementType',
    'GET /edit/getAllTimeAndRegion': 'edit/commerce/UserSettingsController.getAllTimeAndRegion',
    'GET /edit/showPolicies': 'edit/commerce/UserSettingsController.showPolicies',


    /***
     * Edit Data
     *
     * */
    'GET /edit/getApplicationData': 'ApplicationController.getApplicationData',
    'POST /edit/addStyles': 'edit/style/StyleController.addStyles',
    'POST /edit/getAppSettings': 'edit/style/StyleController.getAppSettings',
    'POST /edit/addStyleImage/addHeaderImage': 'edit/style/StyleController.addHeaderImage',
    'POST /edit/applyStyleImage/applyBackgroundImage': 'edit/style/StyleController.applyBackgroundImage',
    'POST /edit/addStyleImage/addBackgroundImage': 'edit/style/StyleController.addBackgroundImage',
    'POST /edit/addStyleColor': 'edit/style/StyleController.addStyleColor',
  /*  'POST /edit/addLogoImage': 'edit/style/StyleController.addLogoImage',*/
    // 'POST /edit/addBackgroundColor' : 'style/StyleController.addBackgroundColor',
    'POST /edit/addStyleFontFamily': 'edit/style/StyleController.addStyleFontFamily',
    'POST /edit/addStyleFontSize': 'edit/style/StyleController.addStyleFontSize',
    'POST /edit/addStyleFontWeight': 'edit/style/StyleController.addStyleFontWeight',
    'POST /edit/addStyleButtonBorderWidth': 'edit/style/StyleController.addStyleButtonBorderWidth',
    'POST /edit/addStyleButtonBorderRadius': 'edit/style/StyleController.addStyleButtonBorderRadius',
    'POST /edit/addFonts': 'edit/style/StyleController.addFonts',
    'GET /edit/viewImages': 'EditController.viewImages',
    'GET /edit/buildSource': 'EditController.buildSource',
    'GET /edit/getSelectedApp': 'EditController.getSelectedApp',
    'GET /edit/deleteSelectedApp': 'EditController.deleteSelectedApp',
    'GET /edit/deleteDefaultData': 'EditController.deleteDefaultData',

    //'POST /edit/updateCategory' : '',
    //'POST /edit/checkCategory': '',
    //'POST /edit/deleteCategory': '',
    //'POST /edit/deleteProduct': '',
    'POST /edit/addSecondNavigation': 'edit/commerce/SecondNavigationController.addSecondNavigation',
    'POST /edit/checkSecondNavi': 'edit/commerce/SecondNavigationController.checkNavi',
    'POST /edit/deleteSecondNavi': 'edit/commerce/SecondNavigationController.deleteSecondNavi',
    'POST /edit/updateSecondNaviImage': 'edit/commerce/SecondNavigationController.updateSecondNaviImage',
    //'POST /edit/updateProductImage': '',
    //'POST /edit/updateCategoryImage': '',
    //'POST /edit/addProducts': '
    //
    'POST /edit/addContactUs': 'edit/setting/ContactUsController.addContactUs',
    'POST /edit/addBasicInfo': 'edit/setting/ContactUsController.addBasicInfo',
    'POST /edit/addWebInfo': 'edit/setting/ContactUsController.addWebInfo',
    'POST /edit/addGoogleMapInfo': 'edit/setting/ContactUsController.addGoogleMapInfo',
    'POST /edit/addOpenHoursInfo': 'edit/setting/ContactUsController.addOpenHoursInfo',






    'POST /edit/addAboutUs': 'edit/setting/AboutUsController.addAboutUs',
    'POST /edit/getAboutUsData': 'edit/setting/AboutUsController.getAboutUsData',
    'GET /edit/getAboutUsData': 'edit/setting/AboutUsController.getAboutUsData',


    'POST /edit/addPolicies': 'edit/setting/PoliciesController.addPolicies',
    'POST /edit/getPoliciesData': 'edit/setting/PoliciesController.getPoliciesData',
    'GET /edit/getPoliciesData': 'edit/setting/PoliciesController.getPoliciesData',

    'GET /edit/getMainNavigation': 'edit/commerce/MainNavigationController.getMainNavigation',
    'GET /edit/getSecondNavigation': 'edit/commerce/SecondNavigationController.getSecondNavigation',
    'GET /edit/getThirdNavigation': 'edit/commerce/ThirdNavigationController.getThirdNavigation',
    'GET /edit/getOrders': 'edit/commerce/OrderController.getOrders',
    'POST /edit/updateOrders': 'edit/commerce/OrderController.updateOrders',
    'POST /edit/checkUniqueSku': 'edit/commerce/ThirdNavigationController.checkUniqueSku',


    'POST /edit/saveMainMenu': 'edit/commerce/MainNavigationController.saveMainMenu',
    //'POST /templates/specificSecondNavi' : 'edit/commerce/MainNavigationController',
    //'POST /templates/specificThirdNavi': 'edit/commerce/MainNavigationController',
    'POST /edit/addNewMenu': 'edit/commerce/MainNavigationController.addNewNavi',
    'POST /edit/addNewCategory': 'edit/commerce/MainNavigationController.addNewCategory',
    'POST /edit/addChildMenu': 'edit/commerce/SecondNavigationController.addNewNavi',
    'POST /edit/updateSecondNavi': 'edit/commerce/SecondNavigationController.updateSecondNavi',
    'POST /edit/addSubChild': 'edit/commerce/ThirdNavigationController.addNewNavi',
    'GET  /edit/thirdNavigation/getById/:productId' : 'edit/commerce/ThirdNavigationController.getProductById',
    'POST /edit/deleteThirdNavigation/:item': 'edit/commerce/ThirdNavigationController.deleteProductOrVariant',
    'post /edit/thirdNavigation/addOrUpdateProduct':'edit/commerce/ThirdNavigationController.addOrUpdateProduct',
    'POST /edit/thirdNavigation/updateInventory/:inventoryList': 'edit/commerce/ThirdNavigationController.updateInventory',
    'POST /edit/addThirdNavigationImages': 'edit/commerce/ThirdNavigationController.addThirdNaviImages',
    'POST /edit/updateThirdNaviImage': 'edit/commerce/ThirdNavigationController.updateThirdNaviImage',
    'POST /edit/updateThirdNavi': 'edit/commerce/ThirdNavigationController.updateThirdNavi',
    'GET /edit/getChild': 'edit/commerce/ThirdNavigationController.getChild',
    'GET /edit/getUpdates': 'edit/commerce/ThirdNavigationController.getUpdates',
    'POST /edit/deleteItem': 'edit/commerce/MainNavigationController.deleteItem',
    'POST /edit/setCurrency': 'edit/setting/CurrencyController.setCurrency',
    'GET /edit/getCurrency': 'edit/setting/CurrencyController.getCurrency',
    'GET /edit/getAllCurrency': 'edit/setting/CurrencyController.getAllCurrency',


    'GET /edit/getContactUs': 'edit/setting/ContactUsController.getContactUs',
    'POST /edit/setPublishDetails': 'edit/publish/publishDetailController.setPublishDetails',
    'POST /edit/uploadPublishFiles': 'edit/publish/publishDetailController.uploadPublishFiles',
    
    'POST /edit/setContentRating': 'edit/publish/publishDetailController.setContentRating',
    'POST /edit/setAppStoreDetails': 'edit/publish/publishDetailController.setAppStoreDetails',
    'POST /edit/setAppReviewInformation': 'edit/publish/publishDetailController.setAppReviewInformation',
    'GET /edit/getAllLanguages': 'edit/publish/publishDetailController.getAllLanguages',
    'GET /edit/getAllRatings': 'edit/publish/publishDetailController.getContentRatings',
    'GET /edit/getLanguage': 'edit/publish/publishDetailController.getLanguage',
    'GET /edit/getAllPrimaryCategories': 'edit/publish/publishDetailController.getAllPrimaryCategories',
    'GET /edit/getAllSecondaryCategories': 'edit/publish/publishDetailController.getAllSecondaryCategories',

    /**
     * Edit / Article Data
     */
    'GET /edit/getArticles': 'edit/article/articleController.getArticles',
    'POST /edit/publishArticle': 'edit/article/articleController.publishArticle',
    'POST /edit/deleteArticle': 'edit/article/articleController.deleteArticle',
    'POST /edit/addCategory': 'edit/article/articleController.addCategory',
    'POST /edit/editCategory': 'edit/article/articleController.editCategory',
    'GET /edit/getCategoryList': 'edit/article/articleController.getCategoryList',
    'POST /edit/deleteCategory': 'edit/article/articleController.deleteCategory',
    'POST /edit/updateCategoryImage': 'edit/article/articleController.updateCategoryImage',

    /**
     *InventoryController
     */
    'GET /edit/getInventoryList': 'edit/commerce/InventoryController.getInventoryList',
    'GET /edit/createInventory': 'edit/commerce/InventoryController.createInventoryLis',
    'POST /edit/updateInventory': 'edit/commerce/InventoryController.updateInventory',
    'POST /edit/checkout': 'edit/commerce/InventoryController.updateInventoryProducts',
    //'POST /edit/deleteThirdNavigation': 'edit/commerce/InventoryController.deleteThirdNavigation',
    'GET /edit/getInventoryListByProductId': 'edit/commerce/InventoryController.getInventoryListByProductId',

    /**
     * EmailController
     */

    'POST /edit/saveEmailDeliInfo': 'edit/commerce/EmailController.saveEmailDeliInfo',
    'POST /edit/getEmailSettings': 'edit/commerce/EmailController.getEmailSettings',
    'POST /edit/updateEmailSettings': 'edit/commerce/EmailController.updateEmailSettings',
    'POST /edit/sendTestEmail': 'edit/commerce/EmailController.sendTestEmail',
    'POST /edit/sendVerificationLinkEmail': 'edit/commerce/EmailController.sendVerificationLinkEmail',
    'POST /edit/sendRegisterConfirmationEmail': 'edit/commerce/EmailController.sendRegisterConfirmationEmail',
    'POST /edit/updateHeaderFooterSettings': 'edit/commerce/EmailController.updateHeaderFooterSettings',
    'GET /edit/viewImages': 'edit/commerce/EmailController.viewImages',

    /**
     * ShippingController
     */
    'GET /edit/getShippingInfo': 'edit/commerce/ShippingController.getShippingInfo',
    'POST /edit/getShippingInfoByCountry': 'edit/commerce/ShippingController.getShippingInfoByCountry',
    'POST /edit/updateShippingInfo': 'edit/commerce/ShippingController.updateShippingInfo',
    'POST /edit/deleteShippingInfo': 'edit/commerce/ShippingController.deleteShippingInfo',
    'GET /edit/getShippingPickupInfo': 'edit/commerce/ShippingController.getShippingPickupInfo',

    /**
     * TaxController
     */
    'GET /edit/getTaxInfo': 'edit/commerce/TaxController.getTaxInfo',
    'POST /edit/updateTaxInfo': 'edit/commerce/TaxController.updateTaxInfo',
    'POST /edit/deleteTaxInfo': 'edit/commerce/TaxController.deleteTaxInfo',
    'GET /edit/getAllCountry': 'edit/commerce/TaxController.getAllCountry',
    
    /**
     * EngageController
     */
    'POST /edit/sendPushMessage': 'edit/engage/EngageController.sendPushMessage',
    'GET /edit/getMessageDetails': 'edit/engage/EngageController.getMessageDetails',
    'GET /edit/getAppUserData': 'edit/engage/EngageController.getAppUserData',
    'GET /edit/getUserOrders': 'edit/engage/EngageController.getUserOrders',
    'POST /edit/saveSchedulePushMassage' : 'edit/engage/EngageController.saveSchedulePushMassage',

    /***
     * Template Data
     ***/

    'GET /templates/viewTemplateUrl': 'template/TemplateController.viewTemplateUrl',
    'GET /templates/getContactUs': 'template/TemplateController.getContactUs',
    'GET /templates/getSpecificChild': 'template/TemplateController.getSpecificChild',
    'GET /templates/getProductsByAppId': 'template/TemplateController.getSubChildsByAppId',
    'GET /templates/getProductById': 'template/TemplateController.getSubChildById',
    'POST /templates/getMainMenu': 'template/TemplateController.getMainMenu',
    'GET /templates/getCurrency': 'template/TemplateController.getCurrency',
    'GET /templates/viewImages': 'template/TemplateController.viewImages',
    'GET /templates/getProductsByCatId': 'template/TemplateController.getThirdBySecondId',
    'POST /templates/deletePreviewTemp': 'template/TemplateController.deletePreviewTemp',
    'GET /templates/getAboutUs': 'template/TemplateController.getAboutUs',
    'GET /templates/getPolicies': 'template/TemplateController.getPolicies',
    'GET /templates/getTermsAndConditions': 'template/TemplateController.getTermsAndConditions',
    'POST /templates/postDeviceId': 'template/TemplateController.postDeviceId',
    'GET /templates/getTemplateData' : 'template/TemplateController.getTemplateByPreviewId',


    /**
     * Template Data for App Category Media
     */

    'GET /templates/getArticleCategoryByAppId': 'template/TemplateController.getArticleCategoryByAppId',
    'GET /templates/getArticleCategoryById': 'template/TemplateController.getArticleCategoryById',
    'GET /templates/getArticles': 'template/TemplateController.getArticles',
    'GET /templates/getArticleByCategoryId': 'template/TemplateController.getArticleByCategoryId',
    'GET /templates/getArticleById': 'template/TemplateController.getArticleById',
    'GET /templates/getCommentsDummy': 'template/TemplateController.getCommentsDummy',

    /**
    * Pay by authorizeNet in templates
    */
    'POST /templateController/authorizeNetPay': 'template/TemplateController.authorizeNetPay',
    /***
     * Template Auth Controller
     */
    'POST /templatesAuth/authenticate': 'template/TemplateAuthController.authenticate',
    'POST /templatesAuth/authenticateForApp': 'template/TemplateAuthController.authenticateForApp',
    'POST /templatesAuth/register': 'template/TemplateAuthController.register',
    'POST /templatesAuth/facebook': 'template/TemplateAuthController.facebookAuth',
    'POST /templatesAuth/google': 'template/TemplateAuthController.googleAuth',

    /***
     * Template Order Controller
     */
    'POST /templatesOrder/saveOrder': 'template/TemplateOrderController.saveOrder',
    'POST /templatesOrder/getTaxInfoByCountry': 'template/TemplateOrderController.getTaxInfoByCountry',

    /***
     * Template Inventory Controller
     */
    'POST /templatesInventory/updateInventory': 'template/TemplateOrderController.updateInventory',
    /***
     * MobileViewer Data
     **/

    'GET /mobile/allApps': 'mobileViewer/MobileController.allApps',
    'GET /mobile/meServerUrl': 'mobileViewer/MobileController.meServerUrl',
    'GET /mobile/fileServerUrl': 'mobileViewer/MobileController.fileServerUrl',

    /***
     * Technical Support Controller
     **/  
     'GET  /edit/getAllAppsData': 'technicalSupport/TechnicalSupportController.getAllAppsData',
     'POST  /edit/getPublishDetails': 'technicalSupport/TechnicalSupportController.getPublishDetails',
     'GET    /edit/getPushConfigDetails': 'technicalSupport/TechnicalSupportController.getPushConfigDetails',
     'POST   /edit/savePushConfigDetails': 'technicalSupport/TechnicalSupportController.savePushConfigDetails',
     'POST   /edit/saveAdNetwork': 'technicalSupport/TechnicalSupportController.saveAdNetwork',
    'POST   /edit/deleteAdNetwork': 'technicalSupport/TechnicalSupportController.deleteAdNetwork',
     'POST   /edit/changePublishStatus': 'technicalSupport/TechnicalSupportController.changePublishStatus',
     'GET  /edit/getAlluserData': 'technicalSupport/TechnicalSupportController.getAlluserData',
    'GET  /edit/getAllAduserData': 'technicalSupport/TechnicalSupportController.getAllAduserData',
    'GET  /edit/getAllAddNetworksData': 'technicalSupport/TechnicalSupportController.getAllAddNetworks',
    'GET  /edit/getAdNetwork': 'technicalSupport/TechnicalSupportController.getAddNetwork',

    /**
     * IPG Controller
     */
    'GET /edit/getIPGInfo': 'edit/commerce/IPGController.getIPGInfo',
    'POST /edit/updateIPGInfo': 'edit/commerce/IPGController.updateIPGInfo',


    /**
     * braintreeController
     */
    'GET /edit/getClientToken': 'edit/commerce/BraintreeController.getClientToken',
    'POST /edit/sale': 'edit/commerce/BraintreeController.sale',
    'POST /edit/paymentMethods': 'edit/commerce/BraintreeController.paymentMethods',
        /**
         * salesAndPromotionsController
         */  
    'POST /edit/saveSalesAndPromotion': 'edit/salesAndPromotion/SalesAndPromotionController.saveSalesAndPromotion',
    'GET /edit/getListOfSalesAndPromotions': 'edit/salesAndPromotion/SalesAndPromotionController.getListOfSalesAndPromotions',

    'POST /edit/transcationLog': 'TranscationLog.saveSalesAndPromotion',
    'POST /templates/makeStripePayment': 'template/StripeController.makePayment'
};
