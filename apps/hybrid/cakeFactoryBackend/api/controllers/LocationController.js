/**
 * Created by amila on 12/17/15.
 */

module.exports = {

  getBranchLocations: function (req, res) {
    Location.find({branch:true}).exec(function find(err, result) {
      if (err) {
        sails.log.error(err);
      }
      else {
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, {success: 'Success', result: result});
      }
    })
  },
  getDeliveryLocations: function (req, res) {
    Location.find({branch:false}).exec(function find(err, result) {
      if (err) {
        sails.log.error(err);
      }
      else {
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, {success: 'Success', result: result});
      }
    })
  }
};
