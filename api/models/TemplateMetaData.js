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
    }


  ]
};

