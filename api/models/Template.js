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
        Menus:[ {
                menuName:  {
                              type: 'string'
                           },
                link:  {
                           type: 'string'
                        },
                categories: [{
                    mainId:  {
                                type: 'string'
                             },
                    name:  {
                              type: 'string'
                           },
                    is_recommended:  {
                                         type: 'string'
                                      },
                    is_seasonal:  {
                                     type: 'string'
                                  },
                    imageUrl:  {
                                   type: 'string'
                                },
                    description:  {
                                       type: 'string'
                                    },
                    first_name:  {
                                      type: 'string'
                                   },
                    last_name:  {
                                    type: 'string'
                                 },
                    email:  {
                             type: 'string'
                             },
                    position:  {
                                  type: 'string'
                                },
                    longitude: Number,
                    latitude: Number,
                    hours:  {
                               type: 'string'
                              },
                    phone:  {
                              type: 'string'
                              },
                    streetAddress:  {
                                       type: 'string'
                                     },
                    city:  {
                              type: 'string'
                            },
                    state:  {
                               type: 'string'
                             },
                    zip: Number,
                    product:[{
                        name:  {
                                  type: 'string'
                                },
                        price:  {
                                 type: 'string'
                                 },
                        imageUrl:  {
                                        type: 'string'
                                    },
                        description:  {
                                        type: 'string'
                                      },
                        discount:  {
                                    type: 'string'
                                   }
                    }]
                }]
            }]
    },
    seedData: [
        {
            template_name : 'codecanyon',
            imageUrl : 'resturant/codecanyon.png',
            templateFilesPath:'templates/codecanyon'
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
            Menus:[{
                        menuName:'Promo',link: "promo", categories:[{name:'Promo1',imageUrl: "category_61_5327.jpg", description : "Hot description",
                                    product:[{name: 'Low price',price: '100',imageUrl: 'article-0-1A9F1DAA000005DC-669_634x447.jpg'},
                                    {name: 'High  price',price: '200',imageUrl: 'OOMPizza-Pepperoni-300x233.jpg'}]},
                                    {name:'Promo2',imageUrl: "melko-21290330.jpg",description : "Low description",
                                    product:[{name: 'Low price',price: '100',imageUrl: 'article-0-1A9F1DAA000005DC-669_634x447.jpg'},
                                    {name: 'High  price',price: '200',imageUrl: 'OOMPizza-Pepperoni-300x233.jpg'}]}]},
                        {menuName:'Category', link: "category", categories:[{name:'Hot',imageUrl: "category_61_5327.jpg",
                            description : "Hot description"},{name:'Low',imageUrl: "melko-21290330.jpg",description : "Low description"}]},
                        {menuName:'Best Seller',link: "bestSeller",categories:[{name:'Best Seller1',imageUrl: "category_61_5327.jpg",
                            description : "Hot description"},{name:'Best Seller2',imageUrl: "melko-21290330.jpg",description : "Low description"}]},
                        {menuName:'Contact Us',link: "contact", categories:[{name:'Hot',imageUrl: "category_61_5327.jpg",
                            description : "Hot description"},{name:'Low',imageUrl: "melko-21290330.jpg",description : "Low description"}]}]
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
            template_name : 'foodDeliver',
            imageUrl : 'resturant/image.png',
            templateFilesPath:'templates/foodDeliver'
        }
    ]
};

