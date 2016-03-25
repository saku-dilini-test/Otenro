/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    var userId = req.body.user_id;
    User.findOne({user_id:userId}).exec(function find(err, result) {
      if (err) {
        return res.status(err.status).json({err: err.message});
      }else {
        if (typeof result == 'undefined') {
          User.create(req.body).exec(function (err, user) {
            if (err) {
              return res.status(err.status).json({err: err.message});
            }
            return res.json(200, {result: user});
          });
        } else {
          return res.json(200, {result: result});
        }
      }
    });
  }
};

