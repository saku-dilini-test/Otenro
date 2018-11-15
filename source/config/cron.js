/**
 * Created by Praveen on 5/15/17.
 * ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']
 * schedule: '* * * * * *'
 */
var dateFormat = require('dateformat');

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
    },
    /**
     * Use to build APKs for Apps
     * Will run this each and every 5 mins
     */
    buildAPKs:{
        schedule: '0 */5 * * * *',
        onTick: function () {
            if(sails){
                var editCtrl = require('../api/controllers/EditController.js');
                editCtrl.buildNextApk();
            }
        },
        start: false
    },
    /**
     * Use to Stop the buildAPKs cron for Apps
     */
    stopBuildAPKs:{
        schedule: '0 0 2 * * *',
        onTick: function () {
            if(sails){
                sails.log.debug('cron: Stopped buildAPKs job @ %s', dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"));
                sails.hooks.cron.jobs.buildAPKs.stop();
            }
        }
    },
    /**
     * Use to Start the buildAPKs cron for Apps
     */
    startBuildAPKs:{
        schedule: '0 0 1 * * *',
        onTick: function () {
            if(sails){
                sails.log.debug('cron: Started buildAPKs job @ %s', dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"));
                sails.hooks.cron.jobs.buildAPKs.start();
            }
        }
    }
};