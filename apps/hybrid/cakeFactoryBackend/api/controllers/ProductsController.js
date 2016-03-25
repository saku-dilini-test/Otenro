/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Retrieving category data from categories model
module.exports = {

  /**
   * Retrieve the products according the the category.
   * @param req
   * @param res
   */
  getProductsByCategory: function(req,res){
    Product.find({where: {categoryCode: req.param('categoryCode')}}).exec(function find(err, result) {
      if (err) {
        sails.log.error(err);
      }
      else {
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, {success: 'Success', result: result});
      }
    })
  },

  getProductsDetails:function (req, res) {
    console.log(req.param('id'));
    Product.findOne({id:req.param('id')}).exec(function find(err, result) {
      if (err) {
        sails.log.error(err);
      }
      else {
        console.log(result);
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, {success: 'Success', result: result});
      }
    })
  }
};
