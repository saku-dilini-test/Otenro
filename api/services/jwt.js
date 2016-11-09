/**
 * Created by udeshikaperera on 09/11/2016.
 */
var JWT = require('machinepack-jwt'),
    moment = require('moment'),
    config = require('./config');

module.exports = function(user,res){
    JWT.encode({
        secret: config.CLIENT_SECRET,
        payload: {
            id :  user.id,
            email:  user.email,
            //exp: moment().add(1,'days').unix(),
            userRoles : user.userRole
        },
        algorithm: 'HS256'
    }).exec({
        // An unexpected error occurred.
        error: function (err){
            return err;
        },
        // OK.
        success: function (result){
            res.status(200).json({user : { email : user.email , sub : user.id,userRoles : user.userRole  },token : result });
        }
    });
};