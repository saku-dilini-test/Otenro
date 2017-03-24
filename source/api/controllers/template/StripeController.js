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
                    stripe.customers.create({
                        email: userData.email
                    }).then(function(customer){
                        return stripe.customers.createSource(customer.id, {
                            source: {
                                object: 'card',
                                exp_month: req.body.exp_month,
                                exp_year: req.body.exp_year,
                                number: req.body.number,
                                cvc: req.body.cvc
                            }
                        });
                    }).then(function(source) {
                        return stripe.charges.create({
                            amount: req.body.amount,
                            currency: 'usd',
                            customer: source.customer
                        });
                    }).then(function(charge) {
                        // New charge created on a new customer
                        console.log(JSON.stringify(charge));
                        res.send(charge);
                    }).catch(function(err) {
                        // Deal with an error
                        res.send(err);
                    });
                }
            });

        });








    }



};