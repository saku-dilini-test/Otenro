/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Retrieving category data from categories model
module.exports = {

  getCategories: function (req, res) {
    Category.find().exec(function find(err, result) {
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

