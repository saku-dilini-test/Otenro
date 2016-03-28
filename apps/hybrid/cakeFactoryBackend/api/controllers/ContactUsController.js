/**
 * ContactUsController
 *
 * @description :: Server-side logic for managing contactuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req,res) {
    var data = req.body;
    ContactUs.create(data).exec(function (err, contact) {
      if (err) {
        return res.status(err.status).json({err: err.message});
      }
      return res.json(200, {result: contact});
    });
  }
};

