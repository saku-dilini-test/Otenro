/**
 * Created by thusithz on 3/16/16.
 */
/**
 * MobileController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var config = require('../../services/config');

module.exports = {

    /**
     * retrieve all apps request userId
     */

    allApps: function(req, res) {

        var userId = req.userId;
        var searchApp = {
            userId: userId
        };
        Application.find(searchApp, function(err, apps) {
            if (err) return done(err);
            res.send(apps);
        });
    },

    /**
     * retrieve meServerUrl
     */

    meServerUrl :function(req,res){
        res.send({meServerUrl:config.server.host+':'+config.ME_PORT})
    },
    fileServerUrl :function(req,res){
        res.send({fileServerUrl:config.server.host+':'+config.server.port})
    }
};