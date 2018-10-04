/**
 * Created by thusithz on 5/3/16.
 */
/**
 * ApplicationController
 *
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs-extra'),
    config = require('../services/config'),
    xml2js = require('xml2js');

module.exports = {

    designApps : function(req,res){
        Template.find().exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });
    },
    getAppsCommerce: function(req,res){
        Template.find({templateType:'ecommerce'}).exec(function(err, template) {
            if (err) res.send(err);
            res.send(template);
        });
    },

    templatePreview : function (req,res) {
    },

    viewTemplate : function(req,res){

        var templateName = req.body.templateName,
            templateCategory = req.body.templateCategory,
            userId = req.body.userId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/',
            templatePath = config.TEMPLATES_PATH + templateName,
            appName = req.body.appName,
            serverTmp="http://localhost:port",
            serverOrg=config.server.host,
            //serverOrg='http://localhost:1337',
            isAppNameAvailable=false;

        var appQuery = { 
            "userId":userId, 
            "appName":req.body.appName
         }
          
        Application.find(appQuery, function(err, app) { 
              if (err) res.negotiate(err);
              if(app.length > 0){
                  res.send({
                      appId: "-1",
                      message: "App name already exists!"
                  });
              }else{
                  var loginPath = '/#/',
                      isApplyStyle =  {
                          color : {
                              backgroundColor: true,
                              footerColor: true,
                              navigationColor: true
                          },
                          typography : {
                              header : true,
                              content : true,
                              footer : true
                          },
                          button : true
                      };

                  Template.find(
                      {"template_name":req.body.templateName}
                      ).exec(function (err, template) {
                      if (err) res.negotiate(err);
                      isApplyStyle =  template[0].appStyle;


                      var application ={
                          appName : req.body.appName,
                          appTempPath :tempAppDirPath,
                          templateId : req.body.templateId,
                          isNew : false,
                          userId : userId,
                          status : "DRAFT",
                          displayImage: req.body.templateUrl,
                          templateCategory : templateCategory,
                          appSettings:{
                              appCurrency:{
                                  sign : "$",
                                  currency: "USD",
                                  symbol: "usd"
                              },
                              isApplyBGImage : true,
                              isApplyStyle : isApplyStyle,
                              backgroundColor : "#FFFFFF",
                              navigationBarColor : "#FFFFFF",
                              footerColor : "#FFFFFF",
                              headerFontColor : "#FFFFFF",
                              contentFontColor : "#FFFFFF",
                              footerFontColor : "#FFFFFF",
                              buttonColor : "#FFFFFF",
                              headerFontFamily : "Arial",
                              contentFontFamily : "Arial",
                              footerFontFamily : "Arial",
                              buttonFontFamily : "Arial",
                              headerFontSize : 10,
                              contentFontSize : 10,
                              footerFontSize : 10,
                              headerFontWeight : "normal",
                              contentFontWeight : "normal",
                              footerFontWeight : "normal",
                              buttonBorderWidth : "0px",
                              buttonBorderRadius : "0px"
                          },
                          appUpdateLocationSetting : {
                              loginUrl : loginPath
                          }
                      };

                      Application.create(application).exec(function(err,app) {
                          if (err) res.negotiate(err);


                          fs.copy(templatePath, tempAppDirPath + app.id, function(err) {
                              console.log("app.id "   + app.id );

                              if (err) return console.error(err);
                              var madeEasyFilePath = tempAppDirPath +app.id+'/madeEasy.Project';
                              var madeEasyFileContent = {
                                  name : appName,
                                  appId : app.id,
                                  userId : userId,
                                  serviceApi: config.server
                              };
                              fs.outputJson(madeEasyFilePath,madeEasyFileContent, function (err) {
                                  if(err) return console.error(err);
                              });


                              fs.readFile(tempAppDirPath +app.id+'/config.xml', 'utf-8',
                                  function(err, data) {
                                      if (err) return res.negotiate(err);
                                      var parser = new xml2js.Parser(),
                                          xmlBuilder = new xml2js.Builder();

                                      parser.parseString(data, function (err, result) {
                                          result.widget['$'].id="com.otenro."+appName.replace(/\s/g, '').toLowerCase()+app.id;
                                          var xml = xmlBuilder.buildObject(result);

                                          fs.writeFile(tempAppDirPath +app.id+'/config.xml', xml,'utf-8', function(err) {

                                              if (err) return res.negotiate(err);
                                          });

                                      });
                                  });

                              fs.readFile(tempAppDirPath +app.id+'/js/constantsService.js', 'utf-8',
                                  function(err, data) {
                                      if (err) return res.negotiate(err);
                                      fs.writeFile(tempAppDirPath +app.id+'/js/constantsService.js', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                                          if (err) return res.negotiate(err);
                                      });
                                  });

                              fs.readFile(tempAppDirPath +app.id+'/js/app.js', 'utf-8',
                                  function(err, data) {
                                      if (err) return res.negotiate(err);
                                      data=data.replace(serverTmp,serverOrg);
                                      data=data.replace(serverTmp,serverOrg);
                                      fs.writeFile(tempAppDirPath + app.id +'/js/app.js', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                                          if (err) return res.negotiate(err);
                                      });
                                  });

                              /** config -|- copy template images to App File Server
                               * TODO : future development, Template dummy data move to another folder
                               * **/
                              var appFileServerPath  = config.APP_FILE_SERVER + userId + '/templates/' + app.id +'/';
                              var tempDummyImagesPath = templatePath + '/img/';
                              var tempDummyImagesDesPath = appFileServerPath +  'img/';
                              /** Copy Template Dummy Images to APP File Server for given userID & appID **/
                              fs.copy(tempDummyImagesPath,tempDummyImagesDesPath,function (err) {
                                      if (err) return res.negotiate(err);
                                      sails.log('Third-navigation images copy to app-File-Server');
                                  }
                              );

                          });
                         /**
                           * ecommerce app details feed to DB
                           */
                          if(template[0].templateCategory=="2") {
                              var searchAppInitialData = {
                                  'templateName': templateName
                              }
                              AppInitialData.findOne(searchAppInitialData, function (err, appInitData) {
                                  if (err) return done(err);

                                  /**
                                   * add Second Navigation
                                   */
                                  var secondNaviList = appInitData.secondNavi;
                                  secondNaviList.forEach(function(secondNavi){
                                      var scondNaviAttribute = secondNavi.attribute;
                                      scondNaviAttribute.templateName = appInitData.templateName;
                                      scondNaviAttribute.appId = app.id;
                                      var thirdNaviList = secondNavi.thirdNavi;
                                      SecondNavigation.create(scondNaviAttribute).exec(function (err, secondN) {
                                          if (err) return err;
                                          /**
                                           * Add Third Navigation
                                           */
                                          for (var j = 0; j < thirdNaviList.length; j++) {
                                              thirdNaviList[j].appId = app.id;
                                              thirdNaviList[j].childId = secondN.id;

                                              ThirdNavigation.create(thirdNaviList[j]).exec(function (err, thirdN) {
                                                  if (err) return err;
                                              });
                                          }
                                      });

                                  })
                              });

                              /**
                               *  media app details feed to DB
                               */
                          }else if(template[0].templateCategory=="3"){

                              var searchAppInitialData = {
                                  'templateName' : templateName
                              }
                              AppInitialData.findOne(searchAppInitialData, function(err, appInitData) {
                                  if (err) return done(err);
                                  var articleCategoryList = appInitData.articleCategory;
                                  articleCategoryList.forEach(function (articleCategory) {
                                      var articleCategoryattribute = articleCategory.attribute;
                                      articleCategoryattribute.appId = app.id;
                                      var articalList = articleCategory.article;

                                      ArticleCategory.create(articleCategoryattribute).exec(function (err, articleCategory) {

                                          articalList.forEach(function (article) {
                                              var articalAttribute = article;
                                              articalAttribute.appId = app.id;
                                              articalAttribute.categoryId = articleCategory.id;
                                              Article.create(articalAttribute).exec(function (err, artical) {
                                                  if (err) return err;
                                              });
                                          });
                                      })
                                  })
                              });
                          }
                          res.send({
                              appId: app.id,
                              message: "New Application has been created"
                          });
                      });
                  });
              }
        });

    },

    createProgWebApp : function(req,res){

            var templateName = req.body.templateName,
                templateCategory = req.body.templateCategory,
                userId = req.body.userId,
                tempAppDirPath = config.ME_SERVER + userId + '/progressiveTemplates/',
                appBasePath = config.PROGRESSIVE_TEMPLATES_PATH,
                templatePath = config.PROGRESSIVE_TEMPLATES_PATH  + templateName,
                appName = req.body.appName,
                serverTmp="serverUrl",
                serverOrg=config.server.host,
                isAppNameAvailable=false;

                if(templateCategory === "2") {
                  appBasePath += 'ECommerceAppsBase';
                }else if(templateCategory === "3"){
                  appBasePath += 'ArticleAppsBase';
                }

                var appCtrl = this;

                var appQuery = { 
                    "userId":userId, 
                    "appName":req.body.appName
                 }
              
            Application.find(appQuery, function(err, app) { 
                  if (err) res.negotiate(err);
                  if(app.length > 0){
                      res.send({
                          appId: "-1",
                          message: "App name already exists!"
                      });
                  }else{
                      var loginPath = '/#/',
                          isApplyStyle =  {
                              color : {
                                  backgroundColor: true,
                                  footerColor: true,
                                  navigationColor: true
                              },
                              typography : {
                                  header : true,
                                  content : true,
                                  footer : true
                              },
                              button : true
                          };
                      Template.find(
                      {"template_name":req.body.templateName}
                      ).exec(function (err, template) {
                      if (err) res.negotiate(err);
                      isApplyStyle =  template[0].appStyle;


                      var application ={
                          appName : req.body.appName,
                          appTempPath :tempAppDirPath,
                          templateId : req.body.templateId,
                          isNew : true,
                          userId : userId,
                          status : "DRAFT",
                          displayImage: req.body.templateUrl,
                          templateCategory : templateCategory,
                          appSettings:{
                              appCurrency:{
                                  sign : "$",
                                  currency: "USD",
                                  symbol: "usd"
                              },
                              isApplyBGImage : true,
                              isApplyStyle : isApplyStyle,
                              backgroundColor : "#FFFFFF",
                              navigationBarColor : "#FFFFFF",
                              footerColor : "#FFFFFF",
                              headerFontColor : "#FFFFFF",
                              contentFontColor : "#FFFFFF",
                              footerHeaderFontColor : "#FFFFFF",
                              footerFontColor : "#FFFFFF",
                              buttonColor : "#FFFFFF",
                              headerFontFamily : "Arial",
                              contentFontFamily : "Arial",
                              footerFontFamily : "Arial",
                              buttonFontFamily : "Arial",
                              headerFontSize : 10,
                              contentFontSize : 10,
                              footerFontSize : 10,
                              headerFontWeight : "normal",
                              contentFontWeight : "normal",
                              footerFontWeight : "normal",
                              buttonBorderWidth : "0px",
                              buttonBorderRadius : "0px"
                          },
                          appUpdateLocationSetting : {
                              loginUrl : loginPath
                          }
                      };

                      Application.create(application).exec(function(err,app) {
                          if (err) res.negotiate(err);


                          // fs.copy(appBasePath, tempAppDirPath + app.id, function(err) {
                          //     if (err) res.send(err);
                          //
                          //     console.log("coppied appsBase");

                              var madeEasyFileContent = {
                                  name : appName,
                                  appId : app.id,
                                  userId : userId,
                                  serviceApi: config.server,
                                  templateName: templateName
                              };
                              appCtrl.createAppHeaderData(app.id, templateName);
                              fs.copy(templatePath, tempAppDirPath + app.id, function(err) {
                                  if (err) {
                                      console.error("Nothing to override in: " + templatePath);
                                  }

                                  console.log("copyied the template");
                                  appCtrl.createProgWebAppCont(res,tempAppDirPath,app.id,madeEasyFileContent,serverTmp,serverOrg,userId,templatePath);
                              });
                          // });
                          /**
                           * Add Main Navigation
                           */

                          /**
                           * If Only foodDemoApp or foodDemoApp2 Category & Product Feed to DB
                           */
                          /**
                           * ecommerce app details feed to DB
                           */
                          if(template[0].templateCategory=="2") {
                              var searchAppInitialData = {
                                  'templateName': templateName
                              }
                              AppInitialData.findOne(searchAppInitialData, function (err, appInitData) {
                                  if (err) return done(err);

                                  /**
                                   * add Second Navigation
                                   */
                                  var secondNaviList = appInitData.mainCategory;
                                  secondNaviList.forEach(function(secondNavi){
                                      var scondNaviAttribute = secondNavi.attribute;
                                      scondNaviAttribute.templateName = appInitData.templateName;
                                      scondNaviAttribute.appId = app.id;
                                      var thirdNaviList = secondNavi.thirdNavi;
                                      MainCategory.create(scondNaviAttribute).exec(function (err, secondN) {
                                          if (err) return err;
                                          /**
                                           * Add Third Navigation
                                           */
                                          for (var j = 0; j < thirdNaviList.length; j++) {
                                              thirdNaviList[j].appId = app.id;
                                              thirdNaviList[j].childId = secondN.id;

                                              ThirdNavigation.create(thirdNaviList[j]).exec(function (err, thirdN) {
                                                  if (err) return err;
                                              });
                                          }
                                      });

                                  })

                                  var slider = appInitData.slider;
                                  slider.forEach(function (slider){
                                    slider.templateName = appInitData.templateName;
                                    slider.appId = app.id;

                                    Slider.create(slider).exec(function (err, slider){
                                        if(err) return err;
                                    });
                                  })
                              });

                              /**
                               *  media app details feed to DB
                               */
                          }else if(template[0].templateCategory=="3"){

                              var searchAppInitialData = {
                                  'templateName' : templateName
                              }
                              AppInitialData.findOne(searchAppInitialData, function(err, appInitData) {
                                  if (err) return done(err);
                                  var articleCategoryList = appInitData.articleCategory;
                                  articleCategoryList.forEach(function (articleCategory) {
                                      var articleCategoryattribute = articleCategory.attribute;
                                      articleCategoryattribute.appId = app.id;
                                      var articalList = articleCategory.article;

                                      ArticleCategory.create(articleCategoryattribute).exec(function (err, articleCategory) {

                                          articalList.forEach(function (article) {
                                              var articalAttribute = article;
                                              articalAttribute.appId = app.id;
                                              articalAttribute.categoryId = articleCategory.id;
                                              Article.create(articalAttribute).exec(function (err, artical) {
                                                  if (err) return err;
                                              });
                                          });
                                      })
                                  })
                              });
                          }

                      });
                  });
                }
            });
        },
    createProgWebAppCont :function(res,tempAppDirPath,appId,madeEasyFileContent,serverTmp,serverOrg,userId,templatePath){
      var madeEasyFilePath = tempAppDirPath + appId +'/assets/madeEasy.json';
      const testFolder = tempAppDirPath + appId;

        fs.readdir(testFolder, (err, files) => {
                files.forEach(file => {
                    var matched = file.match(/main/g);
                    if (matched == "main") {
                        fs.readFile(tempAppDirPath + appId +'/'+file, 'utf-8',
                            function(err, data) {
                                if (err) return res.negotiate(err);
                                data =  data.replace('serverUrl',serverOrg);
                                data =  data.replace('unknownName',madeEasyFileContent.name);
                                data =  data.replace('unknownAppId',appId);
                                data =  data.replace('unknownUserName',userId);
                                data =  data.replace('unknownTemplateName',madeEasyFileContent.templateName);
                                fs.writeFile(tempAppDirPath +appId+'/'+file, data,'utf-8',function(err) {
                                    if (err) return res.negotiate(err);
                                });
                            });
                    }
                });
        });


      fs.outputJson(madeEasyFilePath,madeEasyFileContent, function (err) {
          if(err) return console.error(err);
      });

      fs.readFile(tempAppDirPath + appId +'/assets/constantsService.ts', 'utf-8',
          function(err, data) {
              if (err) return res.negotiate(err);
              fs.writeFile(tempAppDirPath +appId+'/assets/constantsService.ts', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                  if (err) return res.negotiate(err);
              });
          });


      /** config -|- copy template images to App File Server
       * TODO : future development, Template dummy data move to another folder
       * **/
      var appFileServerPath  = config.APP_FILE_SERVER + userId + '/progressiveTemplates/' + appId +'/';
      var tempDummyImagesPath = templatePath + '/assets/images/';
      var tempDummyImagesDesPath = appFileServerPath +  '/assets/images/';
      /** Copy Template Dummy Images to APP File Server for given userID & appID **/
      fs.copy(tempDummyImagesPath,tempDummyImagesDesPath,function (err) {
              if (err) return res.negotiate(err);
              res.send({
                  appId: appId,
                  message: "New Application has been created"
              });
          }
      );
    },

    createAppHeaderData: function(appId, templateName) {

        var values = { appId: appId };

        if (templateName === 'smartfit') {
            values.maxCategoryCharacterLength = config.APP_HEADER_INITIAL_DATA.MAX_CHARACTER_COUNT.POWER_HOUSE;
        }
        if (templateName === 'outfit') {
            values.maxCategoryCharacterLength = config.APP_HEADER_INITIAL_DATA.MAX_CHARACTER_COUNT.STYLE_TO_SHOP;
        }

        AppHeaderData.create(values).exec((err) => {

            if (err) sails.log.error('Error occurred while creating AppHeaderData of appId : ' + appId); 
        });
    },

    getApplicationData :function(req,res){
    Application.findOne({'id':req.param('appId')}).exec(function(err, application) {
        if (err) {
            res.send(err);
        }else {
            res.json(application);
        }

    })
    },
    iconAllowance : function(req,res){
        ApplicationStoreSettings.findOne({appId: req.param('appId')}).exec(function(err,data){
            if(err) res.send(err);
                res.send(data);
        })
    },
    createTempTemplates : function(req,res){
        var templateName = req.body.templateName,
            userId = req.body.userId,
            appId = req.body.appId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/',
            templatePath = config.TEMPLATES_PATH  + templateName,
            serverTmp="http://localhost:port",
            serverOrg=config.server.host;


        fs.copy(templatePath, tempAppDirPath + 'changePreview' , function(err) {
            if (err) return console.error(err);
            var madeEasyFilePath = tempAppDirPath + appId + '/madeEasy.Project';
            sails.log.info(madeEasyFilePath);
            fs.copy(madeEasyFilePath, tempAppDirPath + 'changePreview/madeEasy.Project' , function(err){
                if (err) return console.error(err);
                var bgFilePath = tempAppDirPath + appId + '/img/background.jpg';
                fs.copy(bgFilePath, tempAppDirPath + 'changePreview/img/background.jpg' , function(err){
                    if (err) return console.error(err);
                        res.send({
                            message: "New Application has been created"
                        });
                });
            });

            fs.readFile(tempAppDirPath +'changePreview/js/constantsService.js', 'utf-8',  function(err, data) {
                if (err) return res.negotiate(err);
                fs.writeFile(tempAppDirPath +'changePreview/js/constantsService.js', data.replace(serverTmp,serverOrg),'utf-8',function(err) {
                    if (err) return res.negotiate(err);
                });
            });

        });



    },
    changeTemplatePermanent : function(req,res){
        var userId = req.body.userId,
            appId = req.body.appId,
            tempAppDirPath = config.ME_SERVER + userId + '/templates/changePreview',
            templatePath = config.ME_SERVER + userId + '/templates/'+appId;
            //templatePath = sails.config.appPath + '/api/templates/' + templateName;
            sails.log.debug(templatePath);

        fs.copy(tempAppDirPath, templatePath , function(err) {
            if (err) return console.error(err);
            res.send({
                message: "New Application has been created"
            });

        });



    }
};