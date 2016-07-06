/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var TemplateCategory =  require('./TemplateCategory.js');

module.exports = {

    schema: true,
    attributes: {
        template_name:{
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
            imageUrl : 'resturant/pizzHut.png',
            templateFilesPath:'templates/pizzaHut',
            templateCategory:'2'
        },
        {
            template_name : 'florist',
            imageUrl : 'resturant/florist.png',
            templateFilesPath:'templates/florist',
            templateCategory:'3'
        },
        {
            template_name : 'pizzaNew',
            imageUrl : 'resturant/pizzNew.png',
            templateFilesPath:'templates/pizzaNew',
            templateCategory:'3'
        },
        {
            template_name : 'foodDemoApp',
            imageUrl : 'foodDeliver/foodDeliver.png',
            templateFilesPath:'templates/foodDemoApp',
            templateCategory: TemplateCategory.Business.ID
        },
        {
            template_name : 'foodDemoApp2',
            imageUrl : 'foodDeliver2/foodDeliver2.png',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory: TemplateCategory.Business.ID
        },
        {
            template_name : 'clothingApp',
            imageUrl : 'clothingApp/clothing.jpg',
            templateFilesPath:'templates/clothingApp',
            templateCategory: TemplateCategory.Business.ID
        },
        {
            template_name : 'hkRising',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory: TemplateCategory.Media.ID
        },
        {
            template_name : 'ECommerceApp',
            imageUrl : 'ECommerceApp/ECommerceApp.png',
            templateFilesPath:'templates/ECommerceApp',
            templateCategory: TemplateCategory.Media.ID
        },
        {
            template_name : 'fashionApp',
            imageUrl : 'fashionApp/fashionApp.png',
            templateFilesPath:'templates/fashionApp',
            templateCategory: TemplateCategory.Media.ID
        }
    ]
};

