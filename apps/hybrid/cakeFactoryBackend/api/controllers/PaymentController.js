/**
 * Created by udeshikaperera on 06/11/2015.
 */
var email = require("../../node_modules/emailjs/email"),
    requestify = require('requestify'),
    moment =require('moment');

var host,link;
var server  = email.server.connect({
  user:    "onbilabsttest@gmail.com",
  password:"onbitlabs",
  host:    "smtp.gmail.com",
  ssl:     true
});

//var orderEmail = 'orders@tecclk.com';
var orderEmail = 'amilaonbit@gmail.com';

module.exports = {
  create: function (req, res) {
    var data = req.body;
    data['order_proccessed_Time'] = moment().format('YYYY-MM-DD  h:mm:ss a');
    Payment.create(data).exec(function (err, payment) {
        if (err) {
          return res.status(err.status).json({err: err.message});
        }
        if (payment) {
          var itemsHtml = "";
          var total = 0;
          for(var i =0;i< payment.shoppingCart.length;i++){
            itemsHtml += "<li>Product : "+ payment.shoppingCart[i].name+"</li>"+
                         "<li>Pieces : "+ payment.shoppingCart[i].pieces+"</li>"+
                         "<li>Price : Rs. "+ payment.shoppingCart[i].price+"</li>"+
                         "---------------------------------------------------------";
            total += payment.shoppingCart[i].price;
          }
          var totalWithDeliveryFee = total + payment.deliveryDetails.location.deliveryCharge;
          var deliveryDetails = "<li> Customer Name : "+ payment.deliveryDetails.name+ "</li>" +
                                "<li> Customer Address : "+ payment.deliveryDetails.address +"</li>"+
                                "<li> Customer Contact No : +94 "+ payment.deliveryDetails.contactNo+"</li>"+
                                "<li> Order Processed Time : "+ payment.order_proccessed_Time +"</li>";
          var emailBody = "<html>" +
                              "<h4>"+"Order Status : "+payment.response.state+"</h4>"+
                              "<h4>"+"Transaction Id : "+payment.response.id+"</h4>"+
                              "<h4>Order Details</h4>"+
                                "<ul>"+
                                    itemsHtml +
                                    "<li>Total Amount : Rs. "+total+"</li>"+
                                    "<li>Total Amount : "+payment.deliveryDetails.usdAmount+" $</li>"+
                                    "---------------------------------------------------------"+
                                    "<li>Total Amount With Delivery Fee : Rs. "+totalWithDeliveryFee+"</li>"+
                                    "<li>Total Amount  With Delivery Fee : "+Math.round(payment.deliveryDetails.usdAmountWithDeliveryFee* 100) / 100+" $</li>"+
                                "</ul>"+
                              "<h4>Delivery Details</h4>"+
                                "<ul>"+
                                    deliveryDetails +
                                "</ul>"+
                          "</html>";
          var emailDetails = {
            from: "onbilabsttest@gmail.com",
            to: orderEmail,
            cc: "",
            subject: "[PayPal] New Order for - "+payment.deliveryDetails.name,
            attachment:
              [
                {data:emailBody, alternative:true},
              ]
          };
          server.send(emailDetails, function (err, message) {
            sails.log.info(err || message);
            if (err) {
              return res.status(err.status).json({err: err.message});
            }
          });
          res.json(200, {status:'Success',result:payment});
        }
    });
  },

  /**
   * pickup Payment details save here
   * @param req
   * @param res
   */
  pickupCreate: function (req, res) {
    var data = req.body;
    data['order_proccessed_Time'] = moment().format('YYYY-MM-DD  h:mm:ss a');
    Payment.create(data).exec(function (err, payment) {
      if (err) {
        return res.status(err.status).json({err: err.message});
      }
      if (payment) {
        var itemsHtml = "";
        var total = 0;
        for(var i =0;i< payment.shoppingCart.length;i++){
          itemsHtml +=  "<li>Product : "+ payment.shoppingCart[i].name+"</li>"+
                        "<li>Pieces : "+ payment.shoppingCart[i].pieces+"</li>"+
                        "<li>Price : Rs. "+ payment.shoppingCart[i].price+"</li>"+
                        "---------------------------------------------------------";
          total += payment.shoppingCart[i].price;
        }
        var pickupDetails = "<li> Customer Name : "+ payment.pickupDetails.name+ "</li>" +
                            "<li> Customer Contact No : +94 "+ payment.pickupDetails.contactNo+"</li>"+
                            "<li> Pick up Branch Name : "+ payment.pickupDetails.branch +"</li>"+
                            "<li> Order Processed Time : "+ payment.order_proccessed_Time +"</li>";
        var emailBody = "<html>" +
                            "<h4>"+"Order Status : "+payment.response.state+"</h4>"+
                            "<h4>"+"Transaction Id : "+payment.response.id+"</h4>"+
                            "<h4>Order Details</h4>"+
                              "<ul>"+
                                  itemsHtml +
                                  "<li>Total Amount : Rs. "+total+"</li>"+
                                  "<li>Total Amount : "+Math.round(payment.pickupDetails.usdAmount * 100) / 100+" $</li>"+
                              "</ul>"+
                            "<h4>Pick up Details</h4>"+
                              "<ul>"+
                                  pickupDetails +
                              "</ul>"+
                        "</html>";
        var emailDetails = {
          from: "onbilabsttest@gmail.com",
          to: orderEmail,
          cc: "",
          subject: "[PayPal] New Order for - "+payment.pickupDetails.name,
          attachment:
            [
              {data:emailBody, alternative:true},
            ]
        };
        server.send(emailDetails, function (err, message) {
          sails.log.info(err || message);
          if (err) {
            return res.status(err.status).json({err: err.message});
          }
        });
        res.json(200, {status:'Success',result:payment});
      }
    });
  },

  totalAmountInUSD : function(req,res){
    Currency.findOne({type:'USD'}).exec(function(err,currency){
      var oneUSD = currency.USDLKR;
      var totalUSD = req.param('totalAmount')/oneUSD;
      res.json(200, {success: 'received',usd:Math.round(totalUSD * 100) / 100});
    });
  },

  /**
   * Retrive oneUSD amount for LKR
   * @param req
   * @param res
   */
  oneUSD : function(req,res){
    Currency.findOne({type:'USD'}).exec(function(err,currency){
      var oneUSD = currency.USDLKR;
      res.json(200, {result: oneUSD});
    });
  },

  /**
   * Given order Id retrive payment details
   * @param req
   * @param res
   */
  orderSummary : function(req,res){
    var orderId = req.param('orderId');
    Payment.findOne( { 'response.id' : orderId}).exec(function(err,payment){
      res.json(200, {result:payment});
    });
  },

  /**
   * Given userId create payment colletion
   * @param req
   * @param res
   */
  saveShoppingCart: function(req,res){

    var data = req.body;
    var email = req.body.email;
    console.log(data);
    data['order_proccessed_Time'] = moment().format('YYYY-MM-DD  h:mm:ss a');
    Payment.create(data).exec(function (err, payment) {
      if (err) {
        return res.status(err.status).json({err: err.message});
      }
      if (payment) {
        var itemsHtml = "";
        var total = 0;
        var optionType = '';
        var deliveryOption = '';
        var viewAmount = '';
        if(payment.pickUpBranch != 0){
          optionType = 'Pick Up';
          deliveryOption = "<ul>Pick Up Branch : "+payment.pickUpBranch+"</ul>";
        }
        if(payment.deliveryCharge != 0){
          optionType = 'Delivery';
          deliveryOption = "<ul>Delivery Location : "+payment.deliveryLocation+"</ul>"+
                           "<ul>Delivery Address : "+payment.tempAddress+"</ul>";
        }
        for (var i = 0; i < payment.cartLength; i++) {
          var j = i.toString(payment.j);
          console.log(payment[j]);
          itemsHtml +=  "<li>Product Name: " + payment[j]['name'] + "</li>" +
                        "<li>Quantity: " + payment[j]['quantity'] + "</li>" +
                        "<li>Price : " + payment[j]['value'] + "</li>" +
            "---------------------------------------------------------";
          total += (payment[j]['quantity'])*(payment[j]['value']);
        }
        viewAmount = "<li>Total Amount : Rs. " + total + "</li>";
        if(payment.deliveryCharge != 0){
          total += Number(payment.deliveryCharge);
          viewAmount += "---------------------------------------------------------"+
                        "<li>Total Amount With Delivery Charges: Rs. " + total + "</li>";
        }
        var emailBody = "<html>" +
          "<h4>" + "Your Payment Success" +"</h4>" +
          "<h4>Order Details</h4>" +
          "<ul>" +
          itemsHtml +
          viewAmount+
          "</ul>" +
          "<h4>Delivery Option : "+optionType+"</h4>" +
          deliveryOption+
          "</html>";

        var emailDetails = {
          from: "onbilabsttest@gmail.com",
          to: orderEmail,
          cc: "",
          subject: "[PayPal] New Order ",
          attachment: [
            {data: emailBody, alternative: true},
          ]
        };
        server.send(emailDetails, function (err, message) {
          sails.log.info(err || message);
          if (err) {
            return res.status(err.status).json({err: err.message});
          }
        });
        return res.json(200, {result: 'success'});
      }
    });

  },

  /**
   * save shopping cart details as payment colletion
   * @param req
   * @param res
   */
  saveShoppingCartWeb: function(req,res){

    var cartLength = req.body.cartLength;
    if(cartLength > 0) {
      var data = req.body;
      var email = req.body.email;
      data['order_proccessed_Time'] = moment().format('YYYY-MM-DD  h:mm:ss a');
      Payment.create(data).exec(function (err, payment) {
        if (err) {
          return res.status(err.status).json({err: err.message});
        }
        if (payment) {
          var itemsHtml = "";
          var total = 0;
          var optionType = '';
          var deliveryOption = '';
          var viewAmount = '';
          if (payment.pickUpBranch != '') {
            optionType = 'Pick Up';
            deliveryOption = "<ul>Pick Up Branch : " + payment.pickUpBranch + "</ul>"+
                "<ul> Customer Name : "+payment.name + "</ul>"+
                "<ul> Contact Number : "+payment.telPhone + "</ul>";
          }
          if (payment.deliveryCharge != 0) {
            optionType = 'Delivery';
            deliveryOption = "<ul>Delivery Location : " + payment.deliveryLocation + "</ul>" +
              "<ul>Customer Name : "+payment.name + "</ul>"+
              "<ul>Contact Number : "+payment.telPhone + "</ul>"+
              "<ul>Delivery Address : " + payment.deliveryAddress_01 +","+payment.deliveryAddress_02+", "+ payment.city+"</ul>";
          }
          for (var i = 0; i < payment.cartLength; i++) {
            var j = i.toString(payment.j);
            itemsHtml += "<li>Product Name: " + payment[j]['name'] + "</li>" +
              "<li>Quantity: " + payment[j]['quantity'] + "</li>" +
              "<li>Price : " + payment[j]['price'] + "</li>" +
              "---------------------------------------------------------";
            total += (payment[j]['quantity']) * (payment[j]['price']);
          }
          viewAmount = "<li>Total Amount : Rs. " + total + "</li>";
          if (payment.deliveryCharge != 0) {
            total += Number(payment.deliveryCharge);
            viewAmount += "---------------------------------------------------------" +
              "<li>Total Amount With Delivery Charges: Rs. " + total + "</li>";
          }
          var emailBody = "<html>" +
            "<h4>" + "New " + optionType + " Order" + "</h4>" +
            "<h4>Order Details</h4>" +
            "<ul>" +
            itemsHtml +
            viewAmount +
            "</ul>" +
            "<h4>Delivery Option : " + optionType + "</h4>" +
            deliveryOption +
            "</html>";
          var emailDetails = {
            from: "onbilabsttest@gmail.com",
            to: orderEmail,
            cc: '',
            bcc: '',
            subject: "New " + optionType + " Order",
            attachment: [
              {data: emailBody, alternative: true},
            ]
          };
          server.send(emailDetails, function (err, message) {
            sails.log.info(err || message);
            if (err) {
              return res.status(err.status).json({err: err.message});
            }
            console.log('Email has sent & Payment Id ' + payment.id);
          });
          return res.json(200, {result: 'success'});
        }
      });
    }
  },

  saveToken : function(req,res){
    console.log(req.body);
    console.log('xxxxxxx');
    var data = req.body;




    //DeviceToken.create(data).exec(function (err, token) {
    //  if (err) {
    //    return res.status(err.status).json({err: err.message});
    //  }
    //  console.log('yyyyy');
    //  console.log(token);
    return res.json(req.body);
    //
    //});

    // Define relevant info
    var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNDkwMzRjMy1jMzJhLTQ1OWItYmJmZi1iNzhhYzYxNmRkZWIifQ.jG8XAsTDo_NAIaz6qsMGF1OrpQWeCetD-UAQMMmv-Bo";
    var tokens = [req.body.token];
    //var profile = 'fake_push_profile';
    var profile = 'live_app';

    //return res.json({data:'xxxxxx'});

// Build the request object
//    var options = {
//      method: 'POST',
//      url: 'https://api.ionic.io/push/notifications',
//      headers: {
//        'Content-Type': 'application/json',
//        'Authorization': 'Bearer ' + jwt
//      },
    var  testData = {
        "tokens": tokens,
        "profile": profile,
        "notification": {
          "title": "Hi",
          "message": "Hello world!",
          "android": {
            "title": "Hey",
            "message": "Hello Android! xxx"
          },
          "ios": {
            "title": "Howdy",
            "message": "Hello iOS!"
          }
        }
      }
    //};
    testData = JSON.stringify(testData);
    request.post({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      url:'https://api.ionic.io/push/notifications',
      body: testData
      },function(err,httpResponse,body){ /*
       ... */
        //console.log(err);
        //console.log(httpResponse);
        console.log(body);
      })



  },
  payPalRedirect : function(req,res){
    console.log(req.headers);
    console.log(req.param('tx'));

    res.json({transactionID : req.param('tx'), token : req.param('cm') });

    var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNDkwMzRjMy1jMzJhLTQ1OWItYmJmZi1iNzhhYzYxNmRkZWIifQ.jG8XAsTDo_NAIaz6qsMGF1OrpQWeCetD-UAQMMmv-Bo";
    var tokens = req.param('cm');
    var profile = 'fake_push_profile';
    //var profile = 'live_app';

    //return res.json({data:'xxxxxx'});

// Build the request object
//    var options = {
//      method: 'POST',
//      url: 'https://api.ionic.io/push/notifications',
//      headers: {
//        'Content-Type': 'application/json',
//        'Authorization': 'Bearer ' + jwt
//      },
    var  testData = {
      "tokens": tokens,
      "profile": profile,
      "notification": {
        "title": "Hi",
        "message": "Hello world!",
        "android": {
          "title": "Hey",
          "message": "Hello Android! xxx"
        },
        "ios": {
          "title": "Howdy",
          "message": "Hello iOS!"
        }
      }
    }
    //};
    testData = JSON.stringify(testData);
    request.post({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      url:'https://api.ionic.io/push/notifications',
      body: testData
    },function(err,httpResponse,body){ /*
     ... */
      //console.log(err);
      //console.log(httpResponse);
      console.log(body);
    })

  }
};

