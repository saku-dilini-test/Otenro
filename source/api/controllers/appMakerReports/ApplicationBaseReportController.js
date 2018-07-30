/**
 * ApplicationBaseReportController
 *
 * @description :: This is responsible for handling server side login for generating
 * application base reports
 *
 **/

var ERROR = { message: 'error'},
    NOT_FOUND = { message: 'not_found'};
var dateFormat = require('dateformat');
var config = require('../../services/config');



module.exports = {



    getShareSplit: function(operator,callback){

        var operator = operator.toLowerCase().charAt(0).toUpperCase()+ operator.slice(1);
        var shareSplit =0;

        if (operator=="Mobitel"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Mobitel.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Dialog"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Dialog.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Hutch"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Hutch.shareSplit;
            return callback(shareSplit,"error");

        }else if (operator=="Airtel"){

            shareSplit = config.IDEABIZ_USER_NETWORK_CLIENTS.Airtel.shareSplit;
            return callback(shareSplit,"error");

        }else {
            return callback(shareSplit,"error");
        }

    },



    insertApplicationBaseDailySummary: function () {


        var date = new Date();
        date.setDate(date.getDate() -1);
        var appBaseintance = this;

        PublishDetails.find().exec(function(err, publishDetailsData) {

            if (err) return done(err);

            publishDetailsData.forEach(function (publishDetails) {


                Application.findOne({id: publishDetails.appId}).exec(function (error, applicationData) {

                    publishDetails.operators.forEach(function (operators) {

                        Operator.findOne({operator:operators.operator.toLowerCase()}).exec(function(err, oprator_data){

                            oprator_data.operator_code.forEach(function (code) {

                                AppUser.count({
                                    appId: applicationData.id,
                                    subscriptionStatus: "SUBSCRIBED",
                                    msisdn: { $regex:new RegExp('^' + code, 'i') }  ,//msisdn value that starts with code.
                                    registeredDate:dateFormat(date, "yyyy-mm-dd"),
                                }).exec(function countCB(error, subcount) {

                                    //console.log("code" + code + " " + operators.operator );
                                     AppUser.count(
                                         {appId:applicationData.id,
                                          subscriptionStatus:"UNSUBSCRIBED",
                                          msisdn:{ $regex: new RegExp('^' + code, 'i')},
                                          unsubscribeDate:dateFormat(date, "yyyy-mm-dd")
                                         })
                                         .exec(function countCB(error, unsubcount) {
                                             AppUser.count(
                                                 {   appId:applicationData.id,
                                                     subscriptionStatus:"UNSUBSCRIBED",
                                                     msisdn:{ $regex: new RegExp('^' + code, 'i')},
                                                     registeredDate:dateFormat(date, "yyyy-mm-dd"),
                                                     unsubscribeDate:dateFormat(date, "yyyy-mm-dd")

                                                 })
                                                 .exec(function countCB(error, unsubcountDiff) {

                                                     AppVisitDataLog.count(
                                                         {   appId:applicationData.id,
                                                             msisdn:{ $regex: new RegExp('^' + code, 'i')},
                                                             viewDate:dateFormat(date, "yyyy-mm-dd")
                                                         })
                                                         .exec(function countCB(error, appVisitCount) {

                                                             SubscriptionPayment.find({
                                                                     status:1,appId:publishDetails.appId,
                                                                     operator:operators.operator.toLowerCase(),
                                                                     msisdn:{ $regex: new RegExp('^' + code, 'i')},
                                                                     date:dateFormat(date, "yyyy-mm-dd")},

                                                                 {groupBy:  ['appId'] , sum: [ 'amount' ] }).
                                                             exec(function(error, subscriptionPaymentData) {


                                                                 appBaseintance.getShareSplit(operators.operator,function(shareSplit, err){

                                                                       var data = {  appName:applicationData.appName,type:"ideaPro",
                                                                            caaTaxable:true,date:dateFormat(date,"yyyy-mm-dd"),
                                                                            operator:operators.operator.toLowerCase(),
                                                                            platformEarning:subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount:0,
                                                                            spEarning:subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount/100*shareSplit:0,
                                                                            appTotRevenue:subscriptionPaymentData[0] ? subscriptionPaymentData[0].amount:0,
                                                                            appTrafficCount:appVisitCount,subscriptionCount:subcount,unSubscriptionCount:unsubcount,
                                                                            totSubs:(subcount-unsubcountDiff)};


                                                                      console.log(JSON.stringify(data));

                                                                     ApplicationBaseDailySummary.create(data).exec(function (err, result) {
                                                                         if (err) console.log(err);
                                                                         console.log(result);
                                                                     });

                                                                 });
                                                             });

                                                     });
                                             });
                                         });
                                     });
                                });
                            });
                        });
                    });
                });
            });
    },


    insertApplicationBaseMonthlySummary : function (year,month) {


        ApplicationBaseDailySummary.find({date:{'>=':dateFormat(getFirstDayOfMonth(year, month), "yyyy-mm-dd"),
                    '<=':dateFormat(getLastDayOfMonth(year, month), "yyyy-mm-dd")}},
            {groupBy:  ['appName','operator','type'] , sum: [ 'platformEarning','spEarning','appTotRevenue',
                    'appTrafficCount','subscriptionCount','unSubscriptionCount','totSubs' ] }).
        exec(function(error, applicationBaseDailySummaryData) {



            applicationBaseDailySummaryData.forEach(function (appBaseMonthlySummary) {

                appBaseMonthlySummary.year = year;
                appBaseMonthlySummary.month = month;

                ApplicationBaseMonthlySummary.create(appBaseMonthlySummary).exec(function (err, result) {
                    if (err) console.log(err);
                    console.log(result);
                });

            })

        })

    },

    insertApplicationBaseYearlySummary : function (year) {



        ApplicationBaseMonthlySummary.find({year:year},
            {groupBy:  ['appName','operator','type'] , sum: [ 'platformEarning','spEarning','appTotRevenue',
                    'appTrafficCount','subscriptionCount','unSubscriptionCount','totSubs' ] }).
        exec(function(error, applicationBaseMonthlySummaryData) {

            applicationBaseMonthlySummaryData.forEach(function (appBaseYearlySummary) {

                appBaseYearlySummary.year = year;

                ApplicationBaseYearlySummary.create(appBaseYearlySummary).exec(function (err, result) {
                    if (err) console.log(err);
                    console.log(result);
                });

            })

        })

    },

    getApplicationBaseDailySummary: function (req,res){

        var reqData = req.body;

        var dateFrom = reqData.dateFrom;
        var dateTo = reqData.dateTo;
        var appName = reqData.appName;

        var query="";

        if (appName=="all"){

            query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")}}

        }else {
            query = {date:{'>=':dateFormat(dateFrom, "yyyy-mm-dd"),'<=':dateFormat(dateTo, "yyyy-mm-dd")},appName:appName}
        }


            ApplicationBaseDailySummary.find(query,
                    {groupBy:  ['appName','operator','date','type','caaTaxable'] , sum: [ 'platformEarning','spEarning','appTotRevenue',
                            'appTrafficCount','subscriptionCount','unSubscriptionCount','totSubs' ] }).
                exec(function(error, applicationBaseDailySummaryData) {

                res.send(applicationBaseDailySummaryData);

            })

    },

    getApplicationBaseMonthlySummary: function (req,res){

        var reqData = req.body;

        var monthFrom = reqData.monthFrom;
        var monthTo = reqData.monthTo;
        var appName = reqData.appName;

        var query="";

        if (appName=="all") {

            query = { month: {'>=': monthFrom, '<=': monthTo}}

        }else{
            {query = {month: {'>=': monthFrom, '<=': monthTo}, appName: appName}}


            ApplicationBaseMonthlySummary.find(query,
                {
                    groupBy: ['appName', 'operator', 'date', 'type', 'caaTaxable'],
                    sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                        'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
                }).exec(function (error, applicationBaseMonthlySummaryData) {

                res.send(applicationBaseMonthlySummaryData);

            })

        }
    },


    getApplicationBaseYearlySummary: function (req,res){

        var reqData = req.body;

        var yearFrom = reqData.yearFrom;
        var yearTo = reqData.yearTo;
        var appName = reqData.appName;

        var query="";

        if (appName=="all") {

            query = { year: {'>=': yearFrom, '<=': yearTo}}

        }else{
            {query = {year: {'>=': yearFrom, '<=': yearTo}, appName: appName}}


            ApplicationBaseYearlySummary.find(query,
                {
                    groupBy: ['appName', 'operator', 'date', 'type', 'caaTaxable'],
                    sum: ['platformEarning', 'spEarning', 'appTotRevenue',
                        'appTrafficCount', 'subscriptionCount', 'unSubscriptionCount', 'totSubs']
                }).exec(function (error, applicationBaseDailySummaryData) {

                res.send(applicationBaseDailySummaryData);

            })

        }
    },



    /*
    *SubscriptonPayments
    */

   getSubscriptionPayments :function(req, res) {

        SubscriptionPayment.find().exec(function (errOne, payments){
        var paymnt = [];
            if(errOne){
                return res.send(errOne);
            }else{
                if (payments){
                    Application.find().exec(function (errTwo, appData){
                      
                         if(appData){
                            payments.forEach(function (pay){
                                appData.forEach(function (apdata){
                                    if(apdata.id == pay.appId){
                                        pay.appName = apdata.appName
                                        paymnt.push(pay);

                                       
                                    }
                                });
                            })
                        }
                            return res.send(paymnt);
                        if(errTwo){
                           return  res.send(errTwo);
                        }
                       
                    });
    
                  
                }
            }
        });
   }
};


function getFirstDayOfMonth(year,month) {

    var firstDay = new Date(year, month, 1);

    console.log("first day " + firstDay );
    return firstDay;
}


function getLastDayOfMonth(year,month) {

    var lastDay = new Date(year, month + 1, 0);
    console.log("lastDay " + lastDay );
    return lastDay;

}