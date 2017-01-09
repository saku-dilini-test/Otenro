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
            "imageUrl": "pasta-salad.jpg",
            "name": "Salads",
            "description": "Salads description",
            "enteredBy":"demo"

          },
          thirdNavi : [
            {
              "name": "Grilled Chicken",
              "price": 100,
              "quantity": 100,
              "imageUrl": "sa1.jpeg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "sa1.jpeg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                'name': "Grilled Chicken",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "100",
                'quantity': 100
              }],
              "createdDate": Date.now()
            },
            {
              "name": "Spicy Thai Salad",
              "price": 200,
              "quantity": 200,
              "imageUrl": "sa2.jpg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "sa2.jpg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                'name': "Spicy Thai Salad",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "200",
                'quantity': 200
              }],
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute: {
            "imageUrl": "crpes.jpg",
            "name": "Deserts",
            "description": "Deserts description",
            "enteredBy":"demo"
          },
          thirdNavi: [
            {
              "name": "Chocolate Fudge",
              "price": 100,
              "quantity": 100,
              "imageUrl": "da1.jpg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "da1.jpg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                "name": "Chocolate Fudge",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "100",
                'quantity': 100
              }],
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "how-to-grill-fish.jpg",
            "name": "Stakes",
            "description": "Beverages description",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Grilled Garlic Lamb",
              "price": 100,
              "quantity": 100,
              "imageUrl": "st1.jpg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "st1.jpg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                "name": "Grilled Garlic Lamb",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "100",
                'quantity': 100
              }],
              "createdDate": Date.now()
            },
            {
              "name": "Beef Stake",
              "price": 200,
              "quantity": 200,
              "imageUrl": "st2.jpg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "st2.jpg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                "name": "Beef Stake",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "200",
                'quantity': 200
              }],
              "createdDate": Date.now()
            },
            {
              "name": "BBQ Pork Ribs",
              "price": 300,
              "quantity": 300,
              "imageUrl": "st3.jpg",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "st3.jpg"
                }
              ],
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast",
              "variants":[{
                "name": "BBQ Pork Ribs",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "300",
                'quantity': 300
              }],
              "createdDate": Date.now()
            },
            {
              "name": "Pina Colada",
              "price": 400,
              "quantity": 400,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Pina Colada",
              "detailedDesc" : "Pina Colada details description. Pina Colada details",
              "tempImageArray" : [
                {
                  "img" : "st4.jpg"
                }
              ],
              "variants":[{
                "name": "Pina Colada",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "400",
                'quantity': 400
              }],
              "imageUrl": "st4.jpg",
              "published":"YES",
              "createdDate": Date.now()
            }
          ]
        }

      ]

    },
    {
      templateName : 'foodDemoApp2',
      secondNavi : [
        {
          attribute : {
            "imageUrl": "shirt_x.png",
            "name": "Shirt",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Shirt x",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "imageUrl": "shirt_x.png",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "shirt_x.png"
                }
              ],
              "variants":[{
                "name": "Shirt x",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "createdDate": Date.now()
            },
            {
              "name": "Shirt y",
              "price": 350,
              "quantity": 350,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "tempImageArray" : [
                {
                  "img" : "shirt_y.png"
                }
              ],
              "variants":[{
                "name": "Shirt y",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "350",
                'quantity': 350
              }],
              "imageUrl": "shirt_y.png",
              "published":"YES",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt z",
              "price": 450,
              "quantity": 450,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "tempImageArray" : [
                {
                  "img" : "shirt_z.png"
                }
              ],
              "variants":[{
                "name": "Shirt z",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "450",
                'quantity': 450
              }],
              "imageUrl": "shirt_z.png",
              "published":"YES",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "short_x.png",
            "name": "Short",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Short x",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "SLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "tempImageArray" : [
                {
                  "img" : "short_x.png"
                }
              ],
              "variants":[{
                "name": "Short x",
                'sku': "1111",
                'vType' : "s",
                'size': "11",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "short_x.png",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "cloth3.png",
            "name": "Suits",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Beach Suit",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "tempImageArray" : [
                {
                  "img" : "cloth3.png"
                }
              ],
              "variants":[{
                "name": "Beach Suit",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "cloth3.png",
              "createdDate": Date.now()
            }
          ]
        }
        ]
    },
    {
      templateName : 'clothingApp',
      secondNavi : [
        {
          attribute : {
            "imageUrl": "a.png",
            "name": "Women Shoes",
            "description": "Shirt description",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Shoe 1",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt x brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "a.png"
                }
              ],
              "variants":[{
                "name": "Shoe 1",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "a.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shoe 2",
              "price": 350,
              "quantity": 350,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt y brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "b.png"
                }
              ],
              "variants":[{
                "name": "Shoe 2",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "350",
                'quantity': 350
              }],
              "published":"YES",
              "imageUrl": "b.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shoe 3",
              "price": 450,
              "quantity": 450,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt z brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "c.png"
                }
              ],
              "variants":[{
                "name": "Shoe 3",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "450",
                'quantity': 450
              }],
              "published":"YES",
              "imageUrl": "c.png",
              "createdDate": Date.now()
            }
          ]
        },{
          attribute : {
            "imageUrl": "c.png",
            "name": "Men Shirts",
            "description": "Shirt description",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Shirt x",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt x brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "d.jpeg"
                }
              ],
              "variants":[{
                "name": "Shirt x",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "d.jpeg",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt y",
              "price": 350,
              "quantity": 350,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt y brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "e.jpeg"
                }
              ],
              "variants":[{
                "name": "Shirt y",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "350",
                'quantity': 350
              }],
              "published":"YES",
              "imageUrl": "e.jpeg",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt z",
              "price": 450,
              "quantity": 450,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Shirt z brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "f.jpg"
                }
              ],
              "variants":[{
                "name": "Shirt z",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "450",
                'quantity': 450
              }],
              "published":"YES",
              "imageUrl": "f.jpg",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "d.png",
            "name": "Men Shoes",
            "description": "Short description",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Shoe 1",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Short x brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "h.png"
                }
              ],
              "variants":[{
                "name": "Shoe 1",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "h.png",
              "createdDate": Date.now()
            }
          ]
        },
        {
          attribute : {
            "imageUrl": "cloth3.png",
            "name": "Accessories",
            "description": "Short description",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Watch 1",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "briefDesc" : "Short x brief des",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
              "tempImageArray" : [
                {
                  "img" : "g.png"
                }
              ],
              "variants":[{
                "name": "Watch 1",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "g.png",
              "createdDate": Date.now()
            }
          ]
        }
        ]
    },
    {
      templateName : 'ECommerceApp',
      secondNavi : [
        {
          attribute : {
            "name": "Large Pizza",
            "imageUrl": "category_01.png",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Masala Pizza",
              "price": 250,
              "quantity": 250,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "1.jpg"
                }
              ],
              "variants":[{
                "name": "Masala Pizza",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "250",
                'quantity': 250
              }],
              "published":"YES",
              "imageUrl": "1.jpg",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "createdDate": Date.now()
            },
            {
              "name" : "New Pizza",
              "price" : 300,
              "quantity" : 100,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "2.jpg"
                }
              ],
              "variants":[{
                "name" : "New Pizza",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "300",
                'quantity': 100
              }],
              "imageUrl": "2.jpg",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "createdDate": Date.now()
            }

          ]
        },
        {
          attribute : {
            "name": "Indian Pizza",
            "imageUrl": "category_02.png",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            "enteredBy":"demo"
          },
          thirdNavi : [
            {
              "name": "Indian Pizza",
              "price": 350,
              "quantity": 100,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "3.jpg"
                }
              ],
              "variants":[{
                "name": "Indian Pizza",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "350",
                'quantity': 100
              }],
              "imageUrl": "3.jpg",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "createdDate": Date.now()
            },
            {
              "name" : "New Pizza",
              "price" : 225,
              "quantity" : 15,
              "selection" : "Size",
              "enteredBy":"demo",
              "published":"YES",
              "tempImageArray" : [
                {
                  "img" : "4.jpg"
                }
              ],
              "variants":[{
                "name" : "New Pizza",
                'sku': "1111",
                'size': "11",
                'vType' : "s",
                'price': "225",
                'quantity': 15
              }],
              "imageUrl": "4.jpg",
              "published":"YES",
              "briefDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
              "createdDate": Date.now()
            }

          ]
        }
      ]
    },
    {
      templateName : 'hkRising',
      articleCategory : [{
        attribute : {
          "name": "Attractions",
          "imageUrl":"star ferry.png",
          "enteredBy":"demo"
        },
        article : [
          {
            "title": "Ocean Park",
            "desc": "Ocean park opened in 1977, is a marine-life themed park offering a " +
            "variety of exhibits, rides and shows. The park offers guests entertainment " +
            "which is blended with education. The park is divided into lower and upper " +
            "sections connected by a cable car, has plenty of rides for different age " +
            "groups, and is probably best known for its pandas. To avoid the queues " +
            "tickets can be purchased either online or at 7-eleven." +
            " Address: Ocean Park Road, Wong Chuk Hang" +
            " Getting there: Admiralty MTR station (exit B), then bus 629" +
            " Prices: HK$320; children 3-11, HK$160; 2 and under, free" +
            "Opening times: daily, 10am-7pm" +
            "Payment type: credit cards accepted" +
            "Reservations: recommended",
            "imageUrl":"oceanpark.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": " The Peak",
            "desc": "The peak is the highest point in Hong Kong and offers some of the best views. " +
            "It is one of the most popular attractions in Hong Kong. By day you can see the cities " +
            "skyline and Victoria Harbour all the way to the green hills of the New Territories. " +
            "During the early evening hours, the view melts into pink and orange becoming a galaxy of " +
            "light. You can hear the city humming below you." +
            "Address: Peak Tram Lower Terminus, Garden Road, Central" +
            "Getting there: Central MTR station (exit J), then 10-minute uphill walk; or bus 15C from Star Ferry Pier 7" +
            "Contact: 00 852 2522 0922; thepeak.com.hk/en" +
            "Prices: return tickets: HK$40; over 65s, HK$18; children 3-11, HK$18; 2 and under, free. " +
            "Octopus cards accepted" +
            "Opening times: daily, 7am-midnight" +
            "Payment type: credit cards accepted",
            "imageUrl":"thepeak.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Temple Street night market",
            "desc": "Temple street night market is a popular street bazaar which has served in the back drop of " +
            "several memorable movies. " +
            "You can shop here for cheap trinkets, tea ware, electronics, watches, menswear, jade and antiques." +
            "For street food, head for Woo Sung Street, or to Temple Street north of the temple. You can get " +
            "anything from a simple bowl of noodles to a full meal. You can find a few seafood and hotpot " +
            "restaurants in the area too." +
            "Address: Temple Street, Yau Ma Tei, Kowloon" +
            "Getting there: MTR Yau Ma Tei Station, Exit C, turn onto Temple Street at Man Ming Lane; or, " +
            "MTR Jordan Station, Exit A. Turn right onto Jordan Road and then take another right onto Temple Street.",
            "imageUrl":"1881heritage.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Star Ferry",
            "desc": "The Star Ferry boats have been carrying passengers from Hong Kong Island to " +
            "Kowlon and since 1888. Whilst world class infrastructure now connects the two sides of " +
            "Hong Kongs millions of people still climb aboard the star ferry each year. " +
            "Visitors take the journey for a chance to see one of the worlds most photographed " +
            "harbours up close and personal. National Geographic rates the Star ferry crossing " +
            "as one of the 50 ‘places of a lifetime’." +
            "Address: Pier 7, Central Ferry Piers, Man Kwong Street, Central" +
            "Getting there: Central MTR station (exit A), then five-minute walk to Central Ferry Piers" +
            "Contact: 00 852 2367 7065; starferry.com.hk" +
            "Prices: upper deck: HK$2.50; over 65s, free; children 3-12, HK$1.50; 2 and under, free. Lower deck: HK$2; over 65s, free; children 3-12, HK$1.40; 2 and under, free. Octopus cards accepted" +
            "Opening times: daily, 6.30am-11.30pm" +
            "Payment type: credit cards not accepted",
            "imageUrl":"starferry.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Aqua Luna harbour cruises",
            "desc": "The famous red sailed Chinese boat that sails up and down Victoria habour offers " +
            "day and evening cruises. We recommend you take the 45 min " +
            "evening cruise central when Hong Kong’s skyline is most spectacular. Lay on cushions " +
            "whilst drinking in one of the world’s most fabulous harbours. The Symphony of Lights " +
            "sails at 7:30 pm from Tsim Sha Tsui and 7:45pm from Central. " +
            "There is also an 8pm sail time that costs considerable more." +
            "Address: Pier 9, Central Ferry Piers, Man Kwong Street, Central" +
            "Getting there: Central MTR station (exit A), then five-minute walk to Central Ferry Piers" +
            "Contact: 00 852 2116 8821; aqua.com.hk" +
            "Prices: HK$195; children 4-11, HK$155; one complimentary drink is included" +
            "Opening times: harbour cruises daily: from Central 5.45pm, 6.45pm, 7.45pm, 8.45pm, 9.45pm, 10.45pm; from Tsim Sha Tsui 5.30pm, 6.30pm, 7.30pm, 8.30pm, 9.30pm, 10.30pm" +
            "Payment type: credit cards accepted" +
            "Reservations: essential",
            "imageUrl":"aqua_luna.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": " Hong Kong Museum of History",
            "desc": "The museum has exhibits which tells the story of Hong Kong starting from 400 million " +
            "years ago. We advise to skip the prehistoric bit and skip ahead to gallery four which starts " +
            "with the folk culture and end with the 1997 handover of Hong Kong to China. Life size exhibits " +
            "of street shops and vivid videos which include scenes of the Japanese occupation." +
            "Address: 100 Chatham Road South, Tsim Sha Tsui East" +
            "Getting there: East Tsim Sha Tsui MTR station (exit P2), then 10-minute walk; or Tsim Sha Tsui MTR station (exit B2), then 20-minute walk" +
            "Contact: 00 852 2724 9042; hk.history.museum" +
            "Prices: HK$10; over 60s, HK$5; students, HK$5; 4 and under, free. Free admission to all on Wednesdays; Octopus cards accepted" +
            "Opening times: Mon, Wed-Fri, 10am-6pm; Sat, Sun, public holidays, 10am-7pm" +
            "Payment type: credit cards not accepted" +
            "Reservations: Not possible",
            "imageUrl":"historymusium.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },



        ]
      },
        {
          attribute : {
            "name": "Shopping",
            "imageUrl":"apliu street flee market.png",
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Sneaker Street",
              "desc": "Some say it is the greatest gathering of sneakers, Fa Yuen street is " +
              "where youth have come to get their stunning footwear since the 1980’s. " +
              "You can find the latest designs and limited edition releases from all over " +
              "the world.Address: Fa Yuen Street, Mong Kok, Kowloon " +
              "Getting there: MTR Mong Kok Station, Exit D3. Walk along Argyle Street to Fa Yuen Street.",
              "imageUrl":"sneakerstreet.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Apliu Street Flea Market (Electronics)",
              "desc": "Find brand new and second hand electronic devices at bargain prices at this popular street market. " +
              "You can also uncover antique watches, old coins, and other relics.Address: Apliu Street, Sham Shui Po, Kowloon" +
              " Getting there: MTR Sham Shui Po Station, Exit C2",
              "imageUrl":"apliustreetfleemarket.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "City Plaza",
              "desc": "City Plaza is the largest shopping hub on Hong Kong Island, which has over 170 shops that offer " +
              "everything from basic daily necessities to grand pianos. " +
              "The mall also has Hong Kongs only ice rink and is home to the city’s only " +
              "APiTA (Japan’s most popular department store chain.Address: 18 Taikoo Shing Road, Taikoo Shing, Hong Kong Island Tel: +852 2568 8665" +
              "Website: www.cityplaza.com" +
              "Getting there: MTR Tai Koo Station and take the Cityplaza exit",
              "imageUrl":"cityplaza.png",
              "categoryId":"0",
              "enteredBy":"demo"
            }

          ]
        },
        {
          attribute : {
            "name": "Historical sites",
            "imageUrl":"1881 heritage.png",
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "1881 Heritage",
              "desc": "The Former Marine Police Headquarters Compound, constructed in 1884, is located in Tsim Sha Tsui, Kowloon, Hong Kong. " +
              "The site is now officially renamed as 1881 Heritage. 1881 combines historical significance with a " +
              "contemporary pursuit of modern day Hong Kong. You can shop for international fashion brands " +
              "and dine on some Hong kong’s finest foods where pirates were imprisoned and a daily signal " +
              "was watched by ships in the harbours. 1881 offers a truly unique experience." +
              "Address: 2A Canton Road, Tsim Sha Tsui, Kowloon Tel: +852 2926 8000" +
              "Website: www.1881heritage.com" +
              "Getting there: MTR Tsim Sha Tsui Station Exit E, walk towards Salisbury Road, " +
              "turn right, take subway (pedestrian tunnel) next to YMCA to 1881 Heritage.",
              "imageUrl":"1881heritage.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Clock Tower",
              "desc": "TThe Clock Tower is a landmark in Hong Kong. It is located on the southern shore of Tsim Sha Tsui, Kowloon. It is the only remnant of the original site of the " +
              "former Kowloon Station on the Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite, the Clock Tower peaks at 44 metres, and " +
              "is topped by a 7-metre lightning rod. The top of the tower can be reached by a " +
              "wooden staircase located within. The interior of Clock Tower had previously been " +
              "open for visit, but is currently closed for maintenance. The clock tower is " +
              "located near Victoria Harbour at the foot of Salisbury Road. Another landmark, " +
              "the Tsim Sha Tsui Ferry Pier, is located nearby." +
              "Address: Star Ferry Pier, Kowloon Point, Tsim Sha Tsui, Kowloon" +
              "Website: www.amo.gov.hk" +
              "Getting there: MTR Tsim Sha Tsui Station, Exit E. Walk towards Salisbury Road, " +
              "then turn right and take the subway (pedestrian tunnel) located next to the " +
              "YMCA to the Hong Kong Cultural Centre. Turn right again and walk straight ahead towards the waterfront",
              "imageUrl":"apliustreetfleemarket.png",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        }

      ]
    },
    {
      templateName : 'RecipeApp',
      articleCategory : [{
        attribute : {
          "name": "Main Course",
          "imageUrl":"stakes_slider.jpg",
          "enteredBy":"demo"
        },
        article : [
          {
            "title": "Avocado Egg Platter",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "imageUrl":"avacado_sandwitch.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Baked Salmon Fillet",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "imageUrl":"salmon_fillet.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Grilled Lamb Chops",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "imageUrl":"grilled_lamb_chops.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Enchulada",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "imageUrl":"enchulada.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Japanese Omlet",
            "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "imageUrl":"Japanese_omlet.png",
            "categoryId":"0",
            "enteredBy":"demo"
          },
        ]
      },
        {
          attribute : {
            "name": "Appetizers",
            "imageUrl":"appatizer_slider.jpg",
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Fresh Bread Sticks",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"breadsticks-pic.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Ebi Katsu",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"sides-ebi-katsu-new.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Theriyaki Pork Ribs",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"sides-pork-ribs.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Prawn Lollipops",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"sides-lollipop-prawns-kushiyaki.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Lamb Shish Kebab",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"shish-kebab.png",
              "categoryId":"0",
              "enteredBy":"demo"
            }

          ]
        },
        {
          attribute : {
            "name": "Deserts",
            "imageUrl":"desserts_slider.jpg",
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Dark Chocolate Muse",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"dark-chocolate-muse.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Vanilla Bean Flan",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.t",
              "imageUrl":"vanilla-bean-liquor--flan.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Strawberry Shortcake",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"desserts-strawberry-shortcake.png",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "Lemon Meringue Pie",
              "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "imageUrl":"lemon-meringue-pie.png",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        }

      ]
    },
    {
      templateName : 'fashionApp',
      articleCategory : [{
        attribute : {
          "name": "FEATURED CATEGORY",
          "imageUrl" : 'CatImg_00001.jpg',
          "enteredBy":"demo"
        },
        article : [
          {
            "title": "Ocean Park",
            "desc": "Ocean park opened in 1977, is a ",
            "imageUrl":"Article_00001.jpg",
            "categoryId":"0",
            "enteredBy":"demo"
          },
          {
            "title": "Clock Tower",
            "desc": "TThe Clock Tower is a landmark in Hong Kong. It is located on the southern shore of Tsim Sha Tsui, Kowloon. It is the only remnant of the original site of the " +
            "former Kowloon Station on the Kowloon-Canton Railway. Officially named Former " +
            "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
            "Built out of red bricks and granite",
            "imageUrl":"Article_00003.jpg",
            "categoryId":"0",
            "enteredBy":"demo"
          }
        ]
      },
        {
          attribute : {
            "name": "FASHION",
            "imageUrl" : 'CatImg_00002.jpg',
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Sneaker Street",
              "desc": "Some say it is the greates Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite",
              "imageUrl":"Article_00002.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        },
        {
          attribute : {
            "name": "SCIENCE",
            "imageUrl" : 'CatImg_00003.jpg',
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "1881 Heritage",
              "desc": "The Former Marine Police Headquarters Compound Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite",
              "imageUrl":"Article_00003.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        },
        {
          attribute : {
            "name": "Auto",
            "imageUrl" : 'CatImg_00004.jpg',
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Sneaker Street",
              "desc": "Some say it is the greatest gathering of sneakers, Fa Yuen street is Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite ",
              "imageUrl":"Article_00004.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "1881 Heritage",
              "desc": "The Former Marine Police Headquarters Compound Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite",
              "imageUrl":"Article_00003.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        },
        {
          attribute : {
            "name": "Environement",
            "imageUrl" : 'CatImg_00005.jpg',
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Sneaker Street",
              "desc": "Some say it is the greatest gathering of sneakers, Fa Yuen street is Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite ",
              "imageUrl":"Article_00005.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "1881 Heritage",
              "desc": "The Former Marine Police Headquarters Compound Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite",
              "imageUrl":"Article_00005.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        },
        {
          attribute : {
            "name": "Sport",
            "imageUrl" : 'CatImg_00006.jpg',
            "enteredBy":"demo"
          },
          article : [
            {
              "title": "Sneaker Street",
              "desc": "Some say it is the greatest gathering of sneakers, Fa Yuen street is Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite ",
              "imageUrl":"Article_00006.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            },
            {
              "title": "1881 Heritage",
              "desc": "The Former Marine Police Headquarters Compound Kowloon-Canton Railway. Officially named Former " +
              "Kowloon-Canton Railway Clock Tower, it is usually referred to as the Tsim Sha Tsui Clock Tower for its location." +
              "Built out of red bricks and granite",
              "imageUrl":"Article_00006.jpg",
              "categoryId":"0",
              "enteredBy":"demo"
            }
          ]
        }
      ]
    },
    {
            templateName : 'GlamourUpApp',
            secondNavi : [
              {
                attribute : {
                  "imageUrl": "1.JPG",
                  "name": "Accessories",
                  "description": "Accessories description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Brown Handbag",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "15.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Brown Handbag",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "imageUrl": "15.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Green Handbag",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "16.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Gren Handbag",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "imageUrl": "16.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Fancy Scarf",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "17.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Fancy Scarf",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "published":"YES",
                    "imageUrl": "17.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },{
                attribute : {
                  "imageUrl": "2.JPG",
                  "name": "Women Tops",
                  "description": "Women description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Crop Top Brown",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "18.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Crop Top Brown",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "18.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Crop Top Ash",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "19.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Crop Top Ash",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "published":"YES",
                    "imageUrl": "19.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Crop Top BrownX",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "20.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Crop Top BrownX",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "imageUrl": "20.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "3.JPG",
                  "name": "Dresses",
                  "description": "Dresses",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Dark Frock",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Short x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "21.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Dark Frock",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "imageUrl": "21.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "4.JPG",
                  "name": "Shoes",
                  "description": "Shoes description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Lita Orange",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "11.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Lita Orange",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "11.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Brown Pump",
                    "price": 130,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "12.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Brown Pump",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "12.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Wedge Booties",
                    "price": 160,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "13.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Wedge Booties",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "13.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Black Pump",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "14.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Black Pump",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "14.JPG",
                    "createdDate": Date.now()
                  }
                ]
              }
              ]
          },
          {
            templateName : 'CrushApp',
            secondNavi : [
              {
                attribute : {
                  "imageUrl": "1.JPG",
                  "name": "New Arrivals",
                  "description": "New Arrivals description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Airtex",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "15.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Airtex",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "15.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Cloo Hadia",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "16.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Cloo Hadia",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "published":"YES",
                    "imageUrl": "16.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Cloo Peony",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "17.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Cloo Peony",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "imageUrl": "17.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },{
                attribute : {
                  "imageUrl": "2.JPG",
                  "name": "Surf",
                  "description": "Surf description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Swimwear Red",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "18.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Swimwear Red",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "18.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Swimwear Top",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "19.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Swimwear Top",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "imageUrl": "19.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Swimwear Full",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "20.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Swimwear Full",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "published":"YES",
                    "imageUrl": "20.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "3.JPG",
                  "name": "Men",
                  "description": "Men",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Skinny & Short",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Short x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "21.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Skinny & Short",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "21.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "4.JPG",
                  "name": "Women",
                  "description": "Shoes description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "White Summer",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "11.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "White Summer",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "11.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Blue Fish",
                    "price": 130,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "12.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Blue Fish",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "12.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beach Oneck",
                    "price": 160,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "13.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Beach Oneck",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "13.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Korea Crocheted",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "14.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Korea Crocheted",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "14.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "5.JPG",
                  "name": "Kids",
                  "description": "Kids description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Checker Short",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "22.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Checker Short",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "22.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Pink kit",
                    "price": 130,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "23.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Pink kit",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "imageUrl": "23.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Sweet Pink",
                    "price": 160,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "24.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Sweet Pink",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "published":"YES",
                    "imageUrl": "24.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Yellow Beach",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "25.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Yellow Beach",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "imageUrl": "25.jpg",
                    "createdDate": Date.now()
                  }
                ]
              }
              ]
          },
          {
            templateName : 'HeadphoneApp',
            secondNavi : [
              {
                attribute : {
                  "imageUrl": "1.JPG",
                  "name": "B&O Earphones",
                  "description": "New Arrivals description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "H3 In-Ear",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "15.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "H3 In-Ear",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "imageUrl": "15.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "A8 Earphones",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "16.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "A8 Earphones",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "imageUrl": "16.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Earset 3i",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "17.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Earset 3i",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "imageUrl": "17.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },{
                attribute : {
                  "imageUrl": "2.JPG",
                  "name": "B&O Bluetooth",
                  "description": "B&O Speakers",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Beoplay A1 ",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "18.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Beoplay A1 ",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "imageUrl": "18.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "A2 Bluetooth",
                    "price": 350,
                    "quantity": 350,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt y brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "19.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "A2 Bluetooth",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "350",
                      'quantity': 350
                    }],
                    "imageUrl": "19.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "A2 Silver",
                    "price": 450,
                    "quantity": 450,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Shirt z brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "20.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "A2 Silver",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "450",
                      'quantity': 450
                    }],
                    "imageUrl": "20.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "3.JPG",
                  "name": "B&O Wall Speakers",
                  "description": "Men",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "BeoVox 1",
                    "price": 250,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "briefDesc" : "Short x brief des",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "21.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "BeoVox 1",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "250",
                      'quantity': 250
                    }],
                    "imageUrl": "21.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "4.JPG",
                  "name": "B&O Headphones",
                  "description": "Shoes description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "Form2i",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "11.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Form2i",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "imageUrl": "11.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "H8 Wireless",
                    "price": 130,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "12.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "H8 Wireless",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "imageUrl": "12.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beoplay H8",
                    "price": 160,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "13.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Beoplay H8",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "imageUrl": "13.JPG",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beoplay H2",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "14.JPG"
                      }
                    ],
                    "variants":[{
                      "name": "Beoplay H2",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "imageUrl": "14.JPG",
                    "createdDate": Date.now()
                  }
                ]
              },
              {
                attribute : {
                  "imageUrl": "5.JPG",
                  "name": "B&O Speakers",
                  "description": "Kids description",
                  "enteredBy":"demo"
                },
                thirdNavi : [
                  {
                    "name": "BeoLab 90",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "22.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "BeoLab 90",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "imageUrl": "22.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beosound 9000",
                    "price": 130,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "23.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Beosound 9000",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "imageUrl": "23.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beoplay A9",
                    "price": 160,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "24.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Beoplay A9",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "130",
                      'quantity': 250
                    }],
                    "imageUrl": "24.jpg",
                    "createdDate": Date.now()
                  },
                  {
                    "name": "Beolab 5",
                    "price": 150,
                    "quantity": 250,
                    "selection" : "Size",
                    "enteredBy":"demo",
                    "published":"YES",
                    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
                    "tempImageArray" : [
                      {
                        "img" : "25.jpg"
                      }
                    ],
                    "variants":[{
                      "name": "Beolab 5",
                      'sku': "1111",
                      'size': "11",
                      'vType' : "s",
                      'price': "150",
                      'quantity': 250
                    }],
                    "imageUrl": "25.jpg",
                    "createdDate": Date.now()
                  }
                ]
              }
              ]
          }
  ]
};

