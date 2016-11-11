/**
 * Created by udeshikaperera on 09/11/2016.
 */
var JWT = require('jsonwebtoken'),
    moment = require('moment'),
    config = require('./config');

module.exports = function(user,res){
    var payload =  {
                    id :  user.id,
                    email:  user.email,
                    userRoles : user.userRole,
                    exp: moment().add(1,'day').unix()
                    };
    JWT.sign(
        payload,
        config.CLIENT_SECRET,
        { algorithm: 'HS256' },
        function(err, token) {
            if(err)return err;
            res.status(200).json(
                {user : { email : user.email , sub : user.id,userRoles : user.userRole  }
                    ,token : token });
        }
    );
};
