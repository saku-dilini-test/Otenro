/**
 * AppInitialData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {
    templateName :{
      type: 'String'
    },
    secondNavi : {
      type : 'array'
    },
    articleCategory : {
      type : 'array'
    }
  },
  seedData: [
    {
      templateName : 'foodDemoApp',
      secondNavi : [
        {
          attribute : {
            "imageUrl": "bbq salad.png",
            "name": "Salads",
            "description": "Salads description"
          },
          thirdNavi : [
            {
              "name": "Grilled Chicken Salad",
              "price": 100,
              "imageUrl": "grilled_chicken_salad.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Spicy Thai Salad with Grilled Chicken",
              "price": 200,
              "imageUrl": "spicy thai salad with grilled chicken.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            }
//            {
//              "name": "Pasta Salad",
//              "price": 300,
//              "briefDesc" : "Pasta Salad brief des",
//              "detailedDesc" : "Pasta Salad details description. Pasta Salad details description. Pasta Salad details description",
//              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Egg Salad",
//              "price": 400,
//              "briefDesc" : "Egg salad brief des",
//              "detailedDesc" : "Egg salad details description. Egg salad details description. Egg salad details description",
//              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            }
          ]
        },
        {
          attribute: {
            "imageUrl": "chocolate Fudge brownie with vanila ice cream.png",
            "name": "Deserts",
            "description": "Deserts description"
          },
          thirdNavi: [
            {
              "name": "Chocolate Fudge Brownie with Vanila Ice Cream",
              "price": 100,
              "imageUrl": "chocolate Fudge brownie with vanila ice cream.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            }
//            {
//              "name": "Caramal Pudding",
//              "price": 200,
//              "briefDesc" : "Caramal Pudding brief des",
//              "detailedDesc" : "Caramal Pudding details description. Caramal Pudding details description. Caramal Pudding details description",
//              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Chocolate Ice Cream Sunday",
//              "price": 300,
//              "briefDesc" : "Chocoloate Ice Cream Sunday brief des",
//              "detailedDesc" : "Chocoloate Ice Cream Sunday details description. Chocoloate Ice Cream Sunday details description. Chocoloate Ice Cream Sunday details description",
//              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Chocolate Muse",
//              "price": 400,
//              "briefDesc" : "Chocoloate Muse brief des",
//              "detailedDesc" : "Chocoloate Muse details description. Chocoloate Muse details description. Chocoloate Muse details description",
//              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Apple Crumble Pie",
//              "price": 500,
//              "briefDesc" : "Apple Crumble Pie brief des",
//              "detailedDesc" : "Apple Crumble Pie details description. Apple Crumble Pie details description. Apple Crumble Pie details description",
//              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
//              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
//              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
//              "createdDate": Date.now()
//            }
          ]
        },
        {
          attribute : {
            "imageUrl": "salmon stake grilled.png",
            "name": "Beverages",
            "description": "Beverages description"
          },
          thirdNavi : [
            {
              "name": "Grilled Garlic Lamb Chops",
              "price": 100,
              "imageUrl": "grilled garlic lamb chops.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Beef Stake with Smashed Potatoes",
              "price": 200,
              "imageUrl": "beef stake with smashed potatoes.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "BBQ Pork Ribs",
              "price": 300,
              "imageUrl": "bbq pork ribs.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Pina Colada",
              "price": 400,
              "briefDesc" : "Pina Colada brief des",
              "detailedDesc" : "Pina Colada details description. Pina Colada details description. Pina Colada details description",
              "imageUrl": "bg.png",
              "createdDate": Date.now()
            }
          ]
        }
//        ,
//        {
//          attribute : {
//            "imageUrl": "category_61_5327.jpg",
//            "name": "Cake",
//            "description": "Cake description"
//          },
//          thirdNavi : [
//            {
//              "name": "Espresso Shot",
//              "price": 100,
//              "briefDesc" : "Espresso Shot brief des",
//              "detailedDesc" : "Espresso Shot details description. Espresso Shot details description. Espresso Shot details description",
//              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Mocha Frapachino",
//              "price": 200,
//              "briefDesc" : "Mocha Frapachino brief des",
//              "detailedDesc" : "Mocha Frapachino details description. Mocha Frapachino details description. Mocha Frapachino details description",
//              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Chocolate Milk Shake",
//              "price": 300,
//              "briefDesc" : "Chocolate Milk Shake brief des",
//              "detailedDesc" : "Chocolate Milk Shake details description. Chocolate Milk Shake details description. Chocolate Milk Shake details description",
//              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Pina Colada",
//              "price": 400,
//              "briefDesc" : "Pina Colada brief des",
//              "detailedDesc" : "Pina Colada details description. Pina Colada details description. Pina Colada details description",
//              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
//              "createdDate": Date.now()
//            }
//          ]
//        }

      ]

    },
    {
      templateName : 'foodDemoApp2',
      secondNavi : [
        {
          attribute : {
            "imageUrl": "shirt_x.png",
            "name": "Shirt",
            "description": "Shirt description"
          },
          thirdNavi : [
            {
              "name": "Shirt x",
              "price": 250,
              "briefDesc" : "Shirt x brief des",
              "detailedDesc" : "Shirt x details description. Shirt x details description. Shirt x details description",
              "imageUrl": "shirt_x.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt y",
              "price": 350,
              "briefDesc" : "Shirt y brief des",
              "detailedDesc" : "Shirt y details description. Shirt y details description. Shirt y details description",
              "imageUrl": "shirt_y.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt z",
              "price": 450,
              "briefDesc" : "Shirt z brief des",
              "detailedDesc" : "Shirt z details description. Shirt z details description. Shirt z details description",
              "imageUrl": "shirt_z.png",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "short_x.png",
            "name": "Short",
            "description": "Short description"
          },
          thirdNavi : [
            {
              "name": "Short x",
              "price": 250,
              "briefDesc" : "Short x brief des",
              "detailedDesc" : "Short x details description. Short x details description. Short x details description",
              "imageUrl": "short_x.png",
              "createdDate": Date.now()
            },
            {
              "name": "Short y",
              "price": 350,
              "briefDesc" : "Short y brief des",
              "detailedDesc" : "Short y details description. Short y details description. Short y details description",
              "imageUrl": "short_x.png",
              "createdDate": Date.now()
            },
            {
              "name": "Short z",
              "price": 450,
              "briefDesc" : "Short z brief des",
              "detailedDesc" : "Short z details description. Short z details description. Short z details description",
              "imageUrl": "short_x.png",
              "createdDate": Date.now()
            }
          ]
        }
      ]

    },
    {
      templateName : 'hkRising',
      articleCategory : [
        {
          "name": "Hotel"
        },
        {
            "name": "Activity"
        },
        {
            "name": "Shopping"
        },
        {
            "name": "Food"
        }

      ]

    }

  ]
};

