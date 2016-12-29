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
            templateViewDesc : 'A clean and distinct template that immediately engages with the user',
            gifImageUrl : 'foodDeliver/food.jpg',
            imageUrl : 'foodDeliver/foodDeliver.png',
            templateFilesPath:'templates/foodDemoApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'foodDemoApp2',
            templateViewName : 'Hawaii',
            templateViewDesc : 'A bold grid-style theme, perfect for lifestyle, clothing, and product imagery',
            gifImageUrl : 'foodDeliver2/clothing.png',
            imageUrl : 'foodDeliver2/foodDeliver2.png',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'clothingApp',
            templateViewName : 'Colombo',
            templateViewDesc : 'Designed to beautifully showcase your brand and products',
            gifImageUrl : 'clothingApp/clothing2.png',
            imageUrl : 'clothingApp/clothing.jpg',
            templateFilesPath:'templates/clothingApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'GlamourUpApp',
            templateViewName : 'Glamour Up',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'GlamourUpApp/clothing2.png',
            imageUrl : 'GlamourUpApp/clothing.jpg',
            templateFilesPath:'templates/GlamourUpApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'CrushApp',
            templateViewName : 'Crush Surf Shop',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'CrushApp/clothing2.png',
            imageUrl : 'CrushApp/clothing.jpg',
            templateFilesPath:'templates/CrushApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'HeadphoneApp',
            templateViewName : 'Headphone App',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'HeadphoneApp/headphoneAppGif.png',
            imageUrl : 'HeadphoneApp/headphoneApp.jpg',
            templateFilesPath:'templates/HeadphoneApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'hkRising',
            templateViewName : 'The Peak',
            templateViewDesc : 'Clean, simple, and focused on an elegant user experience. Ideal for media and blog apps.',
            gifImageUrl : 'hkRising/hkRising1.png',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'ECommerceApp',
            templateViewName : 'Rome',
            templateViewDesc : 'Tailor-made for modern restaurants and clothing store with a tinder type swipe to navigate through your product.',
            imageUrl : 'ECommerceApp/ECommerceApp.png',
            gifImageUrl : 'ECommerceApp/ecommerce.png',
            templateFilesPath:'templates/ECommerceApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'fashionApp',
            templateViewName : 'Cali',
            templateViewDesc : 'Striking, scalable, and built to boost engagement.',
            imageUrl : 'fashionApp/fashionApp.png',
            gifImageUrl : 'fashionApp/fashion.png',
            templateFilesPath:'templates/fashionApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'RecipeApp',
            templateViewName : 'Recipe App',
            templateViewDesc : 'Striking, scalable, and built to boost engagement.',
            imageUrl : 'RecipeApp/recipeApp.png',
            gifImageUrl : 'RecipeApp/recipeAppGif.png',
            templateFilesPath:'templates/RecipeApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        }
    ]
};

