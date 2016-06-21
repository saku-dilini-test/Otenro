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
              "quantity": 100,
              "imageUrl": "grilled_chicken_salad.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Spicy Thai Salad with Grilled Chicken",
              "price": 200,
              "quantity": 200,
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
              "quantity": 100,
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
              "quantity": 100,
              "imageUrl": "grilled garlic lamb chops.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Beef Stake with Smashed Potatoes",
              "price": 200,
              "quantity": 200,
              "imageUrl": "beef stake with smashed potatoes.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "BBQ Pork Ribs",
              "price": 300,
              "quantity": 300,
              "imageUrl": "bbq pork ribs.png",
              "briefDesc": "Soft choux pastry balls filled with crème patisserie or chocolate mousse drizzled with chocolate ganache",
              "detailedDesc": "Soft, fresh and homemade curd that can be eaten with toast, pancakes, scones or used in cakes",
              "createdDate": Date.now()
            },
            {
              "name": "Pina Colada",
              "price": 400,
              "quantity": 400,
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
              "quantity": 250,
              "briefDesc" : "Shirt x brief des",
              "detailedDesc" : "Shirt x details description. Shirt x details description. Shirt x details description",
              "imageUrl": "shirt_x.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt y",
              "price": 350,
              "quantity": 350,
              "briefDesc" : "Shirt y brief des",
              "detailedDesc" : "Shirt y details description. Shirt y details description. Shirt y details description",
              "imageUrl": "shirt_y.png",
              "createdDate": Date.now()
            },
            {
              "name": "Shirt z",
              "price": 450,
              "quantity": 450,
              "briefDesc" : "Shirt z brief des",
              "detailedDesc" : "Shirt z details description. Shirt z details description. Shirt z details description",
              "imageUrl": "shirt_z.jpg",
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
              "quantity": 250,
              "briefDesc" : "Short x brief des",
              "detailedDesc" : "Short x details description. Short x details description. Short x details description",
              "imageUrl": "short_x.png",
              "createdDate": Date.now()
            }
//            ,
//            {
//              "name": "Short y",
//              "price": 350,
//              "briefDesc" : "Short y brief des",
//              "detailedDesc" : "Short y details description. Short y details description. Short y details description",
//              "imageUrl": "short_x.png",
//              "createdDate": Date.now()
//            },
//            {
//              "name": "Short z",
//              "price": 450,
//              "briefDesc" : "Short z brief des",
//              "detailedDesc" : "Short z details description. Short z details description. Short z details description",
//              "imageUrl": "short_x.png",
//              "createdDate": Date.now()
//            }
          ]
        },
        {
          attribute : {
            "imageUrl": "cloth3.png",
            "name": "Suits",
            "description": "Short description"
          },
          thirdNavi : [
            {
              "name": "Beach Suit",
              "price": 250,
              "quantity": 250,
              "briefDesc" : "Short x brief des",
              "detailedDesc" : "Short x details description. Short x details description. Short x details description",
              "imageUrl": "cloth3.png",
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
          },



        ]
      },
        {
          attribute : {
            "name": "Shopping",
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
            },
            {
              "title": "Apliu Street Flea Market (Electronics)",
              "desc": "Find brand new and second hand electronic devices at bargain prices at this popular street market. " +
              "You can also uncover antique watches, old coins, and other relics.Address: Apliu Street, Sham Shui Po, Kowloon" +
              " Getting there: MTR Sham Shui Po Station, Exit C2",
              "imageUrl":"apliustreetfleemarket.png",
              "categoryId":"0",
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
            }

          ]
        },
        {
          attribute : {
            "name": "Historical sites",
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
            }
          ]
        }

      ]
    }

  ]
};

