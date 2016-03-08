/**
 * InventoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    getInventoryList:function(req, res) {

        var appId = req.param('appId');
        var searchApp = {
            id : "56bb0f376a42d2a3403bfc96"
        };
        ApplicationInventory.find(searchApp).exec(function(err, app) {
            if (err) return done(err);
            res.send(app);
        });

    }

};