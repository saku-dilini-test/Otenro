module.exports = {

    savePaymentUserData : function(req,res){

       /* UserPayment.findOne({email: req.body.email}, function foundUser(err, user) {
            if (err) return res.negotiate(err);
            if (user) return res.status(409).json({error: 'You already have paid'});*/

            var data = req.body;

            console.log(JSON.stringify(data));

            UserPayment.create(data).exec(function(err,result) {
                if (err){
                    sails.log.error("UserPayment Create Error");
                    return done(err);
                }
                res.send("ok");
            });

/*
        });*/

    }
};