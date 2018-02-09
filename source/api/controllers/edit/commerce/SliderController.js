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


        var filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/slider/' + req.body.imageUrl;
        var desPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/slider/';

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        }, function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

            sails.log.info("req.body.imageUrl, " + req.body.imageUrl);

            var fileName = Date.now() + '.jpg';
            fs.rename(uploadedFiles[0].fd, desPath + fileName, function (err) {
                if (err) return res.send(err);
            });

            var query = {
                'appId': req.body.appId,
                'name': req.body.name,
                'optionals': req.body.optionals,
            }
            query.imageUrl = fileName;
            Slider.update({ _id: req.body.id }, query).exec(function (err) {
                if (err) res.send(err);
                res.send('ok');
            });


        });
    },
    addNewSlider: function (req, res) {
        var isNew = req.body.isNew;

        console.log("req.body : " + (req.body.optionals));

        var dePath;
        //            if(isNew == 'true' || isNew == true){
        dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/slider/';

        //            }else {
        //                dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/secondNavi/';
        //            }

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        }, function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName = Date.now() + '.png';
            fs.rename(uploadedFiles[0].fd, dePath + '/' + newFileName, function (err) {
                if (err) return res.send(err);
            });

            var slider = req.body;
            slider.imageUrl = newFileName;
            Slider.create(slider).exec(function (err, newSlider) {
                if (err) res.send(err);
                res.json(newSlider);
            });
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
      Slider.destroy({_id : req.body.id}).exec(function (err) {
            if (err) return callback("Error while deleting " + err.message);
            res.send(200,{message:' Slider deleted'});
      })
    }


};