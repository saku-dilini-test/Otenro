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
            templateCategory:'business'
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
            templateFilesPath:'templates/pizzaHut'
        },
        {
            template_name : 'florist',
            imageUrl : 'resturant/florist.png',
            templateFilesPath:'templates/florist'
        },
        {
            template_name : 'pizzaNew',
            imageUrl : 'resturant/pizzNew.png',
            templateFilesPath:'templates/pizzaNew'
        },
        {
            template_name : 'foodDemoApp',
            imageUrl : 'foodDeliver/foodDeliver.png',
            templateFilesPath:'templates/foodDemoApp'
        },
        {
            template_name : 'hkRising',
            imageUrl : 'hkRising/hkRising.png',
            templateFilesPath:'templates/hkRising',
            templateCategory:'media'
        }
    ]
};

