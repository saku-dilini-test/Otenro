/**
 * Created by Praveen on 5/15/17.
 */

module.exports.cron = {
    myFirstJob: {
        schedule: '00 00 01 * * *',
        //schedule: '*/10 * * * * *',
        onTick: function () {
            if(sails){
                /*runs everyday at 1 am*/
                sails.log.debug("sending reminder emails");
                var EmailService = require('../api/services/emailService.js');
                EmailService.sendReminderEmail();
                sails.log.debug("sending reminder emails - completed");
            }
        }
    }
};