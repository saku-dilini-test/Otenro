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
    },

    getTemplateName : function(req,res){
        Template.find({"previewId":req.body.id}).exec(function(err, template) {
            if (err) res.send(err);
            res.send(template[0].templateViewName);
        });
    }


};