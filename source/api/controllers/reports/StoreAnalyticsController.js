/**
 * Created by prasanna on 1/29/18.
 */
/**
 * StoreAnalyticsController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var config = require('../../services/config');
var appId = "";
var selectedProductData = [];
var fromDate;
var toDate;


module.exports = {

    /**
     *  getSalesSummary
     */



    getSalesData: function (cb) {

        ApplicationOrder.native(function(err, collection){
            if(err || !collection){
                cb({msg: "nothing found"}, null);
                return;
            }

            collection.aggregate([{$unwind:'$item'},{ "$match" : { $and: [{$and:[{updatedAt:{$gte:  new Date(fromDate)}},{updatedAt:{$lte: new Date(toDate)}}]},{ appId: appId}, {$or:selectedProductData}] } },
                {

                    $group : {
                        _id:{name:"$item.name"}, totalPrice: { $sum: "$item.total"}, count: { $sum: 1 }
                    }
                }
            ]).toArray(function (err, results) {
                if(err || !results || results.length == 0) {
                    cb({msg: "Nothing found"}, null);
                    return;
                }
                cb(null, results);
            });

        });
    },


    getSalesSummary: function (req, res) {
        appId = req.body.appId;
        var selectedProducts= req.body.selectedProducts;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;

        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);


        selectedProducts.forEach(function(element) {
            var data = {"item.name":element};
            selectedProductData.push(data);
        });



        this.getSalesData(function (err, results) {
            if(err) {
                return res.send({
                    "success": false,
                    "message": (err.msg) ? err.msg : "Nothing found"
                });
            }
            console.log(JSON.stringify("results " + results));
            return res.send({
                "data": results
            });
        });
    }



};