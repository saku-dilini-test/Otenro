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

var DAILY = 1;
var WEEKLY = 2;
var MONTHLY = 3;
var YEARLY = 4;
var dateFormat = require('dateformat');

var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

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
                    "Date" + ","+ "Amount"+"," +"Shipping Type" +","+ "Shipping Cost" +'\r\n');
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


            var file = config.ME_SERVER +type+"-"+dateFormat(req.body.fromDate, "yyyy-mm-dd")+"-"+dateFormat(req.body.toDate, "yyyy-mm-dd")+'.csv';

            fs.writeFile(file, reportData, function(err) {
                if (!err) {

                    var filename = path.basename(file);
                    var mimetype = mime.lookup(file);
                    res.setHeader('x-filename', filename);
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

    },


    makeChartData: function (cb) {
        var chartData = {
            labels : [],
            series : ['Qty'],
            data   : [[]],
            datasetOverride : [{ yAxisID: 'y-axis-1' }],
            options : {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                }
            }
        };

        ApplicationOrder.native(function(err, collection){
            if(err || !collection){
                cb({msg: "nothing found"}, null);
                return;
            }

            var match;
            
            if(selectedProductData.length>0){
                console.log("selectedProductData > 0");
                match = { $and: [{ $and:[{ updatedAt: { $gte:  new Date(fromDate) }},
                        { updatedAt: { $lte: new Date(toDate) }}]},
                        { appId: appId,fulfillmentStatus:"Successful"},
                        { $or: selectedProductData }]};
            }else{
                console.log("selectedProductData = 0");
                match = { $and: [{ $and:[{ updatedAt: { $gte:  new Date(fromDate) }},
                        { updatedAt: { $lte: new Date(toDate) }}]},
                        { appId: appId,fulfillmentStatus:"Successful"}]};
            }

            collection.aggregate([
                { $unwind: '$item' },
                { $match: match },
                { $group: { _id : { month: { $month: "$updatedAt" }, day: { $dayOfMonth: "$updatedAt" }, year: { $year: "$updatedAt" } },
                    totalQty : { $sum : "$item.qty" }}},
                { $sort : { _id : 1 }}
            ]).toArray(function (err, results) {
                if(err || !results || results.length == 0) {
                    cb({msg: "Nothing found"}, null);
                    return;
                }

                //Find the min and max dates and break the chart into daily/weekly/monthly/yearly using that
                var grouping;
                var timeFrame;
                var dayDifference = 0;

                if(results.length >= 2){
                    var lastIndex     = results.length - 1;
                    var minDateStr    = results[0]._id.month + "/" + results[0]._id.day + "/" + results[0]._id.year;
                    var maxDateStr    = results[lastIndex]._id.month + "/" + results[lastIndex]._id.day + "/" + results[lastIndex]._id.year;
                    var minDate       = new Date(minDateStr);
                    var maxDate       = new Date(maxDateStr);
                    var timeDiff      = Math.abs(maxDate.getTime() - minDate.getTime());
                    dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
                }   

                if(dayDifference <= 31){//Daily
                    timeFrame = DAILY;
                    grouping = { month: { $month: "$updatedAt" }, day: { $dayOfMonth: "$updatedAt" }, year: { $year: "$updatedAt" } };
                }else if(dayDifference <= 90){//Weekly
                    timeFrame = WEEKLY;
                    grouping = { week: { $week: "$updatedAt" }, month: { $month: "$updatedAt" }, year: { $year: "$updatedAt" }};
                }else if(dayDifference <= 365){//Monthly
                    timeFrame = MONTHLY;
                    grouping = { month: { $month: "$updatedAt" }, year: { $year: "$updatedAt" }};
                }else{//Yearly
                    timeFrame = YEARLY;
                    grouping = { year: { $year: "$updatedAt" }};
                }

                collection.aggregate([
                    { $unwind: '$item' },
                    { $match: match },
                    { $group: { _id : grouping,
                        totalQty : { $sum : "$item.qty" }}},
                    { $sort : { _id : 1 }}
                ]).toArray(function (err, results) {
                    if(err || !results || results.length == 0) {
                        cb({msg: "Nothing found"}, null);
                        return;
                    }

                    var labels = [];
                    var data = [];
                    var date;
                    results.forEach(tuple => {

                        switch (timeFrame) {
                        case DAILY:
                                date = MONTHS[tuple._id.month-1] + "/" + tuple._id.day + "/" + tuple._id.year;
                            break;
                        case WEEKLY:
                                var week = tuple._id.week;
                            if(week === 0){
                                week = 1;
                            }else{
                                week++;
                            }

                            date = "Week " + week + ":" + tuple._id.year;
                            break;
                        case MONTHLY:
                                date = MONTHS[tuple._id.month-1] + ":" + tuple._id.year;
                            break;
                        default:
                            date = tuple._id.year;
                        }

                        var qty = tuple.totalQty;

                        chartData.labels.push(date);
                        chartData.data[0].push(qty);
                    });

                    cb(null, chartData);

                });
            });
        });
    },

    getChartData: function (req, res) {
        console.log("Exec getChartData");
        appId = req.body.appId;
        var selectedProducts= req.body.selectedProducts;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;

        if(selectedProducts){
            selectedProducts.forEach(function(element) {
                var data = {"item.name":element};
                selectedProductData.push(data);
            });    
        }    

        this.makeChartData((err, chartData) => {
            if(err) {
                console.log("Error, " + JSON.stringify(err, null, 2));
            }

            return res.send({
                "data": chartData
            });
        });
    }


};