/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!documentation/
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': true,

  'UserController': {
    '*': ['jwtAuth'],
    yourselfReason : true
  },

  'ApplicationController': {
    //'*': ['jwtAuth']
    designApps :true,
    viewTemplate:true,
    getApplicationData:true,
  },

  'DashboardController': {
    '*': ['jwtAuth']
  },

  'EditController': {
  /*'*': ['jwtAuth'],*/
    viewImages : true,
    buildApkFile : true,
  },

  'edit/style/StyleController': {
    '*': ['jwtAuth']
  },

  'edit/commerce/MainNavigationController': {
    '*': ['jwtAuth']
  },
  'edit/commerce/MainCategoryController': {
      '*': ['jwtAuth'],
      getCategoryList : true,
      getCategoryListPlusProducts : true,
      updateCategoryOrder: true,
      updateFeaturedCategory: true,
      checkAppHeaderEligibility: true
  },

  'edit/commerce/SecondNavigationController': {
    '*': ['jwtAuth']
  },
  'edit/commerce/UserSettingsController':{
    '*': ['jwtAuth']
  },
  'edit/commerce/SliderController': {
    '*': ['jwtAuth']
  },
  'edit/commerce/ThirdNavigationController': {
    '*': ['jwtAuth'],
    getProvinces : true,
    getShippingRules : true
  },
  'edit/commerce/BlogsController': {
    '*': ['jwtAuth'],
  },
  'edit/publish/publishDetailController':{
   '*': ['jwtAuth']
  },

  'edit/article/articleController':{
    '*': ['jwtAuth'],
    editCategory:true
  },

  'template/TemplateController': {
    //'*': ['jwtAuth'],
    getMainMenu : true,
    getContactUs : true,
    getSpecificChild : true,
    getSubChildById : true,
    getCurrency : true,
    viewImages : true,
    getThirdBySecondId : true,
    setPublishDetails: true,
    deletePreviewTemp:true,
    getAboutUs: true,
    getPolicies: true,
    getTermsAndConditions: true,
    getArticles : true,
    getArticleByCategoryId : true,
    getArticleById : true,
    getArticleCategoryByAppId : true,
    getArticleCategoryById : true,
    getCommentsDummy : true,
    getSliderData : true,
    checkProduct : true

  },

  'template/TemplateAuthController': {
    //'*': ['jwtAuth'],
      authenticate : true,
      register: true,
      facebookAuth : true,
      googleAuth: true,
      sendPasswordResetEmail: true,
      resetPassword: true,
      verifyAppUserEmail: true
  },

  'mobileViewer/MobileController' : {

    '*': ['jwtAuth'],
      sendPayHereForm:true,
      notifyUrl:true,
      payHereSuccess:true,
      cancelUrl:true
  },
  'reports/StoreAnalyticsController' :{
        '*': ['jwtAuth'],
        getOrderData:true

    }

	// Here's an example of mapping some policies to run before
  // a controller and its actions
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
