/**
 * Created by amila on 7/21/16.
 */
/**
 * TaxController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * update Tax Details collections for given Tax Details Id
     * If not create new Tax collections
     * @param req
     * @param res
     */
    updateTaxInfo : function(req,res){
        var searchQuery = {
            id : req.body.id
        };
        var findQuery = {
            countryRestriction: req.body.countryRestriction,
            appId: req.body.appId
        }
        var updateData = req.body;
        sails.log.info(findQuery);
        if(typeof req.body.id != 'undefined'){
           ApplicationTax.update(searchQuery,updateData,function(err,result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'Tax Collection successfully updated'});
            });
        }else{
           ApplicationTax.find(findQuery).exec(function(error,data){
                if(error) return res.send(error);
               sails.log.info(data);
                if(data == ''){
                    ApplicationTax.create(updateData).exec(function (err, result) {
                         if (err) return res.send(err);
                         return res.send(200, {message: 'Tax Option has been  successfully added'});
                    });
                }
                else{
                    return res.send(200, {message: 'This Country tax already added'});
                }
           });
        }
    },

    /**
     * return Tax Details collections for given app Id
     * @param req
     * @param res
     */
    getTaxInfo : function(req,res){
        var appId = req.param('appId');
        var searchQuery = {
            appId: appId
        };
       ApplicationTax.find(searchQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        });
    },

    /**
     * delete Tax Details collections for given Tax Details Id
     * @param req
     * @param res
     */
    deleteTaxInfo : function(req,res){
        var deleteQuery = {
            id : req.body.id
        };
       ApplicationTax.destroy(deleteQuery).exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(200,{message:'Tax Collection successfully deleted'});
        });
    },

    getAllCountry : function(req,res){
        Country.find().exec(function(err, result) {
            if (err) return res.send(err);
            return res.send(result);
        }); 
        
    }

};