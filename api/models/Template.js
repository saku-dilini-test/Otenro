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
        templateFilesPath:{
            type: 'string'
        },
        templateCategory :{
            type: 'string'
        }
    },
    seedData: [
        {
            template_name : 'codecanyon',
            templateViewName : 'Code canyon',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'resturant/codecanyon.png',
            templateFilesPath:'templates/codecanyon',
            templateCategory:'1'
        },
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
        {
            template_name : 'pizzaHut',
            templateViewName : 'Pizza Hut',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'resturant/pizzHut.png',
            templateFilesPath:'templates/pizzaHut',
            templateCategory:'2'
        },
        {
            template_name : 'florist',
            templateViewName : 'Florist App',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'resturant/florist.png',
            templateFilesPath:'templates/florist',
            templateCategory:'3'
        },
        {
            template_name : 'pizzaNew',
            templateViewName : 'PizzaHut New',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'resturant/pizzNew.png',
            templateFilesPath:'templates/pizzaNew',
            templateCategory:'3'
        },
        {
            template_name : 'foodDemoApp',
            templateViewName : 'Food App',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'foodDeliver/foodapp.gif',
            imageUrl : 'foodDeliver/foodDeliver.png',
            templateFilesPath:'templates/foodDemoApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'foodDemoApp2',
            templateViewName : 'Cloth Temp',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'foodDeliver2/clothing.gif',
            imageUrl : 'foodDeliver2/foodDeliver2.png',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'clothingApp',
            templateViewName : 'Cloth Template',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'clothingApp/clothing-2.gif',
            imageUrl : 'clothingApp/clothing.jpg',
            templateFilesPath:'templates/clothingApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'hkRising',
            templateViewName : 'Hong KongRising',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'hkRising/hkRising.gif',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'ECommerceApp',
            templateViewName : 'ECommerce Template',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'ECommerceApp/ECommerceApp.png',
            templateFilesPath:'templates/ECommerceApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'fashionApp',
            templateViewName : 'Fashion Template',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'fashionApp/fashionApp.png',
            templateFilesPath:'templates/fashionApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        }
    ]
};

