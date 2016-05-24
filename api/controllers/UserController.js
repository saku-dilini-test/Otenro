/**
 * UserController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    editUserProfile : function(req,res){

        var data = req.body;
        var query = {id:req.userId};
        console.log("req.body.lastName  " + req.body.lastName );

        if (typeof req.body.currentPassword==='undefined'||typeof req.body.password==='undefined'
            || typeof req.body.confirmPassword==='undefined'){

            User.update(query, { "firstName" : req.body.firstName ,
                "lastName" : req.body.lastName , "email" : req.body.email,
                "accountType" : req.body.accountType }).exec(function(err,user) {
                if (err) res.send(err);
            });
        }else {
            User.update(query,data).exec(function(err,user) {
                if (err) res.send(err);
            });
        }
        res.send('ok');
    },
    getUserProfile : function(req,res){

        var query = {id:req.userId};
        User.findOne(query, function(err, user) {
            if (err) return done(err);
            res.send(user);
        });
    },
    editBillingDetails : function(req,res){
        var data = req.body;
        var query = {userId:req.body.userId};
        BillingDetails.update(query,data).exec(function(err,user) {
               if (err) res.send(err);
               if (user.length == 0) {
                   BillingDetails.create(data).exec(function (err, app) {
                       if (err) res.send(err);

                       res.send({
                           app: app,
                           message: "New Contact Us Record Create Success !"
                       });
                   });
               } else {
                   res.send({
                       app: user,
                       message: "Contact Us Record Update Success !"
                   });
               }
        });
    },
    getBillingDetails : function(req,res){
        var query = {userId:req.param('userId')};
          BillingDetails.findOne(query, function(err, user) {
            if (err) return done(err);
            res.send(user);
        });
    }
};