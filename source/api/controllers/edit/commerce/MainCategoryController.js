/**
 * MainCategoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    addNewCategory : function(req,res){
        var isNew = req.body.isNew;
        var dePath;

        if(isNew == 'true' || isNew == true){
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

        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };
        MainCategory.find(searchApp, function(err, list) {
            if (err) return done(err);

            if(list){

                var parentMenuItems =[];
                for(var i = 0; i < list.length; i++){
                    if(!list[i].parentId){
                        parentMenuItems.push(list[i]);
                    }
                }
                res.send(makeCategoryArray(parentMenuItems));


                function makeCategoryArray(parentNodes) {
                    var newMenuItems =[];

                    // console.log("makeCategoryArray");
                    // console.log(JSON.stringify(list, null, 2));
                    for(var i = 0; i < parentNodes.length; i++){
                        var parentNode = parentNodes[i];
                        parentNode.childNodes = [];
                        var parentNodeWithChillds = attachChildCategoriesByParentNode(parentNode);
                        // console.log(parentNodeWithChillds)
                        newMenuItems.push(parentNodeWithChillds);
                    }
                    return newMenuItems;
                    // console.log("newMenuItems=> " + JSON.stringify(newMenuItems, null, 2));
                }

                function attachChildCategoriesByParentNode(parentNode) {
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
                            parentNode.childNodes.push(attachChildCategoriesByParentNode(childNode));
                            // console.log("end push");
                        }
                    }
                    // console.log("parentNode=>" + JSON.stringify(parentNode, null, 2));
                    return parentNode;
                }

            }

            // res.send(app);
        });
    },

    updateCategory : function(req,res){
        console.log(req.body)
        var isNew = req.body.isNew;
        var desPath;
        var filePath;

        if(isNew == 'true' || isNew == true){
            filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId+ '/src/assets/images/secondNavi/'+ req.body.imageUrl;
            desPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/src/assets/images/secondNavi/';

        }else {
            filePath = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/'+ req.body.imageUrl;
            desPath  = config.APP_FILE_SERVER + req.userId + '/templates/' + req.body.appId+ '/img/secondNavi/';
        }

        req.file('file').upload({
            dirname: require('path').resolve(desPath)
        },function (err, uploadedFiles) {
            if (err) return res.send(500, err);

            fs.unlink(filePath, function (err) {
                if (err) return console.error(err);
            });

            var fileName = Date.now() + '.jpg';
                fs.rename(uploadedFiles[0].fd, desPath + fileName , function (err) {
                    if (err) return res.send(err);
                });

            var secondSubNavi =req.body;
            secondSubNavi.imageUrl = fileName;

            MainCategory.update({id :req.body.categoryId},secondSubNavi).exec(function(err) {
                if (err) {
                    res.send(err)
                }else{
                    res.send('ok');
                }
            });
        });


    },
    updateCategoryName : function(req,res){
        MainCategory.update({id :req.body.id},req.body).exec(function(err) {
            if (err) res.send(err);
            res.send('ok');
        });
    },


};