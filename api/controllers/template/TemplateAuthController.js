/**
 * TemplateAuthController
 *
 * @description :: Server-side logic for managing templateauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    authenticate : function(req, res) {
        console.log(req.body);
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                return res.json(505,{err:err});
            }
            console.log(user);
            if(user){
                console.log('if');
                return res.json(200,{result: user});
            }else{
                console.log('else');
                return res.json(404,{result: null});
            }

        });
    },

    register: function(req, res) {
        //User.create({email: req.body.email, password: req.body.password}).exec(function(err, user) {
        //    if (err) {
        //        return res.negotiate(err);
        //    }
        //    if (user) {
        //        JWT.encode({
        //            secret: '17ca644f4f3be572ec33711a40a5b8b4',
        //            payload: {
        //                id :  user.id,
        //                email:  user.email
        //            },
        //            algorithm: 'HS256'
        //        }).exec({
        //            error: function (err){
        //                return err;
        //            },
        //            success: function (result){
        //                console.log(result);
        //                res.status(200).json({user : { email : user.email , sub : user.id  },token : result });
        //            }
        //        });
        //    }
        //});
    }
};

