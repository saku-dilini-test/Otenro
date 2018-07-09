/**
 * Created by Praveen on 5/15/17.
 */

module.exports.cron = {



    DailySummaryJob: {

        schedule: '00 07 16 * * *',
        onTick: function () {
            if(sails){
                var RevenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                RevenueAndTrafficReportController.insertRevenueAndTrafficDailySummary();
            }
        }
    },

    MonthlySummaryJob: {

        schedule: '00 07 16 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getMonth() !== yesterday.getMonth()) {

                    var RevenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    RevenueAndTrafficReportController.insertRevenueAndTrafficMonthlySummary(yesterday.getYear(),yesterday.getMonth());
                }

            }
        }
    },

    YearSummaryJob:{

        schedule: '00 07 16 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getYear() !== yesterday.getYear()) {

                    var RevenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    RevenueAndTrafficReportController.insertRevenueAndTrafficYearlySummary(yesterday.getYear(),yesterday.getMonth());
                }

            }
        }
    }



};