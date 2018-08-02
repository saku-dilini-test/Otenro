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
var moment = require('moment');
var date = require('date-and-time');

var SALES = 1;
var TAX = 2;  
var SHIPPING = 3;  
var selectedTab;

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
                    { $and: [{$and:[{updatedAt:{$gte: getStartOfDate(fromDate)}},
                                {updatedAt:{$lte: getEndOfDate(toDate)}}]},
                            { appId: appId,fulfillmentStatus:"Successful"},
                            { "item.name": { $in: selectedProductData }}] } },
                {

                    $group : {
                        _id:{name:"$item.name"}, itemPrice: { $max: "$item.price"}, count: { $sum: "$item.qty" }, currency: { $first: "$currency" }
                    }
                }
            ]).toArray(function (err, results) {
                if(err || !results || results.length == 0) {
                    cb({msg: "Nothing found"}, null);
                    return;
                }


                var modifiedResults = [];
                results.forEach(function(tuple){
                    var itemId = tuple._id;
                    var itemPrice = tuple.itemPrice;
                    var qtySum = tuple.count;
                    var currency = tuple.currency;

                    var totalPrice = itemPrice * qtySum;

                    modifiedResults.push({ _id: itemId, count: qtySum, totalPrice: totalPrice, currency: currency });
                });

                cb(null, modifiedResults);
            });

        });
    },




    getSalesSummary: function (req, res) {
        appId = req.body.appId;
        selectedProductData= req.body.selectedProducts;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;

        console.log("fromDate " + fromDate);
        console.log("toDate " + toDate);

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
                    { $and: [{$and:[{updatedAt:{$gte:  getStartOfDate(fromDate)}},
                                {updatedAt:{$lte: getEndOfDate(toDate)}}]},
                            { appId: appId,fulfillmentStatus:"Successful"}] } },
                {

                    $group : {
                        _id:{country:"$deliveryCountry"}, totalSales: { $sum: "$amount"}, count: { $sum: 1 },taxTotal: { $sum: "$tax"}, currency: { $first: "$currency" }
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
                    { $and: [{$and:[{updatedAt:{$gte: getStartOfDate(fromDate)}},
                                {updatedAt:{$lte: getEndOfDate(toDate)}}]},
                            { appId: appId,fulfillmentStatus:"Successful"}] } },
                {

                    $group : {
                        _id:{country:"$deliveryCountry",shippingOpt:"$shippingOpt"}, totalShippingCost: { $sum: "$shippingCost"}, currency: { $first: "$currency" }
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

            selectedProductData = req.body.selectedProducts;

            searchBy = {appId:req.body.appId,"item.name": { $in: selectedProductData },fulfillmentStatus:"Successful",
                updatedAt:{">=":getStartOfDate(req.body.fromDate),"<=":getEndOfDate(req.body.toDate)}
                }

        }else {

            searchBy = {appId:req.body.appId,fulfillmentStatus:"Successful",
                updatedAt:{">=":getStartOfDate(req.body.fromDate),"<=":getEndOfDate(req.body.toDate)}
            }

        }

        ApplicationOrder.find(searchBy).exec(function (err, Order) {

            if (err) res.send(err);

            //tax
            if (type=='tax'){
                var data

                    reportData.push(" , "+"Country"+","+ "Customer" +"," +
                        "Order ID" + "," +  "Date" + ","+ "Amount"+ ","+"Tax"+'\r\n');
                    Order.forEach(function(order) {
                            data = order.deliveryCountry+","+order.customerName +
                                ","+ order.id + ","+ order.updatedAt+","+order.amount+","+order.tax+'\r\n';
                            reportData.push(data);

                    });


            }else if (type=='shipping'){

                var data;
                //shipping

                    reportData.push(" , "+"Country"+","+ "Customer" +"," + "Order ID" + "," +
                        "Date" + ","+ "Amount"+"," +"Shipping Type" +","+ "Shipping Cost" +'\r\n');
                    Order.forEach(function(order) {
                        if(order.shippingOpt != "Pick up"){

                            data = order.deliveryCountry+","+order.customerName + ","+
                                    order.id + ","+ order.updatedAt+","+order.amount+","+
                                    order.shippingOpt+","+order.shippingCost+'\r\n';
                                reportData.push(data);
                        }
                    });


            }else if (type=='sales'){

                //sales

                    reportData.push(" , "+"Country"+","+ "Customer" +"," + "Product" + "," +
                        "Date" + ","+ "Amount"+","+ "SKU"+"," +"variant"  +'\r\n');
                    Order.forEach(function(order) {
                        order.item.forEach(function (item) {
                                if(selectedProductData.indexOf(item.name) > -1){
                                    var itemTotal = item.qty * item.price;
                                    item.variant.forEach(function (variant) {
                                        var data = order.deliveryCountry+","+order.customerName + ","+
                                            item.name + ","+ order.updatedAt+","+itemTotal+","+item.sku+"," +
                                            ""+variant.name+"-"+variant.vType+'\r\n';
                                        reportData.push(data);
                                    })
                                }

                        });
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
            series : [],
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
            
            if(selectedTab === SALES && selectedProductData.length>0){
                console.log("selectedProductData > 0");
                match = { $and: [{ $and:[{ updatedAt: { $gte: getStartOfDate(fromDate) }},
                        { updatedAt: { $lte: getEndOfDate(toDate) }}]},
                        { appId: appId,fulfillmentStatus:"Successful"},
                        { "item.name": { $in: selectedProductData }}]};
            }else{
                console.log("selectedProductData = 0");
                match = { $and: [{ $and:[{ updatedAt: { $gte:  getStartOfDate(fromDate) }},
                        { updatedAt: { $lte: getEndOfDate(toDate) }}]},
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
                    cb({msg: "Nothing found at first aggregate call" , error: err}, null);
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
                    { $project: { updatedAt: 1, tax: 1, appId : 1, fulfillmentStatus : 1, "item.name" : 1, totalQty: "$item.qty" }},
                    { $match: match },
                    { $group: { _id : grouping,
                        totalQty : { $sum : "$totalQty" }, totalTax: { $sum: "$tax"}, totalNoOfOrders : { $sum : 1 }}},
                    { $sort : { _id : 1 }}
                ]).toArray(function (err, results) {
                    if(err || !results || results.length == 0) {
                        cb({msg: "Nothing found at second aggregate call" , error: err}, null);
                        return;
                    }                  

                    getSalesOrdersByDateMap(timeFrame, function(err, ordersByDateMap){
                        if(selectedTab === SALES){
                            if(err) {
                                return res.send({
                                    "success": false,
                                    "message": (err.msg) ? err.msg : "Nothing found"
                                });
                            }
                        }

                        var labels = [];
                        var data = [];
                        var date;
                        results.forEach(function(tuple){

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

                            switch (selectedTab) {
                            case SALES:
                                var totalQtyByDate = 0;

                                if(ordersByDateMap && ordersByDateMap[date])
                                {
                                    totalQtyByDate = ordersByDateMap[date];
                                }

                                chartData.data[0].push(totalQtyByDate);
                                chartData.series[0] = 'Qty';
                                break;
                            case TAX:
                                chartData.data[0].push(tuple.totalTax);
                                chartData.series[0] = 'Tax';
                                break;
                            default:
                                chartData.data[0].push(tuple.totalNoOfOrders);
                                chartData.series[0] = 'Shipments';
                            }                        

                            chartData.labels.push(date);
                        });

                        //If the chart contains only a single label and single value, then the chart is not displaying properly.
                        //Here adding an another empmty label will shiw the Chart properly for a single data value
                        if(chartData.labels.length === 1){
                            chartData.labels.push("");
                        }

                        cb(null, chartData);
                    });
                });
            });
        });
    },

    getChartData: function (req, res) {
        console.log("Exec getChartData");
        appId = req.body.appId;
        selectedProductData = req.body.selectedProducts;
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;
        selectedTab = req.body.selectedTab;

        this.makeChartData(function(err, chartData){
            if(err) {
                console.log("Error, " + JSON.stringify(err, null, 2));
            }

            return res.send({
                "data": chartData
            });
        });
    }

};

function getStartOfDate(date){
    return new Date((new Date(date)).setHours(0,0,0,0));
}

function getEndOfDate(date){
    return new Date((new Date(date)).setHours(23,59,59,999));
}


/*
    This sub function will make a map which has the key as the date/week/months/year grouping and Sum of the Qty's as the Value
*/
function getSalesOrdersByDateMap(timeFrame, cb) {
    //This is only applicable for Sales, Couldn't use the aggregate functions in MongoDB since the current DB version not supported(2.6.x)
    if(selectedTab === SALES){
        var ordersByDateMap = new Object();

        var searchBy =  { appId: appId,
                          "item.name": { $in: selectedProductData },
                          fulfillmentStatus: "Successful",
                          updatedAt: { ">=": getStartOfDate(fromDate), "<=": getEndOfDate(toDate) }
                        }       

        ApplicationOrder.find(searchBy).exec(function (err, Orders) {

            if (err){
                console.log("Error: " + JSON.stringify(err, null, 2));
                cb(err, null);
                return;
            }

            Orders.forEach(function(order) {
                var date = new Date(order.updatedAt);
                var month = date.getMonth();
                var day = date.getDate();
                var year = date.getFullYear();
                var items = order.item;

                switch (timeFrame) {
                case DAILY:
                        dateStr = MONTHS[month] + "/" + day + "/" + year;
                    break;
                case WEEKLY:
                        var week = getWeekOfMonth(day);
                    if(week === 0){
                        week = 1;
                    }else{
                        week++;
                    }

                    dateStr = "Week " + week + ":" + year;
                    break;
                case MONTHLY:
                    dateStr = MONTHS[month] + ":" + year;
                    break;
                default:
                    dateStr = year;
                }                

                items.forEach(function(item){
                    if(selectedProductData.indexOf(item.name) > -1){
                        if(ordersByDateMap[dateStr]){
                            ordersByDateMap[dateStr] += item.qty;
                        }else{
                            ordersByDateMap[dateStr] = item.qty;
                        }
                    }
                });                                    
            });

            cb(null, ordersByDateMap);
        });   
    }else{
        cb(null, null);
    }
}

function getWeekOfMonth(day) {
  day-=(day==0?6:date.getDay()-1);//get monday of this week
  //special case handling for 0 (sunday)

  day+=7;
  //for the first non full week the value was negative

  prefixes = ['0', '1', '2', '3', '4', '5'];
  return prefixes[0 | (day) / 7];
}