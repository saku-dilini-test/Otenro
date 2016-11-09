/**
 * IPGController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * update IPG Details collections for given IPG Details Id
     * If not create new IPG collections
     * @param req
     * @param res
     */
    updateIPGInfo : function(req,res){
        var searchQuery = {
            id : req.body.id
        };
        var updateData = req.body;
        if(typeof req.body.id != 'undefined'){
            IPGDetails.update(searchQuery,updateData,function(err,main) {
                if (err) return res.send(err);
                return res.send(200, {message: 'IPG Details successfully updated'});
            });
        }else{
            IPGDetails.create(updateData).exec(function (err, result) {
                if (err) return res.send(err);
                return res.send(200, {message: 'IPG Details successfully created'});
            });
        }
    },

    /**
     * return IPG Details collections for given app Id
     * @param req
     * @param res
     */
    getIPGInfo : function(req,res){
        var appId = req.param('appId');
        console.log(appId);
        var searchQuery = {
            appId: appId
        };
        IPGDetails.findOne(searchQuery).exec(function(err, result) {
            console.log(result);
            if (err) return res.send(err);
            return res.send(result);
        });
    }
    
};