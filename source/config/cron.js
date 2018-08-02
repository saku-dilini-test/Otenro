/**
 * Created by Praveen on 5/15/17.
 */

module.exports.cron = {



    DailySummaryJob: {

        schedule: '00 01 01 * * *',
        onTick: function () {
            if(sails){
                var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');
                var applicationBaseReportController = require('../api/controllers/appMakerReports/ApplicationBaseReportController.js');
                var failedTransactionReportController = require('../api/controllers/appMakerReports/FailedTransactionReportController.js');


                revenueAndTrafficReportController.insertRevenueAndTrafficDailySummary();
                reconciliationReportController.insertReconciliationDailySummary();
                applicationBaseReportController.insertApplicationBaseDailySummary();
                failedTransactionReportController.insertFiledTransactionDailySummary();
            }
        }
    },

    MonthlySummaryJob: {

        schedule: '00 10 01 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getMonth() !== yesterday.getMonth()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');
                    var applicationBaseReportController = require('../api/controllers/appMakerReports/ApplicationBaseReportController.js');

                    revenueAndTrafficReportController.insertRevenueAndTrafficMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
                    reconciliationReportController.insertReconciliationMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
                    applicationBaseReportController.insertApplicationBaseMonthlySummary(yesterday.getFullYear(),yesterday.getMonth());
               }

            }
        }
    },

    YearSummaryJob:{

        schedule: '00 15 01 * * *',
        onTick: function () {
            if(sails){
                var today = new Date();
                var yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);

                if (today.getFullYear() !== yesterday.getFullYear()) {

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');
                    var applicationBaseReportController = require('../api/controllers/appMakerReports/ApplicationBaseReportController.js');

                    revenueAndTrafficReportController.insertRevenueAndTrafficYearSummary(yesterday.getFullYear());
                    reconciliationReportController.insertReconciliationYearlySummary(yesterday.getFullYear());
                    applicationBaseReportController.insertApplicationBaseYearlySummary(yesterday.getFullYear())
                }

            }
        }
    }

};