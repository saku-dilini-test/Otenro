
module.exports = {

    /**
     * update Help Details collections for given Help Details Id
     * If not create new Help collections
     * @param req
     * @param res
     */

    getcommeceFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        commerceFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    getstyleFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        styleFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },



    getcategoryFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        categoryFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },



    getorderFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        orderFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    getinventoryFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        inventoryFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    gettaxFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        taxFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    getemailFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        emailFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    getshippingFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        shippingFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },



    getstoreFile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        storeFile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },


    getpaymentfile : function(req,res){

        console.log(req.body);

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };


        paymentfile.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });
    },

};