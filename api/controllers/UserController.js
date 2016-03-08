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
    }
};