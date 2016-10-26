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
      orderId : "1",
      menuButtonId : '1001'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Preview Article',
      menuFunction : 'article.previewArticles',
      orderId : "2",
      menuButtonId : '1002'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Categories',
      menuFunction : 'article.categories',
      orderId : "3",
      menuButtonId : '1003'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Featured',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "4",
      menuButtonId : '1004'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Secondary',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "5",
      menuButtonId : '1005'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Ads',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "6",
      menuButtonId : '1006'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Subscriptions',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "7",
      menuButtonId : '1007'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'View Controls',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "8",
      menuButtonId : '1008'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "9",
      menuButtonId : '1009'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Integration',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "10",
      menuButtonId : '1010'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Communication',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "11",
      menuButtonId : '1011'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Media.ID,
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Site Settings',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "12",
      menuButtonId : '1012'
    },

    // data for business category
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Add a product',
      menuFunction : 'products.showAddProductsDialog',
      orderId : "13",
      menuButtonId : '1501'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Category',
      menuFunction : 'commerce.showAddCategoriesDialog',
      orderId : "14",
      menuButtonId : '1502'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Orders',
      menuFunction : 'commerce.showOrderDialog',
      orderId : "15",
      menuButtonId : '1503'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Inventory',
      menuFunction : 'inventory.showInventoryDialog',
      orderId : "16",
      menuButtonId : '1504'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Shipping',
      menuFunction : 'commerce.showShippingDialog',
      orderId : "17",
      menuButtonId : '1505'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Taxes',
      menuFunction : 'tax.showTaxesDialog',
      orderId : "18",
      menuButtonId : '1506'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'E-mail Settings',
      menuFunction : 'commerce.showEmailSettingsDialog',
      orderId : "19",
      menuButtonId : '1507'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Store Settings',
      menuFunction : 'commerce.showStoreSettingsDialog',
      orderId : "20",
      menuButtonId : '1508'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : 'commerce.showComingSoonDialog',
      orderId : "21",
      menuButtonId : '1509'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Integration',
      menuFunction : 'commerce.showIPGDialog',
      orderId : "22",
      menuButtonId : '1510'
    },
    {
      templateCategoryId : TemplateCategoryDetails.Business.ID,
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Delete',
      menuFunction : 'commerce.showDeleteAppDialog',
      orderId : "23",
      menuButtonId : '1511'
    }

  ]
};

