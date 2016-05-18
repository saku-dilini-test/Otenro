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
            "imageUrl": "category_61_5327.jpg",
            "name": "Salads",
            "description": "Salads description"
          },
          thirdNavi : [
            {
              "name": "Chicken Caesar Salad",
              "price": 100,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Garden Salad",
              "price": 200,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Pasta Salad",
              "price": 300,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Egg Salad",
              "price": 400,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute: {
            "imageUrl": "melko-21290330.jpg",
            "name": "Deserts",
            "description": "Deserts description"
          },
          thirdNavi: [
            {
              "name": "Tiramisu",
              "price": 100,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Caramal Pudding",
              "price": 200,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Chocolate Ice Cream Sunday",
              "price": 300,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Chocolate Muse",
              "price": 400,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Apple Crumble Pie",
              "price": 500,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "category_61_5327.jpg",
            "name": "Beverages",
            "description": "Beverages description"
          },
          thirdNavi : [
            {
              "name": "Espresso Shot",
              "price": 100,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Mocha Frapachino",
              "price": 200,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Chocolate Milk Shake",
              "price": 300,
              "imageUrl": "article-0-1A9F1DAA000005DC-669_634x447.jpg",
              "createdDate": Date.now()
            },
            {
              "name": "Pina colada",
              "price": 400,
              "imageUrl": "OOMPizza-Pepperoni-300x233.jpg",
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
            "name": "Shopping",
        },
        {
            "name": "Food"
        }

      ]

    }

  ]
};

