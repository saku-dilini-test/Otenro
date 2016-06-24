/**
 * TemplateMetaData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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

      // data for template category 2, menuButtonId Start 1001
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Publish Article',
      menuFunction : 'article.publishArticle',
      menuButtonId : '1001'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Preview Article',
      menuFunction : 'article.previewArticles',
      menuButtonId : '1002'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Featured',
      menuFunction : '',
      menuButtonId : '1003'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Secondary',
      menuFunction : '',
      menuButtonId : '1004'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Ads',
      menuFunction : '',
      menuButtonId : '1004'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Subscriptions',
      menuFunction : '',
      menuButtonId : '1005'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'View Controls',
      menuFunction : '',
      menuButtonId : '1006'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : '',
      menuButtonId : '1007'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Integration',
      menuFunction : '',
      menuButtonId : '1008'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Communication',
      menuFunction : '',
      menuButtonId : '1009'
    },
    {
      templateCategoryId : '3',
      templateId : '1',
      menuType : 'MenuButton',
      menuTitle  : 'Site Settings',
      menuFunction : '',
      menuButtonId : '1010'
    },

    // data for template category 2, menuButtonId Start 1501
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Products',
      menuFunction : 'products.showAddProductsDialog',
      menuButtonId : '1501'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'orders',
      menuFunction : 'commerce.showOrderDialog',
      menuButtonId : '1502'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Inventory',
      menuFunction : 'inventory.showInventoryDialog',
      menuButtonId : '1503'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Shipping',
      menuFunction : 'commerce.showShippingDialog',
      menuButtonId : '1504'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Taxes',
      menuFunction : 'commerce.showTaxesDialog',
      menuButtonId : '1505'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'E-mail Settings',
      menuFunction : 'commerce.showEmailSettingsDialog',
      menuButtonId : '1506'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Store Settings',
      menuFunction : 'commerce.showStoreSettingsDialog',
      menuButtonId : '1507'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : '',
      menuButtonId : '1508'
    },
    {
      templateCategoryId : '2',
      templateId : '2',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Ingegration',
      menuFunction : '',
      menuButtonId : '1509'
    },
      //Clothing app
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Products',
      menuFunction : 'products.showAddProductsDialog',
      menuButtonId : '1501'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'orders',
      menuFunction : 'commerce.showOrderDialog',
      menuButtonId : '1502'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Inventory',
      menuFunction : 'inventory.showInventoryDialog',
      menuButtonId : '1503'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Shipping',
      menuFunction : 'commerce.showShippingDialog',
      menuButtonId : '1504'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Taxes',
      menuFunction : 'commerce.showTaxesDialog',
      menuButtonId : '1505'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'E-mail Settings',
      menuFunction : 'commerce.showEmailSettingsDialog',
      menuButtonId : '1506'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Store Settings',
      menuFunction : 'commerce.showStoreSettingsDialog',
      menuButtonId : '1507'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'Payment Activities',
      menuFunction : '',
      menuButtonId : '1508'
    },
    {
      templateCategoryId : '1',
      templateId : '3',
      menuType : 'MenuButton',
      menuTitle  : 'IPG Ingegration',
      menuFunction : '',
      menuButtonId : '1509'
    }

  ]
};

