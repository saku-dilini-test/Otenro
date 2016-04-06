/**
 * UserController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    editUserProfile : function(req,res){

        var data = req.body;
        var query = {id:req.userId};
        User.update(query,data).exec(function(err,user) {
            if (err) res.send(err);
        });
        res.send('ok');
    },
    getUserProfile : function(req,res){

        var query = {id:req.userId};
        User.find(query, function(err, user) {
            if (err) return done(err);
            res.send(user);
        });
    }
};