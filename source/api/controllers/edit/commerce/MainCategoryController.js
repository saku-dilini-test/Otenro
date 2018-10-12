/**
 * MainCategoryController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra'),
    config = require('../../../services/config');
module.exports = {

    addNewCategory : function(req,res){

        var dePath;

        dePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/secondNavi/';
        console.log("wtf",req.body.name)
        MainCategory.find({ appId: req.body.appId ,name: req.body.name}).exec(function(err,nameExists) {
            if (err) res.send(err);
            if (nameExists.length == 0) {
                req.file('file').upload({
                    dirname: require('path').resolve(dePath)
                }, function (err, uploadedFiles) {
                    if (err) res.send(500, err);
                    var newFileName = Date.now() + '.png';
                    fs.rename(uploadedFiles[0].fd, dePath + newFileName, function (err) {
                        if (err) res.send(err);
                    });


                    if (req.body.parentId) {

                        MainCategory.find({ select: ['nodes'], where: { appId: req.body.appId, parentId: req.body.parentId } })
                            .exec(function (err, nodes) {

                                if (err) {

                                    sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                    return res.serverError(err);
                                }

                                var secondSubNavi = req.body;
                                secondSubNavi.index = nodes.length === 0 ? 0 : nodes.length;
                                secondSubNavi.imageUrl = newFileName;
                                secondSubNavi.nodes = [];

                                MainCategory.create(secondSubNavi).exec(function (err, newMenu) {

                                    if (err) {

                                        sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                        return res.serverError(err);
                                    }

                                    if (newMenu) {
                                        MainCategory.find({ id: req.body.parentId }).exec(function (err, parent) {

                                            if (err) {

                                                sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                                return res.serverError(err);
                                            }
                                            if (parent) {
                                                var newParent = {};
                                                newParent.nodes = [];
                                                console.log(parent)
                                                if (parent[0].nodes) {
                                                    newParent.nodes = parent[0].nodes;
                                                }
                                                newParent.nodes.push(newMenu.id);
                                                MainCategory.update({ id: req.body.parentId }, newParent).exec(function (err) {
                                                    if (err) {

                                                        sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                                        return res.serverError(err);
                                                    } else {
                                                        res.send('ok');
                                                    }
                                                });
                                            }

                                        });
                                    }
                                });
                            });

                    } else {
                        MainCategory.count({ where: { appId: req.body.appId, parentId: { $exists: false } } })
                            .exec(function (err, count) {

                                if (err) {

                                    sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                    return res.serverError(err);
                                }
                                var secondNavi = req.body;
                                secondNavi.index = count === 0 ? 0 : count;
                                secondNavi.isMainCategory = true;
                                secondNavi.imageUrl = newFileName;
                                secondNavi.nodes = [];

                                MainCategory.create(secondNavi).exec(function (err, newMenu) {

                                    if (err) {

                                        sails.log.error('Error Occurred : In MainCategoryController.addNewCategory() : Error => ' + err);
                                        return res.serverError(err);
                                    }
                                    return res.json(newMenu);
                                });
                            });
                    }
                });
            } else {

                return res.status(409).send("Category name already exists");
            }
        });
    },

    getCategoryList: function (req, res) {

        var mainCatCtrl = this;
        var isRankingStarted = false;
        var appId = req.param('appId');
        var searchApp = {
            appId: appId
        };

        Application.findOne({ id: appId }).exec(function (err, app) {

            if (err) {
                sails.log.error('Error occurred: MainCategoryController.getCategoryList : error => ' + err);
            }

            if (app) {

                if (app.isRankingStarted) {
                    isRankingStarted = true;
                }
            }
        });

        MainCategory.find(searchApp).sort({ updatedAt: 'DESC' }).exec(function (err, list) {
            if (err) throw err;

            if (list) {
                ThirdNavigation.find(searchApp).sort({ updatedAt: 'DESC' }).exec(function (err, products) {
                    if (err) return done(err);

                    if (products) {
                        var parentMenuItems = [];
                        for (var i = 0; i < list.length; i++) {
                            var relatedProducts = products.filter(products => products.childId == list[i].id);
                            list[i].products = relatedProducts;
                            if (!list[i].parentId) {
                                parentMenuItems.push(list[i]);
                            }
                        }

                        if (isRankingStarted) {

                            parentMenuItems.sort((currentItem, nextItem) => {

                                if (currentItem.index > nextItem.index) {

                                    return 1;
                                }

                                if (currentItem.index < nextItem.index) {

                                    return -1;
                                }
                                return 0;
                            });
                        }
                        var arr = mainCatCtrl.makeCategoryArray(parentMenuItems, list, products);

                        if (isRankingStarted) {

                            arr.forEach((cat) => {

                                if (cat.childNodes.length > 0) {
                                    var childNodesArr = cat.childNodes;

                                    //Child categories sort by
                                    var predicateBy = 'index';

                                    //Sort child categories
                                    var childNodesArrSorted = childNodesArr.sort((a, b) => {

                                        if (a[predicateBy] > b[predicateBy]) {

                                            return 1;
                                        }

                                        if (a[predicateBy] < b[predicateBy]) {

                                            return -1;
                                        }
                                        return 0;
                                    });
                                    cat.childNodes = childNodesArrSorted;
                                }
                            });
                        }

                        if (!isRankingStarted) {

                            arr.forEach((cat) => {

                                if (cat.childNodes.length > 0) {
                                    var childNodesArr = cat.childNodes;

                                    //Child categories sort by
                                    var predicateBy = 'updatedAt';

                                    //Sort child categories
                                    var childNodesArrSorted = childNodesArr.sort((a, b) => {

                                        if (a[predicateBy] < b[predicateBy]) {

                                            return 1;
                                        }

                                        if (a[predicateBy] > b[predicateBy]) {

                                            return -1;
                                        }
                                        return 0;
                                    });
                                    cat.childNodes = childNodesArrSorted;
                                }
                            });
                        }
                        res.send(arr);
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
                childNode = childNodeArray[0];//Will contains only one item
                // console.log(childNode);
                if(!childNode){
                    childNode = [];
                }
                childNode.childNodes = [ ];
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
            filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId+ '/assets/images/secondNavi/'+ req.body.imageUrl;
            desPath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId + '/assets/images/secondNavi/';

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

    getAllCategoryWithoutMakingCommerce: function (req, res) {
        var appId = req.param('appId');
        MainCategory.find({appId:appId}).exec(function(err,found) {
            if (err) res.send(err);
            if(found) {
                console.log(found)
                res.send(found);
            }
        });
    },
    deleteNodes : function(req,res) {
        var mainCatCtrl = this;
        console.log(req.body.data);

        var categoryArray = [];
        var productArray = [];

        categoryArray.push(mainCatCtrl.getToDeleteCategoryArray(req.body.data,categoryArray,productArray));

        MainCategory.destroy({id:{'$in':categoryArray}}).exec(function (err, deletedNode) {
            if (err) res.send(err);

            // If parentId is not undefined of deleted category
            if (deletedNode[0].parentId) {
                //Find parent category of deleted category
                MainCategory.findOne({ id: deletedNode[0].parentId }).exec(function (err, category) {
                    if (err) {
                        sails.log.error('Error in getting parent category of sub category! , error : ' + err);
                        res.send(err);
                    }
                    console.log(category)
                    if (category) {
                        //Id of the deleted category
                        var deletedNodeId = req.body.data.id;
                        //Sub categories array
                        var nodes = category.nodes;
                        //Array index of the deleted sub category id in parent category's nodes array
                        var index = nodes.indexOf(deletedNodeId);
                        if (index > -1) {
                            nodes.splice(index, 1);
                        }
                        //Set new sub categories' ids to nodes array of the parent category
                        category.nodes = nodes;
                        //Save parent category
                        category.save(function (err) {
                            if (err) {
                                sails.log.error('Error occurred while saving category after splice node, error : ' + err);
                                res.send(err);
                            }
                        });
                        console.log('done');

                    }
                });
            }

            ThirdNavigation.destroy({id:{'$in':productArray}}).exec(function (err,result) {
                if (err) res.send(err);
                if(result.length > 0){
                    result.forEach(function(ele){
                        Sku.destroy({productId: ele.id}).exec(function(err,result){
                            if (err) res.send(err);
                        });
                    });
                    res.send('ok');
                }else{
                    res.send('ok, but no products added');
                }
            });
        });

    },

    getToDeleteCategoryArray: function(node,categoryArray,productArray) {
        var mainCatCtrl = this;

        if(node.products && node.products.length !== 0){
            for(var i=0; i< node.products.length; i++){
               productArray.push(node.products[i].id);
            }
        }
        if(node.childNodes && node.childNodes.length !== 0){
                for(var j=0; j< node.childNodes.length; j++){
                    categoryArray.push(mainCatCtrl.getToDeleteCategoryArray(node.childNodes[j],categoryArray,productArray));
                }
        }
        return node.id;
    },

    /**
     * Responsible for updating category index which is moved up or moved down
     **/
    updateCategoryOrder: function (req, res) {

        var updatedCategories = req.body.payload;
        var appId = req.body.appId;

        if (!req.isSocket) {

            sails.log.debug('Not a socket request ' + ' MainCategoryController.updateCategoryOrder');
            return res.badRequest({ status: 'NOT_SOCKET_REQUEST' });
        }

        var isError = false;
        var loopCount = 0;

        Application.update({ id: appId}, { isRankingStarted: true }).exec(function (err) {

            if (err) {

                sails.log.error('Error occurred: MainCategoryController.updateCategoryOrder : error => ' + err);
            }
        });

        updatedCategories.forEach((category) => {

            MainCategory.update({ id: category.id }, { index: category.index })
                .exec(function (err, updatedCategory) {

                    loopCount++;

                    if (err) {

                        isError = true;
                        sails.log.error('In MainCategoryController.updateCategoryOrder, error => ' + err);
                    }

                    if (updatedCategories.length === loopCount) {

                        if (isError)
                            return res.serverError({ status: 'SERVER_ERROR' });
                        else
                            return res.send({ status: 'SUCCESS' });
                    }
                });
        });
    },

    /**
     * Responsible for updating featured category
     **/
    updateFeaturedCategory: function (req, res) {

        var mainCategoryController = this;

        if (!req.isSocket) {

            sails.log.debug('Not a socket request ' + ' MainCategoryController.updateFeaturedCategory');
            return res.badRequest({ status: 'NOT_SOCKET_REQUEST' });
        }

        var id = req.body.id;
        var isFeaturedCategory = req.body.isFeaturedCategory;

        MainCategory.update({ id: id }, { isFeaturedCategory: isFeaturedCategory })
            .exec(function (err, category) {

                if (err) {

                    sails.log.error('In MainCategoryController.updateFeaturedCategory, error => ' + err);
                    return res.serverError({ status: 'SERVER_ERROR' });
                }

                if (category.length > 0) {

                    mainCategoryController.updateAppHeaderData(category[0]);
                    return res.send({ status: 'SUCCESS' });
                }
            });
    },

    checkAppHeaderEligibility: function (req, res) {

        if (!req.isSocket) {

            sails.log.debug('Not a socket request ' + ' MainCategoryController.updateFeaturedCategory');
            return res.badRequest({ status: 'NOT_SOCKET_REQUEST' });
        }

        var appId = req.body.appId;
        var characterLength = req.body.characterLength;

        AppHeaderData.findOne({ appId: appId }).exec(function (err, appHeaderData) {

            if (err) {

                sails.log.error('In MainCategoryController.checkAppHeaderEligibility, error => ' + err);
                return res.serverError({ status: 'SERVER_ERROR' });
            }

            if (appHeaderData) {

                var remainingCharacterCount = appHeaderData.maxCategoryCharacterLength - appHeaderData.usedCategoryCharacterLength;

                if (remainingCharacterCount >= characterLength) {

                    return res.send({ status: 'ELIGIBLE' });
                } else
                    return res.send({ status: 'NOT_ELIGIBLE' });
            }
        });
    },

    updateAppHeaderData: function (category) {

        AppHeaderData.findOne({ appId: category.appId }).exec(function (err, appHeaderData) {

            if (err) {

                sails.log.error('Error occurred in MainCategoryController.updateAppHeaderData , error ' + err);
            }

            if (appHeaderData) {

                var charLength = category.name.length;
                if (category.isFeaturedCategory) {

                    appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength + charLength;
                }
                else
                    appHeaderData.usedCategoryCharacterLength = appHeaderData.usedCategoryCharacterLength - charLength;

                appHeaderData.save(function (err) {

                    if (!err) {

                        sails.log.debug('AppHeaderData is updated successfully.');
                    }
                });
            }
        });
    },

    updateFeaturedDropdownLabel: function (req, res) {

        var appId = req.body.appId;
        var nonFeaturedDropdownLabel = req.body.nonFeaturedDropdownLabel;

        AppHeaderData.update({ appId: appId }, { nonFeaturedDropdownLabel: nonFeaturedDropdownLabel })
            .exec(function (err, appHeaderData) {

                if (err) {

                    sails.log.error('Error occurred: MainCategoryController.updateFeaturedDropdownLabel : error => ' + err);
                    return res.serverError({ status: 'ERROR' });
                }
                if (appHeaderData && appHeaderData.length > 0) {

                    return res.send({ status: 'SUCCESS', data: appHeaderData[0] });
                }
            });
    },

    getAppHeaderData: function (req, res) {

        var appId = req.param('appId');

        AppHeaderData.findOne({ appId: appId }).exec(function (err, appHeaderData) {

            if (err) {

                sails.log.error('Error occurred: MainCategoryController.getAppHeaderData : error => ' + err);
                return res.serverError({ status: 'ERROR' });
            }
            if (appHeaderData) {

                return res.send({ status: 'SUCCESS', data: appHeaderData });
            }
            if (!appHeaderData) {

                return res.send({ status: 'NOT_FOUND' });
            }
        });
    }
};