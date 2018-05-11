/**
 * MainCategoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    addNewCategory : function(req,res){
        console.log(req.userId)
        var dePath;
        if(req.body.isNew === 'true' || req.body.isNew === true){
                dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/';
            }else {
                dePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/secondNavi/';
         }

        req.file('file').upload({
            dirname: require('path').resolve(dePath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);
            var newFileName=Date.now()+'.png';
            fs.rename(uploadedFiles[0].fd, dePath+newFileName, function (err) {
                if (err) return res.send(err);
            });


            if(req.body.parentId){
                var secondSubNavi =req.body;
                secondSubNavi.imageUrl = newFileName;
                secondSubNavi.nodes = [];
                MainCategory.create(secondSubNavi).exec(function(err, newMenu) {
                    if (err) res.send(err);

                    if(newMenu){
                        MainCategory.find({ id: req.body.parentId}).exec(function(err,parent) {
                            if (err) res.send(err);
                            if(parent){
                                var newParent = {};
                                newParent.nodes = [];
                                console.log(parent)
                                if(parent[0].nodes){
                                    newParent.nodes = parent[0].nodes;
                                }
                                newParent.nodes.push(newMenu.id);
                                MainCategory.update({id :req.body.parentId},newParent).exec(function(err) {
                                    if (err) {
                                        res.send(err)
                                    }else{
                                        res.send('ok');
                                    }
                                });
                            }

                        });
                    }
                });

            }else{
                var secondNavi =req.body;
                secondNavi.imageUrl = newFileName;
                secondNavi.nodes = [];
                MainCategory.create(secondNavi).exec(function(err, newMenu) {
                    if (err) res.send(err);
                    res.json(newMenu);
                });
            }
        });
    },

    getCategoryList : function(req,res){
        var mainCatCtrl = this;
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        MainCategory.find(searchApp, function(err, list) {
            if (err) return done(err);

            if(list){
                ThirdNavigation.find(searchApp, function(err, products) {
                    if (err) return done(err);

                    if(products){
                        var parentMenuItems =[];
                        for(var i = 0; i < list.length; i++){
                            var relatedProducts = products.filter(products =>  products.childId == list[i].id);
                            list[i].products = relatedProducts;
                            if(!list[i].parentId){
                                parentMenuItems.push(list[i]);
                            }
                        }
                        res.send(mainCatCtrl.makeCategoryArray(parentMenuItems, list, products));
                    }
                });

            }

            // res.send(app);
        });
    },

    makeCategoryArray: function(parentNodes, list) {
        var mainCatCtrl = this;
        var newMenuItems =[];

        // console.log("makeCategoryArray");
        // console.log(JSON.stringify(list, null, 2));
        for(var i = 0; i < parentNodes.length; i++){
            var parentNode = parentNodes[i];
            parentNode.childNodes = [];
            var parentNodeWithChillds = mainCatCtrl.attachChildCategoriesByParentNode(parentNode, list);
            // console.log(parentNodeWithChillds)
            newMenuItems.push(parentNodeWithChillds);
        }
        return newMenuItems;
        // console.log("newMenuItems=> " + JSON.stringify(newMenuItems, null, 2));
    },

    attachChildCategoriesByParentNode: function(parentNode, list) {
        var mainCatCtrl = this;

        // console.log("attachChildCategoriesByParentNode :: " + parentNode.id);
        if(parentNode.nodes && parentNode.nodes.length>0){
            var childNodes = parentNode.nodes;
            for(var i = 0; i < childNodes.length; i++){
                // console.log("process child node :: " + childNodes[i]);
                // var childNodeArray = $filter('filter')(list, {"id": childNodes[i]});
                var childNodeArray = list.filter(list =>  list.id == childNodes[i]);
                var childNode = childNodeArray[0];//Will contains only one item
                childNode.childNodes = [];
                // console.log("childNode=>" + JSON.stringify(childNode, null, 2));
                parentNode.childNodes.push(mainCatCtrl.attachChildCategoriesByParentNode(childNode, list));
                // console.log("end push");
            }
        }
        // console.log("parentNode=>" + JSON.stringify(parentNode, null, 2));
        return parentNode;
    },

    updateCategory : function(req,res){
        console.log(req.body)
        var desPath;
        var filePath;
        if(req.body.isNew === 'true' || req.body.isNew === true){
            filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId+ '/src/assets/images/secondNavi/'+ req.body.imageUrl;
            desPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/';
        }else {

            filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/'+ req.body.imageUrl;
            desPath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId + '/img/secondNavi/';
        }
        var newFileName ;

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        },function (err, uploadedFiles) {
            if (err) res.send(500, err);
            fs.unlink(filePath, function (err) {
                if (err) res.send(err);
            });
            // Create new img file name using date.now()
            var fileName = Date.now() + '.jpg';
            fs.rename(uploadedFiles[0].fd, desPath + fileName , function (err) {
                if (err) res.send(err);
                // New img file name send back to update to menu collection
                newFileName = fileName;
                var secondSubNavi =req.body;
                secondSubNavi.imageUrl = newFileName;

                MainCategory.update({id :req.body.categoryId},secondSubNavi).exec(function(err) {
                    if (err) {
                        res.send(err);
                    }else{
                        res.send('ok');
                    }
                });
            });

        });


    },
    updateCategoryName : function(req,res){
        MainCategory.update({id :req.body.id},req.body).exec(function(err) {
                if (err) res.send(err);
                res.send('ok');
            });
    },
    deleteNodes : function(req,res){
        MainCategory.find({id :req.body.id}).exec(function(err,found) {
                if (err) res.send(err);
                if(found) {
                    console.log(found.nodes);
                    res.send("not implemented yet");
                }
            });
    },
    getAllCategoryWithoutMakingCommerce: function (req, res) {
        MainCategory.find(req.body).exec(function(err,found) {
            if (err) res.send(err);
            if(found) {
                res.send(found);
            }
        });
    },

    getCategoryListPlusProducts : function(req,res){

        var mainCatCtrl = this;
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        MainCategory.find(searchApp, function(err, list) {
            if (err) return done(err);

            if(list){

                // var parentMenuItems =[];
                // for(var i = 0; i < list.length; i++){
                //     if(!list[i].parentId){
                //         parentMenuItems.push(list[i]);
                //     }
                // }
                // var madeCategories = mainCatCtrl.makeCategoryArray(parentMenuItems, list);

                ThirdNavigation.find(searchApp, function(err, products) {
                    if (err) return done(err);

                    if(products){
                        for(var i=0; i<products.length; i++){
                            products[i].childId = list.id
                        }
                    }
                });
            }

            // res.send(app);
        });

    },


};