


var fs = require('fs-extra');
module.exports = {

setPublishDetails: function(req,res){
var details = req.body;

 PublishDetails.create(details).exec(function(err,details) {
            if (err) res.send(err);
            res.send({
                appId: details.appId,
                message: "New Navigation is created!!"
            });
        });
}
}