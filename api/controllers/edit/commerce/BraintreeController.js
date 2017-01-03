/**
 * Created by prasanna on 12/5/16.
 */
/**
 * BraintreeController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var braintree = require("braintree");
var nonceFromTheClient= '';



module.exports = {


    getClientToken: function(req,res){

        braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: "vk2y7mb8s5vbhctg",
            publicKey: "9bqjdssmgrrg7j8w",
            privateKey: "b5f83bb6a33b0c3be424c45eddc5ad49"
        }).clientToken.generate({}, function (err, response) {
            sails.log.info("error " + err);
            if (err) return res.send(err);
            sails.log.info("response " + response);
            res.send(response.clientToken);
        });

    },

    paymentMethods : function(req,res){
       nonceFromTheClient = req.body.paymentMethodNonce;
        sails.log.info("nonceFromTheClient " + nonceFromTheClient);
        res.send(nonceFromTheClient);
    },


    sale : function(req,res){
        braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: "vk2y7mb8s5vbhctg",
            publicKey: "9bqjdssmgrrg7j8w",
            privateKey: "b5f83bb6a33b0c3be424c45eddc5ad49"
        }).transaction.sale({
            amount: req.body.transaction.amount,
            paymentMethodNonce: 'fake-valid-nonce',
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if (err) return res.send(err);
            sails.log.info(result.transaction.id);
            res.send(result);
        });

    }



};