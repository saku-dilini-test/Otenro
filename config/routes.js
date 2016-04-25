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
    'POST /auth/google': 'AuthController.googleAuth',
    'POST /auth/facebook': 'AuthController.facebookAuth',


    /***
     * Application Data
     * */

    'POST /app/dashboard/allApps': 'DashboardController.allApps',
    'POST /api/dashboard/getAllCategory': 'DashboardController.getAllCategory',
    'POST /app/designApps': 'ApplicationController.designApps',
    'POST /app/viewTemplate': 'ApplicationController.viewTemplate',

    /***
     * Edit Data
     *
     * */

    'POST /edit/addStyles': 'edit/style/StyleController.addStyles',
    'POST /edit/getAppSettings': 'edit/style/StyleController.getAppSettings',
    'POST /edit/addStyleImage/addHeaderImage': 'edit/style/StyleController.addHeaderImage',
    'POST /edit/addStyleImage/addBackgroundImage': 'edit/style/StyleController.addBackgroundImage',
    'POST /edit/addStyleColor': 'edit/style/StyleController.addStyleColor',
    'POST /edit/addLogoImage': 'edit/style/StyleController.addLogoImage',
    // 'POST /edit/addBackgroundColor' : 'style/StyleController.addBackgroundColor',
    'POST /edit/addStyleFontFamily': 'edit/style/StyleController.addStyleFontFamily',
    'POST /edit/addStyleFontSize': 'edit/style/StyleController.addStyleFontSize',
    'POST /edit/addStyleFontWeight': 'edit/style/StyleController.addStyleFontWeight',
    'POST /edit/addStyleButtonBorderWidth': 'edit/style/StyleController.addStyleButtonBorderWidth',
    'POST /edit/addStyleButtonBorderRadius': 'edit/style/StyleController.addStyleButtonBorderRadius',
    'POST /edit/addFonts': 'edit/style/StyleController.addFonts',
    'GET /edit/viewImages': 'EditController.viewImages',
    'POST /edit/buildSource': 'EditController.buildSource',

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
    'POST /edit/addContactUs ': 'edit/setting/ContactUsController.addContactUs',
    'POST /edit/addBasicInfo': 'edit/setting/ContactUsController.addBasicInfo',
    'POST /edit/addWebInfo': 'edit/setting/ContactUsController.addWebInfo',
    'POST /edit/addGoogleMapInfo': 'edit/setting/ContactUsController.addGoogleMapInfo',
    'POST /edit/addOpenHoursInfo': 'edit/setting/ContactUsController.addOpenHoursInfo',

    'GET /edit/getMainNavigation': 'edit/commerce/MainNavigationController.getMainNavigation',
    'GET /edit/getSecondNavigation': 'edit/commerce/SecondNavigationController.getSecondNavigation',
    'GET /edit/getThirdNavigation': 'edit/commerce/ThirdNavigationController.getThirdNavigation',
    'GET /edit/getOrders': 'edit/commerce/OrderController.getOrders',


    'POST /edit/saveMainMenu': 'edit/commerce/MainNavigationController.saveMainMenu',
    //'POST /templates/specificSecondNavi' : 'edit/commerce/MainNavigationController',
    //'POST /templates/specificThirdNavi': 'edit/commerce/MainNavigationController',
    'POST /edit/addNewMenu': 'edit/commerce/MainNavigationController.addNewNavi',
    'POST /edit/addChildMenu': 'edit/commerce/SecondNavigationController.addNewNavi',
    'POST /edit/updateSecondNavi': 'edit/commerce/SecondNavigationController.updateSecondNavi',
    'POST /edit/addSubChild': 'edit/commerce/ThirdNavigationController.addNewNavi',
    'POST /edit/addThirdNavigation': 'edit/commerce/ThirdNavigationController.addThirdNavi',
    'POST /edit/updateThirdNaviImage': 'edit/commerce/ThirdNavigationController.updateThirdNaviImage',
    'POST /edit/updateThirdNavi': 'edit/commerce/ThirdNavigationController.updateThirdNavi',
    'GET /edit/getChild': 'edit/commerce/ThirdNavigationController.getChild',
    'GET /edit/getUpdates': 'edit/commerce/ThirdNavigationController.getUpdates',
    'GET /edit/getVariants': 'edit/commerce/ThirdNavigationController.getVariants',
    'POST /edit/updateVariants': 'edit/commerce/ThirdNavigationController.updateVariants',
    'POST /edit/deleteItem': 'edit/commerce/MainNavigationController.deleteItem',
    'POST /edit/setCurrency': 'edit/setting/CurrencyController.setCurrency',
    'GET /edit/getCurrency': 'edit/setting/CurrencyController.getCurrency',
    'GET /edit/getAllCurrency': 'edit/setting/CurrencyController.getAllCurrency',


      'GET /edit/getContactUs' :'edit/setting/ContactUsController.getContactUs',
      'POST /edit/setPublishDetails' :'edit/publish/publishDetailController.setPublishDetails',
      'GET /edit/getAllLanguages' :'edit/publish/publishDetailController.getAllLanguages',
      'GET /edit/getLanguage' :'edit/publish/publishDetailController.getLanguage',
      'GET /edit/getAllPrimaryCategories' :'edit/publish/publishDetailController.getAllPrimaryCategories',
      'GET /edit/getAllSecondaryCategories' :'edit/publish/publishDetailController.getAllSecondaryCategories',





    /**
     *InventoryController
     */
    'GET /edit/getInventoryList': 'edit/commerce/InventoryController.getInventoryList',
    'POST /edit/updateInventory': 'edit/commerce/InventoryController.updateInventory',

    /**
     * ShippingController
     */
    'POST /edit/insertFlatRateData': 'edit/commerce/ShippingController.insertFlatRateData',

    /***
     * Template Data
     ***/

    'GET /templates/getContactUs': 'template/TemplateController.getContactUs',
    'GET /templates/getSpecificChild': 'template/TemplateController.getSpecificChild',
    'GET /templates/getProductById': 'template/TemplateController.getSubChildById',
    'POST /templates/getMainMenu': 'template/TemplateController.getMainMenu',
    'GET /templates/getCurrency': 'template/TemplateController.getCurrency',
    'GET /templates/viewImages': 'template/TemplateController.viewImages',
    'GET /templates/getProductsByCatId': 'template/TemplateController.getThirdBySecondId',

    /***
     * Template Auth Controller
     */
    'POST /templatesAuth/authenticate': 'template/TemplateAuthController.authenticate',
    'POST /templatesAuth/register': 'template/TemplateAuthController.register',
    'POST /templatesAuth/facebook': 'template/TemplateAuthController.facebookAuth',
    'POST /templatesAuth/google': 'template/TemplateAuthController.googleAuth',

    /***
     * Template Order Controller
     */
    'POST /templatesOrder/saveOrder' : 'template/TemplateOrderController.saveOrder',

    /***
     * MobileViewer Data
     **/

    'GET /mobile/allApps': 'mobileViewer/MobileController.allApps',
    'GET /mobile/meServerUrl': 'mobileViewer/MobileController.meServerUrl'


};
