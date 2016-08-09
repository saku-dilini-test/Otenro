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
        {
            template_name : 'pizzaHut',
            templateViewName : 'Pizza Hut',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'resturant/pizzHut.png',
            gifImageUrl :'resturant/pizza.png',
            templateFilesPath:'templates/pizzaHut',
            templateCategory:'2'
        },
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
            templateViewName : 'Café El Jafe',
            templateViewDesc : 'Artesian',
            gifImageUrl : 'foodDeliver/food.png',
            imageUrl : 'foodDeliver/foodDeliver.png',
            templateFilesPath:'templates/foodDemoApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'foodDemoApp2',
            templateViewName : 'Dirty Diana',
            templateViewDesc : 'Glamorous yet subtle. Suited for your boutique store.',
            gifImageUrl : 'foodDeliver2/clothing.png',
            imageUrl : 'foodDeliver2/foodDeliver2.png',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'clothingApp',
            templateViewName : 'Cloth Template',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            gifImageUrl : 'clothingApp/clothing2.png',
            imageUrl : 'clothingApp/clothing.jpg',
            templateFilesPath:'templates/clothingApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'hkRising',
            templateViewName : 'Rising',
            templateViewDesc : 'Reporters, writers, bloggers - keep your readers informed.',
            gifImageUrl : 'hkRising/hkRising1.png',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory: TemplateCategoryDetails.Media.ID
        },
        {
            template_name : 'ECommerceApp',
            templateViewName : 'ECommerce Template',
            templateViewDesc : 'Rum Punch is favored by many businesses. It is easy to customise.',
            imageUrl : 'ECommerceApp/ECommerceApp.png',
            gifImageUrl : 'ECommerceApp/ecommerce.png',
            templateFilesPath:'templates/ECommerceApp',
            templateCategory: TemplateCategoryDetails.Business.ID
        },
        {
            template_name : 'fashionApp',
            templateViewName : 'Viola',
            templateViewDesc : 'Customise this template to be anything you want it to be.',
            imageUrl : 'fashionApp/fashionApp.png',
            gifImageUrl : 'fashionApp/fashion.png',
            templateFilesPath:'templates/fashionApp',
            templateCategory: TemplateCategoryDetails.Media.ID
        }
    ]
};

