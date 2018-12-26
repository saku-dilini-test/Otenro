/**
 * SecondNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    config = require('../../../services/config');
require('skipper')();

module.exports = {

    updateSliderData: function (req, res) {
        if (req.body.childList) {
            var childList = req.body.childList;
            for (var i = 0; i < childList.length; i++) {
                SecondNavigation.update({ id: childList[i].id }, childList[i]).exec(function (err) {
                    if (err) res.send(err);
                });
            }
            res.send('ok');

        } else {
            SecondNavigation.update({ id: req.body.id }, req.body).exec(function (err) {
                if (err) res.send(err);
                res.send('ok');
            });
        }
    },


    updateSliderImage: function (req, res) {

        var isNew = req.body.isNew;
        var randomstring = require("randomstring");
        var tmpImage = req.body.file;
        var appId = req.body.appId;

        var imgeFileName = randomstring.generate()+".png";
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');

        var filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/slider/' + req.body.imageUrl;
        var desPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/slider/';

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

             fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                appId + '/assets/images/slider/' + imgeFileName, buf, function (err) {
                if (err) {
                    return res.send(err);
                }
            });

            var query = {
                'appId': req.body.appId,
                'name': req.body.name,
                'optionals': req.body.optionals,
            }
            query.imageUrl = imgeFileName;

            Slider.update({ _id: req.body.id }, query).exec(function (err, data) {
                if (err) {

                    sails.log.error("error occurred while updating slider image, error => " + err);
                    return res.serverError(err);
                }
                return res.send('ok');
            });

    },
    addNewSlider: function (req, res) {
        var isNew = req.body.isNew;
        var randomstring = require("randomstring");
        var tmpImage = req.body.file;
        var appId = req.body.appId;

        var imgeFileName = randomstring.generate()+".png";
        var data = tmpImage[0].replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');

        var dePath;

        dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + appId + 'assets/images/slider/';
        fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                        appId + '/assets/images/slider/' + imgeFileName, buf, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                    });

            var slider = req.body;
            slider.imageUrl = imgeFileName;
            Slider.create(slider).exec(function (err, newSlider) {
                if (err) res.send(err);
                res.json(newSlider);
            });

    },
    getSliderData: function (req, res) {
        console.log('req.body.appId : ' + req.param('appId'))

        var appId = req.param('appId');

        var searchApp = {
            appId: appId
        };

        Slider.find(searchApp, function (err, app) {
            if (err) return done(err);
            res.send(app);
        });
    }
    ,
    UpdateSlider: function (req, res) {

        var query = {
            'name': req.body.name,
            'optionals': req.body.optArr,
        }
        Slider.update({ _id: req.body.id }, query).exec(function (err) {
            if (err) res.send(err);
            res.send('ok');
        });


    },
    deleteSlider: function (req, res){
    console.log(req.userId);
    console.log(req.body);
        var sliderPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + "/assets/images/slider/" + req.body.imageUrl;
      Slider.destroy({_id : req.body.id}).exec(function (err,slider) {
            if (err) return callback("Error while deleting " + err.message);

            fs.unlink(sliderPath, function (err) {
                if (err) return console.error(err);
            });

            res.send(200,{message:' Slider deleted'});
      })
    }


};