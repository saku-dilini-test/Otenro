/**
 * Template.js
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

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
            templateCategory:'2'
        },
        {
            template_name : 'foodDemoApp2',
            imageUrl : 'foodDeliver2/foodDeliver2.png',
            templateFilesPath:'templates/foodDemoApp2',
            templateCategory:'2'
        },
        {
            template_name : 'hkRising',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory:'3'
        },
        {
            template_name : 'fashionApp',
            imageUrl : 'fashionApp/fashionApp.png',
            templateFilesPath:'templates/fashionApp',
            templateCategory:'3'
        },
        {
            template_name : 'clothingApp',
            imageUrl : 'clothingApp/clothingApp.png',
            templateFilesPath:'templates/clothingApp',
            templateCategory:'1'
        }
    ]
};

