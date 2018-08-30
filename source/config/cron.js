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

                applicationBaseReportController.insertApplicationBaseDailySummary();
                revenueAndTrafficReportController.insertRevenueAndTrafficDailySummary();
                reconciliationReportController.insertReconciliationDailySummary();
                failedTransactionReportController.insertFiledTransactionDailySummary();
            }
        }
    },

    MonthlySummaryJob: {

        schedule: '00 05 01 * * *',
        onTick: function () {
            if(sails){

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');
                    var applicationBaseReportController = require('../api/controllers/appMakerReports/ApplicationBaseReportController.js');

                    revenueAndTrafficReportController.insertRevenueAndTrafficMonthlySummary();
                    reconciliationReportController.insertReconciliationMonthlySummary();
                    applicationBaseReportController.insertApplicationBaseMonthlySummary();


            }
        }
    },

    YearSummaryJob:{

        schedule: '00 10 01 * * *',
        onTick: function () {
            if(sails){

                    var revenueAndTrafficReportController = require('../api/controllers/appMakerReports/RevenueAndTrafficReportController.js');
                    var reconciliationReportController = require('../api/controllers/appMakerReports/ReconciliationReportController.js');
                    var applicationBaseReportController = require('../api/controllers/appMakerReports/ApplicationBaseReportController.js');

                     revenueAndTrafficReportController.insertRevenueAndTrafficYearSummary();
                     reconciliationReportController.insertReconciliationYearlySummary();
                     applicationBaseReportController.insertApplicationBaseYearlySummary();

            }
        }
    }

};