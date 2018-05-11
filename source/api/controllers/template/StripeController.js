/**
 * Created by prasanna on 3/20/17.
 */

module.exports = {


    makePayment : function (req, res) {
        console.log(req.body);

        var searchUserQuery = {
            id: req.body.userId
        };



        User.findOne(searchUserQuery).exec(function(err, userData) {
            console.log(userData);
            if (err) return res.send(err);
            IPGDetails.findOne({appId :req.body.appId }).exec(function(err, result) {
                console.log(result);
                if (err) return res.send(err);
                if (typeof result.stripeKey !='undefined'){
                    var stripe = require('stripe')(result.stripeKey);

                    // Create a new customer and then a new charge for that customer:
                    stripe.tokens.create({
                      card: {
                            "number": req.body.number,
                            "exp_month": parseInt(req.body.exp_month),
                            "exp_year": parseInt(req.body.exp_year),
                            "cvc": req.body.cvc
                      }
                    }, function(err, token) {
                    console.log(token);
                      // asynchronously called
                         stripe.customers.create({
                                              email: userData.email
                                          }).then(function(customer){
                                              return stripe.customers.createSource(customer.id, {
                                                  source: token.id
                                              });
                                          }).then(function(source) {
                                              return stripe.charges.create({
                                                  amount: req.body.amount * 100,   //A positive integer in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge
                                                  currency: 'usd',
                                                  customer: source.customer
                                              });
                                          }).then(function(charge) {
                                              // New charge created on a new customer
                                              console.log("success : "+JSON.stringify(charge));
                                              res.send(charge);
                                          }).catch(function(err) {
                                              // Deal with an error
                                              console.log("this is error .................. " + err);
                                              res.send(err);
                                          });
                    });


                }
            });

        });
    }

};