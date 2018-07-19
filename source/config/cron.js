/**
 * Created by Praveen on 5/15/17.
 */

module.exports.cron = {



    DailySummaryJob: {

        schedule: '00 20 13 * * *',
        onTick: function () {
            if(sails){
                var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');

                revenueAndTrafficReportController.insertRevenueAndTrafficDailySummary();
                reconciliationReportController.insertReconciliationDailySummary()
            }
        }
    },

    MonthlySummaryJob: {

        schedule: '00 02 16 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getMonth() !== yesterday.getMonth()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');

                    revenueAndTrafficReportController.insertRevenueAndTrafficMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
                    reconciliationReportController.insertReconciliationMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
               }

            }
        }
    },

    YearSummaryJob:{

        schedule: '00 26 17 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getYear() !== yesterday.getYear()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');

                    revenueAndTrafficReportController.insertRevenueAndTrafficYearSummary(yesterday.getFullYear());
                    reconciliationReportController.insertReconciliationYearlySummary(yesterday.getFullYear());
                }

            }
        }
    }

};