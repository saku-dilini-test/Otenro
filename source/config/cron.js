/**
 * Created by Praveen on 5/15/17.
 */

module.exports.cron = {



    DailySummaryJob: {

        schedule: '00 07 16 * * *',
        onTick: function () {
            if(sails){
                var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                revenueAndTrafficReportController.insertRevenueAndTrafficDailySummary();
            }
        }
    },

    MonthlySummaryJob: {

        schedule: '00 38 11 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getMonth() !== yesterday.getMonth()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    revenueAndTrafficReportController.insertRevenueAndTrafficMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
                }

            }
        }
    },

    YearSummaryJob:{

        schedule: '00 06 12 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getYear() !== yesterday.getYear()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    revenueAndTrafficReportController.insertRevenueAndTrafficYearSummary(yesterday.getFullYear());
                }

            }
        }
    }



};