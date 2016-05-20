/**
 * PromotionController
 *
 * @description :: Server-side logic for managing promotions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getPromotionList: function (req, res) {

    Promotion.find().exec(function find(err, result) {

      if (err) {
        sails.log.error(err);
      }
      else {
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, {success: 'Success', result: result});
      }
    })
  },
  paypalResponse : function(req,res){
          return res.json(200, {success: 'recieved'});
          sails.log.debug("successssssssssssssssss "+ res.body);
  }
};
