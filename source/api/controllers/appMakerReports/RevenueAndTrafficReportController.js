/**
 * Created by thusithz on 5/3/16.
 */
/**
 * ApplicationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {



subscriptionPaymentData: function (req, res) {

 /*       var reqData = req.body;
        var fromMonth = reqData.fromMonth;
        var toMonth = reqData.toMonth;
        var year = reqData.year;
        var reportType = reqData.reportType;
*/


    SubscriptionPayment.find(

        {date: {'>=': "2018-06-01",'<=':"2018-07-01"}, status:1},
        {groupBy:  ['operator'] , sum: [ 'amount' ] }

    ).exec(function(error, response) {




            res.send(response);
    });
    }

};





function getLastDayOfMonth(year,month) {


    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);

    return lastDay;

}





















