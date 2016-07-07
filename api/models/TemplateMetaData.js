/**
 * TemplateMetaData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var TemplateCategoryDetails =  require('./TemplateCategoryDetails.js');

module.exports = {

  attributes: {
    templateCategoryId : {  // This is start from 1 . Eg : hkRising template category id = 3 , will be change later
      type: 'string'
    },
    templateId : {          // This is start from 1 , will be change later
      type: 'string'
    },
    menuType : {
      type: 'string'
    },
    menuTitle  : {
      type: 'string'
    },
    menuFunction : {
      type: 'string'
    },
    menuButtonId : {  // There is range for each template eg :- hkRising 1001 - 1999
      type: 'string'
    }
  },
  seedData: [

    // data for media category
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Publish Article',
      menuFunction : 'article.publishArticle',
      menuButtonId : '1001'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Preview Article',
      menuFunction : 'article.previewArticles',
      menuButtonId : '1002'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Featured',
      menuFunction : '',
      menuButtonId : '1003'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Secondary',
      menuFunction : '',
      menuButtonId : '1004'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Ads',
      menuFunction : '',
      menuButtonId : '1004'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Subscriptions',
      menuFunction : '',
      menuButtonId : '1005'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'View Controls',
      menuFunction : '',
      menuButtonId : '1006'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : '',
      menuButtonId : '1007'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Integration',
      menuFunction : '',
      menuButtonId : '1008'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Communication',
      menuFunction : '',
      menuButtonId : '1009'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Site Settings',
      menuFunction : '',
      menuButtonId : '1010'
    },

    // data for business category
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Add a product',
      menuFunction : 'products.showAddProductsDialog',
      menuButtonId : '1501'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'orders',
      menuFunction : 'commerce.showOrderDialog',
      menuButtonId : '1502'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Inventory',
      menuFunction : 'inventory.showInventoryDialog',
      menuButtonId : '1503'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Shipping',
      menuFunction : 'commerce.showShippingDialog',
      menuButtonId : '1504'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Taxes',
      menuFunction : 'commerce.showTaxesDialog',
      menuButtonId : '1505'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'E-mail Settings',
      menuFunction : 'commerce.showEmailSettingsDialog',
      menuButtonId : '1506'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Store Settings',
      menuFunction : 'commerce.showStoreSettingsDialog',
      menuButtonId : '1507'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : '',
      menuButtonId : '1508'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Ingegration',
      menuFunction : '',
      menuButtonId : '1509'
    }

  ]
};

