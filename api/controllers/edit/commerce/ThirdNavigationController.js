/**
 * MainNavigationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    getThirdNavigation : function(req,res){

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };

        ThirdNavigation.find(searchApp, function(err, app) {
            if (err) return done(err);
            res.send(app);
        });

    },

    addNewNavi : function(req,res){

        var imagePath = config.ME_SERVER + req.userId + '/templates/' + req.body.appId + '/img/'+ 'default.jpg';
        var fileName = Date.now()+ '.jpg';
        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/products/';

        fs.readFile(imagePath, function (err, data) {
            if (err) throw err;
            fs.writeFile(dePath+fileName, data, function (err) {
                if (err) throw err;

                var subChild = req.body;
                subChild.imageUrl=fileName;
                ThirdNavigation.create(subChild).exec(function(err, menu) {
                    res.json(menu);
                });

            });
        });
    },

    addThirdNavi : function(req,res){

        var dePath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';
        console.log(req.body);
        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            var newFileName=Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+'/'+newFileName, function (err) {
                if (err) return res.send(err);
            });

            var thirdN =req.body;
            thirdN.imageUrl = newFileName;
            ThirdNavigation.create(thirdN).exec(function(err, appProduct) {
                if (err) res.send(err);
                res.send({
                    appId: appProduct,
                    message: "New Navigation is created!!"
                });
            });
        });
    },

    deleteThirdNavi : function(req,res){

        ThirdNavigation.destroy({ id : req.body.productId}, function (err) {
            if (err) return err;
            var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/'+ req.body.imageUrl;
            fs.unlink(filePath, function (err) {
                if (err) throw err;
            });
        });
    },

    updateThirdNaviImage : function(req,res){

        var filePath =config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/'+ req.body.imageUrl;
        var desPath=config.ME_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/thirdNavi/';

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });
            fs.rename(uploadedFiles[0].fd, desPath+req.body.imageUrl, function (err) {
                if (err) return res.send(err);
                res.json({ok:true});
            });
        });

    }


};