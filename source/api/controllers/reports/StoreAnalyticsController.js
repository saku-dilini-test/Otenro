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

            collection.aggregate([{$unwind:'$item'},{ "$match" :
                    { $and: [{$and:[{updatedAt:{$gte:  new Date(fromDate)}},
                                {updatedAt:{$lte: new Date(toDate)}}]},{ appId: appId,fulfillmentStatus:"Successful"}, {$or:selectedProductData}] } },
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
    },



    getTaxData: function (cb) {

        ApplicationOrder.native(function(err, collection){
            if(err || !collection){
                cb({msg: "nothing found"}, null);
                return;
            }

            collection.aggregate([{ "$match" :
                    { $and: [{$and:[{updatedAt:{$gte:  new Date(fromDate)}},
                                {updatedAt:{$lte: new Date(toDate)}}]},{ appId: appId,fulfillmentStatus:"Successful"}] } },
                {

                    $group : {
                        _id:{country:"$deliveryCountry"}, totalSales: { $sum: "$amount"}, count: { $sum: 1 },taxTotal: { $sum: "$tax"}
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

    getTaxSummary : function (req,res) {

        appId = req.body.appId;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;

        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);


        this.getTaxData(function (err, results) {
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

    },


    getShippingData :function (cb) {

        ApplicationOrder.native(function(err, collection){
            if(err || !collection){
                cb({msg: "nothing found"}, null);
                return;
            }

            collection.aggregate([{ "$match" :
                    { $and: [{$and:[{updatedAt:{$gte:  new Date(fromDate)}},
                                {updatedAt:{$lte: new Date(toDate)}}]},{ appId: appId,fulfillmentStatus:"Successful"}] } },
                {

                    $group : {
                        _id:{country:"$deliveryCountry",shippingOpt:"$shippingOpt"}, totalShippingCost: { $sum: "$shippingCost"}
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


    getShippingSummary :  function (req,res) {

        appId = req.body.appId;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;

        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);


        this.getShippingData(function (err, results) {
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

    },


    getOrderData : function (req,res){

        var path = require('path');
        var mime = require('mime');
        var fs = require('fs');
        var reportData =[];
        var itemSize = 0;
        var variantSize = 0;
        var searchBy;
        var type = req.body.type;

        console.log("type ..... " + type);

        if (type=='sales'){

            var selectedProducts= req.body.selectedProducts;

            selectedProducts.forEach(function(element) {
                var data = {"item.name":element};
                selectedProductData.push(data);
            });

            searchBy = {appId:req.body.appId,or:selectedProductData,fulfillmentStatus:"Successful",
                updatedAt:{">=":new Date(req.body.fromDate),"<=":new Date(req.body.toDate) }
                }

        }else {

            searchBy = {appId:req.body.appId,fulfillmentStatus:"Successful",
                updatedAt:{">=":new Date(req.body.fromDate),"<=":new Date(req.body.toDate) }
            }

        }

        ApplicationOrder.find(searchBy).exec(function (err, Order) {

            if (err) res.send(err);

            //tax
            if (type=='tax'){

                reportData.push(" , "+"Country"+","+ "Customer" +"," +
                    "Order ID" + "," +  "Date" + ","+ "Amount"+ ","+"Tax"+'\r\n');
                Order.forEach(function(order) {
                    var data = order.deliveryCountry+","+order.customerName +
                        ","+ order.id + ","+ order.updatedAt+","+order.amount+","+order.tax+'\r\n';
                    reportData.push(data);
                });

            }else if (type=='shipping'){

                //shipping

                reportData.push(" , "+"Country"+","+ "Customer" +"," + "Order ID" + "," +
                    "Date" + ","+ "Amount"+","+"," +"Shipping Type" +","+ "Shipping Cost" +'\r\n');
                Order.forEach(function(order) {

                            var data = order.deliveryCountry+","+order.customerName + ","+
                                order.id + ","+ order.updatedAt+","+order.amount+","+
                                order.shippingOpt+","+order.shippingCost+'\r\n';
                            reportData.push(data);
                });

            }else if (type=='sales'){

                //sales

                reportData.push(" , "+"Country"+","+ "Customer" +"," + "Product" + "," +
                    "Date" + ","+ "Amount"+","+ "SKU"+"," +"variant"  +'\r\n');
                Order.forEach(function(order) {
                    order.item.forEach(function (item) {
                        item.variant.forEach(function (variant) {
                            var data = order.deliveryCountry+","+order.customerName + ","+
                                item.name + ","+ order.updatedAt+","+item.total+","+item.sku+"," +
                                ""+variant.name+"-"+variant.vType+'\r\n';
                            reportData.push(data);
                        })

                    })
                });

            }

            var file = config.ME_SERVER +new Date()+'.csv';

            fs.writeFile(file, reportData, function(err) {
                if (!err) {

                    var filename = path.basename(file);
                    var mimetype = mime.lookup(file);
                    res.setHeader('x-filename', 'attachment; filename=' + filename);
                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                    res.setHeader('Content-type', mimetype);
                    var filestream = fs.createReadStream(file);
                    filestream.pipe(res);
                    console.log("The file was saved!");
                } else {
                    return console.log(err);
                }
            });

        });

    }


};