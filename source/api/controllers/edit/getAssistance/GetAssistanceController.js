/**
 * GetAssistanceController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var sentMails = require('../../../services/emailService');
var fs = require('fs-extra'),
    config = require('../../../services/config');
var path = require('path');
module.exports = {


    sendGetAssistance : function(req,res){

        var msg = sentMails.sendGetAssistance(req.body, function (msg)
        {
            res.send(msg);
        });
    }


};