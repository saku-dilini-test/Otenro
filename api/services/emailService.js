/**
 * Created by root on 2/2/16.
 */

var request = require('request'),
    email = require("../../node_modules/emailjs/email");

var server = email.server.connect({
    user: "onbilabsttest@gmail.com",
    password: "onbitlabs",
    host: "smtp.gmail.com",
    ssl: true
});

module.exports = {


    sendConfirmEmail: function (data, res) {

        //var data = this.getUserEmailData(emailsParms,res);
        console.log(data);
        var searchApp = {
            appId: data.appId
        };
        console.log(searchApp);

        UserEmail.find(searchApp).exec(function (err, app) {
            if (err) return done(err);

            // var apps = JSON.stringify(app);
            console.log(app);
            for (var i = 0; i < app.length; i++) {

                var mBody;
                if ((data.type == "Order confirm") && (typeof app[0].orderConfirmedEmail !== 'undefined')) {

                    mBody = app[0].orderConfirmedEmail;

                } else if ((data.type == "Order Fulfilled") && (typeof app[0].orderFulfilledEmail !== 'undefined')) {
                    mBody = app[0].orderFulfilledEmail;

                } else if ((data.type == "Order Refund") && (typeof app[0].orderRefundEmail !== 'undefined')) {
                    mBody = app[0].orderRefundEmail;

                } else {
                    console.log("Save Data Before Test Mail.");
                    return "ddd";
                    //return res.status("Save Data Before Test The Mail.");

                }
                console.log(app[0]);
                var emailDetails = {
                    text: "",
                    from: "onbilabsttest@gmail.com",
                    to: app[0].fromEmail,
                    cc: "",
                    subject: data.type,
                    attachment: [
                        {
                            data: mBody,
                            alternative: true
                        }
                    ]
                };
                if (mBody != null) {
                    server.send(emailDetails, function (err, message) {
                        sails.log.info(err || message);
                        if (err) {
                            return res.status(err.status).json({err: err.message});
                        }
                    });
                }
            }

        });
    }
};

