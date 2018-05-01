/**
 * AnalyticsController
 *
 */
var dateFormat = require('dateformat');

module.exports = {




    getAppVisitData : function (req,res) {

        var data = req.body;

         var dateFrom =data.dateFrom ;
         var dateTO = data.dateTo;



        AppVisitDataLog.find().where(searchApp).exec(function(err, app) {
            if (err) return done(err);
            return res.send(app);
        });

    },





    getArticleViewDataForDateRange : function (req,res) {

        var data = req.body;
        var dateFrom =dateFormat(data.fromDate,"yyyy-mm-dd") ;
        var dateTo =dateFormat(data.toDate,"yyyy-mm-dd");




        ArticleViewLogData.native(function(err, collection) {

            if (err) return res.serverError(err);

            collection.aggregate([  {"$match":{appId:data.appId,viewDate : { "$gte" : dateFrom,
                                                            "$lte" : dateTo}}},
                { $group: { _id: null, count: { $sum: 1 } } }

            ]).toArray(function (err, results) {
                if (err) return res.serverError(err);
                return res.json(results);
            });
        });

    },


    getSubscribeUsersCountForDateRange : function (req,res) {


        var data = req.body;
        var dateFrom =dateFormat(data.fromDate,"yyyy-mm-dd") ;
        var dateTo =dateFormat(data.toDate,"yyyy-mm-dd");

        console.log("appId 1 "+data.appId);

        AppUser.native(function(err, collection) {
            if (err) return res.serverError(err);

            collection.aggregate([  {"$match":{appId:data.appId,registeredDate : { "$gte" : dateFrom,
                                                                  "$lte" : dateTo}}},
                                    {"$group" : {_id:{status:"$status"}, count:{$sum:1}}}

            ]).toArray(function (err, results) {
                if (err) return res.serverError(err);
                return res.json(results);
            });
        });

    },


    getSubscribeUsersCount : function (req,res) {

        var data = req.body;

        console.log("appId  2 "+JSON.stringify(data));

        AppUser.native(function(err, collection) {
            if (err) return res.serverError(err);

            collection.aggregate([{"$match":{appId:data.appId}},
                {"$group" : {_id:{status:"$status"}, count:{$sum:1}}}

            ]).toArray(function (err, results) {
                if (err) return res.serverError(err);
                return res.json(results);
            });
        });

    }





};


