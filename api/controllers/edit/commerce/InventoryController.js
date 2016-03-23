/**
 * InventoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    getInventoryList:function(req, res) {


            var inventory=[];
            var appId = req.param('appId');
            var searchApp = {
                appId: appId
            };

            ThirdNavigation.find(searchApp).exec(function(err, app) {
                if (err) return done(err);

                var setFunction=function(x,length, data ,obj){
                    if(x<length){

                        data[x].product=data[x];

                        ApplicationInventory.findOrCreate({id :data[x].id},data[x]).exec(function(e,update){
                            if(e){

                                console.log(e);
                                x++;
                                setFunction(x,length,data ,obj);
                            }
                            obj.push(update);
                            x++;
                            setFunction(x,length,data ,obj);

                        });

                    }else{

                        return res.send(obj);
                    }
                };

                setFunction(0,app.length,app,inventory);
            });

    },

    updateInventory : function(req,res){

        var body=req.body;
        var lng=body.length;
        console.log(body);
        for(var i=0 ; i < lng ; i++){

            var inventory={
                id : body[i].id,
                name : body[i].name,
                price: body[i].price,
                quantity: body[i].quantity,
                sale: body[i].sale,
                sku: body[i].sku,
                discount: body[i].discount,
                product : body[i]
            };

            ApplicationInventory.update({ id :inventory.id },inventory).exec(function(err,r){
                if (err) return done(err);

            });

        }

        res.send({message : 'ok'});
    }
};