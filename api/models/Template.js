/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var TemplateCategoryDetails =  require('./TemplateCategoryDetails.js');

module.exports = {

    schema: true,
    attributes: {
        template_name:{
            type: 'string'
        },
        templateViewName: {
            type: 'string'
        },
        templateType: {
            type: 'string'
        },
        templateViewDesc: {
            type: 'string'
        },
        gifImageUrl:{
            type: 'string'
        },
        imageUrl: {
            type: 'string'
        },
        versions:{
            collection:'version',
            via : 'template'
        },
        templateFilesPath:{
            type: 'string'
        },
        templateCategory :{
            type: 'string'
        }
    },
    seedData: [
        //{
        //    template_name : 'codecanyon',
        //    templateViewName : 'Del Mar',
        //    templateViewDesc : 'A simple elegant template that can be customised into what you want.',
        //    imageUrl : 'resturant/codecanyon.png',
        //    gifImageUrl: 'resturant/codecanyon1.png',
        //    templateFilesPath:'templates/codecanyon',
        //    templateCategory:'1'
        //},
        //{
        // template_name : 'tokoyoapp',
        // imageUrl : 'resturant/tokoyoapp.png',
        // templateFilesPath:'templates/resturant'
        // },
        //{
        // template_name : 'resturant2',
        // imageUrl : 'resturant/image1.png',
        // templateFilesPath:'templates/ang-starter'
        // },
        //{
        //    template_name : 'pizzaNew',
        //    templateViewName : 'Hell’s kitchen',
        //    templateViewDesc : 'A template crafted with café’s and restaurants in mind.',
        //    imageUrl : 'resturant/pizzNew.png',
        //    templateFilesPath:'templates/pizzaNew',
        //    templateCategory:'3'
        //},
        {
            template_name : 'foodDemoApp',
            templateViewName : 'Hawthorn',
            templateType: 'ecommerce',
            templateViewDesc : 'A clean and distinct template that immediately engages with the user',
            imageUrl : 'foodDeliver/',
            templateFilesPath:'templates/foodDemoApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'foodDemoApp2',
            templateViewName : 'Hawaii',
            templateType: 'ecommerce',
            templateViewDesc : 'A bold grid-style theme, perfect for lifestyle, clothing, and product imagery',
            imageUrl : 'foodDeliver2/',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'clothingApp',
            templateViewName : 'Colombo',
            templateType: 'ecommerce',
            templateViewDesc : 'Designed to beautifully showcase your brand and products',
            imageUrl : 'clothingApp/',
            templateFilesPath:'templates/clothingApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'GlamourUpApp',
            templateViewName : 'Glamour Up',
            templateType: 'ecommerce',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'GlamourUpApp/',
            templateFilesPath:'templates/GlamourUpApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'CrushApp',
            templateViewName : 'Crush Surf Shop',
            templateType: 'ecommerce',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'CrushApp/',
            templateFilesPath:'templates/CrushApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'HeadphoneApp',
            templateViewName : 'Headphone App',
            templateType: 'ecommerce',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'HeadphoneApp/',
            templateFilesPath:'templates/HeadphoneApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'hkRising',
            templateViewName : 'The Peak',
            templateType: 'article',
            templateViewDesc : 'Clean, simple, and focused on an elegant user experience. Ideal for media and blog apps.',
            imageUrl : 'hkRising/',
            templateFilesPath:'templates/hkRising',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'ECommerceApp',
            templateViewName : 'Rome',
            templateType: 'ecommerce',
            templateViewDesc : 'Tailor-made for modern restaurants and clothing store with a tinder type swipe to navigate through your product.',
            imageUrl : 'ECommerceApp/',
            templateFilesPath:'templates/ECommerceApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'BondiApp',
            templateViewName : 'Bondi',
            templateType: 'ecommerce',
            templateViewDesc : 'With a card styled navigation, users are presented with product categories at the fore front. This allows for easy navigation and minimal clicks to purchase. This template is easily tailored to suit any e-commerce needs for hobby stores, clothing stores, cafes and more.',
            imageUrl : 'BondiApp/',
            templateFilesPath:'templates/BondiApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'fashionApp',
            templateViewName : 'Cali',
            templateType: 'article',
            templateViewDesc : 'Striking, scalable, and built to boost engagement.',
            imageUrl : 'fashionApp/',
            templateFilesPath:'templates/fashionApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'RecipeApp',
            templateViewName : 'Recipe App',
            templateType: 'article',
            templateViewDesc : 'Striking, scalable, and built to boost engagement.',
            imageUrl : 'RecipeApp/',
            templateFilesPath:'templates/RecipeApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        }
    ]
};

